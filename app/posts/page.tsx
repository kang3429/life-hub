import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { PostCard } from "@/components/Cards";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "정보글",
  description: "정부 혜택·환급·보험·세금처럼 돈과 직결되는 생활 정보를 2026년 기준으로 정리합니다.",
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">정보글</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-700">
        제도가 바뀔 때마다 근거 자료를 확인하고 다시 정리합니다. 글마다 기준일과 출처를 표시합니다.
      </p>

      <div className="mt-6 grid gap-3">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="rounded-2xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
            아직 등록된 글이 없습니다.
          </p>
        )}
      </div>

      <AdSlot label="광고" />

      <p className="mt-6 text-sm text-ink-500">
        궁금한 주제가 있다면 <Link href="/about" className="font-semibold text-brand-700 hover:underline">문의</Link>로
        알려 주세요.
      </p>
    </div>
  );
}
