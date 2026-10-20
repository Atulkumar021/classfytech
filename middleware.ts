import { NextResponse, type NextRequest } from 'next/server';
import { companyInfo } from '@/lib/content';

/**
 * Sends every alternate hostname to the canonical one.
 *
 * The site answers on more than one domain (niatalks.in as well as
 * niatalks.com, each with and without `www`). Identical content on several
 * hostnames is duplicate content: inbound links and ranking signal get split
 * between them, and Google decides for itself which version to index. A
 * permanent redirect collapses them into one, and passes the accumulated
 * signal from the old hostname to the canonical one.
 *
 * This lives in middleware rather than `next.config.mjs` so the host list has
 * a single source of truth in `companyInfo`. A `.mjs` config cannot import the
 * TypeScript module, so putting it there would mean a second copy of the
 * domains — which is exactly how the canonical URL got out of sync before.
 *
 * A redirect at the nginx/Cloudflare layer is cheaper still, since it answers
 * without ever reaching Node. This is the portable version; if the edge is
 * already configured to do it, this simply never fires.
 */

const PRIMARY_HOST = new URL(companyInfo.siteUrl).host;

/** Lower-cased for comparison — Host headers are not case-normalised. */
const ALTERNATES = new Set(companyInfo.altDomains.map((d) => d.toLowerCase()));

export function middleware(request: NextRequest) {
  // The Host header carries the name the visitor actually typed; nextUrl.host
  // can be rewritten by the platform, so it is not reliable for this check.
  const header = request.headers.get('host') ?? '';
  // Strip the port: ":3000" in development, and some proxies append one.
  const host = header.split(':')[0].toLowerCase();

  // Only act on hostnames we have explicitly listed. Anything else — the
  // primary domain, localhost, a bare IP, a preview URL, a load-balancer
  // health check — passes through untouched. Redirecting "any unknown host"
  // would break all of those.
  if (!ALTERNATES.has(host)) return NextResponse.next();

  const url = new URL(request.nextUrl.pathname + request.nextUrl.search, companyInfo.siteUrl);

  // 301, not Next's default 307. A permanent redirect is what transfers
  // ranking signal; a temporary one tells crawlers to keep indexing the old
  // hostname, which defeats the point.
  return NextResponse.redirect(url, 301);
}

export const config = {
  /**
   * Skip the framework's own asset routes, and `/api`. A 301 on a POST is
   * allowed to be replayed as a GET, which would silently drop a contact-form
   * submission; the page that posts is already on the canonical host by then,
   * so excluding the API costs nothing.
   */
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
