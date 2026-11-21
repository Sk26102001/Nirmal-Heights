export interface Amenity {
  id: string;
  name: string;
  category: 'wellness' | 'sports' | 'leisure' | 'convenience';
  iconName: string;
  description: string;
  image: string;
}

export interface Residence {
  id: string;
  type: string;
  name: string;
  carpetArea: string;
  balconies: string;
  features: string[];
  image: string;
  bentoSpan?: string;
}

export interface Partner {
  name: string;
  role: string;
  description: string;
  logo: string;
  badge?: string;
}

export interface LocationItem {
  name: string;
  distance: string;
  time: string;
  category: 'transit' | 'heritage' | 'education' | 'lifestyle';
  icon: string;
}

export interface FloorPlanItem {
  id: string;
  tower: 'Tower A' | 'Tower B' | 'Site Plan';
  title: string;
  type: string;
  configuration: string;
  salableArea: string;
  reraCarpetArea: string;
  balconyArea: string;
  coveredArea: string;
  facing: string;
  image: string;
  details: string;
}

export const PROJECT_DETAILS = {
  name: "Kashi Nirmal Heights",
  tagline: "A Symphony of Design, Luxury & Timeless Sophistication",
  legacyQuote: "A New Legacy Begins in Varanasi. A New Address. A New Horizon. A New Era of Luxury.",
  inspirationQuote: "Designed to Inspire. Crafted to Endure.",
  subheading: "Full paid up, freehold land, allotted by VDA, in the first government planned township of Varanasi, Transport Nagar.",
  location: "Transport Nagar, NH-19 Highway, Varanasi, Uttar Pradesh",
  status: "VDA Approved • Full Paid-Up Freehold Land",
  township: "First Government Planned Township of Varanasi",
  architect: "Architect Hafeez Contractor",
  principalArchitect: "ACPL Consultant",
  qualityManagement: "TQ Cert (A TATA Enterprise)",
  structuralVetting: "IIT (Indian Institute of Technology)",
  configurations: ["2 BHK Luxury (1395 SQ.FT.)", "3 BHK Premium (1695 & 1995 SQ.FT.)", "4 BHK Royal (2395 & 2825 SQ.FT.)"],
  editorial: {
    hero: "A home at Kashi Nirmal Heights is not simply a residence - it is a statement of timeless sophistication and enduring elegance.",
    excellence: "Kashi Nirmal Heights embodies a new standard of architectural excellence. Every residence is meticulously curated with elegant proportions, exquisite materials, and exceptional craftsmanship, creating spaces that exude understated luxury.",
    sunlight: "Sunlight flows effortlessly through expansive interiors, illuminating refined textures, bespoke finishes, and thoughtfully crafted details. From grand living spaces to every carefully considered corner, Kashi Nirmal Heights is designed to elevate everyday living into an extraordinary experience."
  }
};

export const PARTNERS: Partner[] = [
  {
    name: "Architect Hafeez Contractor",
    role: "Project Architect",
    description: "India's legendary Padma Bhushan architect renowned for creating iconic skylines across the globe with over 40 years of architectural distinction.",
    logo: "/images/assets/partner_hafeez.png",
    badge: "40 Years of Distinction",
  },
  {
    name: "ACPL Consultant",
    role: "Principal Architect",
    description: "Leading architectural consulting firm delivering sustainable, modern engineering excellence and comprehensive urban planning solutions.",
    logo: "/images/assets/partner_acpl.png",
    badge: "Principal Consultant",
  },
  {
    name: "TQ Cert Services",
    role: "Construction Quality Management",
    description: "A wholly owned TATA Enterprise ensuring stringent quality assurance, structural durability, and world-class building benchmarks.",
    logo: "/images/assets/partner_tqcert.png",
    badge: "A TATA Enterprise",
  },
  {
    name: "IIT (Indian Institute of Technology)",
    role: "Structural Vetting & Wind Tunnel Testing",
    description: "Premier national technical institute conducting advanced seismic analysis, structural load vetting, and wind tunnel aerodynamic testing.",
    logo: "/images/assets/partner_iit.png",
    badge: "National Excellence",
  },
];

