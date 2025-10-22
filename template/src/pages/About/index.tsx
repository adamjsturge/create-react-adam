import { Link } from "wouter";
import { useReactPersist } from "../../utils/Storage";
import { useUrlState } from "../../utils/useUrlState";

const About = () => {
    const [sharedCount, setSharedCount] = useReactPersist('sharedCounter', 0);
    const [urlCount, setUrlCount] = useUrlState('counter', 0);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light">
            <div className="mx-auto max-w-2xl px-4 text-center">
                <h1 className="mb-6 text-5xl font-bold text-brand-dark">
                    About This Project
                </h1>
                <p className="mb-8 text-xl text-brand-text">
                    This is a starter template created with create-adam-react.
                    It includes everything you need to build modern React applications.
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

                <div className="mb-8 text-left">
                    <h2 className="mb-4 text-2xl font-semibold text-brand-dark">
                        Included Tools:
                    </h2>
                    <ul className="space-y-2 text-brand-text">
                        <li>⚛️ React 19 with TypeScript</li>
                        <li>⚡ Vite for fast development</li>
                        <li>🎨 Tailwind CSS for styling</li>
                        <li>🛣️ Wouter for lightweight routing</li>
                        <li>✨ ESLint & Prettier configured</li>
                    </ul>
                </div>
                <Link
                    href="/"
                    className="rounded-lg bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-brand-primary-dark"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default About;

