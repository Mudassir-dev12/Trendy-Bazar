// Initial products seed data for Trendy Bazaar with PKR prices and verified Unsplash images

export const initialProducts = [
  // -------------------------------------------------------------
  // 1. SMART GADGETS (smart-gadgets)
  // -------------------------------------------------------------
  // Subcategory: Mobile & Charging (mobile-charging)
  {
    id: "tb-sg-mc-1",
    name: "HyperSpeed 100W GaN Fast Charger Block",
    slug: "hyperspeed-100w-gan-fast-charger-block",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 13999,
    discountPrice: 8399,
    rating: 4.8,
    reviewCount: 412,
    stock: 45,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    description: "Compact 4-port 100W GaN USB-C wall charger. Power up your laptop, phone, and tablet simultaneously at ultra-fast speeds.",
    specs: [
      { label: "Output Power", value: "100W Max" },
      { label: "Technology", value: "Gallium Nitride (GaN III)" },
      { label: "Ports", value: "3x USB-C PD 3.0, 1x USB-A QC 4.0" },
      { label: "Compatibility", value: "Universal (iPhone, Android, Mac, iPad)" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Best Seller", "Fast Charger", "GaN Tech"]
  },
  {
    id: "tb-sg-mc-2",
    name: "MagFlex 15W Magnetic Wireless Charging Pad",
    slug: "magflex-15w-magnetic-wireless-charging-pad",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 9799,
    discountPrice: 6150,
    rating: 4.6,
    reviewCount: 189,
    stock: 28,
    image: "https://images.unsplash.com/photo-1622445268465-843d31a725da?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-slim aluminum wireless magnetic charger with LED atmosphere ring and thermal management chip.",
    specs: [
      { label: "Power Output", value: "15W / 10W / 7.5W / 5W" },
      { label: "Cable Length", value: "1.5 Meters Braided Nylon" },
      { label: "Material", value: "Anodized Aluminum & Tempered Glass" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Wireless", "Magnetic", "Ultra-Slim"]
  },
  {
    id: "tb-sg-mc-3",
    name: "VoltMax 20,000mAh Power Bank with Built-in Cables",
    slug: "voltmax-20000mah-power-bank-built-in-cables",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 16799,
    discountPrice: 11199,
    rating: 4.9,
    reviewCount: 620,
    stock: 60,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=800&auto=format&fit=crop&q=80",
    description: "High capacity airline-approved portable power bank with digital LED battery readout and built-in USB-C & Lightning cables.",
    specs: [
      { label: "Capacity", value: "20,000 mAh (74Wh)" },
      { label: "Display", value: "Digital Percentage LED" },
      { label: "Built-in Cables", value: "USB-C, Lightning, USB-A Recharge" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Power Bank", "Travel Essential"]
  },
  {
    id: "tb-sg-mc-4",
    name: "FlexiGrip Auto-Clamping Car Mount Wireless Charger",
    slug: "flexigrip-auto-clamping-car-mount-wireless-charger",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 11199,
    discountPrice: 6999,
    rating: 4.5,
    reviewCount: 142,
    stock: 19,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80",
    description: "Infrared smart sensor auto-locks your smartphone and begins instant 15W wireless quick charge in your car.",
    specs: [
      { label: "Mount Type", value: "Air Vent & Dashboard Suction" },
      { label: "Rotation", value: "360-Degree Ball Joint" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Car Accessories", "Smart Sensor"]
  },
  {
    id: "tb-sg-mc-5",
    name: "Armored Braided 240W USB-C to USB-C Cable (2-Pack)",
    slug: "armored-braided-240w-usbc-cable-2pack",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 6999,
    discountPrice: 4199,
    rating: 4.7,
    reviewCount: 310,
    stock: 80,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80",
    description: "Heavy-duty Kevlar-reinforced braided cable supporting EPR 240W charging and 480Mbps data sync.",
    specs: [
      { label: "Max Power", value: "240W (48V/5A)" },
      { label: "Length", value: "6.6 ft / 2 Meters" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Heavy Duty", "Braided Cable"]
  },
  {
    id: "tb-sg-mc-6",
    name: "3-in-1 Foldable Travel Magnetic Charging Station",
    slug: "3-in-1-foldable-travel-magnetic-charging-station",
    category: "smart-gadgets",
    subcategory: "mobile-charging",
    price: 19599,
    discountPrice: 12599,
    rating: 4.8,
    reviewCount: 275,
    stock: 32,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80",
    description: "Charge Phone, Smartwatch, and Wireless Earbuds simultaneously. Folds completely flat for effortless travel portability.",
    specs: [
      { label: "Compatibility", value: "MagSafe iPhone, Apple Watch, AirPods" },
      { label: "Weight", value: "145g" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["3-in-1", "Travel Charger"]
  },

  // Subcategory: Audio & Wearables (audio-wearables)
  {
    id: "tb-sg-aw-1",
    name: "AeroPulse Pro Active Noise Cancelling Earbuds",
    slug: "aeropulse-pro-anc-earbuds",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 36399,
    discountPrice: 22399,
    rating: 4.9,
    reviewCount: 840,
    stock: 55,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    description: "Immersive 3D Spatial Audio with -42dB Hybrid Active Noise Cancellation, transparency mode, and 36-hour total playback.",
    specs: [
      { label: "Noise Reduction", value: "-42dB Hybrid ANC" },
      { label: "Battery Life", value: "8 hrs + 28 hrs with case" },
      { label: "Water Resistance", value: "IPX7 Waterproof" },
      { label: "Bluetooth", value: "v5.4 Ultra-low Latency" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Top Pick", "Noise Cancelling", "Wireless Audio"]
  },
  {
    id: "tb-sg-aw-2",
    name: "SonicCraft HD Wireless Over-Ear Studio Headphones",
    slug: "soniccraft-hd-wireless-over-ear-studio-headphones",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 50399,
    discountPrice: 33599,
    rating: 4.8,
    reviewCount: 512,
    stock: 24,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Plush memory foam ear cushions, 50mm titanium drivers, Hi-Res Audio certification, and 60-hour marathon battery life.",
    specs: [
      { label: "Drivers", value: "50mm Titanium Composite" },
      { label: "Playtime", value: "60 Hours" },
      { label: "Codec Support", value: "LDAC, AAC, SBC" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Hi-Res Audio", "Studio Quality"]
  },
  {
    id: "tb-sg-aw-3",
    name: "FitTrack Pulse AMOLED Smartwatch with ECG & SpO2",
    slug: "fittrack-pulse-amoled-smartwatch",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 27999,
    discountPrice: 18199,
    rating: 4.7,
    reviewCount: 380,
    stock: 40,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
    description: "Vibrant 1.43-inch Always-On AMOLED screen, Bluetooth calling, 110+ sports modes, 24/7 heart rate and sleep monitor.",
    specs: [
      { label: "Display", value: "1.43 inch AMOLED (466x466)" },
      { label: "Battery", value: "Up to 12 Days Typical Use" },
      { label: "Sensors", value: "Heart Rate, SpO2, Sleep, Stress, Step Counter" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Fitness Tracker", "AMOLED"]
  },
  {
    id: "tb-sg-aw-4",
    name: "SoundBox Blast Waterproof Portable Bluetooth Speaker",
    slug: "soundbox-blast-waterproof-portable-bluetooth-speaker",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 22399,
    discountPrice: 13999,
    rating: 4.8,
    reviewCount: 495,
    stock: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    description: "30W punchy bass speaker with RGB dynamic beat lights, TWS stereo pairing, and IPX7 floating waterproof construction.",
    specs: [
      { label: "Power Output", value: "30W Peak Stereo" },
      { label: "Playtime", value: "24 Hours" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Speaker", "Outdoor", "Waterproof"]
  },
  {
    id: "tb-sg-aw-5",
    name: "BoneConduct Sport Open-Ear Wireless Headphones",
    slug: "boneconduct-sport-open-ear-wireless-headphones",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 25199,
    discountPrice: 16799,
    rating: 4.6,
    reviewCount: 162,
    stock: 22,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    description: "Stay aware of your surroundings during running and cycling. Lightweight titanium frame with premium bone conduction sound.",
    specs: [
      { label: "Technology", value: "9th Gen Bone Conduction" },
      { label: "Weight", value: "26 grams" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Sports", "Open Ear"]
  },
  {
    id: "tb-sg-aw-6",
    name: "Smart Ring Health Tracker with Sleep & Activity Monitor",
    slug: "smart-ring-health-tracker",
    category: "smart-gadgets",
    subcategory: "audio-wearables",
    price: 33599,
    discountPrice: 23799,
    rating: 4.7,
    reviewCount: 204,
    stock: 18,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    description: "Sleek titanium smart ring tracking skin temperature, sleep cycles, steps, and heart rate variability with zero subscription fees.",
    specs: [
      { label: "Material", value: "Aerospace Grade Titanium" },
      { label: "Battery", value: "7 Days on single magnetic charge" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Smart Ring", "Health Tech"]
  },

  // Subcategory: Smart Home (smart-home)
  {
    id: "tb-sg-sh-1",
    name: "LumiSmart RGBIC Ambient LED Light Strip 32.8ft",
    slug: "lumismart-rgbic-ambient-led-light-strip",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 11199,
    discountPrice: 6999,
    rating: 4.7,
    reviewCount: 390,
    stock: 50,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    description: "Segmented multi-color RGBIC lighting effects with Music Sync mode, Alexa / Google Assistant voice control, and mobile app support.",
    specs: [
      { label: "Length", value: "32.8 ft (10m)" },
      { label: "Control", value: "WiFi, Bluetooth, Voice, Remote" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Smart Lighting", "RGBIC"]
  },
  {
    id: "tb-sg-sh-2",
    name: "GuardVision 2K Pan-Tilt WiFi Security Camera",
    slug: "guardvision-2k-pantilt-wifi-security-camera",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 13999,
    discountPrice: 9239,
    rating: 4.8,
    reviewCount: 520,
    stock: 36,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&auto=format&fit=crop&q=80",
    description: "360° coverage 2K HD indoor security camera with AI human detection, color night vision, and two-way audio talk.",
    specs: [
      { label: "Resolution", value: "2K HD (2304 x 1296)" },
      { label: "Night Vision", value: "Infrared + Color LED" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Security", "Smart Camera"]
  },
  {
    id: "tb-sg-sh-3",
    name: "Smart Plug Mini Power Strip with Energy Monitoring (4-Pack)",
    slug: "smart-plug-mini-energy-monitoring-4pack",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 9799,
    discountPrice: 6439,
    rating: 4.6,
    reviewCount: 310,
    stock: 45,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    description: "Automate home lamps and appliances. Track real-time power consumption in kWh to save on energy bills.",
    specs: [
      { label: "Rating", value: "15A 1800W" },
      { label: "Compatibility", value: "Matter, Alexa, Google Home" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Energy Saver", "Smart Plug"]
  },
  {
    id: "tb-sg-sh-4",
    name: "ThermoStat Pro Smart Programmable WiFi Thermostat",
    slug: "thermostat-pro-smart-programmable-wifi-thermostat",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 36399,
    discountPrice: 25199,
    rating: 4.9,
    reviewCount: 240,
    stock: 20,
    image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop&q=80",
    description: "Saves up to 23% on heating and cooling costs. Automatic scheduling based on home/away presence.",
    specs: [
      { label: "Screen", value: "Touchscreen Color LCD" },
      { label: "Sensors", value: "Temperature, Humidity, Motion" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Thermostat", "Energy Efficient"]
  },
  {
    id: "tb-sg-sh-5",
    name: "KeyFree Fingerprint Smart Door Lock with Keypad",
    slug: "keyfree-fingerprint-smart-door-lock",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 41999,
    discountPrice: 27999,
    rating: 4.8,
    reviewCount: 185,
    stock: 15,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    description: "Unlock in 0.3s via biometric fingerprint, passcode, IC card, mobile app, or backup mechanical keys.",
    specs: [
      { label: "Unlock Options", value: "Fingerprint, App, PIN Code, Card, Physical Key" },
      { label: "Security Rating", value: "ANSI Grade 2" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Smart Lock", "Home Safety"]
  },
  {
    id: "tb-sg-sh-6",
    name: "AromaDiffuser Smart Essential Oil Ultrasonic Humidifier",
    slug: "aromadiffuser-smart-essential-oil-humidifier",
    category: "smart-gadgets",
    subcategory: "smart-home",
    price: 12599,
    discountPrice: 8119,
    rating: 4.7,
    reviewCount: 290,
    stock: 38,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80",
    description: "500ml large capacity mist diffuser with ambient LED nightlight and timer schedule via smartphone app.",
    specs: [
      { label: "Water Capacity", value: "500 ml" },
      { label: "Coverage", value: "Up to 400 sq.ft" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Diffuser", "Wellness"]
  },

  // Subcategory: Tech Accessories (tech-accessories)
  {
    id: "tb-sg-ta-1",
    name: "ErgoLift Aluminum Laptop Stand Riser",
    slug: "ergolift-aluminum-laptop-stand-riser",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 11199,
    discountPrice: 6999,
    rating: 4.9,
    reviewCount: 710,
    stock: 65,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    description: "Heavy duty ventilated metal stand elevates your laptop screen to eye level, improving posture and cooling airflow.",
    specs: [
      { label: "Material", value: "Solid Aluminum Alloy" },
      { label: "Laptop Size", value: "Supports 10 to 17.3 inch laptops" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Ergonomic", "Desk Setup"]
  },
  {
    id: "tb-sg-ta-2",
    name: "MultiPort 9-in-1 USB-C Docking Station Hub",
    slug: "multiport-9-in-1-usbc-docking-station-hub",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 19599,
    discountPrice: 12039,
    rating: 4.8,
    reviewCount: 430,
    stock: 40,
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80",
    description: "4K HDMI @ 60Hz, 100W PD charging, Gigabit Ethernet, SD/TF card slots, and 3x USB 3.0 high-speed data ports.",
    specs: [
      { label: "Video Output", value: "4K UHD @ 60Hz HDMI" },
      { label: "Ethernet", value: "1000Mbps RJ45" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["USB-C Hub", "Productivity"]
  },
  {
    id: "tb-sg-ta-3",
    name: "UltraGlide XL Extended RGB Desk Mat Mouse Pad",
    slug: "ultraglide-xl-extended-rgb-desk-mat",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 8399,
    discountPrice: 5319,
    rating: 4.7,
    reviewCount: 512,
    stock: 55,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    description: "Water-resistant micro-woven cloth surface with anti-slip rubber base and 14 light modes surrounding border.",
    specs: [
      { label: "Dimensions", value: "900mm x 400mm x 4mm" },
      { label: "Surface", value: "Waterproof Micro-weave" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Gaming", "Desk Mat"]
  },
  {
    id: "tb-sg-ta-4",
    name: "CleanTech 7-in-1 Screen & Keyboard Cleaner Kit",
    slug: "cleantech-7-in-1-screen-keyboard-cleaner-kit",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 4479,
    discountPrice: 2799,
    rating: 4.8,
    reviewCount: 890,
    stock: 120,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    description: "All-in-one gadget cleaning tool with keycap puller, soft brush, microfiber spray wipe, and precision earbud pen tip.",
    specs: [
      { label: "Tools Included", value: "7 Cleaning Components" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Cleaning Kit", "Essential"]
  },
  {
    id: "tb-sg-ta-5",
    name: "SilentClick Wireless Ergonomic Vertical Mouse",
    slug: "silentclick-wireless-ergonomic-vertical-mouse",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 9799,
    discountPrice: 6150,
    rating: 4.6,
    reviewCount: 340,
    stock: 28,
    image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800&auto=format&fit=crop&q=80",
    description: "Natural handshake posture design reduces wrist strain. Whisper-quiet buttons and adjustable DPI up to 3200.",
    specs: [
      { label: "DPI Levels", value: "800 / 1200 / 1600 / 3200" },
      { label: "Connectivity", value: "2.4G Wireless + Bluetooth 5.0" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Ergonomic", "Quiet Mouse"]
  },
  {
    id: "tb-sg-ta-6",
    name: "MechType Compact Hot-Swappable Wireless Keyboard",
    slug: "mechtype-compact-hot-swappable-wireless-keyboard",
    category: "smart-gadgets",
    subcategory: "tech-accessories",
    price: 25199,
    discountPrice: 16799,
    rating: 4.9,
    reviewCount: 460,
    stock: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    description: "75% mechanical layout with pre-lubed tactile switches, PBT double-shot keycaps, and multi-device connection.",
    specs: [
      { label: "Switches", value: "Hot-Swappable Tactile Yellow" },
      { label: "Battery", value: "4000mAh (Up to 200h without RGB)" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Mechanical Keyboard", "Custom Setup"]
  },

  // -------------------------------------------------------------
  // 2. HOME ESSENTIALS (home-essentials)
  // -------------------------------------------------------------
  // Subcategory: Kitchen & Dining (kitchen-dining)
  {
    id: "tb-he-kd-1",
    name: "ChefMaster 12-Piece Ceramic Nonstick Cookware Set",
    slug: "chefmaster-12pc-ceramic-nonstick-cookware-set",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 41999,
    discountPrice: 27999,
    rating: 4.9,
    reviewCount: 680,
    stock: 35,
    image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=800&auto=format&fit=crop&q=80",
    description: "PTFE & PFOA free non-toxic ceramic cooking set with induction compatible stay-cool gold handles.",
    specs: [
      { label: "Material", value: "Forged Aluminum with Ceramic Coating" },
      { label: "Compatibility", value: "Gas, Electric, Ceramic, Induction" },
      { label: "Oven Safe", value: "Up to 500°F (260°C)" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Non-Toxic", "Chef Grade", "Top Seller"]
  },
  {
    id: "tb-he-kd-2",
    name: "Starlight 16-Piece Modern Stoneware Dinnerware Set",
    slug: "starlight-16pc-modern-stoneware-dinnerware-set",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 25199,
    discountPrice: 16799,
    rating: 4.8,
    reviewCount: 420,
    stock: 25,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80",
    description: "Hand-finished matte reactive glaze plates, salad bowls, and mugs for sophisticated dining experiences.",
    specs: [
      { label: "Includes", value: "4x Dinner Plates, 4x Salad Plates, 4x Bowls, 4x Mugs" },
      { label: "Dishwasher Safe", value: "Yes" },
      { label: "Microwave Safe", value: "Yes" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Dinnerware", "Modern Style"]
  },
  {
    id: "tb-he-kd-3",
    name: "FreshLock Glass Food Storage Containers (10-Pack)",
    slug: "freshlock-glass-food-storage-containers-10pack",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 13999,
    discountPrice: 9799,
    rating: 4.9,
    reviewCount: 950,
    stock: 75,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    description: "High-borosilicate thermal glass prep containers with 100% leak-proof snap lock airtight lids.",
    specs: [
      { label: "Material", value: "Borosilicate Glass & BPA-free Lids" },
      { label: "Freezer Safe", value: "Yes (-40°F)" },
      { label: "Oven Safe", value: "Yes (up to 752°F without lid)" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Meal Prep", "Glass Storage"]
  },
  {
    id: "tb-he-kd-4",
    name: "ProBlade German Stainless Steel 6-Piece Knife Block",
    slug: "problade-german-stainless-steel-knife-block-set",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 22399,
    discountPrice: 13999,
    rating: 4.7,
    reviewCount: 310,
    stock: 22,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80",
    description: "Precision forged high-carbon German steel blades housed in an acacia hardwood knife block with built-in sharpener.",
    specs: [
      { label: "Steel Type", value: "X50Cr15 High Carbon German Steel" },
      { label: "Includes", value: "Chef, Santoku, Bread, Utility, Paring Knife & Block" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Knives", "Kitchen Essential"]
  },
  {
    id: "tb-he-kd-5",
    name: "EcoBamboo Organic Cutting Board Set with Juice Grooves",
    slug: "ecobamboo-organic-cutting-board-set",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 9799,
    discountPrice: 6439,
    rating: 4.8,
    reviewCount: 512,
    stock: 45,
    image: "https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?w=800&auto=format&fit=crop&q=80",
    description: "3-piece thick organic bamboo chopping boards with deep liquid drip grooves and convenient side handles.",
    specs: [
      { label: "Material", value: "100% Natural Organic Moso Bamboo" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Eco-Friendly", "Bamboo"]
  },
  {
    id: "tb-he-kd-6",
    name: "SilicoChef 10-Piece Heat Resistant Cooking Utensil Set",
    slug: "silicochef-10piece-heat-resistant-utensil-set",
    category: "home-essentials",
    subcategory: "kitchen-dining",
    price: 8399,
    discountPrice: 5599,
    rating: 4.7,
    reviewCount: 280,
    stock: 50,
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    description: "Food grade seamless silicone utensils with natural beechwood handles. Will not scratch nonstick pans.",
    specs: [
      { label: "Heat Resistance", value: "Up to 446°F (230°C)" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Silicone Utensils", "Kitchen Gear"]
  },

  // Subcategory: Home Organization (home-organization)
  {
    id: "tb-he-ho-1",
    name: "StackClear Transparent Shoe Storage Boxes (6-Pack)",
    slug: "stackclear-transparent-shoe-storage-boxes-6pack",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 12599,
    discountPrice: 8399,
    rating: 4.8,
    reviewCount: 760,
    stock: 60,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    description: "Clear drop-front magnetic door shoe display cases. Stackable sturdy design fits up to US size 14 sneakers.",
    specs: [
      { label: "Dimensions", value: "14.2” x 10.6” x 8.3” each" },
      { label: "Capacity", value: "Fits high-top sneakers up to size 14" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Closet Organizer", "Sneakerhead"]
  },
  {
    id: "tb-he-ho-2",
    name: "Natural Woven Cotton Rope Storage Basket",
    slug: "natural-woven-cotton-rope-storage-basket",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 9239,
    discountPrice: 6150,
    rating: 4.9,
    reviewCount: 430,
    stock: 40,
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80",
    description: "Extra large decorative laundry and toy storage hamper made from chemical-free soft natural cotton rope.",
    specs: [
      { label: "Size", value: "20” x 20” x 14”" },
      { label: "Material", value: "100% Organic Woven Cotton" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Decorative", "Storage Basket"]
  },
  {
    id: "tb-he-ho-3",
    name: "SpaceSaver Vacuum Storage Bags with Hand Pump (12-Pack)",
    slug: "spacesaver-vacuum-storage-bags-12pack",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 11199,
    discountPrice: 6999,
    rating: 4.7,
    reviewCount: 1100,
    stock: 90,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    description: "Reduce bulky bedding and seasonal clothing volume by 80%. Triple seal turbo valve and double-zip lock.",
    specs: [
      { label: "Includes", value: "3x Jumbo, 3x Large, 3x Medium, 3x Small + Hand Pump" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Space Saver", "Storage"]
  },
  {
    id: "tb-he-ho-4",
    name: "PantryMax Airtight Food Cereal Dispensers (6-Pack)",
    slug: "pantrymax-airtight-cereal-dispensers-6pack",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 10359,
    discountPrice: 6999,
    rating: 4.8,
    reviewCount: 380,
    stock: 30,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
    description: "Keep flour, sugar, snacks, and cereals fresh. Includes chalkboard labels and measuring spoon set.",
    specs: [
      { label: "Capacity", value: "4L (135.2 oz) each" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Pantry", "Airtight"]
  },
  {
    id: "tb-he-ho-5",
    name: "Velvet Non-Slip Clothes Hangers (50-Pack)",
    slug: "velvet-non-slip-clothes-hangers-50pack",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 9799,
    discountPrice: 6439,
    rating: 4.9,
    reviewCount: 1420,
    stock: 100,
    image: "https://images.unsplash.com/photo-1585863138402-140e5d010dca?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-thin space saving design doubles closet room. Soft velvet flocking prevents clothes from slipping off.",
    specs: [
      { label: "Quantity", value: "50 Velvet Hangers" },
      { label: "Hook", value: "360-Degree Swivel Gold Chrome" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Closet", "Velvet Hangers"]
  },
  {
    id: "tb-he-ho-6",
    name: "Underbed Rolling Storage Bin Container with Lid",
    slug: "underbed-rolling-storage-bin-container",
    category: "home-essentials",
    subcategory: "home-organization",
    price: 13999,
    discountPrice: 9239,
    rating: 4.6,
    reviewCount: 220,
    stock: 25,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    description: "Sturdy metal wire underbed storage cart on 360° lockable wheels with clear dustproof cover.",
    specs: [
      { label: "Dimensions", value: "31.5” x 17.3” x 6.2”" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Underbed", "Rolling Storage"]
  },

  // Subcategory: Cleaning & Laundry (cleaning-laundry)
  {
    id: "tb-he-cl-1",
    name: "SpinClean Dual-Bucket Mop System with Microfiber Heads",
    slug: "spinclean-dual-bucket-mop-system",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 13999,
    discountPrice: 9239,
    rating: 4.8,
    reviewCount: 650,
    stock: 45,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
    description: "Hands-free foot pedal wringer wrings dirty water into separate clean water chamber. Includes 4 reusable mop pads.",
    specs: [
      { label: "Mop Head", value: "360 Rotation Microfiber" },
      { label: "Handle Length", value: "Adjustable 55 inches" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Clean Home", "Spin Mop"]
  },
  {
    id: "tb-he-cl-2",
    name: "Foldable 3-Tier Clothes Drying Rack",
    slug: "foldable-3tier-clothes-drying-rack",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 12599,
    discountPrice: 8399,
    rating: 4.7,
    reviewCount: 390,
    stock: 30,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&auto=format&fit=crop&q=80",
    description: "Heavy duty stainless steel drying tree with expandable wings and shoe drying clips. Folds flat when not in use.",
    specs: [
      { label: "Drying Space", value: "48 Linear Feet" },
      { label: "Weight Capacity", value: "65 lbs" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Laundry Rack", "Space Saving"]
  },
  {
    id: "tb-he-cl-3",
    name: "Mesh Delicates Laundry Wash Bags (6-Pack)",
    slug: "mesh-delicates-laundry-wash-bags-6pack",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 4759,
    discountPrice: 2799,
    rating: 4.9,
    reviewCount: 820,
    stock: 110,
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&auto=format&fit=crop&q=80",
    description: "Protect fine clothing, bras, sweaters, and baby clothes from snagging, tangling, or tearing in washing machine.",
    specs: [
      { label: "Material", value: "Honeycomb Mesh with Auto-Lock Zipper" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Laundry Care", "Delicates"]
  },
  {
    id: "tb-he-cl-4",
    name: "Electric Lint Remover Fabric Shaver with LED Screen",
    slug: "electric-lint-remover-fabric-shaver",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 6999,
    discountPrice: 4479,
    rating: 4.8,
    reviewCount: 540,
    stock: 40,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=80",
    description: "Revive old sweaters, sofas, and blankets. 6-blade precision cutter head removes pills and fuzz safely.",
    specs: [
      { label: "Power", value: "USB-C Rechargeable 2000mAh" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Fabric Care", "Lint Shaver"]
  },
  {
    id: "tb-he-cl-5",
    name: "3-Compartment Laundry Sorter Cart on Wheels",
    slug: "3-compartment-laundry-sorter-cart",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 15399,
    discountPrice: 10359,
    rating: 4.7,
    reviewCount: 290,
    stock: 22,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&q=80",
    description: "Sort lights, darks, and colors effortlessly. Removable heavy-duty canvas bags with metal lifting handles.",
    specs: [
      { label: "Frame", value: "Powder Coated Steel with 4 Swivel Casters" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Laundry Sorter", "Organizer"]
  },
  {
    id: "tb-he-cl-6",
    name: "Ultra-Absorbent Microfiber Cleaning Cloths (24-Pack)",
    slug: "ultra-absorbent-microfiber-cleaning-cloths-24pack",
    category: "home-essentials",
    subcategory: "cleaning-laundry",
    price: 6150,
    discountPrice: 3919,
    rating: 4.9,
    reviewCount: 1350,
    stock: 85,
    image: "https://images.unsplash.com/photo-1585832770485-e68a5fc882c0?w=800&auto=format&fit=crop&q=80",
    description: "Lint-free, scratch-free multi-purpose cleaning towels for glass, counters, cars, and mirrors.",
    specs: [
      { label: "Size", value: "12” x 12” per towel" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Microfiber", "Cleaning Towels"]
  },

  // Subcategory: Home & Living (home-living)
  {
    id: "tb-he-hl-1",
    name: "Luxury Memory Foam Ergonomic Cervical Pillow",
    slug: "luxury-memory-foam-ergonomic-cervical-pillow",
    category: "home-essentials",
    subcategory: "home-living",
    price: 16799,
    discountPrice: 10919,
    rating: 4.8,
    reviewCount: 880,
    stock: 50,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    description: "Contoured orthopedic design relieves neck and shoulder stiffness for side, back, and stomach sleepers.",
    specs: [
      { label: "Core", value: "Slow Rebound Memory Foam" },
      { label: "Cover", value: "Breathable Cooling Bamboo Rayon" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Sleep", "Orthopedic", "Best Seller"]
  },
  {
    id: "tb-he-hl-2",
    name: "Boho Handcrafted Macrame Throw Blanket with Fringe",
    slug: "boho-handcrafted-macrame-throw-blanket",
    category: "home-essentials",
    subcategory: "home-living",
    price: 13999,
    discountPrice: 8959,
    rating: 4.7,
    reviewCount: 260,
    stock: 35,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-soft knit acrylic throw blanket adding cozy texture to your living room sofa or bedroom.",
    specs: [
      { label: "Size", value: "50” x 60”" },
      { label: "Care", value: "Machine Washable Gentle Cycle" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Cozy Home", "Decor"]
  },
  {
    id: "tb-he-hl-3",
    name: "Sunset Projection Lamp with App Color Customization",
    slug: "sunset-projection-lamp-app-control",
    category: "home-essentials",
    subcategory: "home-living",
    price: 8399,
    discountPrice: 5039,
    rating: 4.6,
    reviewCount: 640,
    stock: 45,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    description: "Create warm ambient light for mood lighting, photos, and bedroom aesthetic. 16 million colors via app.",
    specs: [
      { label: "Rotation", value: "180-Degree Adjustable Head" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Aesthetic", "Sunset Lamp"]
  },
  {
    id: "tb-he-hl-4",
    name: "Nordic Minimalist Ceramic Flower Vase Set (3-Piece)",
    slug: "nordic-minimalist-ceramic-flower-vase-set",
    category: "home-essentials",
    subcategory: "home-living",
    price: 12599,
    discountPrice: 8119,
    rating: 4.9,
    reviewCount: 310,
    stock: 20,
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800&auto=format&fit=crop&q=80",
    description: "Matte textured off-white ceramic vases designed for pampas grass, dried flowers, or fresh floral arrangements.",
    specs: [
      { label: "Material", value: "100% High-Fired Ceramic" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Nordic Decor", "Vase Set"]
  },
  {
    id: "tb-he-hl-5",
    name: "Ultra Soft Chenille Bath Mat Rug (24” x 36”)",
    slug: "ultra-soft-chenille-bath-mat-rug",
    category: "home-essentials",
    subcategory: "home-living",
    price: 6999,
    discountPrice: 4199,
    rating: 4.8,
    reviewCount: 520,
    stock: 60,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80",
    description: "Thick plush microfiber rug with non-slip PVC backing absorb water in seconds and dries quickly.",
    specs: [
      { label: "Backing", value: "Non-Skid Anti-Slip Rubber" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Bathroom", "Soft Mat"]
  },
  {
    id: "tb-he-hl-6",
    name: "Acoustic Wood Slat Wall Panels (2-Pack Decor)",
    slug: "acoustic-wood-slat-wall-panels",
    category: "home-essentials",
    subcategory: "home-living",
    price: 33599,
    discountPrice: 22399,
    rating: 4.9,
    reviewCount: 190,
    stock: 15,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    description: "Natural oak veneer acoustic sound-dampening wall cladding for luxury home theater or living room accent walls.",
    specs: [
      { label: "Dimensions", value: "94.5” x 12.6” per panel" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Accent Wall", "Luxury Living"]
  },

  // -------------------------------------------------------------
  // 3. HOME APPLIANCES (home-appliances)
  // -------------------------------------------------------------
  // Subcategory: Kitchen Appliances (kitchen-appliances)
  {
    id: "tb-ha-ka-1",
    name: "AirFry Pro 6.5QT Digital Stainless Steel Air Fryer",
    slug: "airfry-pro-65qt-digital-air-fryer",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 33599,
    discountPrice: 20999,
    rating: 4.9,
    reviewCount: 1250,
    stock: 55,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",
    description: "360° rapid hot air circulation cooks crisp fries and juicy chicken with up to 85% less oil. 10 touch presets.",
    specs: [
      { label: "Capacity", value: "6.5 Quarts (Serves 4-6)" },
      { label: "Power", value: "1700W High Speed" },
      { label: "Dishwasher Safe", value: "Nonstick Basket & Crisper Plate" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Best Seller", "Air Fryer", "Must Have"]
  },
  {
    id: "tb-ha-ka-2",
    name: "BaristaExpress 20-Bar Espresso Machine with Milk Frother",
    slug: "baristaexpress-20bar-espresso-machine",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 55999,
    discountPrice: 39199,
    rating: 4.8,
    reviewCount: 480,
    stock: 20,
    image: "https://images.unsplash.com/photo-1517668808822-9eaa02ae2a04?w=800&auto=format&fit=crop&q=80",
    description: "Italian 20-Bar pressure pump extracts rich crema espresso. Powerful steam wand crafts silky microfoam lattes.",
    specs: [
      { label: "Pressure", value: "20 Bar Italian Electromagnetic Pump" },
      { label: "Water Tank", value: "1.5L Removable Reservoir" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Coffee Maker", "Espresso"]
  },
  {
    id: "tb-ha-ka-3",
    name: "NutriBlend 1200W High-Speed Personal Countertop Blender",
    slug: "nutriblend-1200w-high-speed-personal-blender",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 22399,
    discountPrice: 13999,
    rating: 4.7,
    reviewCount: 710,
    stock: 40,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
    description: "Crush ice, frozen fruit, and tough greens in seconds. Includes two 32oz travel cups with sip-and-seal lids.",
    specs: [
      { label: "Motor", value: "1200W Peak Power" },
      { label: "Blades", value: "6-Leaf Extractor Stainless Steel" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Smoothie Blender", "Fitness"]
  },
  {
    id: "tb-ha-ka-4",
    name: "BakePro 4-Slice Stainless Steel Wide-Slot Toaster",
    slug: "bakepro-4slice-stainless-steel-toaster",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 15399,
    discountPrice: 9799,
    rating: 4.6,
    reviewCount: 320,
    stock: 28,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=80",
    description: "Extra wide 1.5” slots fit thick bagels and artisan breads. Dual independent controls for custom browning.",
    specs: [
      { label: "Browning Levels", value: "6 Shade Settings" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Toaster", "Breakfast"]
  },
  {
    id: "tb-ha-ka-5",
    name: "MultiCook 8QT 10-in-1 Electric Pressure Cooker",
    slug: "multicook-8qt-10in1-electric-pressure-cooker",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 36399,
    discountPrice: 25199,
    rating: 4.9,
    reviewCount: 920,
    stock: 32,
    image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800&auto=format&fit=crop&q=80",
    description: "Cook meals 70% faster. Functions as Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Yogurt Maker & Sauté Pan.",
    specs: [
      { label: "Capacity", value: "8 Quarts" },
      { label: "Safety", value: "11 Built-in Safety Features" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Pressure Cooker", "Quick Meals"]
  },
  {
    id: "tb-ha-ka-6",
    name: "Precision Temperature Gooseneck Electric Kettle",
    slug: "precision-temperature-gooseneck-electric-kettle",
    category: "home-appliances",
    subcategory: "kitchen-appliances",
    price: 19599,
    discountPrice: 12599,
    rating: 4.8,
    reviewCount: 450,
    stock: 35,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=800&auto=format&fit=crop&q=80",
    description: "Target exact brew temps for pour-over coffee and delicate teas. 100% food grade stainless steel interior.",
    specs: [
      { label: "Capacity", value: "0.9L (30 oz)" },
      { label: "Hold Temp", value: "60-Minute Keep Warm Function" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Tea Kettle", "Pour Over"]
  },

  // Subcategory: Cleaning Appliances (cleaning-appliances)
  {
    id: "tb-ha-ca-1",
    name: "RoboClean LiDAR Navigation Smart Robot Vacuum & Mop",
    slug: "roboclean-lidar-navigation-robot-vacuum-mop",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 97999,
    discountPrice: 64399,
    rating: 4.9,
    reviewCount: 560,
    stock: 18,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    description: "Precision LiDAR mapping, 4000Pa intense suction, automatic carpet detection, and custom zone cleaning via app.",
    specs: [
      { label: "Suction Power", value: "4000Pa Storm Suction" },
      { label: "Navigation", value: "3D LiDAR Laser Mapping" },
      { label: "Runtime", value: "Up to 150 Minutes" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Robot Vacuum", "Smart Tech"]
  },
  {
    id: "tb-ha-ca-2",
    name: "CycloneFlex Cordless Stick Vacuum Cleaner 30KPa",
    slug: "cycloneflex-cordless-stick-vacuum-cleaner",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 53199,
    discountPrice: 33599,
    rating: 4.8,
    reviewCount: 680,
    stock: 30,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80",
    description: "Featherlight 450W brushless motor vacuum with LED floor lights, anti-tangle V-brush, and 50-min runtime.",
    specs: [
      { label: "Suction", value: "30,000Pa Max" },
      { label: "Filtration", value: "5-Stage Sealed HEPA Filter" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Cordless Vacuum", "Lightweight"]
  },
  {
    id: "tb-ha-ca-3",
    name: "SteamPro Multi-Surface Handheld Steam Cleaner",
    slug: "steampro-multi-surface-handheld-steam-cleaner",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 16799,
    discountPrice: 10919,
    rating: 4.7,
    reviewCount: 340,
    stock: 25,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    description: "Chemical-free 221°F high pressure steam melts grime on tile grout, windows, upholstery, and stove tops.",
    specs: [
      { label: "Pressure", value: "3.5 Bar Steam Pressure" },
      { label: "Accessories", value: "9-Piece Cleaning Attachment Kit" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Steam Cleaner", "Chemical Free"]
  },
  {
    id: "tb-ha-ca-4",
    name: "SpotEraser Portable Carpet & Upholstery Spot Cleaner",
    slug: "spoteraser-portable-carpet-upholstery-cleaner",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 36399,
    discountPrice: 23799,
    rating: 4.8,
    reviewCount: 420,
    stock: 22,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    description: "Removes pet stains, mud, coffee, and spills from couch fabrics, auto interior seats, and area rugs.",
    specs: [
      { label: "Tank Capacity", value: "48 oz Clean Water Tank" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Carpet Cleaner", "Pet Messes"]
  },
  {
    id: "tb-ha-ca-5",
    name: "PowerScrub Electric Cordless Spin Scrubber Brush",
    slug: "powerscrub-electric-cordless-spin-scrubber",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 13999,
    discountPrice: 8959,
    rating: 4.6,
    reviewCount: 512,
    stock: 45,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop&q=80",
    description: "Extendable long pole spin brush scrubs shower tiles, tubs, and floors without bending your back.",
    specs: [
      { label: "Speed", value: "Dual Speed (300 / 400 RPM)" },
      { label: "Heads", value: "4 Interchangeable Brush Heads" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Bathroom Scrubber", "Easy Clean"]
  },
  {
    id: "tb-ha-ca-6",
    name: "UltraSonic Jewelry & Glasses Cleaner Machine",
    slug: "ultrasonic-jewelry-glasses-cleaner-machine",
    category: "home-appliances",
    subcategory: "cleaning-appliances",
    price: 11199,
    discountPrice: 6999,
    rating: 4.7,
    reviewCount: 290,
    stock: 35,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
    description: "45,000Hz sound wave micro-bubbles clean delicate jewelry, watches, retainers, and spectacles without damage.",
    specs: [
      { label: "Frequency", value: "45,000 Hz Ultrasonic" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Jewelry Cleaner", "Sonic Tech"]
  },

  // Subcategory: Cooling & Heating (cooling-heating)
  {
    id: "tb-ha-ch-1",
    name: "PureBreeze True HEPA Air Purifier for Large Rooms",
    slug: "purebreeze-true-hepa-air-purifier",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 39199,
    discountPrice: 25199,
    rating: 4.9,
    reviewCount: 940,
    stock: 40,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    description: "3-stage H13 True HEPA filter captures 99.97% of smoke, pet dander, pollen, and odor. Quiet sleep mode at 22dB.",
    specs: [
      { label: "CADR Rating", value: "240 m³/h (Covers up to 1000 sq.ft)" },
      { label: "Filter Type", value: "H13 True HEPA + Activated Carbon" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Air Purifier", "Allergy Relief"]
  },
  {
    id: "tb-ha-ch-2",
    name: "WindTower 42” Oscillating Bladeless Cooling Fan",
    slug: "windtower-42inch-oscillating-bladeless-cooling-fan",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 25199,
    discountPrice: 16799,
    rating: 4.7,
    reviewCount: 460,
    stock: 28,
    image: "https://images.unsplash.com/photo-1618941709602-92849f611905?w=800&auto=format&fit=crop&q=80",
    description: "Quiet 90° wide oscillation tower fan with LED touch display, remote control, and 12-hour shutoff timer.",
    specs: [
      { label: "Modes", value: "Normal, Natural Breeze, Sleep Quiet" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Tower Fan", "Cooling"]
  },
  {
    id: "tb-ha-ch-3",
    name: "WarmWarm Ceramic Oscillating Space Heater 1500W",
    slug: "warmwarm-ceramic-oscillating-space-heater-1500w",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 19599,
    discountPrice: 12599,
    rating: 4.8,
    reviewCount: 610,
    stock: 35,
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop&q=80",
    description: "Fast 2-second PTC ceramic heating with tip-over auto switch and overheat protection. Ideal for bedroom & office.",
    specs: [
      { label: "Power Settings", value: "1500W High / 900W Low / Fan Only" },
      { label: "Safety", value: "ETL Certified Tip-Over & Overheat Guard" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Heater", "Cozy Winter"]
  },
  {
    id: "tb-ha-ch-4",
    name: "FrostAir 3-in-1 Evaporative Portable Air Cooler",
    slug: "frostair-3-in-1-evaporative-portable-air-cooler",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 27999,
    discountPrice: 18199,
    rating: 4.6,
    reviewCount: 310,
    stock: 20,
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&auto=format&fit=crop&q=80",
    description: "Swamp cooler fan with ice boxes and 5L water tank cools room air quickly without heavy energy consumption.",
    specs: [
      { label: "Tank", value: "5 Liters with Top Fill" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Air Cooler", "Summer"]
  },
  {
    id: "tb-ha-ch-5",
    name: "DryHome 35-Pint Smart Dehumidifier with Drain Hose",
    slug: "dryhome-35pint-smart-dehumidifier",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 55999,
    discountPrice: 40599,
    rating: 4.9,
    reviewCount: 280,
    stock: 12,
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80",
    description: "Extracts up to 35 pints of moisture per day from damp basements and bathrooms. Automatic target humidity control.",
    specs: [
      { label: "Coverage", value: "Up to 3,000 sq.ft" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Dehumidifier", "Basement Care"]
  },
  {
    id: "tb-ha-ch-6",
    name: "ClipBreeze USB Rechargeable Battery Desk Fan",
    slug: "clipbreeze-usb-rechargeable-battery-desk-fan",
    category: "home-appliances",
    subcategory: "cooling-heating",
    price: 6999,
    discountPrice: 4199,
    rating: 4.7,
    reviewCount: 490,
    stock: 60,
    image: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&auto=format&fit=crop&q=80",
    description: "Sturdy clamp fan attaches to stroller, office desk, or tent pole. 10,000mAh battery runs up to 24 hours.",
    specs: [
      { label: "Battery", value: "10,000 mAh Power Bank Function" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Clip Fan", "Portable"]
  },

  // Subcategory: Personal Care Appliances (personal-care-appliances)
  {
    id: "tb-ha-pca-1",
    name: "IonicShine 1875W Professional Negative Ion Hair Dryer",
    slug: "ionicshine-1875w-professional-hair-dryer",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 19599,
    discountPrice: 12039,
    rating: 4.8,
    reviewCount: 780,
    stock: 45,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    description: "High speed AC motor dries hair 50% faster while blue light negative ions lock in moisture to eliminate frizz.",
    specs: [
      { label: "Motor", value: "1875W Professional AC Motor" },
      { label: "Attachments", value: "Concentrator Nozzle & Diffuser Included" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Hair Dryer", "Hair Care"]
  },
  {
    id: "tb-ha-pca-2",
    name: "AquaFloss Cordless Water Dental Flosser Teeth Cleaner",
    slug: "aquafloss-cordless-water-dental-flosser",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 13999,
    discountPrice: 8399,
    rating: 4.9,
    reviewCount: 1100,
    stock: 65,
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&auto=format&fit=crop&q=80",
    description: "1800 pulses/min water jet removes 99.9% of plaque between teeth. IPX7 waterproof for shower use.",
    specs: [
      { label: "Water Reservoir", value: "300ml Removable Tank" },
      { label: "Tips Included", value: "4 Interchangeable Nozzles" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Dental Care", "Oral Health"]
  },
  {
    id: "tb-ha-pca-3",
    name: "SilkSmooth 2-in-1 Ceramic Hair Straightener & Curler",
    slug: "silksmooth-2-in-1-ceramic-hair-straightener-curler",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 15399,
    discountPrice: 9799,
    rating: 4.7,
    reviewCount: 420,
    stock: 30,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&auto=format&fit=crop&q=80",
    description: "Floating tourmaline ceramic plates heat up in 15 seconds. 5 adjustable heat levels up to 450°F.",
    specs: [
      { label: "Plates", value: "1-Inch Tourmaline Ceramic" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Styling Iron", "Beauty"]
  },
  {
    id: "tb-ha-pca-4",
    name: "PrecisionGroom Waterproof Electric Men's Body Trimmer",
    slug: "precisiongroom-waterproof-electric-body-trimmer",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 12879,
    discountPrice: 8119,
    rating: 4.8,
    reviewCount: 630,
    stock: 40,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80",
    description: "Skin-safe ceramic blades prevent nicks and tugging. 100% washable ergonomic grooming shaver for face and body.",
    specs: [
      { label: "Blade", value: "Rust-Resistant Ceramic Guard" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Grooming", "Trimmer"]
  },
  {
    id: "tb-ha-pca-5",
    name: "SonicWhite Ultrasonic Electric Toothbrush with 8 Brush Heads",
    slug: "sonicwhite-ultrasonic-electric-toothbrush",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 11199,
    discountPrice: 6999,
    rating: 4.9,
    reviewCount: 890,
    stock: 70,
    image: "https://images.unsplash.com/photo-1559671980-b55822d28d8b?w=800&auto=format&fit=crop&q=80",
    description: "40,000 vibrations per minute sonic motor whitening toothbrush. 2-minute smart timer and 2 years of brush heads.",
    specs: [
      { label: "Vibrations", value: "40,000 VPM" },
      { label: "Battery", value: "30 Days per 4-hour charge" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Sonic Toothbrush", "Best Seller"]
  },
  {
    id: "tb-ha-pca-6",
    name: "DeepTissue Percussion Muscle Massage Gun",
    slug: "deeptissue-percussion-muscle-massage-gun",
    category: "home-appliances",
    subcategory: "personal-care-appliances",
    price: 25199,
    discountPrice: 15399,
    rating: 4.8,
    reviewCount: 740,
    stock: 25,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    description: "Relieves muscle soreness and stiffness. 30 adjustable speeds and 6 custom silicone massage heads.",
    specs: [
      { label: "Amplitude", value: "12mm Deep Tissue" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Massage Gun", "Recovery"]
  },

  // -------------------------------------------------------------
  // 4. TOYS (toys)
  // -------------------------------------------------------------
  // Subcategory: Educational Toys (educational-toys)
  {
    id: "tb-t-et-1",
    name: "RoboCoder STEM Programmable Robot Toy for Kids",
    slug: "robocoder-stem-programmable-robot-toy",
    category: "toys",
    subcategory: "educational-toys",
    price: 19599,
    discountPrice: 12599,
    rating: 4.9,
    reviewCount: 390,
    stock: 35,
    image: "https://images.unsplash.com/photo-1535378273068-9bb67d5bf6c1?w=800&auto=format&fit=crop&q=80",
    description: "Teaches block-based coding, problem solving, and robotics through interactive games, obstacles, and voice commands.",
    specs: [
      { label: "Age Group", value: "Ages 6 to 12" },
      { label: "Connectivity", value: "Bluetooth App & Remote" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["STEM", "Coding Robot", "Top Gift"]
  },
  {
    id: "tb-t-et-2",
    name: "MicroDiscovery 1200x LED Beginner Science Microscope Kit",
    slug: "microdiscovery-1200x-led-science-microscope-kit",
    category: "toys",
    subcategory: "educational-toys",
    price: 11199,
    discountPrice: 7559,
    rating: 4.7,
    reviewCount: 280,
    stock: 40,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
    description: "Explore the microscopic world! Comes with prepared specimen slides, blank slides, cover slips, and smartphone holder.",
    specs: [
      { label: "Magnification", value: "100x / 400x / 1200x" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Microscope", "Science Kit"]
  },
  {
    id: "tb-t-et-3",
    name: "GeoWorld Magnetic World Globe with LED Night Light",
    slug: "geoworld-magnetic-world-globe-led",
    category: "toys",
    subcategory: "educational-toys",
    price: 12879,
    discountPrice: 8399,
    rating: 4.8,
    reviewCount: 210,
    stock: 25,
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80",
    description: "2-in-1 illuminated globe displays country borders by day and constellation stars by night.",
    specs: [
      { label: "Diameter", value: "8 Inches (20cm)" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Geography", "Globe"]
  },
  {
    id: "tb-t-et-4",
    name: "SolarBot 14-in-1 DIY Solar Powered Robot Building Kit",
    slug: "solarbot-14in1-diy-solar-powered-robot-kit",
    category: "toys",
    subcategory: "educational-toys",
    price: 9799,
    discountPrice: 6150,
    rating: 4.6,
    reviewCount: 310,
    stock: 50,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    description: "Build 14 different working robots that walk, crawl, and float using direct solar power — no batteries needed!",
    specs: [
      { label: "Power", value: "Solar Panel Powered" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Solar Power", "DIY Kit"]
  },
  {
    id: "tb-t-et-5",
    name: "MathGenius Electronic Montessori Math Learning Tablet",
    slug: "mathgenius-electronic-montessori-math-tablet",
    category: "toys",
    subcategory: "educational-toys",
    price: 6999,
    discountPrice: 4479,
    rating: 4.8,
    reviewCount: 180,
    stock: 60,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    description: "Fun timed math practice games for addition, subtraction, multiplication, and division with immediate audio feedback.",
    specs: [
      { label: "Target Age", value: "Ages 4 to 10" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Math Game", "Learning"]
  },
  {
    id: "tb-t-et-6",
    name: "AnatomyKid 3D Human Body Model with Removable Organs",
    slug: "anatomykid-3d-human-body-model",
    category: "toys",
    subcategory: "educational-toys",
    price: 8399,
    discountPrice: 5319,
    rating: 4.7,
    reviewCount: 145,
    stock: 30,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    description: "Hands-on biological learning kit with 11 removable realistic body parts and bones guide.",
    specs: [
      { label: "Height", value: "11 Inches Tall" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Anatomy", "Biology"]
  },

  // Subcategory: Remote Control Toys (remote-control-toys)
  {
    id: "tb-t-rc-1",
    name: "HyperSpeed 4WD All-Terrain High-Speed RC Monster Truck",
    slug: "hyperspeed-4wd-high-speed-rc-monster-truck",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 25199,
    discountPrice: 16799,
    rating: 4.9,
    reviewCount: 540,
    stock: 28,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80",
    description: "Reaches 45 km/h! Oil-filled shocks, durable alloy chassis, and 2.4GHz remote control for off-road mud, grass & rocks.",
    specs: [
      { label: "Top Speed", value: "45 km/h (28 mph)" },
      { label: "Scale", value: "1:16 High-Scale Monster Truck" },
      { label: "Batteries", value: "2x 7.4V 1500mAh Rechargeable Packs" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["RC Truck", "Off-Road", "High Speed"]
  },
  {
    id: "tb-t-rc-2",
    name: "SkyHawk 4K Dual Camera Foldable Mini Drone",
    slug: "skyhawk-4k-dual-camera-foldable-mini-drone",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 22399,
    discountPrice: 13999,
    rating: 4.8,
    reviewCount: 670,
    stock: 40,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    description: "One-key takeoff/landing, optical flow altitude hold, gesture photo controls, and 360° stunt flips.",
    specs: [
      { label: "Camera", value: "4K HD FPV Wide Angle Lens" },
      { label: "Flight Time", value: "30 Mins (2 modular batteries included)" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["4K Drone", "Mini Drone"]
  },
  {
    id: "tb-t-rc-3",
    name: "StuntSpinner 360 Gesture Sensor RC Stunt Car",
    slug: "stuntspinner-360-gesture-sensor-rc-stunt-car",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 13999,
    discountPrice: 8959,
    rating: 4.7,
    reviewCount: 380,
    stock: 35,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
    description: "Control driving direction using hand gestures! Double-sided driving, 360° spins, cool music, and LED light show.",
    specs: [
      { label: "Controls", value: "Gesture Watch Controller + 2.4G Remote" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Gesture Control", "Stunt Car"]
  },
  {
    id: "tb-t-rc-4",
    name: "DeepSea 20 MPH High-Speed RC Speedboat for Pools",
    slug: "deepsea-20mph-high-speed-rc-speedboat",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 16799,
    discountPrice: 10919,
    rating: 4.8,
    reviewCount: 220,
    stock: 20,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    description: "Waterproof dual-motor racing boat with self-righting capsize recovery and low-battery signal alarm.",
    specs: [
      { label: "Speed", value: "20 MPH Water Racing" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["RC Boat", "Pool Toys"]
  },
  {
    id: "tb-t-rc-5",
    name: "AeroJet 3-Channel Remote Control Fighter Jet Aircraft",
    slug: "aerojet-3channel-rc-fighter-jet-aircraft",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 18199,
    discountPrice: 12039,
    rating: 4.6,
    reviewCount: 190,
    stock: 18,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4eaa16746?w=800&auto=format&fit=crop&q=80",
    description: "Made from crash-resistant EPP foam material with built-in 6-axis gyro stabilizer for smooth beginner flights.",
    specs: [
      { label: "Material", value: "Flexible EPP Foam" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["RC Airplane", "Flying Toy"]
  },
  {
    id: "tb-t-rc-6",
    name: "RoboDino Intelligent Touch-Sensitive RC Dinosaur",
    slug: "robodino-intelligent-touch-sensitive-rc-dinosaur",
    category: "toys",
    subcategory: "remote-control-toys",
    price: 15399,
    discountPrice: 10079,
    rating: 4.8,
    reviewCount: 310,
    stock: 25,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80",
    description: "Walks, roars, dances, and shoots mist from its mouth! Program custom actions and touch head for interactive reactions.",
    specs: [
      { label: "Features", value: "Water Mist Spray, LED Eyes, Sound Effects" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Dinosaur Toy", "Interactive"]
  },

  // Subcategory: Games & Puzzles (games-puzzles)
  {
    id: "tb-t-gp-1",
    name: "ArchitectX 1000-Piece 3D Wooden Mechanical Clock Puzzle",
    slug: "architectx-1000pc-3d-wooden-mechanical-clock-puzzle",
    category: "toys",
    subcategory: "games-puzzles",
    price: 13999,
    discountPrice: 9239,
    rating: 4.9,
    reviewCount: 410,
    stock: 30,
    image: "https://images.unsplash.com/photo-1606167668584-78701c575938?w=800&auto=format&fit=crop&q=80",
    description: "Precision laser-cut basswood pieces form a fully functioning mechanical pendulum wall clock with wind-up spring.",
    specs: [
      { label: "Pieces", value: "340 Laser-Cut Wood Components" },
      { label: "Assembly Time", value: "Approx. 5-7 Hours" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["3D Puzzle", "Wood Craft"]
  },
  {
    id: "tb-t-gp-2",
    name: "QuestMaster Fantasy Strategy Board Game",
    slug: "questmaster-fantasy-strategy-board-game",
    category: "toys",
    subcategory: "games-puzzles",
    price: 16799,
    discountPrice: 11199,
    rating: 4.9,
    reviewCount: 650,
    stock: 22,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop&q=80",
    description: "Cooperative dungeon crawling campaign game with detailed miniature figures, modular map tiles, and custom dice.",
    specs: [
      { label: "Players", value: "1 to 5 Players" },
      { label: "Play Time", value: "60-90 Minutes" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Board Game", "Strategy"]
  },
  {
    id: "tb-t-gp-3",
    name: "SpeedCube Pro Magnetic 3x3 Speed Cube",
    slug: "speedcube-pro-magnetic-3x3-speed-cube",
    category: "toys",
    subcategory: "games-puzzles",
    price: 5599,
    discountPrice: 3639,
    rating: 4.8,
    reviewCount: 940,
    stock: 80,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    description: "Smooth magnetic positioning, adjustable elasticity, and frosted stickerless surface for competition speedcubers.",
    specs: [
      { label: "Magnets", value: "48 Factory Inserted Magnets" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Speed Cube", "Puzzle"]
  },
  {
    id: "tb-t-gp-4",
    name: "PartyClash Fast-Paced Card Game for Families",
    slug: "partyclash-fast-paced-family-card-game",
    category: "toys",
    subcategory: "games-puzzles",
    price: 6999,
    discountPrice: 4199,
    rating: 4.8,
    reviewCount: 520,
    stock: 65,
    image: "https://images.unsplash.com/photo-1563941433-b6a0946f75de?w=800&auto=format&fit=crop&q=80",
    description: "Hilarious 15-minute game of strategy, sabotage, and luck that is easy to learn for kids and adults alike.",
    specs: [
      { label: "Age Group", value: "Ages 7+" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Party Game", "Family Fun"]
  },
  {
    id: "tb-t-gp-5",
    name: "GravityMaze Marble Run Brain Teaser Logic Game",
    slug: "gravitymaze-marble-run-logic-game",
    category: "toys",
    subcategory: "games-puzzles",
    price: 9799,
    discountPrice: 6439,
    rating: 4.7,
    reviewCount: 380,
    stock: 35,
    image: "https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=800&auto=format&fit=crop&q=80",
    description: "60 beginner to expert challenge cards. Build marble maze towers to visually steer the marble to the target.",
    specs: [
      { label: "Includes", value: "Grid, 9 Towers, Target Piece & 3 Marbles" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Logic Game", "Marble Run"]
  },
  {
    id: "tb-t-gp-6",
    name: "RetroArcade Handheld Console with 500 Classic Games",
    slug: "retroarcade-handheld-console-500-games",
    category: "toys",
    subcategory: "games-puzzles",
    price: 8399,
    discountPrice: 5039,
    rating: 4.6,
    reviewCount: 710,
    stock: 50,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=80",
    description: "Nostalgic 3.0-inch color screen handheld loaded with 8-bit retro arcade games. TV AV output cable included.",
    specs: [
      { label: "Battery", value: "1020mAh Rechargeable Lithium" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Retro Gaming", "Handheld"]
  },

  // Subcategory: Creative & Outdoor Play (creative-outdoor-play)
  {
    id: "tb-t-cop-1",
    name: "MagnaTiles 100-Piece 3D Magnetic Building Blocks Set",
    slug: "magnatiles-100piece-3d-magnetic-building-blocks",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 25199,
    discountPrice: 16799,
    rating: 4.9,
    reviewCount: 1120,
    stock: 45,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80",
    description: "Vibrant transparent geometric tiles with strong rivets and safe food-grade ABS plastic for endless creative castles & towers.",
    specs: [
      { label: "Piece Count", value: "100 Translucent Tiles & Shapes" },
      { label: "Safety", value: "BPA-Free, Phthalate-Free, Ultrasonic Welded" }
    ],
    isFlashDeal: true,
    isFeatured: true,
    tags: ["Building Tiles", "Top Rated"]
  },
  {
    id: "tb-t-cop-2",
    name: "BubbleBlaster Automatic 69-Hole LED Bubble Gun",
    slug: "bubbleblaster-automatic-69hole-led-bubble-gun",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 8399,
    discountPrice: 5039,
    rating: 4.8,
    reviewCount: 840,
    stock: 60,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
    description: "Fires thousands of colorful illuminated bubbles per minute! Complete with rechargeable battery & bubble solution.",
    specs: [
      { label: "Output", value: "Over 5,000 Bubbles/Min" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Bubble Gun", "Summer Fun"]
  },
  {
    id: "tb-t-cop-3",
    name: "ArtisCraft 150-Piece Deluxe Wooden Art Supply Set",
    slug: "artiscraft-150piece-deluxe-wooden-art-set",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 11199,
    discountPrice: 7279,
    rating: 4.7,
    reviewCount: 390,
    stock: 30,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80",
    description: "Housed in a gorgeous mahogany wooden case with drawer. Includes oil pastels, colored pencils, watercolors, and sketch pads.",
    specs: [
      { label: "Case", value: "Mahogany Wood Case with Latches" }
    ],
    isFlashDeal: false,
    isFeatured: true,
    tags: ["Art Kit", "Creative"]
  },
  {
    id: "tb-t-cop-4",
    name: "HydroBlast Motorized Electric Water Gun 32ft Range",
    slug: "hydroblast-motorized-electric-water-gun",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 9799,
    discountPrice: 6439,
    rating: 4.8,
    reviewCount: 460,
    stock: 40,
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&auto=format&fit=crop&q=80",
    description: "Automatic electric burst water blaster with clear water magazine and quick USB rechargeable power.",
    specs: [
      { label: "Firing Distance", value: "Up to 32 Feet (10 meters)" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Water Gun", "Outdoor"]
  },
  {
    id: "tb-t-cop-5",
    name: "KinetiClay 3lb Hydrophobic Play Sand Castle Kit",
    slug: "kineticlay-3lb-hydrophobic-play-sand-kit",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 6999,
    discountPrice: 4479,
    rating: 4.9,
    reviewCount: 580,
    stock: 50,
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
    description: "Magical moldable sensory sand that sticks only to itself, never dries out, and comes with inflatable play tray & molds.",
    specs: [
      { label: "Sand Weight", value: "3 lbs (1.36 kg) Non-Toxic Sand" }
    ],
    isFlashDeal: false,
    isFeatured: false,
    tags: ["Sensory Play", "Kinetic Sand"]
  },
  {
    id: "tb-t-cop-6",
    name: "GlowGlide LED Light-Up Adjustable Folding Scooter",
    slug: "glowglide-led-light-up-folding-scooter",
    category: "toys",
    subcategory: "creative-outdoor-play",
    price: 13999,
    discountPrice: 9239,
    rating: 4.8,
    reviewCount: 370,
    stock: 25,
    image: "https://images.unsplash.com/photo-1572111504021-46a7c81093cc?w=800&auto=format&fit=crop&q=80",
    description: "Lean-to-steer 3-wheel kick scooter with battery-free motion powered flashing light wheels and 4 height adjustments.",
    specs: [
      { label: "Max Weight", value: "110 lbs (50 kg)" }
    ],
    isFlashDeal: true,
    isFeatured: false,
    tags: ["Scooter", "LED Wheels"]
  }
];
