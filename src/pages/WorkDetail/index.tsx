import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import type { Work as WorkType } from "../../types/work";
import "./styles.css";

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
        console.log("Fetched work detail:", data);
      } catch (error) {
        console.error("Error fetching work detail:", error);
      }
    };

    if (id) {
      fetchWorkDetail(id);
    }
  }, [id]);

  const tableRows = [
    {
      label: "使用技術",
      value: work?.tech?.map((tech) => (
        <p key={tech.name} className="tech">
          {tech.name}
        </p>
      )),
      condition: true,
    },
    {
      label: "受賞",
      value: work?.awards?.map((award) => <p key={award}>{award}</p>),
      condition: (work?.awards?.length ?? 0) > 0,
    },
    { label: "背景", value: work?.background, condition: work?.background },
    { label: "目的", value: work?.purpose, condition: work?.purpose },
    {
      label: "機能",
      value: work?.function?.map((func) => <p key={func}>{func}</p>),
      condition: (work?.function?.length ?? 0) > 0,
    },
    { label: "制作人数", value: `${work?.number}人`, condition: work?.number },
    {
      label: "担当",
      value: work?.role?.map((role) => <p key={role}>{role}</p>),
      condition: (work?.role?.length ?? 0) > 0,
    },
    {
      label: "発表",
      value: work?.presentation?.map((presen) => <p key={presen}>{presen}</p>),
      condition: (work?.presentation?.length ?? 0) > 0,
    },
    { label: "制作期間", value: work?.duration, condition: work?.duration },
    {
      label: "Webサイト",
      value: <Link to={work?.webUrl || ""}>{work?.webUrl}</Link>,
      condition: work?.webUrl,
    },
    {
      label: "GitHub",
      value: <Link to={work?.github || ""}>{work?.github}</Link>,
      condition: work?.github,
    },
    {
      label: "外部記事",
      value: <Link to={work?.outLink || ""}>{work?.outname}</Link>,
      condition: work?.outLink && work?.outname,
    },
    { label: "制作日", value: work?.date, condition: work?.date },
    {
      label: "詳細説明",
      value: work?.description,
      condition: work?.description,
    },
  ];

  return (
    <div className="work-detail">
      {work ? (
        <>
          <h1>{work.title}</h1>
          <p className="summary">{work.summary}</p>
          <img src={work.thumbnail} alt={work.title} />
          <table>
            <tbody>
              {tableRows.map((row, index) =>
                row.condition ? (
                  <tr key={index}>
                    <th>{row.label}</th>
                    <td
                      className={
                        row.label === "使用技術" || row.label === "担当"
                          ? "row"
                          : row.label === "受賞" ||
                            row.label === "機能" ||
                            row.label === "発表"
                          ? "column"
                          : ""
                      }
                    >
                      {row.label === "詳細説明" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {parser(row.value as string)}
                        </ReactMarkdown>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WorkDetail;
