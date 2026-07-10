import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <>
    <a
      href="#main-content"
      className="bg-brand-primary text-brand-white sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Skip to main content
    </a>
    <main id="main-content">
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/home">
            <Redirect to="/" />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </main>
  </>
);

export default App;
