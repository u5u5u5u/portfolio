import { useEffect, useMemo, useState } from "react";
import type { Work as WorkType, WorkCategory } from "../../types/work";
import WorkCard from "../../components/WorkCard";
import "./styles.css";
import { usePageMetadata } from "../../utils/usePageMetadata";
import "../../components/ui/TextAction/styles.css";

const PAGE_SIZE = 100;
type WorkFilter = "all" | WorkCategory;

const WorksPage = () => {
  const [works, setWorks] = useState<WorkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState<WorkFilter>("all");

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
  const filteredWorks = useMemo(
    () =>
      works.filter((work) => {
        if (filter === "all") return true;
        return (work.category ?? "digital") === filter;
      }),
    [filter, works],
  );

  return (
    <main className="works-page">
      <div className="works-filter" aria-label="作品カテゴリー">
        {([
          ["all", "All"],
          ["digital", "Web / App"],
          ["graphic", "Graphic"],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "is-active" : ""}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {error ? (
        <p className="works-status" role="alert">
          作品の取得に失敗しました。
        </p>
      ) : !loading && works.length === 0 ? (
        <p className="works-status">公開中の作品はありません。</p>
      ) : (
        <div className="works-grid">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
          {filteredWorks.length === 0 && (
            <p className="works-filter-empty">該当する作品はありません。</p>
          )}
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
