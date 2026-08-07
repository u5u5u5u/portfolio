import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import "./index.css";
import App from "./App.tsx";
import WorkDetail from "./pages/WorkDetail/index.tsx";
import WorksPage from "./pages/Works/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/works" component={WorksPage} />
      <Route path="/works/:id" component={WorkDetail} />
    </Switch>
  </StrictMode>,
);
