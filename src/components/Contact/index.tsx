import "./styles.css";
import Title from "../ui/Title";
import ContactForm from "../ContactForm";

const Contact = () => {
  return (
    <section id="contact">
      <Title text="Contact Me" />
      <p>ご質問やお仕事の依頼など、お気軽にご連絡ください。</p>
      <ContactForm />
    </section>
  );
};

export default Contact;
