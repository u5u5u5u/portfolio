import Title from "../ui/Title";
import "./styles.css";
import { profile } from "../../data/profile";

const About = () => {
  return (
    <section id="about">
      <Title text="About Me" />
      <div className="about-container">
        <div className="personal-info">
          <div className="info-card">
            {profile.map((info) => (
              <div key={info.label} className="info-row">
                <div className="info-item">
                  <span className="info-label">{info.label}</span>
                  <span className="info-value">{info.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
