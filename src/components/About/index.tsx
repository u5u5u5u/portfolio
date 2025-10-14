import Title from "../ui/Title";
import "./styles.css";

const About = () => {
  return (
    <section id="about">
      <Title text="About Me" />
      <div>
        <p>
          現在,大学で機械学習や画像処理を学び,その傍らでweb開発にも励む.
          開発では,主にフロントエンドとデザインを担当.
        </p>
        <div className="personal-info">
          <h3>基本情報</h3>
          <ul>
            <li>
              九州工業大学 情報工学部 知能情報工学科 メディア情報学コース
              学部3年
            </li>
            <li>陣内 勇冴 (Jinnai Yugo)</li>
            <li>2003年生まれ</li>
            <li>熊本県出身</li>
          </ul>
        </div>
        <div className="experience">
          <h3>経歴</h3>
          <ul>
            <li>2023.04 九州工業大学 情報工学部 入学</li>
            <li>
              2023.05 ハッカソン 初出場（ハックツハッカソン ツマグロカップ）
            </li>
            <li>2023.09 株式会社KINS 就職（インターンシップとして）</li>
            <li>2024.11 地球っ子ネットワークHP 公開</li>
            <li>2024.09 若手工学アカデミーグラント 採択</li>
            <li>2024.10 e-ZUKAスマートアプリコンテスト 市長賞 & TRIART賞</li>
            <li>2024.12 チャレキャラ 学び研growth賞</li>
            <li>2023.12 KCL Hack 優秀賞</li>
            <li>2024.03 Penguin Hack 優秀賞</li>
            <li>2024.12 ハックツハッカソン アンキロカップ 出場 経歴 </li>
            <li>2025.01 データエンジニアカタパルト 修了</li>
            <li>2025.03 StepByHackathon 出場</li>
            <li>2025.06 まちゃろぐ リリース</li>
            <li>2025.10 e-ZUKAスマートアプリコンテスト ODS賞</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
