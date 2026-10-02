import React from 'react';
import { ShoppingBag, BookOpen, Laptop, ExternalLink } from 'lucide-react';

export default function Navbar({ cart, onOpenCart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Byte<span className="text-indigo-600">Shop</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              v1.0
            </span>
          </div>
        </div>

        {/* Navigation / Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <span>Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            type="button"
            className="relative flex items-center gap-2 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl transition-all active:scale-95"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span className="text-xs sm:text-sm font-semibold">Cart</span>
            
            {/* Cart Badge */}
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full shadow-xs">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
