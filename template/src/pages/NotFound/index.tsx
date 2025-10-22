import { Link } from "wouter";

const NotFound = () => (
  <div className="bg-brand-light flex min-h-screen flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-brand-dark text-9xl font-bold">404</h1>
      <p className="text-brand-dark mt-4 text-2xl font-semibold">
        Page Not Found
      </p>
      <p className="text-brand-text mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-brand-primary hover:bg-brand-primary-dark mt-6 inline-block rounded-lg px-6 py-3 text-white transition-colors"
      >
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
