import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parser } from "rich-editor-to-markdown-parser";
import type { Work } from "../../types/work";

interface GraphicWorkDetailProps {
  work: Work;
}

const GraphicWorkDetail = ({ work }: GraphicWorkDetailProps) => {
  const gallery = work.gallery ?? [];

  return (
    <article className="graphic-work-detail">
      <header className="work-detail-heading">
        <p className="work-detail-type">{work.workType ?? "Graphic Design"}</p>
        <h1>{work.title}</h1>
        <p className="summary">{work.summary}</p>
      </header>

      <figure className="graphic-work-hero">
        <img src={work.thumbnail} alt={work.title} loading="eager" decoding="async" />
      </figure>

      <div className="graphic-work-story">
        {(work.concept || work.background || work.purpose) && (
          <section className="graphic-work-section">
            <p className="graphic-work-section-label">Concept</p>
            <h3>デザインの考え方</h3>
            <p>{work.concept ?? work.background ?? work.purpose}</p>
          </section>
        )}

        <dl className="graphic-work-meta">
          {work.target && (
            <div>
              <dt>Target</dt>
              <dd>{work.target}</dd>
            </div>
          )}
          {work.role && work.role.length > 0 && (
            <div>
              <dt>Role</dt>
              <dd>{work.role.join(" / ")}</dd>
            </div>
          )}
          {work.tools && work.tools.length > 0 && (
            <div>
              <dt>Tools</dt>
              <dd>{work.tools.map((tool) => tool.name).join(" / ")}</dd>
            </div>
          )}
          {work.duration && (
            <div>
              <dt>Duration</dt>
              <dd>{work.duration}</dd>
            </div>
          )}
          {work.date && (
            <div>
              <dt>Date</dt>
              <dd>{work.date}</dd>
            </div>
          )}
        </dl>
      </div>

      {gallery.length > 0 && (
        <div className="graphic-work-gallery">
          {gallery.map((image, index) => (
            <figure key={`${image.url}-${index}`}>
              <img
                src={image.url}
                alt={image.alt ?? `${work.title}の展開例 ${index + 1}`}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {work.description && (
        <section className="graphic-work-description">
          <p className="graphic-work-section-label">Details</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {parser(work.description)}
          </ReactMarkdown>
        </section>
      )}
    </article>
  );
};

export default GraphicWorkDetail;
