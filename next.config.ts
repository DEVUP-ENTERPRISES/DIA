import type { NextConfig } from "next";

// Base Supabase URL (e.g. https://xxxx.supabase.co). Used to build a same-origin
// reverse proxy so the browser only ever talks to `/sb/*` on our own domain,
// never directly to *.supabase.co. This is obfuscation, not a security boundary
// - Row-Level Security is what actually protects the data.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires non-default quality values to be allowlisted.
    // 75 is the default; 100 is used for the crisp logo rendering.
    qualities: [75, 100],
  },

  async rewrites() {
    if (!SUPABASE_URL) return [];
    return [
      {
        // Everything under /sb is proxied to the Supabase project.
        // Covers auth/v1, rest/v1, storage/v1, etc.
        source: "/sb/:path*",
        destination: `${SUPABASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
