import { Link } from "wouter";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background">
    <div className="text-center">
      <h1 className="text-9xl font-bold text-brand-black">404</h1>
      <p className="mt-4 text-2xl font-semibold text-brand-black">
        Page Not Found
      </p>
      <p className="mt-2 text-brand-gray">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-brand-primary px-6 py-3 text-brand-white transition-colors hover:bg-brand-primaryHover"
      >
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;
