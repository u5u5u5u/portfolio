import type { Work as WorkType } from "../../types/work";
import { Link } from "wouter";
import Tag from "../ui/Tag";
import styles from "./styles.module.css";

interface WorkCardProps {
  work: WorkType;
}

const WorkCard = ({ work }: WorkCardProps) => {
  const isGraphic = work.category === "graphic";

  return (
    <Link
      href={`/works/${work.id}`}
      className={`${styles.workCard} ${isGraphic ? styles.graphic : styles.digital}`}
      style={
        work.thumbnail
          ? {
                backgroundImage: `url(${work.thumbnail})`,
            }
          : undefined
      }
    >
      <div className={styles.cardContent}>
        {work.workType && <span className={styles.workType}>{work.workType}</span>}
        <h3>{work.title}</h3>
        {!isGraphic && <p>{work.summary}</p>}
        <div className={styles.tags}>
          {(isGraphic ? work.tools : work.tech)?.map((item) => (
            <Tag key={item.name} text={item.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
