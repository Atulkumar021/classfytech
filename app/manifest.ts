import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Voice AI — Human-Like AI Voice Agents',
    short_name: 'Voice AI',
    description:
      'AI voice agent platform for inbound and outbound phone calls — lead qualification, appointment booking, customer support and more, in 40+ languages.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/assets/logo.png',
        sizes: '1536x1024',
        type: 'image/png',
      },
    ],
  };
}
