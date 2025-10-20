import "./styles.css";

const ContactForm = () => {
  return (
    <form
      action=""
      method="POST"
      className="contact-form"
    >
      <div>
        <label htmlFor="name">名前</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="affiliation">所属</label>
        <input type="text" name="affiliation" />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">メッセージ</label>
        <textarea name="message" rows={5} required></textarea>
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default ContactForm;
