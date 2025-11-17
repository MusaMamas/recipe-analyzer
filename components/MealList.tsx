import type { Meal } from '@/lib/meals';
import MealCard from './MealCard';

interface MealListProps {
  meals: Meal[];
  title?: string;
}

export default function MealList({ meals, title }: MealListProps) {
  if (!meals.length) {
    return (
      <section>
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <p className="text-gray-500">Recipes not found</p>
      </section>
    );
  }

  return (
    <section>
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

      <ul className="grid gap-4 md:grid-cols-2">
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <MealCard meal={meal} />
          </li>
        ))}
      </ul>
    </section>
  );
}
