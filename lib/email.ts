import 'server-only'

/**
 * Email notifications.
 *
 * NOTE: There is no real email provider wired up yet. These functions log the
 * intent to the server console so the flow is complete end-to-end. To send real
 * mail, replace the body of `sendEmail` with a provider integration (Resend,
 * nodemailer/SMTP, AWS SES, etc.) and add the necessary credentials to the
 * environment.
 *
 * Keep these server-only - never import from a Client Component.
 */

interface SendEmailParams {
  to: string
  subject: string
  body: string
}

async function sendEmail({ to, subject, body }: SendEmailParams): Promise<void> {
  // TODO: integrate a real email provider here.
  // Example (Resend):
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: '...', to, subject, html: body })
  console.info('[email:stub] Would send email:', { to, subject })
  console.debug('[email:stub] Body:', body)
}

/**
 * Sent to a lawyer once they finish onboarding and their application is
 * submitted for review.
 */
export async function sendLawyerApplicationReceivedEmail(
  to: string,
  fullName?: string | null,
): Promise<void> {
  const name = fullName?.trim() || 'there'
  await sendEmail({
    to,
    subject: 'Your DIA application has been received',
    body: [
      `Hi ${name},`,
      '',
      'Thanks for submitting your application to join DIA as a verified lawyer.',
      'Our team will review your details and documents. We will email you once',
      'a decision has been made. Until then, your dashboard access is limited.',
      '',
      '- The DIA team',
    ].join('\n'),
  })
}

/**
 * Sent when a lawyer's application decision changes (approved / hold / rejected).
 * Wire this into the review action when you add real email delivery.
 */
export async function sendLawyerApplicationDecisionEmail(
  to: string,
  decision: 'approved' | 'hold' | 'rejected',
  fullName?: string | null,
): Promise<void> {
  const name = fullName?.trim() || 'there'
  const lines: Record<typeof decision, string> = {
    approved:
      'Good news - your application has been approved. You now have full access to your lawyer dashboard.',
    hold: 'Your application has been placed on hold. Please check your status page for details on what is needed.',
    rejected:
      'After review, your application was not approved at this time. Your status page has more details.',
  }
  await sendEmail({
    to,
    subject: `Your DIA application: ${decision}`,
    body: [`Hi ${name},`, '', lines[decision], '', '- The DIA team'].join('\n'),
  })
}
