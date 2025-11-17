export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  [key: string]: any;
}

interface MealsResponse {
  meals: Meal[] | null;
}

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMealsByFirstLetter(letter: string): Promise<Meal[]> {
  const res = await fetch(`${API_BASE}/search.php?f=${letter}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }

  const data: MealsResponse = await res.json();
  return data.meals ?? [];
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meal');
  }

  const data: MealsResponse = await res.json();
  return data.meals ? data.meals[0] : null;
}

// Extract ingredients and measurements from fields strIngredient1..20 / strMeasure1..20 
export function extractIngredients(meal: Meal): { ingredient: string; measure: string }[] {
  const result: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      result.push({
        ingredient: ingredient.trim(),
        measure: (measure ?? '').trim(),
      });
    }
  }

  return result;
}
