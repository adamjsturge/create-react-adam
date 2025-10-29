import { Link } from "wouter";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-brand-black">
          Welcome to Your React App
        </h1>
        <p className="mb-8 text-xl text-brand-gray">
          Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
        </p>

        <div className="mb-8">
          <div className="rounded-lg bg-brand-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-brand-black">
              Get Started
            </h2>
            <p className="mb-4 text-brand-gray">
              Edit{" "}
              <code className="rounded bg-brand-grayLight px-2 py-1">
                src/pages/Home/index.tsx
              </code>{" "}
              to customize this page.
            </p>
            <p className="text-brand-gray">
              This is a clean starting point for your React application.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="rounded-lg bg-brand-primary px-6 py-3 text-brand-white transition-colors hover:bg-brand-primaryHover"
          >
            About Page
          </Link>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-brand-border bg-brand-white px-6 py-3 text-brand-gray transition-colors hover:bg-brand-grayLight"
          >
            Learn React
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
