import { Link } from "wouter";
import { useReactPersist } from "../../utils/Storage";
import { useUrlState } from "../../utils/useUrlState";

const Home = () => {
  const [sharedCount, setSharedCount] = useReactPersist("sharedCounter", 0);
  const [urlCount, setUrlCount] = useUrlState("counter", 0);

  return (
    <div className="bg-brand-background flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-black mb-6 text-5xl font-bold">
          Welcome to Your React App
        </h1>
        <p className="text-brand-gray mb-8 text-xl">
          Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
        </p>

        <div className="mb-8 space-y-6">
          <div className="bg-brand-white rounded-lg p-6 shadow-md">
            <h2 className="text-brand-black mb-4 text-2xl font-semibold">
              Shared Counter (localStorage)
            </h2>
            <p className="text-brand-gray mb-4">
              This counter is shared between Home and About pages
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSharedCount(sharedCount - 1)}
                className="bg-brand-danger text-brand-white hover:bg-brand-danger/90 rounded-lg px-4 py-2 transition-colors"
              >
                -
              </button>
              <span className="text-brand-black text-3xl font-bold">
                {sharedCount}
              </span>
              <button
                onClick={() => setSharedCount(sharedCount + 1)}
                className="bg-brand-success text-brand-white hover:bg-brand-success/90 rounded-lg px-4 py-2 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-brand-white rounded-lg p-6 shadow-md">
            <h2 className="text-brand-black mb-4 text-2xl font-semibold">
              URL Counter
            </h2>
            <p className="text-brand-gray mb-4">
              This counter syncs with URL parameters
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setUrlCount(urlCount - 1)}
                className="bg-brand-danger text-brand-white hover:bg-brand-danger/90 rounded-lg px-4 py-2 transition-colors"
              >
                -
              </button>
              <span className="text-brand-black text-3xl font-bold">
                {urlCount}
              </span>
              <button
                onClick={() => setUrlCount(urlCount + 1)}
                className="bg-brand-success text-brand-white hover:bg-brand-success/90 rounded-lg px-4 py-2 transition-colors"
              >
                +
              </button>
            </div>
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
