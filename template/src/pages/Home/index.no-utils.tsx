import { Link } from "wouter";

const Home = () => {
  return (
    <div className="bg-brand-background flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-black mb-6 text-5xl font-bold">
          Welcome to Your React App
        </h1>
        <p className="text-brand-gray mb-8 text-xl">
          Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
        </p>

        <div className="mb-8">
          <div className="bg-brand-white rounded-lg p-6 shadow-md">
            <h2 className="text-brand-black mb-4 text-2xl font-semibold">
              Get Started
            </h2>
            <p className="text-brand-gray mb-4">
              Edit{" "}
              <code className="bg-brand-grayLight rounded px-2 py-1">
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
            className="bg-brand-primary text-brand-white hover:bg-brand-primaryHover rounded-lg px-6 py-3 transition-colors"
          >
            About Page
          </Link>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand-border bg-brand-white text-brand-gray hover:bg-brand-grayLight rounded-lg border px-6 py-3 transition-colors"
          >
            Learn React
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
