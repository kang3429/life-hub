import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  emoji?: string;
  featured?: boolean;
};

export type Post = PostMeta & { contentHtml: string };

function listFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    emoji: data.emoji ? String(data.emoji) : undefined,
    featured: Boolean(data.featured),
  };
}

/** 모든 글의 메타데이터를 최신순으로 반환합니다. */
export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return toMeta(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(limit = 5): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

/** 한 글의 메타데이터와 렌더링된 HTML을 반환합니다. */
export async function getPost(slug: string): Promise<Post | null> {
  const file = listFiles().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return { ...toMeta(slug, data), contentHtml: processed.toString() };
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${year}.${month}.${day}`;
}
