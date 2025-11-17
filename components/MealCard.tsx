import Link from 'next/link';
import type { Meal } from '@/lib/meals';

interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  return (
    <article className="border rounded-lg p-4 hover:shadow transition flex flex-col">
      {meal.strMealThumb && (
        <Link href={`/meals/${meal.idMeal}`} className="block mb-3">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-44 object-cover rounded-md"
          />
        </Link>
      )}

      <h3 className="text-lg font-semibold mb-1 line-clamp-2">
        <Link href={`/meals/${meal.idMeal}`} className="hover:underline">
          {meal.strMeal}
        </Link>
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        {meal.strCategory && <span>{meal.strCategory}</span>}
        {meal.strCategory && meal.strArea && <span> • </span>}
        {meal.strArea && <span>{meal.strArea}</span>}
      </p>

      <div className="mt-auto">
        <Link
          href={`/meals/${meal.idMeal}`}
          className="text-sm text-blue-600 underline"
        >
          Open Recipe
        </Link>
      </div>
    </article>
  );
}
