import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    // The installed app is the company, not one product — it opens on the
    // homepage, which introduces both Voice AI and the Dialer.
    name: 'NiaTalks — AI Voice Agents & Calling Software',
    short_name: 'NiaTalks',
    description:
      'NiaTalks builds AI that talks to your customers: voice agents for inbound and outbound phone calls in 40+ languages, and a dialer that puts every call, channel and customer record on one screen.',
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
