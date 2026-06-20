/**
 * lib/utils.ts
 * ─────────────────────────────────────────────────────────
 * Utility helpers shared across the application.
 * ─────────────────────────────────────────────────────────
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

/**
 * Constructs an absolute URL using siteConfig.url, guaranteeing no double slashes.
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = siteConfig.url.endsWith("/") ? siteConfig.url.slice(0, -1) : siteConfig.url;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}


/**
 * Merges class names with Tailwind CSS conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge
 * (deduplication of conflicting Tailwind utilities).
 *
 * @example
 * cn("px-4 py-2", condition && "bg-blue-500", "px-6")
 * // → "py-2 bg-blue-500 px-6"  (px-4 is overridden by px-6)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO partial date string ("YYYY-MM") to a human-readable
 * month + year label, e.g. "Jun 2023".
 */
export function formatDate(isoDate: string): string {
  if (isoDate === "present") return "Present";
  const [year, month] = isoDate.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Computes the duration between two ISO partial date strings.
 * Returns a string like "1 yr 3 mos".
 */
export function getDuration(start: string, end: string | "present"): string {
  const startDate = new Date(start + "-01");
  const endDate = end === "present" ? new Date() : new Date(end + "-01");

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
  if (remainingMonths === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
  return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
}