export const RESIDENCES_DATA: Residence[] = [
  {
    id: "living-room",
    type: "3 & 4 BHK",
    name: "Grand Living & Dining Salon",
    carpetArea: "Double-height expansive living area",
    balconies: "Panoramic running sundeck balcony",
    features: [
      "Floor-to-ceiling soundproof aluminium glazing",
      "Italian marble & premium vitrified finish",
      "Concealed mood lighting & false ceiling",
    ],
    image: "/images/assets/residence_living.jpg",
    bentoSpan: "col-span-12 lg:col-span-6 row-span-2",
  },
  {
    id: "master-bedroom",
    type: "Master Suite",
    name: "Presidential Master Suite",
    carpetArea: "Expansive private master suite",
    balconies: "Private morning coffee deck",
    features: [
      "Imported laminated wooden flooring",
      "Walk-in wardrobe vestibule",
      "Ensuite bathroom with premium CP fittings",
    ],
    image: "/images/assets/bedroom_master_luxury.jpg",
    bentoSpan: "col-span-12 sm:col-span-6 lg:col-span-3 row-span-1",
  },
  {
    id: "guest-bedroom",
    type: "2 & 3 BHK",
    name: "Serene Balcony Deck & Poolside View",
    carpetArea: "Expansive panoramic sit-out deck",
    balconies: "Toughened glass railing overlooking pool",
    features: [
      "Unobstructed views over swimming pool & gardens",
      "Seamless indoor-outdoor entertaining flow",
      "All-weather outdoor wooden deck finish",
    ],
    image: "/images/assets/balcony_deck_luxury.jpg",
    bentoSpan: "col-span-12 sm:col-span-6 lg:col-span-3 row-span-1",
  },
  {
    id: "piano-salon",
    type: "Music & Salon",
    name: "Grand Piano Salon & Cultural Lounge",
    carpetArea: "Acoustic music salon & library retreat",
    balconies: "Panoramic running sundeck balcony",
    features: [
      "Opulent white grand piano acoustic recital salon",
      "Floor-to-ceiling French drapes & bespoke classical finishes",
      "Italian marble flooring & curated artistic wall paneling",
    ],
    image: "/images/assets/residence_piano_salon.jpg",
    bentoSpan: "col-span-12 lg:col-span-3 row-span-2",
  },
];

export const AMENITIES_LIST: Amenity[] = [
  {
    id: "pool",
    name: "Infinity-Edge Swimming Pool & Kids Pool",
    category: "leisure",
    iconName: "Waves",
    description: "Resort-style temperature-controlled swimming pool with private cabanas and dedicated kids splash pool overlooking landscaped courtyards.",
    image: "/images/assets/amenity_swimming_pool.jpg",
  },
  {
    id: "clubhouse",
    name: "Grand Club Royale & Dining Banquet",
    category: "leisure",
    iconName: "Home",
    description: "A palatial multi-storey social haven featuring private screening lounge, banquet dining salon, and coffee lounge.",
    image: "/images/assets/amenity_club_dining.jpg",
  },
  {
    id: "gym",
    name: "State-of-the-Art Gymnasium & Fitness",
    category: "wellness",
    iconName: "Dumbbell",
    description: "Fully equipped fitness studio featuring biomechanical cardio machines, free weights, spinning studio, and crossfit turf.",
    image: "/images/assets/amenity_gymnasium.jpg",
  },
  {
    id: "yoga",
    name: "Zen Meditation & Yoga Pavilion",
    category: "wellness",
    iconName: "Sun",
    description: "Tranquil cedarwood studio and open-air lawn deck surrounded by aromatic herbs and water bodies for spiritual rejuvenation.",
    image: "/images/assets/amenity_yoga_zen.jpg",
  },
  {
    id: "gardens",
    name: "Aerobic Jogging Track & Manicured Gardens",
    category: "wellness",
    iconName: "Trees",
    description: "Meticulously curated green pathways, botanical gardens, shaded tree boulevard, reflexology tracks, and open lush lawns.",
    image: "/images/assets/amenity_jogging_track.jpg",
  },
  {
    id: "sports-courts",
    name: "Championship Tennis Court Arena",
    category: "sports",
    iconName: "Trophy",
    description: "Full-sized floodlit tennis court, international tournament grade synthetic surface, and multi-sport recreation turf.",
    image: "/images/assets/amenity_tennis_court.jpg",
  },
  {
    id: "cricket",
    name: "Floodlit Cricket Net Practice Pitch",
    category: "sports",
    iconName: "Trophy",
    description: "Dedicated enclosed cricket net practice pitch with high-lux floodlighting and artificial turf for round-the-clock training.",
    image: "/images/assets/amenity_cricket_pitch.jpg",
  },
  {
    id: "basketball",
    name: "Half Basketball & Sports Turf",
    category: "sports",
    iconName: "Trophy",
    description: "Dedicated basketball court with professional hoop and markings, surrounded by landscaped green buffers.",
    image: "/images/assets/amenity_basketball.jpg",
  },
  {
    id: "kids-play",
    name: "Kids Play Kingdom & Roller Skating",
    category: "leisure",
    iconName: "Smile",
    description: "Safe rubberised indoor & outdoor play park with climbing structures, sand pit, swings, and dedicated roller skating track.",
    image: "/images/assets/amenity_kids_play.jpg",
  },
  {
    id: "billiards",
    name: "Billiards, Snooker & Indoor Gaming",
    category: "leisure",
    iconName: "Gamepad2",
    description: "Tournament size snooker tables, table tennis arena, foosball lounge, and card room overlooking lush gardens.",
    image: "/images/assets/amenity_billiards.jpg",
  },
  {
    id: "spa-sauna",
    name: "Swedish Cedarwood Sauna & Luxury Spa",
    category: "wellness",
    iconName: "Sparkles",
    description: "Authentic dry Swedish sauna, hydrotherapy treatment suites, and grooming parlours for complete physical revitalisation.",
    image: "/images/assets/amenity_sauna_spa.jpg",
  },
  {
    id: "entrance-portal",
    name: "Grand Entrance Security Portal",
    category: "convenience",
    iconName: "Shield",
    description: "Illuminated architectural gate canopy, 24/7 security cabins, RFID boom barriers, and biometric visitor control.",
    image: "/images/assets/amenity_entrance_portal.jpg",
  },
];

