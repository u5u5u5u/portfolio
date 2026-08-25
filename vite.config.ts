import { createClient } from "microcms-js-sdk";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import type { MicroCMSWorkResponse, MicroCMSWorksResponse } from "./src/types/microCMS/index.js";
import type { WorksResponse } from "./src/types/work.js";
import { formatWork } from "./src/utils/work.js";

const SITE_ORIGIN = "https://www.u5u5u5u.work";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const createWorkHtml = (
  template: string,
  work: ReturnType<typeof formatWork>,
) => {
  const title = `${work.title} | Yugo's Portfolio`;
  const description = work.summary || "制作実績の詳細です。";
  const canonicalUrl = `${SITE_ORIGIN}/works/${encodeURIComponent(work.id)}`;
  const socialImage = work.thumbnail
    ? `<meta property="og:image" content="${escapeHtml(work.thumbnail)}" />\n    <meta name="twitter:card" content="summary_large_image" />`
    : '<meta name="twitter:card" content="summary" />';
  const socialMetadata = [
    `<link rel="canonical" href="${canonicalUrl}" />`,
    '<meta property="og:type" content="article" />',
    `<meta property="og:site_name" content="Yugo's Portfolio" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    socialImage,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ].join("\n    ");
  const initialContent = [
    '<main id="seo-content">',
    "  <article>",
    `    <h1>${escapeHtml(work.title)}</h1>`,
    `    <p>${escapeHtml(description)}</p>`,
    "  </article>",
    "</main>",
  ].join("\n");

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/s,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace("  </head>", `    ${socialMetadata}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${initialContent}</div>`);
};

const createWorkPrerenderPlugin = (
  serviceDomain: string | undefined,
  apiKey: string | undefined,
) => ({
  name: "portfolio-work-prerender",
  apply: "build" as const,
  async closeBundle() {
    if (!serviceDomain || !apiKey) {
      throw new Error(
        "MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required to prerender work pages",
      );
    }

    const client = createClient({ serviceDomain, apiKey });
    const works: MicroCMSWorkResponse[] = [];
    const limit = 100;
    let offset = 0;
    let totalCount = 0;

    do {
      const data = await client.get<MicroCMSWorksResponse>({
        endpoint: "works",
        queries: { limit, offset },
      });
      works.push(...data.contents);
      totalCount = data.totalCount;
      offset += data.contents.length;
    } while (offset < totalCount);

    const outputDirectory = path.resolve(process.cwd(), "dist");
    const template = await readFile(
      path.join(outputDirectory, "index.html"),
      "utf8",
    );

    await Promise.all(
      works.map(async (rawWork) => {
        if (!/^[a-zA-Z0-9_-]+$/.test(rawWork.id)) {
          throw new Error(`Invalid work id for prerendering: ${rawWork.id}`);
        }

        const directory = path.join(outputDirectory, "works", rawWork.id);
        await mkdir(directory, { recursive: true });
        await writeFile(
          path.join(directory, "index.html"),
          createWorkHtml(template, formatWork(rawWork)),
        );
      }),
    );
  },
});

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
      createWorkPrerenderPlugin(
        env.MICROCMS_SERVICE_DOMAIN,
        env.MICROCMS_API_KEY,
      ),
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
