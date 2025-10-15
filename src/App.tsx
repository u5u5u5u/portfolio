import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Works />
      </main>
      <Footer />
    </>
  );
}

export default App;
