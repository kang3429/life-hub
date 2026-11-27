import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-ink-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-base font-extrabold text-ink-900">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              {site.description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink-500">
            <Link href="/calc" className="hover:text-brand-700">
              계산기
            </Link>
            <Link href="/posts" className="hover:text-brand-700">
              정보글
            </Link>
            <Link href="/about" className="hover:text-brand-700">
              사이트 소개
            </Link>
            <Link href="/privacy" className="hover:text-brand-700">
              개인정보처리방침
            </Link>
          </nav>
        </div>

        <div className="mt-8 space-y-1.5 border-t border-ink-100 pt-6 text-xs leading-relaxed text-ink-500">
          <p>
            {site.name}의 계산 결과는 공개된 제도 기준으로 계산한 <strong className="font-semibold text-ink-700">참고용 추정치</strong>
            입니다. 실제 지급액·요금은 소관 기관과 카드사·보험사의 최종 심사 기준을 따릅니다.
          </p>
          <p>
            본 사이트는 Google AdSense를 통해 광고를 게재하며, 일부 링크는 제휴 링크일 수 있습니다.
            광고 수익은 콘텐츠 제작과 데이터 갱신에 사용됩니다.
          </p>
          <p className="pt-2 text-ink-500/80">
            © {new Date().getFullYear()} {site.name}. 문의: {site.contactEmail}
          </p>
        </div>
      </div>
    </footer>
  );
}
