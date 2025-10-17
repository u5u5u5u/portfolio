import "./styles.css";

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return <span className="tag">{text}</span>;
};

export default Tag;