// All 17 Verified Destinations & Travel Times directly from Authentic Brochure Spread 14
export const LOCATION_CONNECTIVITY: LocationItem[] = [
  {
    name: "NH-19 (Varanasi-Prayagraj Highway)",
    distance: "5 KM",
    time: "10 MIN",
    category: "transit",
    icon: "Compass",
  },
  {
    name: "Schools & Hospitals",
    distance: "Within 2-5 KM",
    time: "5-10 MIN",
    category: "lifestyle",
    icon: "Shield",
  },
  {
    name: "Mahmoorganj",
    distance: "6 KM",
    time: "15 MIN",
    category: "lifestyle",
    icon: "Building2",
  },
  {
    name: "Pandeypur",
    distance: "6 KM",
    time: "15 MIN",
    category: "lifestyle",
    icon: "Navigation",
  },
  {
    name: "Varanasi Cantt Railway Station",
    distance: "7 KM",
    time: "15 MIN",
    category: "transit",
    icon: "Train",
  },
  {
    name: "Sigra Commercial District",
    distance: "7 KM",
    time: "15 MIN",
    category: "lifestyle",
    icon: "Building2",
  },
  {
    name: "Banaras Railway Station",
    distance: "8 KM",
    time: "20 MIN",
    category: "transit",
    icon: "Train",
  },
  {
    name: "Varanasi Ring Road",
    distance: "8 KM",
    time: "15 MIN",
    category: "transit",
    icon: "Compass",
  },
  {
    name: "Phoenix / Prime Commercial Zone*",
    distance: "8-10 KM",
    time: "20 MIN",
    category: "lifestyle",
    icon: "Building2",
  },
  {
    name: "Kashi Vishwanath Temple",
    distance: "9 KM",
    time: "20 MIN",
    category: "heritage",
    icon: "Landmark",
  },
  {
    name: "Godowlia Chowk",
    distance: "9 KM",
    time: "20 MIN",
    category: "heritage",
    icon: "Landmark",
  },
  {
    name: "Dashashwamedh Ghat",
    distance: "10 KM",
    time: "25 MIN",
    category: "heritage",
    icon: "Waves",
  },
  {
    name: "Kashi Railway Station",
    distance: "10 KM",
    time: "20 MIN",
    category: "transit",
    icon: "Train",
  },
  {
    name: "DLW (BLW)",
    distance: "10 KM",
    time: "25 MIN",
    category: "lifestyle",
    icon: "Building2",
  },
  {
    name: "BHU (Banaras Hindu University)",
    distance: "12 KM",
    time: "30 MIN",
    category: "education",
    icon: "GraduationCap",
  },
  {
    name: "Lanka Town",
    distance: "12 KM",
    time: "30 MIN",
    category: "lifestyle",
    icon: "MapPin",
  },
  {
    name: "Lal Bahadur Shastri Int'l Airport (VNS)",
    distance: "20 KM",
    time: "30 MIN",
    category: "transit",
    icon: "Plane",
  },
];

