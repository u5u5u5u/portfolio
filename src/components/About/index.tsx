import Title from "../ui/Title";
import "./styles.css";
import { profile, experience } from "../../data/profile";

const About = () => {
  return (
    <section id="about">
      <Title text="About Me" />
      <div>
        <p>{profile.bio}</p>
        <div className="personal-info">
          <h3>基本情報</h3>
          <ul>
            <li>
              {profile.university} {profile.grade}
            </li>
            <li>{profile.name_en}</li>
            <li>{profile.name_ja}</li>
            <li>{profile.birthYear}年生まれ</li>
            <li>{profile.birthPlace}出身</li>
          </ul>
        </div>
        <div className="experience">
          <h3>経歴</h3>
          <ul>
            {experience.map((item, index) => (
              <li key={index}>
                <strong>{item.date}</strong> {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
