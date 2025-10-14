import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