// Complete Authentic Floor Plans & Cluster Layouts from Brochure Spreads 15, 16, 17, 18, 19
export const FLOOR_PLANS_DATA: FloorPlanItem[] = [
  {
    id: "site-plan",
    tower: "Site Plan",
    title: "Master Site Plan (VDA Approved)",
    type: "Master Layout",
    configuration: "Tower A, Tower B & Future Towers C & D",
    salableArea: "VDA Allotted Land",
    reraCarpetArea: "VDA Approved Freehold",
    balconyArea: "NH-19 Highway Access",
    coveredArea: "Township Master Plan",
    facing: "North-East Facing",
    image: "/images/brochure/spread_site_plan_vda_hd.jpg",
    details: "Authentic VDA Approved Master Site Plan at Transport Nagar, Varanasi. Highlights Tower A (B1+B2+S+30), Tower B (B1+B2+S+29), Future Towers C & D, swimming pool, tennis court, basketball court, basement parking ramps, 8000mm wide internal roads, and direct access to NH-19 Highway.",
  },
  {
    id: "tower-a-cluster",
    tower: "Tower A",
    title: "Tower-A Cluster Plan",
    type: "Cluster Layout",
    configuration: "4 Units Per Floor • 3 Lifts • Fire Staircase",
    salableArea: "1395 - 1695 SQ.FT.",
    reraCarpetArea: "805.588 - 958.394 SQ.FT.",
    balconyArea: "284.724 - 303.587 SQ.FT.",
    coveredArea: "1159.66 - 1337.18 SQ.FT.",
    facing: "3-Side Open Ventilation",
    image: "/images/assets/plan_tower_a_cluster.jpg",
    details: "Tower-A typical floor cluster plan comprising 4 well-ventilated residences per floor (Units 1 & 4: 2BHK+Study; Units 2 & 3: 3BHK). Equipped with 3 high-speed elevators, grand lift lobby, and separate fire exit staircases.",
  },
  {
    id: "tower-a-unit-1",
    tower: "Tower A",
    title: "Tower-A | Unit Type 1",
    type: "Unit Floor Plan",
    configuration: "2BHK + 2TOI + STUDY",
    salableArea: "1395 SQ.FT.",
    reraCarpetArea: "74.841 SQ.MT / 805.588 SQ.FT.",
    balconyArea: "26.451 SQ.MT / 284.724 SQ.FT.",
    coveredArea: "107.731 SQ.MT / 1159.66 SQ.FT.",
    facing: "Corner Dual Aspect Views",
    image: "/images/assets/plan_tower_a_unit1.jpg",
    details: "Features Living room (18'0\" x 11'0\"), Dining (9'1\" x 7'8\"), Kitchen (7'4\" x 10'0\") with Utility Balcony (7'0\" x 3'11\"), Study room (11'4\" x 7'0\"), Master Bedroom (13'8\" x 11'0\") with Ensuite Toilet (5'0\" x 8'0\") and Balcony (6'7\" x 12'0\"), Bedroom (11'3\" x 13'0\") with Balcony (6'7\" x 14'8\"), and expansive Living Deck (7'10\" x 10'4\").",
  },
  {
    id: "tower-a-unit-2-3",
    tower: "Tower A",
    title: "Tower-A | Unit Type 2 & 3",
    type: "Unit Floor Plan",
    configuration: "3BHK + 3TOI",
    salableArea: "1695 SQ.FT.",
    reraCarpetArea: "89.037 SQ.MT / 958.394 SQ.FT.",
    balconyArea: "28.204 SQ.MT / 303.587 SQ.FT.",
    coveredArea: "124.227 SQ.MT / 1337.18 SQ.FT.",
    facing: "North-East Morning Sunlight",
    image: "/images/assets/plan_tower_a_unit2_3.jpg",
    details: "Luxurious 3-bedroom layout featuring 3 well-appointed toilets, expansive living and dining hall, master suite with private attached bathroom and sundeck balcony, second bedroom with balcony, separate utility balcony, and grand entrance foyer.",
  },
  {
    id: "tower-a-unit-4",
    tower: "Tower A",
    title: "Tower-A | Unit Type 4",
    type: "Unit Floor Plan",
    configuration: "2BHK + 2TOI + STUDY",
    salableArea: "1395 SQ.FT.",
    reraCarpetArea: "74.841 SQ.MT / 805.588 SQ.FT.",
    balconyArea: "26.920 SQ.MT / 289.842 SQ.FT.",
    coveredArea: "107.749 SQ.MT / 1159.81 SQ.FT.",
    facing: "Open Horizon Vista",
    image: "/images/assets/plan_tower_a_unit4.jpg",
    details: "Intelligently proportioned 2 BHK with dedicated study room, 2 bathrooms, expansive living deck, separate utility deck off the kitchen, and dual private bedroom balconies ensuring cross ventilation.",
  },
  {
    id: "tower-b-cluster",
    tower: "Tower B",
    title: "Tower-B Cluster Plan",
    type: "Cluster Layout",
    configuration: "4 Units Per Floor • Open Court • 3 Lifts",
    salableArea: "1995 - 2825 SQ.FT.",
    reraCarpetArea: "1134.687 - 1638.582 SQ.FT.",
    balconyArea: "343.339 - 475.962 SQ.FT.",
    coveredArea: "1590.34 - 2246.09 SQ.FT.",
    facing: "South-East Panoramic Greens",
    image: "/images/assets/plan_tower_b_cluster.jpg",
    details: "Tower-B premium cluster plan offering 4 ultra-luxury residences per floor with open-to-sky central courtyard for ambient illumination, grand elevator vestibule with 3 lifts, and dedicated service entry.",
  },
  {
    id: "tower-b-unit-1",
    tower: "Tower B",
    title: "Tower-B | Unit Type 1",
    type: "Unit Floor Plan",
    configuration: "4BHK + 6TOI + DRESS + SERVANT + STORE",
    salableArea: "2825 SQ.FT.",
    reraCarpetArea: "152.228 SQ.MT / 1638.582 SQ.FT.",
    balconyArea: "44.218 SQ.MT / 475.962 SQ.FT.",
    coveredArea: "208.647 SQ.MT / 2246.09 SQ.FT.",
    facing: "Triple Aspect Royal Corner",
    image: "/images/assets/plan_tower_b_unit1.jpg",
    details: "The crown jewel 4 BHK residence: 4 palatial bedroom suites, 6 luxury bathrooms, walk-in dressing rooms, separate servant quarters with dedicated toilet, private store room, expansive living & dining halls, and wrap-around sun terraces.",
  },
  {
    id: "tower-b-unit-2-3",
    tower: "Tower B",
    title: "Tower-B | Unit Type 2 & 3",
    type: "Unit Floor Plan",
    configuration: "3BHK + 3TOI + DRESS + STORE",
    salableArea: "1995 SQ.FT.",
    reraCarpetArea: "105.415 SQ.MT / 1134.687 SQ.FT.",
    balconyArea: "31.897 SQ.MT / 343.339 SQ.FT.",
    coveredArea: "147.728 SQ.MT / 1590.34 SQ.FT.",
    facing: "Central Green & Swimming Pool View",
    image: "/images/assets/plan_tower_b_unit2_3.jpg",
    details: "Spacious 3 BHK residence with walk-in dressing room in master suite, dedicated storage room, 3 bathrooms, large living deck overlooking the resort swimming pool, and dedicated utility balcony.",
  },
  {
    id: "tower-b-unit-4",
    tower: "Tower B",
    title: "Tower-B | Unit Type 4",
    type: "Unit Floor Plan",
    configuration: "3BHK + 5TOI + DRESS + SERVANT + STORE",
    salableArea: "2395 SQ.FT.",
    reraCarpetArea: "129.241 SQ.MT / 1391.150 SQ.FT.",
    balconyArea: "39.608 SQ.MT / 426.340 SQ.FT.",
    coveredArea: "178.703 SQ.MT / 1923.16 SQ.FT.",
    facing: "Dual Aspect Sunset Vista",
    image: "/images/assets/plan_tower_b_unit4.jpg",
    details: "Lavish 3 BHK residence with 5 bathrooms, separate servant room with private toilet, walk-in dressing area, dedicated store room, chef's kitchen with utility deck, and extensive outdoor balcony spaces.",
  },
];

