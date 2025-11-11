import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Work as WorkType } from "../../types/work";
import Title from "../ui/Title";
import Work from "../Work";
import "./styles.css";

const Works = () => {
  const [works, setWorks] = useState<WorkType[]>([]);

  useEffect(() => {
    try {
      const fetchWorks = async (limit: string, offset: string) => {
        const response = await fetch(
          `/api/works?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }

        const data = await response.json();
        setWorks(data.works);
      };
      fetchWorks("16", "0");
    } catch (error) {
      console.error("Error fetching works:", error);
    }
  }, []);

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
              <Link to={`/works/${work.id}`}>
                <Work work={work} />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Works;
