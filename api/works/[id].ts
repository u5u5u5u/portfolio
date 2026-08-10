import { createClient } from "microcms-js-sdk";
import type { MicroCMSWorkResponse } from "../../src/types/microCMS/index.js";
import { Work as WorkType } from "../../src/types/work.js";
import { formatWork } from "../../src/utils/work.js";
import type { VercelRequest, VercelResponse } from "../types.js";

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

    const data = await client.get<MicroCMSWorkResponse>({
      endpoint: "works",
      contentId: id,
    });

    const formattedData: WorkType = formatWork(data);

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching work detail:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      error.status === 404
    ) {
      return res.status(404).json({ error: "Work not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
