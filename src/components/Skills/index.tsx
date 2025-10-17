import "./styles.css";
import Title from "../ui/Title";
import { skills } from "../../data/skills";

const Skills = () => {
  return (
    <section id="skills">
      <Title text="Skills" />
      <div className="tagcloud-wrapper">
        <div
          className="tagcloud-controls"
          style={{ "--num-elements": skills.length } as React.CSSProperties}
        >
          {/* {Array.from({ length: skills.length }, (_, i) => (
            <div
              key={i}
              className="tagcloud-control-button"
              style={{ "--index": (i + 1).toString() } as React.CSSProperties}
            >
              <input type="radio" className="tagcloud-control-input" />
            </div>
          ))} */}
          <div className="tagcloud-rotation">
            <ul
              className="tagcloud-tags"
              style={{ "--num-elements": skills.length } as React.CSSProperties}
            >
              {skills.map((skill, i) => (
                <li
                  key={skill.name}
                  className="tagcloud-tag"
                  style={
                    { "--index": (i + 1).toString() } as React.CSSProperties
                  }
                >
                  <div>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skillicon"
                    />
                    <span>{skill.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
