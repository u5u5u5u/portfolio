import "./styles.css";
import Title from "../ui/Title";
import { skills } from "../../data/skills";

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <Title text="Skills" />
      <ul className="skill-items">
        {skills.map((skill) => (
          <li key={skill.name} className="skill-item">
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
