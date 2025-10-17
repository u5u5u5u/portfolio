import "./styles.css";
import Tag from "../ui/Tag";
import type { WorkType } from "../../data/works";

interface WorkProps {
  work: WorkType;
}

const Work = ({ work }: WorkProps) => {
  return (
    <a href={work.link} className="work-card">
      <h3>{work.title}</h3>
      <p>{work.description}</p>
      <div className="tags">
        {work.tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </a>
  );
};

export default Work;
