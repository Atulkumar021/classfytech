import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Voice AI — Human-Like AI Voice Agents',
    short_name: 'Voice AI',
    description:
      'AI voice agent platform for inbound and outbound phone calls — lead qualification, appointment booking, customer support and more, in 40+ languages.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#fafafa',
    icons: [
      {
        src: '/assets/logo-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
