// Categories and Subcategories configuration for Trendy Bazaar

export const categories = [
  {
    id: "smart-gadgets",
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    icon: "📱",
    badge: "Hot Tech",
    description: "Latest smartphones, wearables, smart home tech & mobile accessories",
    subcategories: [
      { id: "mobile-charging", name: "Mobile & Charging", slug: "mobile-charging" },
      { id: "audio-wearables", name: "Audio & Wearables", slug: "audio-wearables" },
      { id: "smart-home", name: "Smart Home", slug: "smart-home" },
      { id: "tech-accessories", name: "Tech Accessories", slug: "tech-accessories" }
    ]
  },
  {
    id: "home-essentials",
    name: "Home Essentials",
    slug: "home-essentials",
    icon: "🏠",
    badge: "Everyday Best",
    description: "Organize, clean, and elevate your living spaces with premium home essentials",
    subcategories: [
      { id: "kitchen-dining", name: "Kitchen & Dining", slug: "kitchen-dining" },
      { id: "home-organization", name: "Home Organization", slug: "home-organization" },
      { id: "cleaning-laundry", name: "Cleaning & Laundry", slug: "cleaning-laundry" },
      { id: "home-living", name: "Home & Living", slug: "home-living" }
    ]
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    slug: "home-appliances",
    icon: "⚡",
    badge: "Super Savers",
    description: "Modern labor-saving kitchen, cooling, heating & personal care appliances",
    subcategories: [
      { id: "kitchen-appliances", name: "Kitchen Appliances", slug: "kitchen-appliances" },
      { id: "cleaning-appliances", name: "Cleaning Appliances", slug: "cleaning-appliances" },
      { id: "cooling-heating", name: "Cooling & Heating", slug: "cooling-heating" },
      { id: "personal-care-appliances", name: "Personal Care Appliances", slug: "personal-care-appliances" }
    ]
  },
  {
    id: "toys",
    name: "Toys",
    slug: "toys",
    icon: "🧸",
    badge: "Kids Favorite",
    description: "Fun, educational, remote control, and creative play for kids of all ages",
    subcategories: [
      { id: "educational-toys", name: "Educational Toys", slug: "educational-toys" },
      { id: "remote-control-toys", name: "Remote Control Toys", slug: "remote-control-toys" },
      { id: "games-puzzles", name: "Games & Puzzles", slug: "games-puzzles" },
      { id: "creative-outdoor-play", name: "Creative & Outdoor Play", slug: "creative-outdoor-play" }
    ]
  }
];
