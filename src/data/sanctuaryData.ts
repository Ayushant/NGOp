import heroGirCowImg from '../assets/images/hero_gir_cow_sanctuary_1793840137754.jpg';
import feedFreshGrassImg from '../assets/images/feed_fresh_napier_grass_1793840137165.jpg';
import feedGudRotiImg from '../assets/images/feed_gud_roti_thali_1793840138205.jpg';
import feedAyurvedicLaddooImg from '../assets/images/feed_ayurvedic_laddoo_1793840138023.jpg';

export type OfferingCategory = 'all' | 'grass' | 'indian-food' | 'ayurvedic';

export interface FoodOffering {
  id: string;
  name: string;
  hindiTitle: string;
  category: Exclude<OfferingCategory, 'all'>;
  categoryLabel: string;
  priceInr: number;
  weightLabel: string;
  nutritionHighlight: string;
  description: string;
  prizePoints: number;
  prizeRewardLabel: string;
  imageUrl: string;
  manualFeedUnit: string;
  manualFeedColor: string;
}

export interface ResidentCow {
  id: string;
  name: string;
  breed: string;
  age: string;
  courtyardWing: string;
  favoriteFood: string;
  temperament: string;
  caretakerName: string;
}

export interface PatronagePrizeTier {
  id: string;
  title: string;
  minAmountInr: number;
  rewardSummary: string;
  giftIncluded: string;
  badgeCode: string;
}

export const HERO_IMAGE_URL = heroGirCowImg;
export const GRASS_IMAGE_URL = feedFreshGrassImg;
export const THALI_IMAGE_URL = feedGudRotiImg;
export const LADDOO_IMAGE_URL = feedAyurvedicLaddooImg;

export const FOOD_OFFERINGS: FoodOffering[] = [
  {
    id: 'napier-grass-bundle',
    name: 'Organic Green Napier & Lucerne Grass',
    hindiTitle: 'Hara Chara & Rijka',
    category: 'grass',
    categoryLabel: 'Fresh Green Grass',
    priceInr: 350,
    weightLabel: '5 kg Morning Cut',
    nutritionHighlight: 'Rich in chlorophyll, natural fiber & digestive enzymes',
    description:
      'Hand-harvested at dawn from pesticide-free sanctuary pastures and tied in breathable jute twine for immediate trough placement.',
    prizePoints: 35,
    prizeRewardLabel: 'Digital Gau-Seva Seal',
    imageUrl: GRASS_IMAGE_URL,
    manualFeedUnit: 'Fresh Grass Bundle',
    manualFeedColor: '#2E5A36',
  },
  {
    id: 'gud-roti-thali',
    name: 'Organic Jaggery (Gud) & Warm Wheat Roti Thali',
    hindiTitle: 'Desi Gud, Taza Roti & Chana',
    category: 'indian-food',
    categoryLabel: 'Traditional Indian Food',
    priceInr: 550,
    weightLabel: '8 Rotis · 500g Gud · 300g Sprouts',
    nutritionHighlight: 'Iron-rich sugarcane jaggery paired with stone-ground rotis',
    description:
      'Prepared fresh in our sanctuary rasoi with unrefined Kolhapur jaggery, soft whole-wheat rotis brushed with Bilona ghee, and sprouted moong-chana.',
    prizePoints: 60,
    prizeRewardLabel: 'Sanctuary Brass Mudra Certificate',
    imageUrl: THALI_IMAGE_URL,
    manualFeedUnit: 'Gud & Warm Roti Serving',
    manualFeedColor: '#B46928',
  },
  {
    id: 'ayurvedic-til-laddoo',
    name: 'Ayurvedic Til-Gud & Turmeric Nourishment Laddoos',
    hindiTitle: 'Aushadhiya Gau-Poshak Laddoo',
    category: 'ayurvedic',
    categoryLabel: 'Ayurvedic Specialty',
    priceInr: 850,
    weightLabel: '12 Hand-Rolled Spheres (1.8 kg)',
    nutritionHighlight: 'Black sesame, Lakadong turmeric, ashwagandha & jaggery',
    description:
      'Formulated by our Gaushala Vaidyas to strengthen immunity, joint vitality, and maternal health for senior and nursing Gir cows.',
    prizePoints: 95,
    prizeRewardLabel: 'Signed Vaidya Blessing & Vibhuti Box',
    imageUrl: LADDOO_IMAGE_URL,
    manualFeedUnit: 'Herbal Sesame Laddoo',
    manualFeedColor: '#6D4527',
  },
  {
    id: 'berseem-clover-meadow',
    name: 'Tender Berseem Clover & Sweet Maize Fodder',
    hindiTitle: 'Makka & Berseem Hara Chara',
    category: 'grass',
    categoryLabel: 'Fresh Green Grass',
    priceInr: 450,
    weightLabel: '7 kg Dew-Fresh Harvest',
    nutritionHighlight: 'High calcium & natural sweetness for nursing mothers',
    description:
      'Crisp, sweet-stalked baby maize leaves blended with protein-dense winter Berseem clover, chopped to ideal chewing length.',
    prizePoints: 45,
    prizeRewardLabel: 'Digital Gau-Seva Seal',
    imageUrl: GRASS_IMAGE_URL,
    manualFeedUnit: 'Clover & Maize Sheaf',
    manualFeedColor: '#3F7042',
  },
  {
    id: 'warm-chana-barley-daliya',
    name: 'Hand-Cooked Barley Daliya, Methi & Jaggery Bhog',
    hindiTitle: 'Garam Jau Daliya & Methi Pak',
    category: 'indian-food',
    categoryLabel: 'Traditional Indian Food',
    priceInr: 750,
    weightLabel: '3.5 kg Warm Copper-Pot Batch',
    nutritionHighlight: 'Slow-simmered barley, fenugreek seeds & mineral jaggery',
    description:
      'Slow-cooked over firewood in tinned brass vessels—an ancestral Indian winter and monsoon restorative loved by our entire herd.',
    prizePoints: 80,
    prizeRewardLabel: 'Sanctuary Brass Mudra Certificate',
    imageUrl: THALI_IMAGE_URL,
    manualFeedUnit: 'Warm Barley & Gud Scoop',
    manualFeedColor: '#C88A3B',
  },
  {
    id: 'royal-chhappan-gau-bhoj',
    name: 'Royal Courtyard Gau-Gras Feast (Full Trough)',
    hindiTitle: 'Rajsi Gau-Bhoj Samagri',
    category: 'ayurvedic',
    categoryLabel: 'Royal Patron Feast',
    priceInr: 2500,
    weightLabel: '25 kg Complete Courtyard Offering',
    nutritionHighlight: 'Napier grass, 24 rotis, 2 kg Gud, 16 laddoos & fresh fruits',
    description:
      'Our flagship patron offering: fills an entire sandstone courtyard trough with green fodder, warm rotis, jaggery, bananas, and herbal laddoos.',
    prizePoints: 300,
    prizeRewardLabel: 'Royal Copper Tamrapatra Plaque + A2 Ghee Jar',
    imageUrl: LADDOO_IMAGE_URL,
    manualFeedUnit: 'Royal Feast Platter',
    manualFeedColor: '#9E5B24',
  },
];

