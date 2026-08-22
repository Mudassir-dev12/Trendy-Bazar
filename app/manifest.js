export default function manifest() {
  return {
    name: 'Trendy Bazaar Official',
    short_name: 'Trendy Bazaar',
    description: 'Shop top smart gadgets, kitchen & home essentials, appliances, and educational toys at unbeatable prices in Pakistan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAFB',
    theme_color: '#F58220',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
