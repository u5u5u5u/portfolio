export interface Tech {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSWorksResponse {
  contents: {
    id: string;
    title: string;
    thumbnail: string;
    summary: string;
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
  }[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface MicroCMSWorkResponse {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
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
