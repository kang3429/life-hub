import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="text-5xl">🔍</p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하는 계산기를 찾아보세요.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href="/calc"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
        >
          계산기 보기
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-bold text-ink-700 hover:border-brand-300"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
