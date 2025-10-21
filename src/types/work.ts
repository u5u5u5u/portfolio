import type { Tech } from "./tech";

export interface Work {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  tech?: Tech[];
  description?: string;
  role?: string[];
  gitHubUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface WorksResponse {
  contents: Work[];
  totalCount: number;
  offset: number;
  limit: number;
}
