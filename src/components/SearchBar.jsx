import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Filters the product list based on search query and selected category
 */
export function filterProducts(products, searchQuery, activeCategory) {
  if (!products) return [];

  return products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;

    if (!searchQuery || searchQuery.trim() === '') {
      return matchesCategory;
    }

    // BUG #3: Search is case-sensitive! (e.g. searching "keyboard" fails to find "Keyboard")
    // Fix: Use .toLowerCase() on both product.name and searchQuery
   const matchesSearch= product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search books, keyboards, gear..."
        className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
