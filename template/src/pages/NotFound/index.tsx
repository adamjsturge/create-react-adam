import { Link } from "wouter";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-brand-dark">404</h1>
      <p className="mt-4 text-2xl font-semibold text-brand-dark">
        Page Not Found
      </p>
      <p className="mt-2 text-brand-text">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-brand-primary-dark"
      >
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;

