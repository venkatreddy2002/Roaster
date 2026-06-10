import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard, MapPin, CheckCircle, ArrowRight } from "lucide-react";

export default function CartDrawer({ onOpenAuth }) {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    user,
    createOrder,
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Address, 3: Success
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState(null);

  if (!cartOpen) return null;

  const handleCheckoutClick = () => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setCheckoutStep(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim() || !postalCode.trim() || !phone.trim() || !cardNumber.trim()) {
      alert("Please fill in all checkout fields.");
      return;
    }

    setOrderLoading(true);
    const fullAddress = `${address}, PC ${postalCode}. Contact: ${phone}`;
    const order = await createOrder(fullAddress, "Credit Card");

    if (order) {
      setCreatedOrderDetails(order);
      setCheckoutStep(3);
      // Clear forms
      setAddress("");
      setPostalCode("");
      setPhone("");
      setCardName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
    }
    setOrderLoading(false);
  };

  const handleClose = () => {
    setCartOpen(false);
    // Reset checkout step after closing if it was in success
    if (checkoutStep === 3) {
      setCheckoutStep(1);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#060505]/75 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-brand-medium border-l border-neutral-800 shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            <h2 className="text-xl font-serif font-bold text-brand-cream">
              {checkoutStep === 1 && `Your Cart (${cartCount})`}
              {checkoutStep === 2 && "Checkout Details"}
              {checkoutStep === 3 && "Order Placed"}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="text-neutral-400 hover:text-brand-cream transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: CART LISTING */}
          {checkoutStep === 1 && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-neutral-600 mb-4 stroke-1" />
                  <p className="text-brand-latte font-medium">Your cart is empty</p>
                  <p className="text-neutral-500 text-sm mt-1 max-w-xs">
                    Explore our single origin beans and precision brewing tools in the shop.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.hash = "shop";
                    }}
                    className="mt-6 bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-brand-gold px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.cartItemId}
                      className="flex space-x-4 p-3 rounded-lg bg-brand-espresso/60 border border-neutral-800/60"
                    >
                      {/* Image */}
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 rounded object-cover border border-neutral-800/80"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-brand-cream truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-brand-latte/70">
                          <span>${item.product.price.toFixed(2)}</span>
                          {item.grind && (
                            <>
                              <span>•</span>
                              <span className="bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded text-[10px]">
                                {item.grind}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Adjust qty & delete */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-brand-espresso border border-neutral-800 rounded">
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                              className="px-2 py-1 text-neutral-400 hover:text-brand-cream transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs text-brand-cream min-w-[20px] text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                              className="px-2 py-1 text-neutral-400 hover:text-brand-cream transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: ADDRESS & CREDIT CARD */}
          {checkoutStep === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Shipping Destination
                </h3>
                
                <div>
                  <label className="block text-brand-cream/80 text-xs mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="123 Coffee Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="90210"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" /> Payment Info
                </h3>

                <div>
                  <label className="block text-brand-cream/80 text-xs mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Julian Vance"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                  />
                </div>

                <div>
                  <label className="block text-brand-cream/80 text-xs mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-cream/80 text-xs mb-1">CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-brand-espresso/60 border border-neutral-800 rounded-lg p-2.5 text-sm outline-none focus:border-brand-gold/60 text-brand-cream"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCheckoutStep(1)}
                  className="w-1/3 border border-neutral-800 hover:bg-neutral-900 text-brand-cream text-sm rounded-lg py-3 font-semibold transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={orderLoading}
                  className="flex-1 bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold text-sm rounded-lg py-3 hover:brightness-115 active:scale-[0.98] transition-all"
                >
                  {orderLoading ? "Processing..." : `Pay $${(cartSubtotal + 5.00).toFixed(2)}`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {checkoutStep === 3 && createdOrderDetails && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-serif text-brand-cream font-bold">Thank You!</h3>
              <p className="text-brand-latte/80 text-sm mt-2">
                Your order has been recorded successfully.
              </p>
              <div className="bg-brand-espresso/50 border border-neutral-800/80 rounded-xl p-4 my-6 w-full text-left">
                <p className="text-xs text-neutral-400">Order ID</p>
                <p className="text-sm font-mono text-brand-gold font-semibold">{createdOrderDetails.id}</p>
                
                <p className="text-xs text-neutral-400 mt-3">Ship To</p>
                <p className="text-sm text-brand-cream truncate">{createdOrderDetails.address}</p>

                <p className="text-xs text-neutral-400 mt-3">Items</p>
                <p className="text-sm text-brand-cream font-medium">
                  {createdOrderDetails.items.length} item(s) ordered
                </p>
              </div>

              <div className="space-y-3 w-full">
                <button
                  onClick={() => {
                    handleClose();
                    window.location.hash = "dashboard";
                  }}
                  className="w-full bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-brand-gold py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center"
                >
                  Track in Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={handleClose}
                  className="w-full border border-neutral-850 hover:bg-neutral-800 text-brand-cream py-3 rounded-full text-sm transition-colors"
                >
                  Back to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Pricing Summary for Step 1 & 2 */}
        {checkoutStep < 3 && cart.length > 0 && (
          <div className="p-6 border-t border-neutral-800 bg-brand-espresso/35">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Subtotal</span>
                <span className="text-brand-cream">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-400">
                <span>Shipping (Flat Rate)</span>
                <span className="text-brand-cream">$5.00</span>
              </div>
              <div className="h-px bg-neutral-800/80 my-2" />
              <div className="flex justify-between text-base font-serif font-bold text-brand-cream">
                <span>Total Cost</span>
                <span className="text-brand-gold">${(cartSubtotal + 5.00).toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 1 && (
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-gradient-to-r from-brand-darkgold to-brand-gold text-brand-espresso font-semibold uppercase tracking-wider text-sm rounded-lg py-4 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                {!user ? "Login to Checkout" : "Proceed to Checkout"} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
