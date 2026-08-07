import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSWorksResponse } from "../../src/types/microCMS/index.js";
import type { WorksResponse } from "../../src/types/work.js";
import { formatWork } from "../../src/utils/work.js";

const parseIntegerQuery = (
  value: string | string[] | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
) => {
  if (value === undefined) return fallback;
  if (Array.isArray(value) || !/^\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : null;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    });

    const limit = parseIntegerQuery(req.query.limit, 10, 1, 100);
    const offset = parseIntegerQuery(req.query.offset, 0, 0, 10_000);
    const orders = req.query.orders;

    if (
      limit === null ||
      offset === null ||
      (orders !== undefined && orders !== "publishedAt" && orders !== "-publishedAt")
    ) {
      return res.status(400).json({ error: "Invalid query parameters" });
    }

    const data = await client.get<MicroCMSWorksResponse>({
      endpoint: "works",
      queries: {
        limit,
        offset,
        ...(typeof orders === "string" ? { orders } : {}),
      },
    });

    const formattedData: WorksResponse = {
      works: data.contents.map(formatWork),
      totalCount: data.totalCount,
    };

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching works from microCMS:", error);
    return res.status(500).json({ error: "Failed to fetch works" });
  }
};
