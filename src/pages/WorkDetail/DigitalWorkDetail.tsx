import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import type { Work } from "../../types/work";

interface DigitalWorkDetailProps {
  work: Work;
}

const DigitalWorkDetail = ({ work }: DigitalWorkDetailProps) => {
  const tableRows = [
    {
      label: "使用技術",
      value: work.tech?.map((tech) => (
        <p key={tech.name} className="tech">
          {tech.name}
        </p>
      )),
      condition: (work.tech?.length ?? 0) > 0,
    },
    {
      label: "受賞",
      value: work.awards?.map((award) => <p key={award}>{award}</p>),
      condition: (work.awards?.length ?? 0) > 0,
    },
    { label: "背景", value: work.background, condition: Boolean(work.background) },
    { label: "目的", value: work.purpose, condition: Boolean(work.purpose) },
    {
      label: "機能",
      value: work.function?.map((func) => <p key={func}>{func}</p>),
      condition: (work.function?.length ?? 0) > 0,
    },
    { label: "制作人数", value: `${work.number}人`, condition: Boolean(work.number) },
    {
      label: "担当",
      value: work.role?.map((role) => <p key={role}>{role}</p>),
      condition: (work.role?.length ?? 0) > 0,
    },
    {
      label: "発表",
      value: work.presentation?.map((presentation) => (
        <p key={presentation}>{presentation}</p>
      )),
      condition: (work.presentation?.length ?? 0) > 0,
    },
    { label: "制作期間", value: work.duration, condition: Boolean(work.duration) },
    {
      label: "Webサイト",
      value: (
        <a href={work.webUrl} target="_blank" rel="noopener noreferrer">
          {work.webUrl}
        </a>
      ),
      condition: Boolean(work.webUrl),
    },
    {
      label: "GitHub",
      value: (
        <a href={work.github} target="_blank" rel="noopener noreferrer">
          {work.github}
        </a>
      ),
      condition: Boolean(work.github),
    },
    {
      label: "外部記事",
      value: (
        <a href={work.outLink} target="_blank" rel="noopener noreferrer">
          {work.outname}
        </a>
      ),
      condition: Boolean(work.outLink && work.outname),
    },
    { label: "制作日", value: work.date, condition: Boolean(work.date) },
    {
      label: "詳細説明",
      value: work.description,
      condition: Boolean(work.description),
    },
  ];

  return (
    <article className="digital-work-detail">
      <header className="work-detail-heading">
        <p className="work-detail-type">{work.workType ?? "Web / App"}</p>
        <h1>{work.title}</h1>
        <p className="summary">{work.summary}</p>
      </header>
      <img
        className="digital-work-hero"
        src={work.thumbnail}
        alt={work.title}
        loading="eager"
        decoding="async"
      />
      <table>
        <tbody>
          {tableRows.map((row) =>
            row.condition ? (
              <tr key={row.label}>
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
            ) : null,
          )}
        </tbody>
      </table>
    </article>
  );
};

export default DigitalWorkDetail;
