import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Student & Dev Gear</span>
        </div>
        
        {/* BUG #1: Typo in the main heading ("BtyeShop" instead of "ByteShop") */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">
          Welcome to ByteShop
        </h1>
        
        <p className="text-indigo-100/80 text-sm sm:text-base leading-relaxed mb-4">
          Minimalist workspace essentials, developer gadgets, and foundational computer science books.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-indigo-200">
          <span className="flex items-center gap-1 font-medium bg-white/10 px-2.5 py-1 rounded-md">
            ⚡ Fast Campus Delivery
          </span>
          <span className="flex items-center gap-1 font-medium bg-white/10 px-2.5 py-1 rounded-md">
            📦 Student Friendly Pricing
          </span>
        </div>
      </div>
    </div>
  );
}
