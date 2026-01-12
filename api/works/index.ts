import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSWorksResponse } from "../../src/types/microCMS/index.js";
import type { WorksResponse } from "../../src/types/work.js";

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

    const data = await client.get<MicroCMSWorksResponse>({
      endpoint: "works",
      queries: {
        limit,
        offset,
      },
    });

    const formattedData: WorksResponse = {
      works: data.contents.map((work) => ({
        id: work.id,
        title: work.title,
        thumbnail: work.thumbnail,
        summary: work.summary,
        tech: work.tech?.map((tech) => ({
          name: tech.name,
        })),
        awards: work.awards,
        background: work.background,
        purpose: work.purpose,
        function: work.function,
        number: work.number,
        presentation: work.presentation,
        duration: work.duration,
        webUrl: work.webUrl,
        github: work.github,
        outname: work.outname,
        outLink: work.outLink,
        date: work.date,
        description: work.description,
        createdAt: work.createdAt,
        updatedAt: work.updatedAt,
      })),
      totalCount: data.totalCount,
    };

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching works from microCMS:", error);
    return res.status(500).json({
      error: "Failed to fetch works",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