export const RESIDENT_COWS: ResidentCow[] = [
  {
    id: 'nandini-gir',
    name: 'Nandini',
    breed: 'Purebred Kathiawadi Gir',
    age: '6 Years',
    courtyardWing: 'East Sandstone Pavilion · Pillar 04',
    favoriteFood: 'Organic Jaggery (Gud) & Warm Rotis',
    temperament: 'Gentle matriarch who approaches visitors for forehead strokes',
    caretakerName: 'Shri Raghavendra Joshi',
  },
  {
    id: 'kamdhenu-sahiwal',
    name: 'Kamdhenu',
    breed: 'Heritage Sahiwal',
    age: '5 Years',
    courtyardWing: 'Surya Courtyard · Trough 01',
    favoriteFood: 'Fresh Green Napier & Lucerne Grass',
    temperament: 'Calm and attentive; responds to the morning brass bell',
    caretakerName: 'Shri Mohanlal Sharma',
  },
  {
    id: 'gauri-kankrej',
    name: 'Gauri & Calf Gopal',
    breed: 'Royal Kankrej Mother & Calf',
    age: '4 Years & 5 Months',
    courtyardWing: 'Matriarch Verandah · Trough 02',
    favoriteFood: 'Ayurvedic Til-Gud Laddoos & Berseem Clover',
    temperament: 'Affectionate mother; shares soft grass blades with her calf',
    caretakerName: 'Shri Devendra Patel',
  },
];

export const PATRONAGE_PRIZE_TIERS: PatronagePrizeTier[] = [
  {
    id: 'tier-swasti',
    title: 'Swasti Gau-Sevak Honor',
    minAmountInr: 350,
    rewardSummary: 'Verified Digital Seva Certificate + Trough Delivery Timestamp',
    giftIncluded: 'Instant High-Resolution Patronage Sanad with Caretaker Signature',
    badgeCode: 'TIER I · SWASTI',
  },
  {
    id: 'tier-annapurna',
    title: 'Annapurna Courtyard Patron',
    minAmountInr: 1000,
    rewardSummary: 'Embossed Brass-Seal Certificate + Sacred Gaushala Vibhuti Packet',
    giftIncluded: 'Dispatched complimentary to your residence with courtyard feeding photo',
    badgeCode: 'TIER II · ANNAPURNA',
  },
  {
    id: 'tier-raj-punya',
    title: 'Raj-Punya Sanctuary Guardian',
    minAmountInr: 2500,
    rewardSummary: 'Engraved Copper Tamrapatra Prize + 250ml Vedic Bilona A2 Ghee',
    giftIncluded: 'Name inscribed in the Sanctuary Patron Ledger + Priority Hand-Feeding Pass',
    badgeCode: 'TIER III · RAJ-PUNYA',
  },
];
