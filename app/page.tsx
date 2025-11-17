import Link from 'next/link';
import { fetchMealsByFirstLetter } from '@/lib/meals';
import MealList from '@/components/MealList';

export default async function HomePage() {
  const meals = await fetchMealsByFirstLetter('a');

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Recipe Analyzer</h1>
      <p className="mb-6 text-gray-600">
        An educational app in Next.js: list of recipes, detail pages and analysis.
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

      <h2 className="text-2xl font-semibold mb-4">Recipes starting with A</h2>

      <MealList meals={meals} title='Recipes starting with A' />
    </main>
  );
}
