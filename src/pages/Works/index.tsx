import { useEffect, useState } from "react";
import type { Work as WorkType } from "../../types/work";
import WorkCard from "../../components/WorkCard";
import "./styles.css";
import { usePageMetadata } from "../../utils/usePageMetadata";

const PAGE_SIZE = 12;

const WorksPage = () => {
  const [works, setWorks] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);

  usePageMetadata("Works", "制作実績の一覧です。");

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(
          `/api/works?limit=${PAGE_SIZE}&offset=${offset}&orders=publishedAt`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch works");
        }
        const data = await response.json();
        setWorks((current) =>
          offset === 0 ? data.works : [...current, ...data.works],
        );
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error("Error fetching works:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchWorks();
  }, [offset]);

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
      {!loading && !error && works.length < totalCount && (
        <button type="button" onClick={() => setOffset(works.length)}>
          さらに表示
        </button>
      )}
    </main>
  );
};

export default WorksPage;
