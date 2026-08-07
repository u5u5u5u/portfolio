import { useEffect, useState } from "react";
import type { Work as WorkType } from "../../types/work";
import WorkCard from "../../components/WorkCard";
import "./styles.css";
import { usePageMetadata } from "../../utils/usePageMetadata";
import "../../components/ui/TextAction/styles.css";

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
      setLoading(true);
      setError(false);

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

  const isLoadingMore = loading && works.length > 0;

  return (
    <main className="works-page">
      {error ? (
        <p className="works-status" role="alert">
          作品の取得に失敗しました。
        </p>
      ) : !loading && works.length === 0 ? (
        <p className="works-status">公開中の作品はありません。</p>
      ) : (
        <div className="works-grid">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
      {!error && works.length > 0 && works.length < totalCount && (
        <div className="works-load-more works-cta">
          <button
            className="works-more-link works-load-more-button"
            type="button"
            onClick={() => setOffset(works.length)}
            disabled={isLoadingMore}
          >
            さらに表示
          </button>
        </div>
      )}
    </main>
  );
};

export default WorksPage;
