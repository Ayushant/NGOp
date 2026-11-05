import React, { useState } from 'react';
import {
  FoodOffering,
  PATRONAGE_PRIZE_TIERS,
  ResidentCow,
} from '../data/sanctuaryData';
import { X, Plus, Minus, Trash2, CheckCircle2, Award, ShieldCheck } from 'lucide-react';

export interface CartItem {
  offering: FoodOffering;
  quantity: number;
}

export interface CompletedOrderReceipt {
  orderId: string;
  patronName: string;
  patronCity: string;
  cowName: string;
  cowBreed: string;
  deliveryMode: 'caretaker-live' | 'personal-visit';
  paymentMethod: 'upi' | 'card' | 'bank';
  items: CartItem[];
  totalInr: number;
  totalPrizePoints: number;
  unlockedPrizeTitle: string;
  unlockedPrizeGift: string;
  timestamp: string;
}

interface SevaCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  selectedCow: ResidentCow;
  onUpdateQuantity: (offeringId: string, delta: number) => void;
  onClearCart: () => void;
  onOrderCompleted: (receipt: CompletedOrderReceipt) => void;
}

export const SevaCheckoutDrawer: React.FC<SevaCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  selectedCow,
  onUpdateQuantity,
  onClearCart,
  onOrderCompleted,
}) => {
  const [patronName, setPatronName] = useState('Shri Vikramaditya Singhania');
  const [patronPhone, setPatronPhone] = useState('+91 98201 44910');
  const [patronCity, setPatronCity] = useState('Mumbai · Malabar Hill');
  const [sankalpaNote, setSankalpaNote] = useState(
    'For family peace, longevity, and daily Gau-Gras nourishment.'
  );
  const [deliveryMode, setDeliveryMode] = useState<'caretaker-live' | 'personal-visit'>(
    'caretaker-live'
  );
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'bank'>('upi');
  const [activeReceipt, setActiveReceipt] = useState<CompletedOrderReceipt | null>(null);

  if (!isOpen) return null;

  const subtotalInr = cart.reduce(
    (sum, item) => sum + item.offering.priceInr * item.quantity,
    0
  );
  const totalPrizePoints = cart.reduce(
    (sum, item) => sum + item.offering.prizePoints * item.quantity,
    0
  );

  // Determine unlocked Patronage Prize Tier
  const currentPrizeTier =
    [...PATRONAGE_PRIZE_TIERS]
      .reverse()
      .find((t) => subtotalInr >= t.minAmountInr) || PATRONAGE_PRIZE_TIERS[0];

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const receipt: CompletedOrderReceipt = {
      orderId: `GS-${Math.floor(100000 + Math.random() * 900000)}`,
      patronName: patronName.trim() || 'Honored Patron',
      patronCity: patronCity.trim() || 'India',
      cowName: selectedCow.name,
      cowBreed: selectedCow.breed,
      deliveryMode,
      paymentMethod,
      items: [...cart],
      totalInr: subtotalInr,
      totalPrizePoints,
      unlockedPrizeTitle: currentPrizeTier.title,
      unlockedPrizeGift: currentPrizeTier.giftIncluded,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setActiveReceipt(receipt);
    onOrderCompleted(receipt);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] text-[#1C1917] h-full flex flex-col justify-between border-l border-[#DFD8CC] shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#FAF8F5] border-b border-[#E6E0D6]">
          <div>
            <p className="text-xs text-[#6B635B]">
              Designated Resident: {selectedCow.name} ({selectedCow.breed})
            </p>
            <h2 className="text-2xl font-display font-semibold text-[#1C1917]">
              {activeReceipt
                ? 'Gau-Seva Delivery & Patronage Prize Confirmed'
                : 'Seva Thali, Delivery & Payment'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveReceipt(null);
              onClose();
            }}
            className="p-2 rounded-lg text-[#575049] hover:text-[#1C1917] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 flex-1">
          {activeReceipt ? (
            /* Post-Payment Confirmed State & Official Patronage Prize Certificate */
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-[#C8B9A6] bg-[#F3EFEA]">
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#DFD8CC]">
                  <div className="flex items-center gap-2 text-[#1E3A2F] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Payment Verified &amp; Trough Delivery Dispatched</span>
                  </div>
                  <span className="font-mono-tabular text-xs text-[#575049]">
                    #{activeReceipt.orderId}
                  </span>
                </div>

                <p className="text-xs text-[#6B635B] mb-1">Official Patronage Prize Awarded</p>
                <h3 className="text-2xl font-display font-semibold text-[#1C1917] mb-2">
                  {activeReceipt.unlockedPrizeTitle}
                </h3>
                <p className="text-xs text-[#575049] leading-relaxed mb-4">
                  {activeReceipt.unlockedPrizeGift} · +{activeReceipt.totalPrizePoints} Punya
                  Merit Points recorded under {activeReceipt.patronName}.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DFD8CC] text-xs">
                  <div>
                    <span className="text-[#6B635B] block">Patron Name</span>
                    <span className="font-semibold text-[#1C1917]">
                      {activeReceipt.patronName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B635B] block">Nourished Resident Cow</span>
                    <span className="font-semibold text-[#1C1917]">
                      {activeReceipt.cowName} ({activeReceipt.cowBreed})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B635B] block">Delivery Mode</span>
                    <span className="font-semibold text-[#1C1917]">
                      {activeReceipt.deliveryMode === 'caretaker-live'
                        ? 'Caretaker Hand-Placed in Trough'
                        : 'Personal Courtyard Hand-Feeding'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6B635B] block">Total Offering Paid</span>
                    <span className="font-mono-tabular font-semibold text-[#1E3A2F]">
                      ₹{activeReceipt.totalInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized Grass & Indian Food Delivered */}
              <div className="rounded-xl border border-[#E6E0D6] p-5 bg-[#FAF8F5]">
                <h4 className="text-xs font-semibold text-[#6B635B] mb-3">
                  Grass &amp; Indian Food Delivered to {activeReceipt.cowName}’s Trough
                </h4>
                <div className="divide-y divide-[#E6E0D6]">
                  {activeReceipt.items.map((item) => (
                    <div
                      key={item.offering.id}
                      className="py-2.5 flex items-center justify-between text-sm"
                    >
                      <div>
                        <span className="font-medium text-[#1C1917]">
                          {item.offering.name}
                        </span>
                        <span className="text-xs text-[#6B635B] ml-2">
                          × {item.quantity} ({item.offering.weightLabel})
                        </span>
                      </div>
                      <span className="font-mono-tabular font-medium text-[#1C1917]">
                        ₹{(item.offering.priceInr * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setActiveReceipt(null);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 text-xs font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors cursor-pointer"
                >
                  Return to Sanctuary Courtyard
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-display font-semibold text-[#1C1917] mb-2">
                Your Seva Thali is Empty
              </p>
              <p className="text-xs text-[#6B635B] max-w-xs mx-auto mb-6">
                Select fresh green Napier grass, Gud-Roti thalis, or Ayurvedic laddoos from the
                catalog or place them manually in the trough.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#1E3A2F] rounded-lg cursor-pointer"
              >
                Explore Grass &amp; Indian Food Offerings
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmPayment} className="space-y-6">
              {/* 1. Itemized Offerings List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#575049]">
                    Selected Grass &amp; Indian Cow Nourishment ({cart.length})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="inline-flex items-center gap-1 text-xs text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#E6E0D6] border border-[#E6E0D6] rounded-xl bg-[#FAF8F5] px-4">
                  {cart.map(({ offering, quantity }) => (
                    <div
                      key={offering.id}
                      className="py-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1C1917] truncate">
                          {offering.name}
                        </p>
                        <p className="text-xs text-[#6B635B]">
                          {offering.weightLabel} · ₹{offering.priceInr} each
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="inline-flex items-center border border-[#DFD8CC] rounded-lg bg-[#F3EFEA]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(offering.id, -1)}
                            className="p-1.5 text-[#575049] hover:text-[#1C1917] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono-tabular font-semibold">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(offering.id, 1)}
                            className="p-1.5 text-[#575049] hover:text-[#1C1917] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono-tabular text-sm font-semibold text-[#1C1917] min-w-[64px] text-right">
                          ₹{(offering.priceInr * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Patronage Prize Unlocked Box */}
              <div className="p-4 rounded-xl border border-[#D4C7B4] bg-[#F3EFEA]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C5A2B] mb-1">
                      <Award className="w-4 h-4" />
                      <span>Patronage Prize Included with Payment</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1C1917]">
                      {currentPrizeTier.title} (+{totalPrizePoints} Punya Points)
                    </p>
                    <p className="text-xs text-[#575049] mt-0.5">
                      {currentPrizeTier.rewardSummary} — {currentPrizeTier.giftIncluded}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. How Should We Deliver This to the Cow? */}
              <div>
                <label className="block text-xs font-semibold text-[#575049] mb-2">
                  Delivery &amp; Manual Feeding Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('caretaker-live')}
                    className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      deliveryMode === 'caretaker-live'
                        ? 'border-[#1E3A2F] bg-[#1E3A2F]/5'
                        : 'border-[#E6E0D6] bg-[#FAF8F5]'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#1C1917]">
                      Immediate Trough Delivery
                    </p>
                    <p className="text-xs text-[#6B635B] mt-0.5">
                      Caretaker delivers to {selectedCow.name} within 15 mins + WhatsApp video proof
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMode('personal-visit')}
                    className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      deliveryMode === 'personal-visit'
                        ? 'border-[#1E3A2F] bg-[#1E3A2F]/5'
                        : 'border-[#E6E0D6] bg-[#FAF8F5]'
                    }`}
                  >
                    <p className="text-xs font-semibold text-[#1C1917]">
                      Personal Sanctuary Hand-Feed
                    </p>
                    <p className="text-xs text-[#6B635B] mt-0.5">
                      Keep thali ready at East Sandstone Pavilion for your personal visit today
                    </p>
                  </button>
                </div>
              </div>

              {/* 4. Patron Verification & Prize Dispatch Details */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#575049]">
                  Patron Details (For Certificate &amp; Prize Dispatch)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#6B635B] mb-1">Patron Full Name</label>
                    <input
                      type="text"
                      required
                      value={patronName}
                      onChange={(e) => setPatronName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#DFD8CC] bg-white text-[#1C1917] focus:outline-none focus:border-[#1E3A2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B635B] mb-1">
                      WhatsApp / Phone (For Video Proof)
                    </label>
                    <input
                      type="text"
                      required
                      value={patronPhone}
                      onChange={(e) => setPatronPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#DFD8CC] bg-white text-[#1C1917] focus:outline-none focus:border-[#1E3A2F]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#6B635B] mb-1">
                    City / Residence (For Patronage Prize Box Delivery)
                  </label>
                  <input
                    type="text"
                    required
                    value={patronCity}
                    onChange={(e) => setPatronCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#DFD8CC] bg-white text-[#1C1917] focus:outline-none focus:border-[#1E3A2F]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6B635B] mb-1">
                    Dedicated Sankalpa / Family Blessing Note
                  </label>
                  <input
                    type="text"
                    value={sankalpaNote}
                    onChange={(e) => setSankalpaNote(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#DFD8CC] bg-white text-[#1C1917] focus:outline-none focus:border-[#1E3A2F]"
                  />
                </div>
              </div>

              {/* 5. Payment Method Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#575049] mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'Instant UPI / QR' },
                    { id: 'card', label: 'Private Card' },
                    { id: 'bank', label: 'Sanctuary NEFT' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(method.id as 'upi' | 'card' | 'bank')
                      }
                      className={`py-2.5 px-3 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                        paymentMethod === method.id
                          ? 'border-[#1E3A2F] bg-[#1E3A2F] text-[#FAF8F5]'
                          : 'border-[#DFD8CC] bg-[#FAF8F5] text-[#575049]'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Final Total & Submit */}
              <div className="pt-4 border-t border-[#E6E0D6]">
                <div className="flex items-center justify-between text-xs text-[#6B635B] mb-1">
                  <span>Sanctuary Delivery &amp; Caretaker Placement</span>
                  <span>Complimentary (₹0)</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-[#1C1917] mb-4">
                  <span>Total Seva Payment</span>
                  <span className="font-mono-tabular text-xl text-[#1E3A2F]">
                    ₹{subtotalInr.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 text-sm font-semibold text-[#FAF8F5] bg-[#1E3A2F] hover:bg-[#162B22] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Pay ₹{subtotalInr.toLocaleString('en-IN')} &amp; Deliver to {selectedCow.name}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
