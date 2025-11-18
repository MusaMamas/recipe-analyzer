'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchAndFilterProps {
  categories: string[];
  areas: string[];
}

export default function SearchAndFilter({ categories, areas }: SearchAndFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(searchParams.get('letter') || 'a');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || '');

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setSelectedCategory('');
    setSelectedArea('');
    router.push(`/?letter=${letter}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedLetter('');
    setSelectedArea('');
    if (category) {
      router.push(`/?category=${encodeURIComponent(category)}`);
    } else {
      router.push('/');
    }
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    setSelectedLetter('');
    setSelectedCategory('');
    if (area) {
      router.push(`/?area=${encodeURIComponent(area)}`);
    } else {
      router.push('/');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLetter('a');
    setSelectedCategory('');
    setSelectedArea('');
    router.push('/?letter=a');
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Letter Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Browse by first letter:</label>
        <div className="flex flex-wrap gap-2">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterChange(letter)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                selectedLetter === letter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Category and Area Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">
            Filter by category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="area" className="text-sm font-medium text-gray-700">
            Filter by cuisine:
          </label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => handleAreaChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cuisines</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(searchQuery || selectedCategory || selectedArea || selectedLetter !== 'a') && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}