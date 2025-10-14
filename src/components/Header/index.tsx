import "./styles.css";

const Header = () => {
  return (
    <header>
      <img src="/icon.png" alt="icon" />
      <nav>
        <a href="#about">About</a>
        <a href="#works">Works</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
