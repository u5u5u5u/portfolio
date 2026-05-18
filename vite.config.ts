import { createClient } from "microcms-js-sdk";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { MicroCMSWorkResponse, MicroCMSWorksResponse } from "./src/types/microCMS/index.js";
import type { WorksResponse } from "./src/types/work.js";

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
                const limit = url.searchParams.get("limit")
                  ? Number(url.searchParams.get("limit"))
                  : 10;
                const offset = url.searchParams.get("offset")
                  ? Number(url.searchParams.get("offset"))
                  : 0;

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

                const formattedData = {
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
                  details: error instanceof Error ? error.message : "Unknown error",
                })
              );
            }
          });
        },
      },
    ],
  };
});
