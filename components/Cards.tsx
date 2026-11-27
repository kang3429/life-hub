import Link from "next/link";
import type { CalculatorMeta } from "@/lib/calculators";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  const isLive = calc.status === "live";
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-xl">
          {calc.emoji}
        </span>
        {isLive ? (
          <span className="rounded-full bg-brand-600/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
            바로 계산
          </span>
        ) : (
          <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-500">
            준비 중
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-bold leading-snug text-ink-900">{calc.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">{calc.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {calc.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-500">
            #{tag}
          </span>
        ))}
      </div>
    </>
  );

  if (!isLive) {
    return (
      <div className="cursor-default rounded-2xl border border-ink-200/80 bg-white/70 p-5 opacity-90">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={calc.href}
      className="group rounded-2xl border border-ink-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      {body}
      <p className="mt-4 text-sm font-bold text-brand-700 group-hover:underline group-hover:underline-offset-4">
        계산하러 가기 →
      </p>
    </Link>
  );
}

export function PostCard({ post, compact = false }: { post: PostMeta; compact?: boolean }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex items-start gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm"
    >
      {!compact && (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink-50 text-xl">
          {post.emoji ?? "📄"}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          {formatDate(post.date)}
          {post.tags[0] ? ` · ${post.tags[0]}` : ""}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-ink-900 group-hover:text-brand-700">
          {post.title}
        </h3>
        {!compact && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">{post.description}</p>
        )}
      </div>
    </Link>
  );
}
