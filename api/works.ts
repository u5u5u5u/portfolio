import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "microcms-js-sdk";
import type { WorksResponse } from "../src/types/work";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    });

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const data = await client.get<WorksResponse>({
      endpoint: "works",
      queries: {
        limit,
        offset,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching works from microCMS:", error);
    return res.status(500).json({
      error: "Failed to fetch works",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
