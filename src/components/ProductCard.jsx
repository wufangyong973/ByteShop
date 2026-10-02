import React from 'react';
import { Star, Plus, Check } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, isAdded }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
          {product.category}
        </span>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              In Stock
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span>({product.reviewsCount} reviews)</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 uppercase font-medium">Price</span>
            <div className="text-lg font-bold text-slate-900">${product.price}</div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              !product.inStock
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : isAdded
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
