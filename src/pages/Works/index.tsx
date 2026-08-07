import { useEffect, useState } from "react";
import type { Work as WorkType } from "../../types/work";
import WorkCard from "../../components/WorkCard";
import "./styles.css";

const WorksPage = () => {
  const [works, setWorks] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchWorks();
  }, []);

  return (
    <main>
      <h1>Works</h1>
      {loading ? (
        <p role="status">読み込み中...</p>
      ) : error ? (
        <p role="alert">作品の取得に失敗しました。</p>
      ) : works.length === 0 ? (
        <p>公開中の作品はありません。</p>
      ) : (
        <div className="works-grid">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
    </main>
  );
};

export default WorksPage;
