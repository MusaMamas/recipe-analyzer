import Link from 'next/link';
import { Suspense } from 'react';
import { 
  fetchMealsByFirstLetter, 
  fetchCategories, 
  fetchAreas,
  fetchMealsByCategory,
  fetchMealsByArea,
  Meal
} from '@/lib/meals';
import MealList from '@/components/MealList';
import SearchAndFilter from '@/components/SearchAndFilter';

interface HomePageProps {
  searchParams: Promise<{
    letter?: string;
    category?: string;
    area?: string;
    search?: string;
  }>;
}

async function searchMeals(query: string): Promise<Meal[]> {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  
  const data = await res.json();
  return data.meals ?? [];
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const { letter = 'a', category, area, search } = params;

  // Fetch categories and areas for filters
  const [categories, areas] = await Promise.all([
    fetchCategories(),
    fetchAreas()
  ]);

  // Determine which meals to fetch based on filters
  let meals: Meal[] = [];
  let title = '';

  if (search) {
    meals = await searchMeals(search);
    title = `Search results for "${search}"`;
  } else if (category) {
    meals = await fetchMealsByCategory(category);
    title = `${category} recipes`;
  } else if (area) {
    meals = await fetchMealsByArea(area);
    title = `${area} cuisine`;
  } else {
    meals = await fetchMealsByFirstLetter(letter);
    title = `Recipes starting with ${letter.toUpperCase()}`;
  }

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Analyzer</h1>
      <p className="mb-6 text-gray-600">
        An educational app in Next.js: search recipes, filter by category or cuisine, and analyze ingredients.
      </p>

      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline">
          Home
        </Link>
        <Link href="/about" className="underline">
          About
        </Link>
        <Link href="/contact" className="underline">
          Contact
        </Link>
      </nav>

      <Suspense fallback={<div className="text-gray-500">Loading filters...</div>}>
        <SearchAndFilter categories={categories} areas={areas} />
      </Suspense>

      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      {meals.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No recipes found. Try a different search or filter.
        </p>
      ) : (
        <MealList meals={meals} title={title} />
      )}
    </main>
  );
}