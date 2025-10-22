import { Link } from "wouter";
import { useReactPersist } from "../../utils/Storage";
import { useUrlState } from "../../utils/useUrlState";

const Home = () => {
    const [sharedCount, setSharedCount] = useReactPersist('sharedCounter', 0);
    const [urlCount, setUrlCount] = useUrlState('counter', 0);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light">
            <div className="mx-auto max-w-2xl px-4 text-center">
                <h1 className="mb-6 text-5xl font-bold text-brand-dark">
                    Welcome to Your React App
                </h1>
                <p className="mb-8 text-xl text-brand-text">
                    Built with React, TypeScript, Vite, Wouter, and Tailwind CSS
                </p>

                <div className="mb-8 space-y-6">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-2xl font-semibold text-brand-dark">
                            Shared Counter (localStorage)
                        </h2>
                        <p className="mb-4 text-brand-text">
                            This counter is shared between Home and About pages
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setSharedCount(sharedCount - 1)}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                            >
                                -
                            </button>
                            <span className="text-3xl font-bold text-brand-dark">
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
                        <h2 className="mb-4 text-2xl font-semibold text-brand-dark">
                            URL Counter
                        </h2>
                        <p className="mb-4 text-brand-text">
                            This counter syncs with URL parameters
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setUrlCount(urlCount - 1)}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                            >
                                -
                            </button>
                            <span className="text-3xl font-bold text-brand-dark">
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
                        className="rounded-lg bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-brand-primary-dark"
                    >
                        About Page
                    </Link>
                    <a
                        href="https://react.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-brand-text transition-colors hover:bg-gray-50"
                    >
                        Learn React
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;

