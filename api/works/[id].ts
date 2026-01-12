import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSWorkResponse } from "../../src/types/microCMS/index.js";
import { Work as WorkType } from "../../src/types/work.js";

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

    const formattedData: WorkType = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      summary: data.summary,
      tech: data.tech?.map((techItem) => ({
        name: techItem.name,
      })),
      awards: data.awards,
      background: data.background,
      purpose: data.purpose,
      function: data.function,
      number: data.number,
      role: data.role,
      presentation: data.presentation,
      duration: data.duration,
      webUrl: data.webUrl,
      github: data.github,
      outname: data.outname,
      outLink: data.outLink,
      date: data.date,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching work detail:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
