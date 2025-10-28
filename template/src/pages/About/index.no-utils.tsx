import { Link } from "wouter";

const About = () => {
  return (
    <div className="bg-brand-light flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-brand-dark mb-6 text-5xl font-bold">
          About This Project
        </h1>
        <p className="text-brand-text mb-8 text-xl">
          This is a starter template created with create-react-adam. It includes
          everything you need to build modern React applications.
        </p>

        <div className="mb-8 text-left">
          <h2 className="text-brand-dark mb-4 text-2xl font-semibold">
            Included Tools:
          </h2>
          <ul className="text-brand-text space-y-2">
            <li>⚛️ React 19 with TypeScript</li>
            <li>⚡ Vite for fast development</li>
            <li>🎨 Tailwind CSS for styling</li>
            <li>🛣️ Wouter for lightweight routing</li>
            <li>✨ ESLint & Prettier configured</li>
          </ul>
        </div>

        <Link
          href="/"
          className="bg-brand-primary hover:bg-brand-primary-dark rounded-lg px-6 py-3 text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;
