import React, { useState } from 'react';
import {
  FOOD_OFFERINGS,
  HERO_IMAGE_URL,
  RESIDENT_COWS,
  FoodOffering,
  ResidentCow,
} from '../data/sanctuaryData';
import { Check, HandHeart, Sparkles, RotateCcw, Award, ArrowRight } from 'lucide-react';

export interface PlacedFeedItem {
  instanceId: string;
  offeringId: string;
  label: string;
  priceInr: number;
  color: string;
  kind: 'grass' | 'indian-food' | 'ayurvedic';
  offsetX: number;
  offsetY: number;
  rotation: number;
}

interface ManualFeedingCourtyardProps {
  selectedCow: ResidentCow;
  onSelectCow: (cow: ResidentCow) => void;
  placedItems: PlacedFeedItem[];
  onPlaceItem: (offering: FoodOffering) => void;
  onClearTrough: () => void;
  onProceedToDeliveryCheckout: () => void;
}

export const ManualFeedingCourtyard: React.FC<ManualFeedingCourtyardProps> = ({
  selectedCow,
  onSelectCow,
  placedItems,
  onPlaceItem,
  onClearTrough,
  onProceedToDeliveryCheckout,
}) => {
  const [lastFedMessage, setLastFedMessage] = useState<string>(
    `Tap any grass bundle, warm roti, or jaggery laddoo below to manually place it into ${selectedCow.name}'s sandstone trough.`
  );
  const [cowReactionPulse, setCowReactionPulse] = useState(false);

  const totalTroughValueInr = placedItems.reduce((sum, item) => sum + item.priceInr, 0);
  const nourishmentPercent = Math.min(100, placedItems.length * 20);

  const handleManualPlace = (offering: FoodOffering) => {
    onPlaceItem(offering);
    setCowReactionPulse(true);
    setLastFedMessage(
      `You manually placed 1x ${offering.manualFeedUnit} into ${selectedCow.name}'s trough (+₹${offering.priceInr}).`
    );
    window.setTimeout(() => setCowReactionPulse(false), 450);
  };

  return (
    <section
      id="manual-feeding"
      className="py-16 md:py-24 border-t border-[#E6E0D6] bg-[#F3EFEA]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-[#6B635B] mb-2">
              02. Interactive Sanctuary Courtyard · Direct Hand-Feeding
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1917] tracking-tight balance-text">
              Manually Place Grass &amp; Indian Food in the Cow’s Trough
            </h2>
          </div>
          <p className="text-sm text-[#575049] max-w-md leading-relaxed">
            Assemble your custom Gau-Gras offering by placing fresh green Napier grass, warm rotis,
            organic jaggery, and herbal laddoos directly into the carved sandstone trough.
          </p>
        </div>

        {/* Resident Cow Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2DBD0]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#6B635B] mr-2">Select Resident Cow:</span>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#E6E0D6]/70 rounded-lg">
              {RESIDENT_COWS.map((cow) => {
                const isSelected = cow.id === selectedCow.id;
                return (
                  <button
                    key={cow.id}
                    type="button"
                    onClick={() => {
                      onSelectCow(cow);
                      setLastFedMessage(
                        `Switched trough to ${cow.name} (${cow.breed}). Favorite: ${cow.favoriteFood}.`
                      );
                    }}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#FAF8F5] text-[#1C1917] shadow-xs'
                        : 'text-[#575049] hover:text-[#1C1917]'
                    }`}
                  >
                    {cow.name} · {cow.breed}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#575049]">
            <span>{selectedCow.courtyardWing}</span>
            <span aria-hidden="true">·</span>
            <span>Caretaker: {selectedCow.caretakerName}</span>
          </div>
        </div>

        {/* 2-Column Interactive Trough Stage + Manual Hand-Placement Tray */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (7 cols): Live Sandstone Courtyard & Interactive Trough */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#DFD8CC] bg-[#FAF8F5] overflow-hidden">
            {/* Visual Sanctuary Stage */}
            <div className="relative min-h-[380px] sm:min-h-[430px] flex flex-col justify-between p-6 overflow-hidden bg-[#26211D]">
              <img
                src={HERO_IMAGE_URL}
                alt={`${selectedCow.name} standing by the carved sandstone trough`}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 ${
                  cowReactionPulse ? 'scale-[1.02]' : 'scale-100'
                }`}
              />
              {/* Measured Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

              {/* Top Overlay: Cow Info & Nourishment Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="bg-black/65 backdrop-blur-xs border border-white/15 rounded-lg px-4 py-2.5 text-[#FAF8F5]">
                  <div className="flex items-center gap-2 text-xs text-[#D6CFC7]">
                    <span>{selectedCow.breed}</span>
                    <span aria-hidden="true">·</span>
                    <span>Age {selectedCow.age}</span>
                  </div>
                  <p className="text-lg font-display font-semibold tracking-wide text-white">
                    {selectedCow.name} — Courtyard Trough
                  </p>
                </div>

                {/* Nourishment Meter & Trough Value */}
                <div className="bg-black/65 backdrop-blur-xs border border-white/15 rounded-lg px-4 py-2.5 text-[#FAF8F5] min-w-[200px]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#D6CFC7]">Trough Fullness</span>
                    <span className="font-mono-tabular font-medium text-white">
                      {nourishmentPercent}% ({placedItems.length} servings)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#65A30D] transition-all duration-200"
                      style={{ width: `${nourishmentPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Center/Bottom Interactive Carved Sandstone Trough Box */}
              <div className="relative z-10 mt-auto pt-12">
                {/* Cow Reaction Toast */}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-[#F3EFEA] bg-black/60 backdrop-blur-xs px-3.5 py-2 rounded-md border border-white/10">
                    {lastFedMessage}
                  </p>
                  {placedItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        onClearTrough();
                        setLastFedMessage(
                          `Cleared ${selectedCow.name}'s trough. Ready for fresh grass and rotis.`
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#F3EFEA] bg-black/60 hover:bg-black/80 border border-white/15 rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Trough
                    </button>
                  )}
                </div>

                {/* Carved Sandstone Trough Visual Drop Zone */}
                <div className="relative rounded-xl border-2 border-[#C8B9A6]/70 bg-gradient-to-b from-[#3A3128]/90 to-[#27201A]/95 p-4 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-[#D6CFC7] mb-3 pb-2 border-b border-white/10">
                    <span className="font-medium text-[#FAF8F5]">
                      Carved Sandstone Feeding Trough (Live Manual Placement)
                    </span>
                    <span className="font-mono-tabular text-[#E7DFD5]">
                      Trough Total: ₹{totalTroughValueInr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {placedItems.length === 0 ? (
                    <div className="py-7 text-center border border-dashed border-[#A89985]/40 rounded-lg">
                      <p className="text-sm text-[#E7DFD5] font-medium mb-1">
                        The Sandstone Trough is Ready for Your Offering
                      </p>
                      <p className="text-xs text-[#B8ACA0]">
                        Click any grass bundle, Gud-Roti thali, or Ayurvedic laddoo on the right to
                        place it directly in front of {selectedCow.name}.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2.5 min-h-[84px] py-2">
                      {placedItems.map((item, idx) => (
                        <div
                          key={item.instanceId}
                          style={{
                            transform: `rotate(${item.rotation}deg)`,
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 text-xs font-medium text-white shadow-xs transition-transform duration-150"
                        >
                          <span
                            className="w-3 h-3 rounded-xs shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="whitespace-nowrap">
                            {idx + 1}. {item.label}
                          </span>
                          <span className="font-mono-tabular text-white/80">
                            ₹{item.priceInr}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Summary Bar Inside Left Stage */}
            <div className="p-5 bg-[#FAF8F5] border-t border-[#E6E0D6] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#6B635B]">Favorite Nourishment of {selectedCow.name}</p>
                <p className="text-sm font-semibold text-[#1C1917]">{selectedCow.favoriteFood}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6B635B]">Patronage Prize Status</p>
                <p className="text-sm font-semibold text-[#1E3A2F]">
                  {totalTroughValueInr >= 2500
                    ? 'Tier III · Copper Tamrapatra + A2 Ghee Unlocked'
                    : totalTroughValueInr >= 1000
                    ? 'Tier II · Brass Seal Certificate + Vibhuti Unlocked'
                    : totalTroughValueInr > 0
                    ? 'Tier I · Verified Digital Gau-Seva Sanad Unlocked'
                    : 'Place 1+ item to unlock Patronage Prize'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Manual Hand-Feeding Controls & Prize Checkout */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#DFD8CC] bg-[#FAF8F5] p-6">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#E6E0D6]">
                <div>
                  <h3 className="text-lg font-semibold text-[#1C1917]">
                    Hand-Place Into Trough
                  </h3>
                  <p className="text-xs text-[#6B635B]">
                    Each click places 1 fresh portion directly to {selectedCow.name}
                  </p>
                </div>
                <span className="font-mono-tabular text-xs font-medium text-[#1E3A2F]">
                  {placedItems.length} placed
                </span>
              </div>

              {/* Interactive Buttons to Put Grass, Gud, Roti, Laddoos */}
              <div className="space-y-3">
                {FOOD_OFFERINGS.map((offering) => {
                  const countInTrough = placedItems.filter(
                    (i) => i.offeringId === offering.id
                  ).length;

                  return (
                    <div
                      key={offering.id}
                      className="p-3.5 rounded-lg border border-[#E6E0D6] hover:border-[#B8ACA0] bg-[#FAF8F5] transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-[#6B635B]">
                          <span>{offering.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular font-semibold text-[#1C1917]">
                            ₹{offering.priceInr}
                          </span>
                          {countInTrough > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#1E3A2F] font-semibold">
                                {countInTrough} in trough
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#1C1917] truncate">
                          {offering.manualFeedUnit}
                        </p>
                        <p className="text-xs text-[#6B635B] truncate">
                          {offering.weightLabel} · Prize: {offering.prizeRewardLabel}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleManualPlace(offering)}
                        className="px-3.5 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <HandHeart className="w-3.5 h-3.5" />
                        Put in Trough
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Payment & Prize Action Box */}
            <div className="mt-6 pt-5 border-t border-[#E6E0D6]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B635B]">
                  Manual Trough Offering ({placedItems.length} items)
                </span>
                <span className="text-lg font-mono-tabular font-semibold text-[#1C1917]">
                  ₹{totalTroughValueInr.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-[#575049] mb-4">
                Includes live caretaker trough delivery to {selectedCow.name} and your official
                Gau-Seva Patronage Prize &amp; Tax-Exempt Sanad.
              </p>

              <button
                type="button"
                onClick={onProceedToDeliveryCheckout}
                className="w-full py-3 px-4 text-sm font-semibold text-[#FAF8F5] bg-[#8C5A2B] hover:bg-[#734820] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Complete Payment &amp; Claim Patronage Prize</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
