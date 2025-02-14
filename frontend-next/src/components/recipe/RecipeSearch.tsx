"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchProps = {
  onSearch: (query: string) => Promise<void>;
  isLoading?: boolean;
};

export default function RecipeSearch({
  onSearch,
  isLoading = false,
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await onSearch(query);
    }
  };

  return (
    <div className="sticky top-16 z-40 py-4 bg-transparent">
      <div className="w-full max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => !query && setIsExpanded(false)}
          className="relative flex items-center justify-end"
        >
          <div
            className={`
              absolute right-0 flex items-center transition-all duration-500 ease-in-out
              ${
                isExpanded
                  ? "w-full opacity-100 translate-x-0"
                  : "w-0 opacity-0 translate-x-20"
              }
            `}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes or get AI suggestions..."
              className="w-full px-4 py-3 pl-12 pr-16 text-black dark:text-white 
                placeholder-black/60 bg-white/80 backdrop-blur-sm dark:bg-gray-800 
                border-2 border-brand-pink/20 dark:border-gray-700 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-brand-pink
                transition-all duration-500 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 top-2 px-4 py-1.5 bg-brand-orange text-white 
                rounded-md hover:bg-brand-orange/90 focus:outline-none focus:ring-2 
                focus:ring-brand-orange focus:ring-offset-2 disabled:opacity-50 
                disabled:cursor-not-allowed transition-all duration-500"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Search"
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className={`
              p-3 rounded-full bg-white/80 backdrop-blur-sm dark:bg-gray-800 shadow-md 
              hover:shadow-lg hover:bg-brand-yellow/10
              transition-all duration-500 ease-in-out
              ${
                isExpanded
                  ? "opacity-0 pointer-events-none scale-90"
                  : "opacity-100 scale-100"
              }
            `}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-black hover:text-brand-pink dark:text-gray-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
