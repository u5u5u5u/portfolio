import "./styles.css";
import Title from "../ui/Title";
import Work from "../Work";
import { works } from "../../data/works";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const Works = () => {
  return (
    <section id="works">
      <Title text="Works" />
      <div className="works-slider-wrapper">
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            perMove: 1,
            gap: "2rem",
            padding: { left: "25%", right: "25%" },
            focus: "center",
            arrows: true,
            pagination: true,
            breakpoints: {
              768: {
                padding: { left: "10%", right: "10%" },
              },
            },
          }}
        >
          {works.map((work) => (
            <SplideSlide key={work.title}>
              <Work work={work} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Works;
