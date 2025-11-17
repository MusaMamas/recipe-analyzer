'use client';

import { useState } from 'react';

interface AnalyzePanelProps {
  mealId: string;
}

interface AnalysisResult {
  mealId: string;
  name: string;
  ingredientsCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  suggestions: string[];
}

export default function AnalyzePanel({ mealId }: AnalyzePanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Request failed');
      }

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
    } catch (e: any) {
      setError(e.message || 'Request error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-8 border-t pt-4">
      <h2 className="text-xl font-semibold mb-2">Recipe Analysis</h2>
      <p className="text-sm text-gray-600 mb-4">
        Click the button to get a quick analysis (ingredient count and estimated difficulty).
      </p>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
      >
        {loading ? 'Analyzing…' : 'Analyze recipe'}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          Error: {error}
        </p>
      )}

      {result && !error && (
        <div className="mt-4 p-4 border rounded">
          <p className="font-semibold mb-1">{result.name}</p>
          <p className="text-sm">
            Ingredients: <strong>{result.ingredientsCount}</strong>
          </p>
          <p className="text-sm">
            Difficulty:{' '}
            <strong>
              {result.difficulty === 'easy'
                ? 'Easy'
                : result.difficulty === 'medium'
                ? 'Medium'
                : 'Hard'}
            </strong>
          </p>
          <ul className="mt-2 list-disc list-inside text-sm">
            {result.suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}