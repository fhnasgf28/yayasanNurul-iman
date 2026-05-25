import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a localized Indonesian date.
 */
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Used for content coming from Rich Text Editors.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "ul", "ol", "li",
        "b", "i", "u", "strong", "em", "a", "img", "blockquote", "code", "pre",
        "span", "div", "table", "thead", "tbody", "tr", "th", "td"
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel", "style"],
    });
  }
  return DOMPurify.sanitize(html);
}
