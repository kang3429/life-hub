import Link from "next/link";
import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import { CalculatorCard, PostCard } from "@/components/Cards";
import { calculators, getCalculator } from "@/lib/calculators";
import { getLatestPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getCalculator("k-pass");
  const others = calculators.filter((c) => c.slug !== "k-pass");
  const posts = getLatestPosts(4);

  return (
    <div>
      {/* 히어로 */}
      <section className="rounded-3xl border border-ink-200/70 bg-gradient-to-b from-white to-brand-50/60 px-6 py-10 shadow-sm sm:px-10 sm:py-14">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-200">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          2026년 기준 · 매달 갱신
        </span>
        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-[2.7rem]">
          생활비 아끼는 계산,
          <br className="sm:hidden" /> 1분이면 끝납니다
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-700 sm:text-base">
          복잡한 정부 혜택과 보험·세금 규정을 공개된 기준 그대로 계산해 드립니다.
          숫자만 넣으면 <strong className="font-semibold text-ink-900">얼마를 돌려받는지</strong> 바로 보여 드려요.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/calc/k-pass"
            className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            K-패스 환급액 계산하기
          </Link>
          <Link
            href="/posts"
            className="rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            정보글 둘러보기
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-200/60 pt-5 text-center sm:max-w-md">
          <div>
            <dt className="text-[11px] font-semibold text-ink-500">계산기</dt>
            <dd className="mt-0.5 text-lg font-extrabold text-ink-900">{calculators.length}종</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold text-ink-500">정보글</dt>
            <dd className="mt-0.5 text-lg font-extrabold text-ink-900">{posts.length > 0 ? `${posts.length}+` : "0"}편</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold text-ink-500">회원가입</dt>
            <dd className="mt-0.5 text-lg font-extrabold text-ink-900">불필요</dd>
          </div>
        </dl>
      </section>

      {/* 대표 계산기 */}
      {featured && (
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-ink-900">이번 주 추천 계산기</h2>
              <p className="mt-1 text-sm text-ink-500">지금 가장 많이 찾는 계산기부터 확인해 보세요.</p>
            </div>
          </div>
          <Link
            href={featured.href}
            className="group mt-5 block overflow-hidden rounded-3xl border border-brand-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{featured.emoji}</span>
                  <span className="rounded-full bg-brand-600/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
                    NEW · 2026 개편 반영
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-extrabold leading-snug text-ink-900 sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{featured.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                <div className="rounded-2xl bg-brand-50 px-5 py-4 text-center">
                  <p className="text-[11px] font-semibold text-brand-700">월 7만원 이용 시</p>
                  <p className="mt-1 text-2xl font-extrabold text-brand-700">최대 21,000원</p>
                  <p className="text-[11px] text-brand-700/70">청년 30% · 기본형 기준</p>
                </div>
                <span className="text-sm font-bold text-brand-700 group-hover:underline group-hover:underline-offset-4">
                  내 환급액 계산하기 →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 계산기 목록 */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900">계산기 · 웹툴</h2>
        <p className="mt-1 text-sm text-ink-500">매달 순차적으로 추가되고 있어요. 필요한 계산기가 있으면 알려 주세요.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      </section>

      <AdSlot label="광고" />

      {/* 최신 글 */}
      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900">최신 정보글</h2>
            <p className="mt-1 text-sm text-ink-500">제도가 바뀌면 가장 먼저 정리해 올립니다.</p>
          </div>
          <Link href="/posts" className="shrink-0 text-sm font-bold text-brand-700 hover:underline hover:underline-offset-4">
            전체 보기 →
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="rounded-2xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
              아직 글이 없습니다. <code className="rounded bg-ink-100 px-1.5 py-0.5">content/posts</code> 폴더에
              마크다운 파일을 넣으면 자동으로 글이 추가됩니다.
            </p>
          )}
        </div>
      </section>

      {/* 신뢰 섹션 */}
      <section className="mt-14 grid gap-4 rounded-3xl bg-ink-900 p-6 text-white sm:grid-cols-3 sm:p-8">
        <div className="sm:col-span-1">
          <h2 className="text-lg font-extrabold leading-snug">
            기준을 밝히고,
            <br />
            숫자로만 말합니다
          </h2>
        </div>
        <ul className="space-y-3 text-sm leading-relaxed text-white/80 sm:col-span-2">
          <li>
            <strong className="text-white">① 출처를 표시합니다.</strong> 모든 계산기와 글 하단에 근거가 된 공식 자료와
            기준일을 적습니다.
          </li>
          <li>
            <strong className="text-white">② 입력값은 저장하지 않습니다.</strong> 계산은 전부 브라우저 안에서만
            이뤄지고 서버로 보내지 않습니다.
          </li>
          <li>
            <strong className="text-white">③ 결과는 참고용입니다.</strong> 실제 지급액은 소관 기관의 최종 심사로
            정해지며, {site.name}는 그 결정에 관여하지 않습니다.
          </li>
        </ul>
      </section>
    </div>
  );
}
