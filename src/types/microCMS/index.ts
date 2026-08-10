export interface Tech {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export type MicroCMSWorkCategory = "digital" | "graphic";

interface MicroCMSWorkFields {
  id: string;
  category?: MicroCMSWorkCategory[];
  workType?: string;
  title: string;
  thumbnail: string;
  summary: string;
  gallery?: MicroCMSImage[];
  concept?: string;
  target?: string;
  tools?: string[];
  tech?: Tech[];
  awards?: string[];
  background?: string;
  purpose?: string;
  function?: string[];
  number?: number;
  role?: string[];
  presentation?: string[];
  duration?: string;
  webUrl?: string;
  github?: string;
  outname?: string;
  outLink?: string;
  date?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSWorksResponse {
  contents: MicroCMSWorkFields[];
  totalCount: number;
  offset: number;
  limit: number;
}

export type MicroCMSWorkResponse = MicroCMSWorkFields;
