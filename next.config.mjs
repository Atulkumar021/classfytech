/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships ESM; transpile it and the R3F helpers for older bundler paths.
  transpilePackages: ['three'],

  /**
   * Each product now carries all of its sections on a single page, so the old
   * per-section URLs point at the matching anchor instead of a separate page.
   *
   * Two generations of URL are covered: the original flat paths from when the
   * site was Voice-AI-only (`/pricing`), and the short-lived nested sub-pages
   * (`/voice-ai/pricing`). All permanent, so nothing 404s and any ranking
   * signal follows to the destination.
   */
  async redirects() {
    const voiceAiSections = [
      ['platform', 'services'],
      ['how-it-works', 'process'],
      ['solutions', 'solutions'],
      ['pricing', 'pricing'],
      ['faq', 'faq'],
    ];

    return [
      // Original flat paths.
      ...voiceAiSections.map(([from, anchor]) => ({
        source: `/${from}`,
        destination: `/voice-ai#${anchor}`,
        permanent: true,
      })),
      // Nested sub-pages that briefly existed.
      ...voiceAiSections.map(([from, anchor]) => ({
        source: `/voice-ai/${from}`,
        destination: `/voice-ai#${anchor}`,
        permanent: true,
      })),
      // New products' pricing now lives on the product page.
      { source: '/dialer/pricing', destination: '/dialer#pricing', permanent: true },
      { source: '/chatbot/pricing', destination: '/chatbot#pricing', permanent: true },
    ];
  },
};

export default nextConfig;
