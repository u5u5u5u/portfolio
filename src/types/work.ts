export interface Work {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
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
