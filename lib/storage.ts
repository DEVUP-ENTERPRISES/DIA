import 'server-only'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const BUCKET = process.env.AWS_S3_BUCKET!
const REGION = process.env.AWS_REGION!
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024   // 10 MB
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60       // 1 hour

// S3Client is safe to instantiate at module level - it is stateless and
// reused across requests (Next.js module cache).
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// ---------------------------------------------------------------------------
// Error type
// ---------------------------------------------------------------------------

export class StorageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StorageError'
  }
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validates a file before upload.
 * Throws StorageError if the file is too large or the type is not allowed.
 */
export function validateFile(file: File): void {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new StorageError('File must be 10 MB or smaller.')
  }
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new StorageError('Only PDF, PNG, and JPEG files are allowed.')
  }
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

/**
 * Uploads a file to the private S3 bucket.
 *
 * Object key format: `{lawyerUserId}/{documentType}-{timestamp}.{ext}`
 * Example:           `a1b2c3/bar_certificate-1718000000000.pdf`
 *
 * Returns the S3 object key (not a URL). The key is stored in
 * lawyer_documents.file_url and used later to generate signed URLs.
 */
export async function uploadLawyerDocument(
  lawyerUserId: string,
  documentType: string,
  file: File,
): Promise<string> {
  validateFile(file)

  const ext = file.name.split('.').pop() ?? 'bin'
  const key = `${lawyerUserId}/${documentType}-${Date.now()}.${ext}`
  const body = Buffer.from(await file.arrayBuffer())

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: file.type,
        // Server-side encryption - enabled by default on most AWS accounts.
        // Remove if your bucket policy enforces a different encryption mode.
        ServerSideEncryption: 'AES256',
      }),
    )
  } catch (err) {
    throw new StorageError(
      `Upload failed: ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  return key
}

// ---------------------------------------------------------------------------
// Signed URL (temporary read access)
// ---------------------------------------------------------------------------

/**
 * Returns a pre-signed S3 GET URL valid for 1 hour.
 *
 * Never expose the raw S3 object key or a permanent URL to the client.
 * Always generate a fresh signed URL on each server request.
 */
export async function getSignedUrl(key: string): Promise<string> {
  try {
    return await awsGetSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET, Key: key }),
      { expiresIn: SIGNED_URL_EXPIRY_SECONDS },
    )
  } catch (err) {
    throw new StorageError(
      `Could not generate signed URL: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

/**
 * Permanently deletes an object from S3 by its key.
 */
export async function deleteLawyerDocument(key: string): Promise<void> {
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }))
  } catch (err) {
    throw new StorageError(
      `Delete failed: ${err instanceof Error ? err.message : String(err)}`,
    )
  }
}
