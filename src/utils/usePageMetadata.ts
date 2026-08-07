import { useEffect } from "react";

const SITE_NAME = "Yugo's Portfolio";

export const usePageMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = meta?.content;
    if (meta) meta.content = description;

    return () => {
      document.title = SITE_NAME;
      if (meta && previousDescription) meta.content = previousDescription;
    };
  }, [description, title]);
};
