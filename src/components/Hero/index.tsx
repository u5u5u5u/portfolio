import "./styles.css";
import SplitText from "../ui/SplitText";
import DarkVeil from "../ui/DarkVeil";

const Hero = () => {
  return (
    <section className="hero">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <DarkVeil speed={2} />
        <div className="text">
          <SplitText
            text="I'm Yugo Jinnai"
            delay={130}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            tag="h1"
          />
          <SplitText
            text="Welcome to my portfolio site."
            delay={70}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
