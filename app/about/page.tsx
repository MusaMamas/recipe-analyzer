export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">About project</h1>
      <p className="mb-2">
        This educational project demonstrates the capabilities of Next.js.:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Static Site Generation (SSG) for recipe lists and details</li>
        <li>API Routes for analyzing recipes on the server</li>
        <li>File routing for pages and APIs</li>
      </ul>
      <p>
        As a data source, the open API{''} is used.
        <a
          href="https://www.themealdb.com/api.php"
          className="underline text-blue-600"
          target="_blank"
          rel="noreferrer"
        >
          TheMealDB
        </a>
        .
      </p>
    </main>
  );
}
