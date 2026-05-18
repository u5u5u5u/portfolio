import { useEffect, useState } from "react";
import type { Work as WorkType } from "../../types/work";
import WorkCard from "../../components/WorkCard";
import "./styles.css";

const WorksPage = () => {
  const [works, setWorks] = useState<WorkType[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(
          `/api/works?limit=100&offset=0&orders=publishedAt`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        const data = await response.json();
        setWorks(data.works);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    void fetchWorks();
  }, []);

  return (
    <div className="works-grid">
      {works.map((work) => (
        <WorkCard key={work.id} work={work} />
      ))}
    </div>
  );
};

export default WorksPage;
