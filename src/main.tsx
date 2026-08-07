import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";
import "./index.css";
import Layout from "./components/Layout";
import PageLoader from "./components/ui/PageLoader";

const App = lazy(() => import("./App.tsx"));
const WorkDetail = lazy(() => import("./pages/WorkDetail/index.tsx"));
const WorksPage = lazy(() => import("./pages/Works/index.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={App} />
          <Route path="/works" component={WorksPage} />
          <Route path="/works/:id" component={WorkDetail} />
        </Switch>
      </Suspense>
    </Layout>
  </StrictMode>,
);
