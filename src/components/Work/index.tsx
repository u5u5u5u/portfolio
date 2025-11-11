import type { Work as WorkType } from "../../types/work";
import Tag from "../ui/Tag";
import "./styles.css";

interface WorkProps {
  work: WorkType;
}

const Work = ({ work }: WorkProps) => {
  return (
    <a
      href={`/works/${work.id}`}
      className="work-card"
      style={
        work.thumbnail
          ? {
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${work.thumbnail}) center/cover no-repeat`,
            }
          : undefined
      }
    >
      <h3>{work.title}</h3>
      <p>{work.summary}</p>
      <div className="tags">
        {work.tech?.map((tech) => (
          <Tag key={tech.name} text={tech.name} />
        ))}
      </div>
    </a>
  );
};

export default Work;
