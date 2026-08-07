import type { Work as WorkType } from "../../types/work";
import { Link } from "react-router-dom";
import Tag from "../ui/Tag";
import styles from "./styles.module.css";

interface WorkProps {
  work: WorkType;
}

const Work = ({ work }: WorkProps) => {
  return (
    <Link
      to={`/works/${work.id}`}
      className={styles.workCard}
      style={
        work.thumbnail
          ? {
                background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${work.thumbnail}) center/cover no-repeat`,
            }
          : undefined
      }
    >
      <h3>{work.title}</h3>
      <p>{work.summary}</p>
      <div className={styles.tags}>
        {work.tech?.map((tech) => (
          <Tag key={tech.name} text={tech.name} />
        ))}
      </div>
    </Link>
  );
};

export default Work;
