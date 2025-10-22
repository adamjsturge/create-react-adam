import { Redirect, Route, Switch } from "wouter";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/home">
      <Redirect to="/" />
    </Route>
    <Route component={NotFound} />
  </Switch>
);

export default App;
