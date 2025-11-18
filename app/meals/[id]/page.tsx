import Link from 'next/link';
import Image from 'next/image';
import { fetchMealById, fetchMealsByFirstLetter, extractIngredients } from '@/lib/meals';
import AnalyzePanel from '@/components/AnalyzePanel';

interface MealPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params (set of IDs) for SSG
export async function generateStaticParams() {
  // For the demo project, one letter is enough
  const meals = await fetchMealsByFirstLetter('a');

  return meals.map((meal) => ({
    id: meal.idMeal,
  }));
}

// Optional: control fallback behavior via dynamicParams = true/false
export const dynamicParams = false; // generate only the IDs listed above

export default async function MealPage({ params }: MealPageProps) {
  const { id } = await params;
  const meal = await fetchMealById(id);

  if (!meal) {
    return (
      <main className="max-w-3xl mx-auto py-8 px-4">
        <p>Recipe not found.</p>
      </main>
    );
  }

  const ingredients = extractIngredients(meal);

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <Link href="/" className="text-sm underline text-blue-600">
        ← Back to list
      </Link>

      <section className="mt-4">
        <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
        <p className="text-gray-500 mb-4">
          {meal.strCategory} • {meal.strArea}
        </p>
        {meal.strMealThumb && (
          <div className="w-full max-w-md rounded-lg mb-6 overflow-hidden">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={700}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {ingredients.map((item) => (
            <li key={item.ingredient}>
              {item.ingredient} {item.measure && `– ${item.measure}`}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="whitespace-pre-line mb-6">
          {meal.strInstructions}
        </p>

        {/* Analysis panel — uses our API route */}
        <AnalyzePanel mealId={meal.idMeal} />
      </section>
    </main>
  );
}
