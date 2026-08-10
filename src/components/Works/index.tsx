import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import type { Work as WorkType } from "../../types/work";
import Title from "../ui/Title";
import Work from "../Work";
import "./styles.css";
import "../ui/TextAction/styles.css";

const Works = () => {
  const [works, setWorks] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorks = async (limit: string, offset: string) => {
      try {
        const response = await fetch(
          `/api/works?limit=${limit}&offset=${offset}&orders=publishedAt`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }

        const data = await response.json();
        setWorks(data.works);
      } catch (error) {
        console.error("Error fetching works:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchWorks("5", "0");
  }, []);

  return (
    <section id="works">
      <Title text="Works" />
      <div className="works-slider-wrapper">
        {loading ? (
          <p role="status">読み込み中...</p>
        ) : error ? (
          <p role="alert">作品の取得に失敗しました。</p>
        ) : works.length === 0 ? (
          <p>公開中の作品はありません。</p>
        ) : (
          <Splide
          key={works.map((work) => work.id).join("-")}
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
              <SplideSlide key={work.id}>
                <Work work={work} />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
      <div className="works-cta">
        <Link className="works-more-link" href="/works">
          <span className="works-more-link-label">View all works</span>
        </Link>
      </div>
    </section>
  );
};

export default Works;
