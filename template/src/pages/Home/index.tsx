import { useEffect } from "react";
import { Link } from "wouter";
import Button from "../../components/Button";
import { useReactPersist } from "../../utils/Storage";
import { useUrlState } from "../../utils/useUrlState";

const Home = () => {
  const [sharedCount, setSharedCount] = useReactPersist("sharedCounter", 0);
  const [urlCount, setUrlCount] = useUrlState("counter", 0);

  useEffect(() => {
    document.title = "__PROJECT_NAME__";
  }, []);

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
              <Button
                variant="danger"
                aria-label="Decrease shared counter"
                onClick={() => setSharedCount(sharedCount - 1)}
              >
                -
              </Button>
              <span className="text-brand-black text-3xl font-bold">
                {sharedCount}
              </span>
              <Button
                variant="success"
                aria-label="Increase shared counter"
                onClick={() => setSharedCount(sharedCount + 1)}
              >
                +
              </Button>
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
              <Button
                variant="danger"
                aria-label="Decrease URL counter"
                onClick={() => setUrlCount(urlCount - 1)}
              >
                -
              </Button>
              <span className="text-brand-black text-3xl font-bold">
                {urlCount}
              </span>
              <Button
                variant="success"
                aria-label="Increase URL counter"
                onClick={() => setUrlCount(urlCount + 1)}
              >
                +
              </Button>
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
