import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-primary mb-2">
        404
      </h1>
      <p className="text-xl sm:text-2xl font-semibold text-text mb-6">
        Page Not Found
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Go Home
      </Link>
    </main>
  );
}
