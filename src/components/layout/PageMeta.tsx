import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description: string;
};

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute("content", content);
  }
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [description, title]);

  return null;
}
