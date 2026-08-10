export type WorkCategory = "digital" | "graphic";

export interface WorkImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export interface Work {
  id: string;
  category?: WorkCategory;
  workType?: string;
  title: string;
  thumbnail: string;
  summary: string;
  gallery?: WorkImage[];
  concept?: string;
  target?: string;
  tools?: {
    name: string;
  }[];
  tech?: {
    name: string;
  }[];
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
}

export interface WorksResponse {
  works: Work[];
  totalCount: number;
}
