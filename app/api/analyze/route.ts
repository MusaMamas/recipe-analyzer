import { NextResponse } from 'next/server';
import { fetchMealById, extractIngredients } from '@/lib/meals';

export async function POST(request: Request) {
  try {
    const { mealId } = await request.json();

    if (!mealId) {
      return NextResponse.json(
        { error: 'mealId is required' },
        { status: 400 }
      );
    }

    const meal = await fetchMealById(mealId);

    if (!meal) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }

    const ingredients = extractIngredients(meal);
    const ingredientsCount = ingredients.length;

    let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
    if (ingredientsCount > 10) difficulty = 'hard';
    else if (ingredientsCount > 5) difficulty = 'medium';

    const analysis = {
      mealId,
      name: meal.strMeal,
      ingredientsCount,
      difficulty,
      suggestions: [
        difficulty === 'easy'
          ? 'A great recipe for beginners!'
          : difficulty === 'medium'
          ? 'Requires some experience and time.'
          : 'A challenging recipe — recommended for experienced cooks.'
      ],
    };

    return NextResponse.json(analysis);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