export interface BrochureSpreadItem {
  id: string;
  title: string;
  spreadNumber: string;
  tower: string;
  tag: string;
  description: string;
  image: string;
}

// Authentic High-Resolution 2-Page Spreads directly from the Official Project Brochure
export const BROCHURE_SPREADS_DATA: BrochureSpreadItem[] = [
  {
    id: "spread-site-plan",
    title: "Master Site Plan & Township Infrastructure",
    spreadNumber: "Spread 15",
    tower: "Site Plan",
    tag: "VDA Approved • Freehold Land",
    description: "Official master layout showing Tower A (B1+B2+S+30), Tower B (B1+B2+S+29), Future Towers C & D, swimming pool, tennis court, basketball turf, and direct access to NH-19 Highway.",
    image: "/images/brochure/spread_site_plan_vda_hd.jpg",
  },
  {
    id: "spread-tower-a-cluster-unit1",
    title: "Tower-A Typical Cluster & Unit Type 1",
    spreadNumber: "Spread 16",
    tower: "Tower A",
    tag: "Cluster Layout & 2BHK+Study (1395 SQ.FT.)",
    description: "Tower-A cluster plate featuring 4 units per floor and 3 high-speed lifts on the left, paired with the detailed 2BHK+Study residence plan, 3D furnished perspective, and RERA area table on the right.",
    image: "/images/brochure/spread_tower_a_cluster_unit1_hd.jpg",
  },
  {
    id: "spread-tower-a-unit2-3-4",
    title: "Tower-A Unit Type 2, 3 & Unit Type 4",
    spreadNumber: "Spread 17",
    tower: "Tower A",
    tag: "3BHK (1695 SQ.FT.) & 2BHK+Study (1395 SQ.FT.)",
    description: "Detailed 3BHK Unit 2 & 3 floor plate with morning sunlight deck on the left, and 2BHK+Study Unit 4 with dual aspect balconies on the right, both with 3D isometric cutaways.",
    image: "/images/brochure/spread_tower_a_unit2_3_4_hd.jpg",
  },
  {
    id: "spread-tower-b-cluster-unit1",
    title: "Tower-B Cluster & 4 BHK Royal Residence",
    spreadNumber: "Spread 18",
    tower: "Tower B",
    tag: "Cluster Layout & 4BHK Royal (2825 SQ.FT.)",
    description: "Tower-B luxury cluster plan with central courtyard ventilation on the left, and the flagship 4BHK+6TOI+Servant+Store residence with panoramic balconies and 3D architectural render on the right.",
    image: "/images/brochure/spread_tower_b_cluster_unit1_hd.jpg",
  },
  {
    id: "spread-tower-b-unit2-3-4",
    title: "Tower-B Unit Type 2, 3 & Unit Type 4",
    spreadNumber: "Spread 19",
    tower: "Tower B",
    tag: "3BHK (1995 SQ.FT.) & 3BHK+Servant (2395 SQ.FT.)",
    description: "Spacious 3BHK Unit 2 & 3 with walk-in dress and store on the left, and opulent 3BHK+Servant Unit 4 with 5 bathrooms and expansive sundeck overlooking the pool on the right.",
    image: "/images/brochure/spread_tower_b_unit2_3_4_hd.jpg",
  },
];

