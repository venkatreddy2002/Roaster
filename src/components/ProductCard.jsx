import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ 
  product, 
  isFavorite, 
  onToggleFavorite, 
  onAddToCart, 
  onClick 
}) {
  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-neutral-850 bg-brand-medium/40 p-4.5 flex flex-col justify-between hover:border-brand-gold/30 hover:bg-brand-medium/60 transition-all duration-300 relative"
    >
      {/* Favorite Heart Button */}
      <button
        onClick={handleToggleFav}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-espresso/80 backdrop-blur-sm flex items-center justify-center border border-neutral-850/60 text-neutral-400 hover:text-red-500 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
      </button>

      <div>
        {/* Product Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-espresso mb-4.5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          {product.category === "coffee" && (
            <span className="absolute bottom-3 left-3 bg-brand-espresso/90 text-[10px] text-brand-gold font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-brand-gold/15 font-mono">
              {product.roast} Roast
            </span>
          )}
        </div>

        {/* Product Meta: Category / Star Rating */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
            {product.category === "coffee" ? "Coffee Bean" : "Equipment"}
          </span>
          <div className="flex items-center text-brand-gold">
            <Star className="w-3 h-3 fill-brand-gold stroke-0" />
            <span className="ml-1 font-bold">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Product Name & Taste Notes */}
        <div className="mt-2 space-y-1.5">
          <h3 className="text-base font-bold text-brand-cream truncate group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-brand-latte/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Coffee Tasting Tags */}
        {product.category === "coffee" && product.notes && (
          <div className="flex flex-wrap gap-1 mt-3.5">
            {product.notes.map((note) => (
              <span
                key={note}
                className="bg-brand-espresso/60 text-[9px] text-brand-cream/80 px-2 py-0.5 rounded font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Price & Add to Cart Action */}
      <div className="flex items-center justify-between pt-4.5 mt-4.5 border-t border-neutral-850/80">
        <span className="text-base font-serif font-bold text-brand-cream font-mono">
          ${product.price.toFixed(2)}
        </span>
        
        <button
          onClick={handleQuickAdd}
          className="bg-brand-gold/10 border border-brand-gold/25 hover:bg-brand-gold hover:text-brand-espresso hover:border-transparent text-brand-gold text-xs font-semibold uppercase tracking-wider py-2 px-4 rounded-full transition-all flex items-center"
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Quick Add
        </button>
      </div>
    </div>
  );
}
