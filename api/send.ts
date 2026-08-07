import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "./types.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = "contact@u5u5u5u.work";
const toEmail = "kyutech.joko@gmail.com";

interface RequestBody {
  name: string;
  affiliation?: string;
  email: string;
  message: string;
  turnstileToken: string;
}

interface TurnstileResult {
  success?: boolean;
  action?: string;
  hostname?: string;
}

const expectedTurnstileAction = "contact";

const verifyTurnstile = async (
  token: unknown,
  remoteIp: string | undefined,
) => {
  const secret = process.env.TURNSTILE_SECRET;
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (
    !secret ||
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret,
          response: token,
          ...(remoteIp ? { remoteip: remoteIp } : {}),
        }),
      },
    );

    if (!response.ok) return false;

    const result = (await response.json()) as TurnstileResult;
    return (
      result.success === true &&
      result.action === expectedTurnstileAction &&
      typeof result.hostname === "string" &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
};

const MAX_LENGTHS = {
  name: 100,
  affiliation: 200,
  email: 254,
  message: 5000,
} as const;

const isStringWithin = (
  value: unknown,
  max: number,
  required = true,
): value is string =>
  typeof value === "string" &&
  value.length <= max &&
  (!required || value.trim().length > 0);

const isValidEmail = (value: unknown): value is string =>
  isStringWithin(value, MAX_LENGTHS.email) &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { name, affiliation, email, message, turnstileToken } =
      req.body as Partial<RequestBody>;

    if (
      !isStringWithin(name, MAX_LENGTHS.name) ||
      !isValidEmail(email) ||
      !isStringWithin(message, MAX_LENGTHS.message) ||
      (affiliation !== undefined &&
        !isStringWithin(affiliation, MAX_LENGTHS.affiliation, false))
    ) {
      return res.status(400).json({ error: "Invalid fields" });
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const remoteIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim();

    if (!(await verifyTurnstile(turnstileToken, remoteIp))) {
      return res.status(403).json({ error: "Turnstile verification failed" });
    }

    const { data, error } = await resend.emails.send({
      from: `ポートフォリオ訪問者 <${fromEmail}>`,
      to: [toEmail],
      subject: `ポートフォリオからのお問い合わせ: ${name.trim()}様`,
      replyTo: email,
      text: `名前: ${name.trim()}${
        affiliation?.trim() ? `\n所属: ${affiliation.trim()}` : ""
      }\nメールアドレス: ${email.trim()}\n\nメッセージ:\n${message.trim()}`,
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
