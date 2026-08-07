import "./styles.css";
import React, { useCallback, useState } from "react";
import Turnstile from "../ui/Turnstile";

const FORM_STATUS = {
  IDLE: "idle",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR: "error",
} as const;

type FormStatus = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [affiliation, setAffiliation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>(FORM_STATUS.IDLE);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(FORM_STATUS.SENDING);
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          affiliation,
          email,
          message,
          turnstileToken,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("サーバーからの応答が不正です。");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus(FORM_STATUS.SUCCESS);
      setFeedbackMessage("メッセージが送信されました。ありがとうございます!");
      setName("");
      setAffiliation("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(FORM_STATUS.ERROR);
      if (error instanceof Error) {
        setFeedbackMessage("送信に失敗しました");
      } else {
        setFeedbackMessage("送信に失敗しました");
      }
    } finally {
      setTurnstileResetSignal((current) => current + 1);
    }
  };

  const isSending = status === FORM_STATUS.SENDING;

  return (
    <form onSubmit={handleSubmit} method="POST" className="contact-form">
      <div>
        <label htmlFor="name">名前</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
          maxLength={100}
        />
      </div>
      <div>
        <label htmlFor="affiliation">所属</label>
        <input
          type="text"
          name="affiliation"
          id="affiliation"
          value={affiliation}
          maxLength={200}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAffiliation(e.target.value)
          }
        />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          maxLength={254}
        />
      </div>
      <div>
        <label htmlFor="message">メッセージ</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          required
          maxLength={5000}
        />
      </div>
      <Turnstile
        onTokenChange={handleTurnstileToken}
        resetSignal={turnstileResetSignal}
      />
      <button type="submit" disabled={isSending || !turnstileToken}>
        {isSending ? "送信中..." : "送信する"}
      </button>

      {status === FORM_STATUS.SUCCESS && (
        <p className="success-message" role="status" aria-live="polite">
          {feedbackMessage}
        </p>
      )}
      {status === FORM_STATUS.ERROR && (
        <p className="error-message" role="alert">
          {feedbackMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
