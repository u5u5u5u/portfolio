import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import About from "./components/About";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Works from "./components/Works";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Works />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
