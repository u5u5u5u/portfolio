import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
    <Analytics />
  </>
);

export default Layout;
