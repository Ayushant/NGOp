/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FOOD_OFFERINGS,
  HERO_IMAGE_URL,
  PATRONAGE_PRIZE_TIERS,
  RESIDENT_COWS,
  FoodOffering,
  OfferingCategory,
  ResidentCow,
} from './data/sanctuaryData';
import {
  ManualFeedingCourtyard,
  PlacedFeedItem,
} from './components/ManualFeedingCourtyard';
import {
  CartItem,
  CompletedOrderReceipt,
  SevaCheckoutDrawer,
} from './components/SevaCheckoutDrawer';
import {
  HandHeart,
  ShoppingBag,
  Award,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<OfferingCategory>('all');
  const [selectedCow, setSelectedCow] = useState<ResidentCow>(RESIDENT_COWS[0]);

  // Pre-populate 2 signature items in the Seva Thali & Trough so the interface feels alive immediately
  const [cart, setCart] = useState<CartItem[]>([
    { offering: FOOD_OFFERINGS[0], quantity: 1 },
    { offering: FOOD_OFFERINGS[1], quantity: 1 },
  ]);

  const [placedTroughItems, setPlacedTroughItems] = useState<PlacedFeedItem[]>([
    {
      instanceId: 'init-grass-1',
      offeringId: FOOD_OFFERINGS[0].id,
      label: FOOD_OFFERINGS[0].manualFeedUnit,
      priceInr: FOOD_OFFERINGS[0].priceInr,
      color: FOOD_OFFERINGS[0].manualFeedColor,
      kind: FOOD_OFFERINGS[0].category,
      offsetX: 0,
      offsetY: 0,
      rotation: -1,
    },
    {
      instanceId: 'init-roti-2',
      offeringId: FOOD_OFFERINGS[1].id,
      label: FOOD_OFFERINGS[1].manualFeedUnit,
      priceInr: FOOD_OFFERINGS[1].priceInr,
      color: FOOD_OFFERINGS[1].manualFeedColor,
      kind: FOOD_OFFERINGS[1].category,
      offsetX: 0,
      offsetY: 0,
      rotation: 1,
    },
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [recentReceipts, setRecentReceipts] = useState<CompletedOrderReceipt[]>([
    {
      orderId: 'GS-849210',
      patronName: 'Smt. Arundhati Birla',
      patronCity: 'New Delhi · Lutyens',
      cowName: 'Nandini',
      cowBreed: 'Purebred Kathiawadi Gir',
      deliveryMode: 'caretaker-live',
      paymentMethod: 'upi',
      items: [
        { offering: FOOD_OFFERINGS[5], quantity: 1 },
        { offering: FOOD_OFFERINGS[0], quantity: 2 },
      ],
      totalInr: 3200,
      totalPrizePoints: 370,
      unlockedPrizeTitle: 'Raj-Punya Sanctuary Guardian',
      unlockedPrizeGift: 'Engraved Copper Tamrapatra Prize + 250ml Vedic Bilona A2 Ghee',
      timestamp: 'Today, 07:45 AM',
    },
  ]);

  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredOfferings =
    selectedCategory === 'all'
      ? FOOD_OFFERINGS
      : FOOD_OFFERINGS.filter((item) => item.category === selectedCategory);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartInr = cart.reduce(
    (sum, item) => sum + item.offering.priceInr * item.quantity,
    0
  );

  // Add item to Seva Thali (Cart) AND place in the manual feeding trough
  const handleAddOffering = (offering: FoodOffering, openTrough = false) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.offering.id === offering.id);
      if (existing) {
        return prev.map((i) =>
          i.offering.id === offering.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { offering, quantity: 1 }];
    });

    setPlacedTroughItems((prev) => [
      ...prev,
      {
        instanceId: `${offering.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        offeringId: offering.id,
        label: offering.manualFeedUnit,
        priceInr: offering.priceInr,
        color: offering.manualFeedColor,
        kind: offering.category,
        offsetX: 0,
        offsetY: 0,
        rotation: ( prev.length % 2 === 0 ? 1 : -1 ),
      },
    ]);

    setJustAddedId(offering.id);
    window.setTimeout(() => setJustAddedId(null), 900);

    if (openTrough) {
      const el = document.getElementById('manual-feeding');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateQuantity = (offeringId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.offering.id === offeringId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleClearAll = () => {
    setCart([]);
    setPlacedTroughItems([]);
  };

  const handleOrderCompleted = (receipt: CompletedOrderReceipt) => {
    setRecentReceipts((prev) => [receipt, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Top Bar Contract: Strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E6E0D6]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-2xl font-display font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            Kamdhenu Seva
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#575049]">
            <a
              href="#offerings"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Offerings
            </a>
            <a
              href="#manual-feeding"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Manual Feeding
            </a>
            <a
              href="#patronage-prizes"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Patronage Prizes
            </a>
            <a
              href="#sanctuary-ledger"
              className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Sanctuary Ledger
            </a>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>
                Seva Thali ({totalCartItems}) · ₹{totalCartInr.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Section 1: Storefront Hero (2-column split with items-stretch + 4-col proof strip below) */}
        <section className="py-12 md:py-16 border-b border-[#E6E0D6]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Editorial Lead & Direct Routing */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#6B635B] mb-4">
                    <span>Heritage Gir &amp; Sahiwal Sanctuary</span>
                    <span aria-hidden="true">·</span>
                    <span>Direct Trough Placement</span>
                    <span aria-hidden="true">·</span>
                    <span>80G Patronage Honors</span>
                  </div>

                  <h1
                    className="font-display font-semibold text-[#1C1917] tracking-tight balance-text mb-5"
                    style={{ fontSize: 'clamp(2.35rem, 4vw, 3.65rem)', lineHeight: 1.08 }}
                  >
                    Select Sacred Grass &amp; Indian Nourishment to Hand-Feed Our Cows.
                  </h1>

                  <p className="text-base text-[#575049] leading-relaxed mb-8 max-w-xl">
                    Choose morning-harvested green Napier grass, warm whole-wheat rotis with
                    organic Kolhapur jaggery (Gud), or Ayurvedic herbal laddoos. Place each
                    portion directly into the cow’s sandstone trough, complete seamless payment,
                    and receive your official Gau-Seva Patronage Prize.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Primary CTA + Secondary Route */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#manual-feeding"
                      className="px-6 py-3.5 text-sm font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                    >
                      <HandHeart className="w-4 h-4" />
                      <span>Manually Put Grass in Trough</span>
                    </a>

                    <a
                      href="#offerings"
                      className="px-5 py-3.5 text-sm font-semibold text-[#1C1917] bg-[#F3EFEA] hover:bg-[#E6E0D6] border border-[#DFD8CC] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      Browse Grass &amp; Indian Food Menu
                    </a>
                  </div>

                  {/* Subtle unboxed trust metadata */}
                  <div className="pt-5 border-t border-[#E6E0D6] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6B635B]">
                    <span>100% Organic Pasture Fodder</span>
                    <span aria-hidden="true">·</span>
                    <span>Live Caretaker Video Delivery in 15 Mins</span>
                    <span aria-hidden="true">·</span>
                    <span>Copper Tamrapatra &amp; A2 Ghee Patron Prizes</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Sanctuary Photograph */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[340px] lg:min-h-[460px] rounded-xl overflow-hidden border border-[#DFD8CC] bg-[#26211D]">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Majestic white Indian Gir cow standing peacefully beside a carved sandstone trough filled with fresh green grass"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 flex flex-wrap items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-xs text-[#E7DFD5]">
                        Featured Sanctuary Matriarch · East Sandstone Pavilion
                      </p>
                      <p className="text-2xl font-display font-semibold">
                        {selectedCow.name} ({selectedCow.breed})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('manual-feeding');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-white/95 text-[#1C1917] hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Feed {selectedCow.name} Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof & Sanctuary Strip */}
            <div className="mt-10 pt-8 border-t border-[#E6E0D6] grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold font-mono-tabular text-[#1C1917]">
                  340+ Cows
                </p>
                <p className="text-xs text-[#6B635B] mt-1">
                  Purebred Gir, Sahiwal &amp; Kankrej cows sheltered in sandstone courtyards
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold font-mono-tabular text-[#1C1917]">
                  4,850 kg / Day
                </p>
                <p className="text-xs text-[#6B635B] mt-1">
                  Fresh green Napier grass, jaggery (Gud), and warm rotis served daily
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold font-mono-tabular text-[#1C1917]">
                  15 Minutes
                </p>
                <p className="text-xs text-[#6B635B] mt-1">
                  Average time from online payment to caretaker placing grass in the trough
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold font-mono-tabular text-[#1C1917]">
                  3 Prize Tiers
                </p>
                <p className="text-xs text-[#6B635B] mt-1">
                  Digital Sanad, Brass Mudra &amp; Copper Tamrapatra with A2 Bilona Ghee
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Curated Grass & Traditional Indian Cow Food Catalog */}
        <section id="offerings" className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-medium text-[#6B635B] mb-2">
                  01. Sacred Rasoi &amp; Pasture Harvest
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight balance-text">
                  Select Fresh Grass &amp; Traditional Indian Cow Food
                </h2>
              </div>

              {/* Interactive Segmented Category Filter */}
              <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] border border-[#E2DBD0] rounded-lg">
                {[
                  { id: 'all', label: 'All Offerings (6)' },
                  { id: 'grass', label: 'Fresh Green Grass' },
                  { id: 'indian-food', label: 'Gud, Roti & Daliya' },
                  { id: 'ayurvedic', label: 'Ayurvedic Laddoos & Feast' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id as OfferingCategory)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-[#FAF8F5] text-[#1C1917] shadow-xs'
                        : 'text-[#575049] hover:text-[#1C1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Product Grid with uniform aspect ratio and aligned baselines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOfferings.map((offering) => {
                const isJustAdded = justAddedId === offering.id;
                const quantityInCart =
                  cart.find((c) => c.offering.id === offering.id)?.quantity || 0;

                return (
                  <article
                    key={offering.id}
                    className="group rounded-xl border border-[#E6E0D6] bg-[#FAF8F5] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div>
                      {/* 4:3 Product Photography */}
                      <div className="relative aspect-4/3 w-full bg-[#EFECE6] overflow-hidden border-b border-[#E6E0D6]">
                        <img
                          src={offering.imageUrl}
                          alt={offering.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>

                      {/* Card Body: Unboxed Metadata -> Title -> Description */}
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 text-xs text-[#6B635B] mb-2">
                          <span>
                            {offering.categoryLabel} · {offering.hindiTitle}
                          </span>
                          <span className="font-mono-tabular font-medium text-[#1E3A2F]">
                            +{offering.prizePoints} Prize Pts
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-[#1C1917] mb-1.5">
                          {offering.name}
                        </h3>

                        <p className="text-xs text-[#575049] leading-relaxed mb-4">
                          {offering.description}
                        </p>

                        <div className="pt-3 border-t border-[#E6E0D6] text-xs text-[#6B635B] space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Portion Weight:</span>
                            <span className="font-medium text-[#1C1917]">
                              {offering.weightLabel}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Included Prize:</span>
                            <span className="font-medium text-[#8C5A2B]">
                              {offering.prizeRewardLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Price + Dual Action (Put in Trough / Add to Seva Thali) */}
                    <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-[#F0ECE4]">
                      <div>
                        <span className="block text-[11px] text-[#6B635B]">Offering Price</span>
                        <span className="text-xl font-mono-tabular font-bold text-[#1C1917]">
                          ₹{offering.priceInr.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddOffering(offering, true)}
                          className="px-3 py-2 text-xs font-semibold text-[#1C1917] bg-[#F3EFEA] hover:bg-[#E6E0D6] border border-[#DFD8CC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          title="Manually place this in the cow's trough"
                        >
                          Feed Manually
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddOffering(offering, false)}
                          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#2E5A36] text-white'
                              : 'bg-[#1E3A2F] hover:bg-[#162B22] text-[#FAF8F5]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ({quantityInCart})</span>
                            </>
                          ) : (
                            <span>
                              Add to Thali {quantityInCart > 0 ? `(${quantityInCart})` : ''}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Manual Cow Feeding Courtyard */}
        <ManualFeedingCourtyard
          selectedCow={selectedCow}
          onSelectCow={setSelectedCow}
          placedItems={placedTroughItems}
          onPlaceItem={(offering) => handleAddOffering(offering, false)}
          onClearTrough={handleClearAll}
          onProceedToDeliveryCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* Section 4: Patronage Prizes & Sanctuary Ledger (Claim-to-Proof Adjacency) */}
        <section id="patronage-prizes" className="py-16 md:py-24 border-t border-[#E6E0D6]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-medium text-[#6B635B] mb-2">
                03. Royal Gau-Seva Patronage Prizes &amp; Honors
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight balance-text mb-3">
                Every Offering Unlocks a Sanctuary Prize &amp; Certified Blessing
              </h2>
              <p className="text-sm text-[#575049] leading-relaxed">
                Whether you offer a single bundle of fresh green grass or a complete courtyard
                feast, you receive an official Gau-Seva Sanad, live trough delivery proof, and
                sacred sanctuary gifts dispatched to your home.
              </p>
            </div>

            {/* 3-Column Patronage Prize Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {PATRONAGE_PRIZE_TIERS.map((tier, index) => {
                const isUnlocked = totalCartInr >= tier.minAmountInr;
                return (
                  <div
                    key={tier.id}
                    className={`p-6 rounded-xl border flex flex-col justify-between ${
                      isUnlocked
                        ? 'border-[#8C5A2B] bg-[#F3EFEA]'
                        : 'border-[#E6E0D6] bg-[#FAF8F5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B635B] mb-3">
                        <span>
                          0{index + 1}. {tier.badgeCode}
                        </span>
                        <span className="font-mono-tabular font-semibold text-[#1C1917]">
                          From ₹{tier.minAmountInr.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-semibold text-[#1C1917] mb-2">
                        {tier.title}
                      </h3>

                      <p className="text-xs font-medium text-[#1E3A2F] mb-2">
                        Prize: {tier.rewardSummary}
                      </p>

                      <p className="text-xs text-[#575049] leading-relaxed">
                        {tier.giftIncluded}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E2DBD0] flex items-center justify-between text-xs">
                      <span className="text-[#6B635B]">Current Thali Status:</span>
                      <span
                        className={`font-semibold ${
                          isUnlocked ? 'text-[#1E3A2F]' : 'text-[#8C5A2B]'
                        }`}
                      >
                        {isUnlocked
                          ? 'Unlocked in Your Thali'
                          : `Add ₹${(tier.minAmountInr - totalCartInr).toLocaleString(
                              'en-IN'
                            )} more`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Sanctuary Patronage & Delivery Ledger */}
            <div
              id="sanctuary-ledger"
              className="rounded-xl border border-[#DFD8CC] bg-[#F3EFEA] p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#DFD8CC]">
                <div>
                  <h3 className="text-2xl font-display font-semibold text-[#1C1917]">
                    Verified Sanctuary Trough Deliveries &amp; Awarded Prizes
                  </h3>
                  <p className="text-xs text-[#6B635B]">
                    Real-time ledger of grass and Indian food offerings placed into courtyard
                    troughs today
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Complete Your Seva &amp; Claim Prize
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#DFD8CC] text-xs text-[#6B635B]">
                      <th className="py-3 pr-4 font-medium">Receipt ID</th>
                      <th className="py-3 px-4 font-medium">Patron &amp; City</th>
                      <th className="py-3 px-4 font-medium">Resident Cow Fed</th>
                      <th className="py-3 px-4 font-medium">Grass &amp; Food Delivered</th>
                      <th className="py-3 px-4 font-medium">Patronage Prize Awarded</th>
                      <th className="py-3 pl-4 font-medium text-right">Offering Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DBD0] text-xs">
                    {recentReceipts.map((r) => (
                      <tr key={r.orderId}>
                        <td className="py-3.5 pr-4 font-mono-tabular font-medium text-[#575049]">
                          #{r.orderId}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-[#1C1917] block">
                            {r.patronName}
                          </span>
                          <span className="text-[#6B635B]">{r.patronCity}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#1C1917] block">{r.cowName}</span>
                          <span className="text-[#6B635B]">{r.cowBreed}</span>
                        </td>
                        <td className="py-3.5 px-4 text-[#575049]">
                          {r.items
                            .map((i) => `${i.quantity}× ${i.offering.manualFeedUnit}`)
                            .join(', ')}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#8C5A2B]">
                          {r.unlockedPrizeTitle} (+{r.totalPrizePoints} Pts)
                        </td>
                        <td className="py-3.5 pl-4 font-mono-tabular font-semibold text-[#1E3A2F] text-right">
                          ₹{r.totalInr.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E6E0D6] bg-[#FAF8F5] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B635B]">
          <div>
            <span className="font-display font-semibold text-sm text-[#1C1917] mr-2">
              Kamdhenu Seva Sanctuary
            </span>
            <span>· Suryagarh Heritage Courtyard, Rajasthan · 80G Registered Charitable Trust</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#offerings" className="hover:text-[#1C1917]">
              Grass &amp; Food Menu
            </a>
            <a href="#manual-feeding" className="hover:text-[#1C1917]">
              Interactive Trough
            </a>
            <a href="#patronage-prizes" className="hover:text-[#1C1917]">
              Patronage Prizes
            </a>
          </div>
        </div>
      </footer>

      {/* Slide-Over Seva Thali, Delivery & Payment Drawer */}
      <SevaCheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        selectedCow={selectedCow}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearAll}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}
