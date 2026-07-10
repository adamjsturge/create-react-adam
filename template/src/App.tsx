import { lazy, Suspense, useDeferredValue, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { preloadAllRoutesWhenIdle, routeImports } from "./routes";

// Pages are code-split: each chunk downloads on demand. The import thunks
// live in src/routes.ts so the preload helpers can warm the same chunks
// ahead of navigation (routes.ts documents how it works and how to remove).
const Home = lazy(routeImports["/"]);
const About = lazy(routeImports["/about"]);
const NotFound = lazy(routeImports["/404"]);

const App = () => {
  const [location] = useLocation();
  // Routing against a deferred location means React keeps the previous page
  // painted while the next page's chunk loads and initializes, instead of
  // flashing the blank Suspense fallback. Preloading makes navigation fast;
  // this makes it smooth. To remove: pass nothing to <Switch> below and
  // delete these two hook calls.
  const deferredLocation = useDeferredValue(location);

  // Idle backstop — quietly fetch all remaining page chunks once the page
  // has fully loaded. Delete this effect to remove (see src/routes.ts).
  useEffect(() => {
    preloadAllRoutesWhenIdle();
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="bg-brand-primary text-brand-white sr-only z-50 rounded-lg px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>
      <main id="main-content">
        <Suspense fallback={null}>
          <Switch location={deferredLocation}>
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
};

export default App;
