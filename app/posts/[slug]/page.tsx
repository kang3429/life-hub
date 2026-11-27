import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { getPost, getAllPosts, formatDate } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "글을 찾을 수 없습니다" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/posts/${post.slug}`),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: site.author },
    publisher: { "@type": "Organization", name: site.name, url: site.siteUrl },
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
    inLanguage: "ko",
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-[12px] font-medium text-ink-500">
        <Link href="/" className="hover:text-brand-700">
          홈
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/posts" className="hover:text-brand-700">
          정보글
        </Link>
      </nav>

      <header className="mt-3 border-b border-ink-200 pb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight text-ink-900 sm:text-[2rem]">
          {post.title}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{post.description}</p>
        <p className="mt-4 text-[12px] font-medium text-ink-500">
          {site.author} · {formatDate(post.date)} 발행
          {post.updated ? ` · ${formatDate(post.updated)} 업데이트` : ""}
        </p>
      </header>

      <div
        className="prose prose-ko prose-sm mt-7 max-w-none sm:prose-base"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <AdSlot label="광고" />

      <div className="mt-10 rounded-2xl bg-ink-50 p-5 text-[12.5px] leading-relaxed text-ink-700">
        <p className="font-bold text-ink-900">이 글의 기준</p>
        <p className="mt-1.5">
          공개된 공식 자료를 기준으로 정리했지만, 제도는 예고 없이 바뀔 수 있습니다. 신청·지급 전에는 소관 기관의 최신
          안내를 한 번 더 확인하세요. 수정이 필요한 내용은 문의로 알려 주시면 바로 반영합니다.
        </p>
        <p className="mt-2 text-ink-500">문의: {site.contactEmail}</p>
      </div>

      <div className="mt-6">
        <Link href="/posts" className="text-sm font-bold text-brand-700 hover:underline hover:underline-offset-4">
          ← 정보글 전체 보기
        </Link>
      </div>
    </article>
  );
}
