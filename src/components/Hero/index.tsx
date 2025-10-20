import "./styles.css";
import SplitText from "../ui/SplitText";

const Hero = () => {
  return (
    <section className="hero">
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
    </section>
  );
};

export default Hero;
