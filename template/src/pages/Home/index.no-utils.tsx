import { Link } from "wouter";

const Home = () => {
  return (
    <div className="bg-brand-light flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-dark mb-6 text-5xl font-bold">
          Welcome to Your React App
        </h1>
        <p className="text-brand-text mb-8 text-xl">
          Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
        </p>

        <div className="mb-8">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-brand-dark mb-4 text-2xl font-semibold">
              Get Started
            </h2>
            <p className="text-brand-text mb-4">
              Edit{" "}
              <code className="rounded bg-gray-100 px-2 py-1">
                src/pages/Home/index.tsx
              </code>{" "}
              to customize this page.
            </p>
            <p className="text-brand-text">
              This is a clean starting point for your React application.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="bg-brand-primary hover:bg-brand-primary-dark rounded-lg px-6 py-3 text-white transition-colors"
          >
            About Page
          </Link>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text rounded-lg border border-gray-300 bg-white px-6 py-3 transition-colors hover:bg-gray-50"
          >
            Learn React
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
