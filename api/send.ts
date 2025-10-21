import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "contact@u5u5u5u.work";
const toEmail = "kyutech.joko@gmail.com";

interface RequestBody {
  name: string;
  affiliation?: string;
  email: string;
  message: string;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, affiliation, email, message } = req.body as RequestBody;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await resend.emails.send({
      from: `ポートフォリオ訪問者 <${fromEmail}>`,
      to: [toEmail],
      subject: `ポートフォリオからのお問い合わせ: ${name}様`,
      replyTo: email,
      text: `名前: ${name}${
        affiliation ? `\n所属: ${affiliation}` : ""
      }\nメールアドレス: ${email}\n\nメッセージ:\n${message}`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
