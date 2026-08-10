import "./App.css";
import About from "./components/About";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Works from "./components/Works";

function App() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Works />
        <Contact />
      </main>
    </>
  );
}

export default App;