// Verbatim Authentic Specifications directly from Brochure Spread 20
export const SPECIFICATIONS_DATA = [
  {
    category: "Structure",
    icon: "ShieldCheck",
    items: [
      "RCC framed structure designed for seismic safety and high durability.",
      "Structural load vetting and wind tunnel analysis validated by IIT.",
      "High-grade Fe-550D TMT reinforcement steel and premium concrete mix.",
    ],
  },
  {
    category: "Lobby & Entrances",
    icon: "Layers",
    items: [
      "Ground floor lobby flooring in Italian marble / granite finish.",
      "Basement and typical floor lobbies in premium vitrified tiles.",
      "Lift cladding in marble / granite as per architect's design.",
      "Service staircase and service lobby finished in marble / granite.",
      "All lobby walls finished with texture paint and ceilings in distemper.",
    ],
  },
  {
    category: "High-Speed Elevators",
    icon: "Maximize",
    items: [
      "Lifts of suitable size and high-speed capacity will be provided in all towers.",
      "Equipped with Automatic Rescue Device (ARD) and emergency communication systems.",
      "Dedicated stretcher / service elevators for furniture moving and emergency transit.",
    ],
  },
  {
    category: "Flooring & Finishes",
    icon: "Layers",
    items: [
      "High quality vitrified tiles in foyer, living, dining, family and corridors.",
      "Laminate wooden flooring in master bedroom.",
      "Kitchen, utility, staff quarters and balconies in anti-skid vitrified tiles.",
    ],
  },
  {
    category: "Kitchen & Utility",
    icon: "Utensils",
    items: [
      "Granite / equivalent counter with 2 feet high ceramic tile dado above platform.",
      "Single bowl single drain stainless steel sink will be provided.",
      "Provision for water purifier (RO), exhaust fan, and modular chimney ducting.",
      "Dedicated utility balcony with washing machine tap and drain points.",
    ],
  },
  {
    category: "Toilets & Sanitary Ware",
    icon: "Bath",
    items: [
      "Vitrified tiles for flooring and walls up to false ceiling height.",
      "Granite / equivalent in under counter wash basin vanity.",
      "European Water Closets (EWCs) and premium chrome plated fittings.",
      "Chrome plated tap with single-lever hot & cold shower mixer.",
      "Suspended pipeline in all toilets concealed neatly within false ceiling.",
    ],
  },
  {
    category: "Internal & Main Doors",
    icon: "Maximize",
    items: [
      "9 ft high main door frame in timber with laminated designer flush shutter.",
      "8 ft high internal doors with timber wooden frames and laminated flush shutters.",
      "Premium stainless steel mortise handles and hardware throughout.",
    ],
  },
  {
    category: "External Doors & Windows",
    icon: "Maximize",
    items: [
      "UPVC / Aluminium frames and shutters for all external balcony doors.",
      "UPVC / Aluminium framed windows with clear glass and provision of mosquito mesh shutters.",
      "High acoustic dampening glass to ensure quiet interior sanctuary.",
    ],
  },
  {
    category: "Painting & Wall Finishes",
    icon: "Layers",
    items: [
      "Premium weather-resistant external emulsion on exterior facade walls.",
      "Smooth internal walls and ceilings finished in premium acrylic emulsion.",
    ],
  },
  {
    category: "Balcony & Staircase Railings",
    icon: "ShieldCheck",
    items: [
      "Balcony railings in MS/SS and toughened glass for unobstructed panoramic vistas.",
      "Internal stair railings in mild steel with durable enamel paint finish.",
    ],
  },
  {
    category: "Electrical & AC Provisions",
    icon: "Zap",
    items: [
      "Concealed PVC insulated fire-retardant copper wiring with premium modular switches.",
      "Sufficient power outlets and light points positioned ergonomically.",
      "ELCB (Earth Leakage Circuit Breaker) and individual sub-meters for all apartments.",
      "Complete electrical and refrigerant copper piping provision for AC in living, dining, and all bedrooms.",
    ],
  },
  {
    category: "Security System & Surveillance",
    icon: "Lock",
    items: [
      "Security cabins at all entrances and exits with trained round-the-clock guards.",
      "High-definition CCTV coverage on all main entry, exit points, and common zones.",
      "Premium digital / mechanical security door lock for all apartments.",
    ],
  },
  {
    category: "DG Power Backup",
    icon: "BatteryCharging",
    items: [
      "100% power backup for all common area lighting, elevators, and water pumps.",
      "100% full power backup for all individual apartments available at additional cost.",
    ],
  },
];
