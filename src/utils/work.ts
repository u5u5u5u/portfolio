import type { MicroCMSWorkResponse } from "../types/microCMS";
import type { Work } from "../types/work";

export const formatWork = (work: MicroCMSWorkResponse): Work => ({
  id: work.id,
  title: work.title,
  thumbnail: work.thumbnail,
  summary: work.summary,
  tech: work.tech?.map(({ name }) => ({ name })),
  awards: work.awards,
  background: work.background,
  purpose: work.purpose,
  function: work.function,
  number: work.number,
  role: work.role,
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
});
