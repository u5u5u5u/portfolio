import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageLoader from "./components/ui/PageLoader";

const App = lazy(() => import("./App.tsx"));
const WorkDetail = lazy(() => import("./pages/WorkDetail/index.tsx"));
const WorksPage = lazy(() => import("./pages/Works/index.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:id" element={<WorkDetail />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
);
