import { Link } from "wouter";
import { useReactPersist } from "../../utils/Storage";
import { useUrlState } from "../../utils/useUrlState";

const Home = () => {
  const [sharedCount, setSharedCount] = useReactPersist("sharedCounter", 0);
  const [urlCount, setUrlCount] = useUrlState("counter", 0);

  return (
    <div className="bg-brand-light flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-dark mb-6 text-5xl font-bold">
          Welcome to Your React App
        </h1>
        <p className="text-brand-text mb-8 text-xl">
          Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
        </p>

        <div className="mb-8 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-brand-dark mb-4 text-2xl font-semibold">
              Shared Counter (localStorage)
            </h2>
            <p className="text-brand-text mb-4">
              This counter is shared between Home and About pages
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSharedCount(sharedCount - 1)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                -
              </button>
              <span className="text-brand-dark text-3xl font-bold">
                {sharedCount}
              </span>
              <button
                onClick={() => setSharedCount(sharedCount + 1)}
                className="rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-brand-dark mb-4 text-2xl font-semibold">
              URL Counter
            </h2>
            <p className="text-brand-text mb-4">
              This counter syncs with URL parameters
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setUrlCount(urlCount - 1)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                -
              </button>
              <span className="text-brand-dark text-3xl font-bold">
                {urlCount}
              </span>
              <button
                onClick={() => setUrlCount(urlCount + 1)}
                className="rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
              >
                +
              </button>
            </div>
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
