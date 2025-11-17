export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="mb-2">
        This is an educational project, but you can imagine that the author/team contact details are here.
      </p>
      <p>Email: <a href="mailto:dev@example.com" className="underline">dev@example.com</a></p>
      <p className="text-sm text-gray-500 mt-4">
        The page is also generated statically (SSG) and shows file routing in action.
      </p>
    </main>
  );
}
