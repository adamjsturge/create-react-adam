import { Link } from "wouter";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold text-brand-black">
          About This Project
        </h1>
        <p className="mb-8 text-xl text-brand-gray">
          This is a starter template created with create-react-adam. It includes
          everything you need to build modern React applications.
        </p>

        <div className="mb-8 text-left">
          <h2 className="mb-4 text-2xl font-semibold text-brand-black">
            Included Tools:
          </h2>
          <ul className="space-y-2 text-brand-gray">
            <li>⚛️ React 19 with TypeScript</li>
            <li>⚡ Vite for fast development</li>
            <li>🎨 Tailwind CSS for styling</li>
            <li>🛣️ Wouter for lightweight routing</li>
            <li>✨ ESLint & Prettier configured</li>
          </ul>
        </div>

        <Link
          href="/"
          className="rounded-lg bg-brand-primary px-6 py-3 text-brand-white transition-colors hover:bg-brand-primaryHover"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;
