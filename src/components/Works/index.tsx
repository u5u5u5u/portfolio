import "./styles.css";
import Title from "../ui/Title";
import Work from "../Work";
import { works } from "../../data/works";

const Works = () => {
  return (
    <section id="works">
      <Title text="Works" />
      <div className="works-container">
        {works.map((work) => (
          <Work key={work.title} work={work} />
        ))}
      </div>
    </section>
  );
};

export default Works;
