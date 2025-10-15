import "./styles.css";
import Tag from "../ui/Tag";

const Work = () => {
  return (
    <a className="work-card">
      <h3>まちゃろぐ</h3>
      <p>抹茶スイーツ専用SNS. 抹茶スイーツが好きな人同士で情報共有ができる.</p>
      <div className="tags">
        <Tag text="React" />
      </div>
    </a>
  );
};

export default Work;
