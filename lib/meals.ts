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
  const res = await fetch(`${API_BASE}/search.php?f=${letter}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }

  const data: MealsResponse = await res.json();
  return data.meals ?? [];
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meal');
  }

  const data: MealsResponse = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/list.php?c=list`, {
    next: { revalidate: 86400 } // Cache for 24 hours
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data: { meals: { strCategory: string }[] | null } = await res.json();
  return data.meals ? data.meals.map(m => m.strCategory) : [];
}

export async function fetchAreas(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/list.php?a=list`, {
    next: { revalidate: 86400 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch areas');
  }

  const data: { meals: { strArea: string }[] | null } = await res.json();
  return data.meals ? data.meals.map(m => m.strArea) : [];
}

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meals by category');
  }

  const data: MealsResponse = await res.json();
  return data.meals ?? [];
}

export async function fetchMealsByArea(area: string): Promise<Meal[]> {
  const res = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meals by area');
  }

  const data: MealsResponse = await res.json();
  return data.meals ?? [];
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
