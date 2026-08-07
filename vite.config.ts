import { createClient } from "microcms-js-sdk";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { MicroCMSWorkResponse, MicroCMSWorksResponse } from "./src/types/microCMS/index.js";
import type { WorksResponse } from "./src/types/work.js";
import { formatWork } from "./src/utils/work.js";

const parseIntegerParam = (
  value: string | null,
  fallback: number,
  minimum: number,
  maximum: number,
) => {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : null;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "portfolio-dev-api",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.method !== "GET" || !req.url) {
              return next();
            }

            const url = new URL(req.url, "http://localhost");

            if (!url.pathname.startsWith("/api/works")) {
              return next();
            }

            const serviceDomain = env.MICROCMS_SERVICE_DOMAIN;
            const apiKey = env.MICROCMS_API_KEY;

            if (!serviceDomain || !apiKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Missing microCMS environment variables",
                })
              );
              return;
            }

            const client = createClient({ serviceDomain, apiKey });

            try {
              if (url.pathname === "/api/works") {
                const limit = parseIntegerParam(
                  url.searchParams.get("limit"),
                  10,
                  1,
                  100,
                );
                const offset = parseIntegerParam(
                  url.searchParams.get("offset"),
                  0,
                  0,
                  10_000,
                );
                const orders = url.searchParams.get("orders");

                if (
                  limit === null ||
                  offset === null ||
                  (orders !== null &&
                    orders !== "publishedAt" &&
                    orders !== "-publishedAt")
                ) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Invalid query parameters" }));
                  return;
                }

                const data = await client.get<MicroCMSWorksResponse>({
                  endpoint: "works",
                  queries: {
                    limit,
                    offset,
                    ...(orders ? { orders } : {}),
                  },
                });

                const formattedData: WorksResponse = {
                  works: data.contents.map(formatWork),
                  totalCount: data.totalCount,
                };

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(formattedData));
                return;
              }

              const idMatch = url.pathname.match(/^\/api\/works\/([^/]+)$/);

              if (idMatch) {
                const data = await client.get<MicroCMSWorkResponse>({
                  endpoint: "works",
                  contentId: idMatch[1],
                });

                const formattedData = formatWork(data);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(formattedData));
                return;
              }

              return next();
            } catch (error) {
              console.error("Error fetching works in Vite dev server:", error);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Failed to fetch works",
                })
              );
            }
          });
        },
      },
    ],
  };
});
