import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Work as WorkType } from "../types/work";

const WorkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [work, setWork] = useState<WorkType | null>(null);

  useEffect(() => {
    const fetchWorkDetail = async (workId: string) => {
      try {
        const response = await fetch(`/api/works/${workId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch work detail");
        }
        const data = await response.json();
        setWork(data);
      } catch (error) {
        console.error("Error fetching work detail:", error);
      }
    };

    if (id) {
      fetchWorkDetail(id);
    }
  }, [id]);

  return (
    <div>
      <p>{id}</p>
      <p>{work?.title}</p>
    </div>
  );
};

export default WorkDetail;
