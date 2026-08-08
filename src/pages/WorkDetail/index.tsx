import { useEffect, useState } from "react";
import { useParams } from "wouter";
import type { Work as WorkType } from "../../types/work";
import "./styles.css";
import { usePageMetadata } from "../../utils/usePageMetadata";
import DigitalWorkDetail from "./DigitalWorkDetail";
import GraphicWorkDetail from "./GraphicWorkDetail";

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<WorkType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageMetadata(
    work?.title ?? "作品詳細",
    work?.summary ?? "制作実績の詳細です。",
  );

  useEffect(() => {
    const fetchWorkDetail = async (workId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/works/${workId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch work detail: ${response.status}`);
        }
        const data = await response.json();
        setWork(data);
        console.log("Fetched work detail:", data);
      } catch (error) {
        console.error("Error fetching work detail:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch work detail",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void fetchWorkDetail(id);
      return;
    }

    setWork(null);
    setLoading(false);
    setError("Invalid work id");
  }, [id]);

  return (
    <div className="work-detail">
      {loading ? (
        <p className="work-detail-status">Loading...</p>
      ) : error ? (
        <p className="work-detail-status">{error}</p>
      ) : work ? (
        work.category === "graphic" ? (
          <GraphicWorkDetail work={work} />
        ) : (
          <DigitalWorkDetail work={work} />
        )
      ) : (
        <p className="work-detail-status">No work data found.</p>
      )}
    </div>
  );
};

export default WorkDetail;
