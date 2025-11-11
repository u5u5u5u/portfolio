import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "microcms-js-sdk";
import type { Work as WorkType } from "../../src/types/work";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    });

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    const data = await client.get<WorkType>({
      endpoint: "works",
      contentId: id,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching work detail:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
