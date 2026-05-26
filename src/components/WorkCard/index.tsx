import type { Work as WorkType } from "../../types/work";
import Tag from "../ui/Tag";
import styles from "./styles.module.css";

interface WorkCardProps {
  work: WorkType;
}

const WorkCard = ({ work }: WorkCardProps) => {
  return (
    <a
      href={`/works/${work.id}`}
      className={styles.workCard}
      style={
        work.thumbnail
          ? {
                background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${work.thumbnail}) center/cover no-repeat`,
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
    </a>
  );
};

export default WorkCard;
