import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: "이 사이트가 무엇을 계산하고 어떻게 검증하는지, 광고와 제휴 운영 원칙을 안내합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">사이트 소개</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
        {site.name}는 정부 혜택·환급·보험·세금처럼 <strong className="font-semibold text-ink-900">돈과 직결되는 생활 정보</strong>를
        숫자로 확인할 수 있게 만든 사이트입니다. 기사나 블로그를 읽고 계산기를 따로 찾아 헤매지 않도록, 정보와 계산을 한
        페이지에 두는 것을 원칙으로 합니다.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold text-ink-900">이렇게 만듭니다</h2>
        <ol className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink-700">
          <li>
            <strong className="font-bold text-ink-900">1. 공식 자료를 먼저 봅니다.</strong> 소관 부처·공공기관의 안내와
            법령·공고를 기준으로 정리하고, 글과 계산기 하단에 출처와 기준일을 적습니다.
          </li>
          <li>
            <strong className="font-bold text-ink-900">2. 계산식은 공개합니다.</strong> 어떤 값을 어떻게 계산했는지
            페이지에 그대로 적어, 결과를 스스로 검산할 수 있게 합니다.
          </li>
          <li>
            <strong className="font-bold text-ink-900">3. 바뀌면 다시 봅니다.</strong> 제도가 개편되면 관련 글과 계산기를
            함께 갱신하고, 수정 날짜를 표시합니다.
          </li>
          <li>
            <strong className="font-bold text-ink-900">4. 입력값은 저장하지 않습니다.</strong> 계산은 브라우저 안에서만
            이뤄지고 서버로 전송되지 않습니다.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold text-ink-900">광고와 제휴</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
          {site.name}는 Google AdSense를 통해 광고를 게재합니다. 광고 수익은 서버 운영과 자료 갱신에 사용됩니다. 일부
          링크는 제휴 링크일 수 있으며, 이 경우 글 안에 표시합니다. 광고와 제휴 여부는 콘텐츠의 결론에 영향을 주지
          않습니다.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
          계산 결과와 정보는 참고용이며, 금융·보험·세무 자문이 아닙니다. 실제 지급·부과 금액은 소관 기관과 계약 조건에
          따라 달라집니다.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold text-ink-900">문의</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
          잘못된 정보 제보, 추가되었으면 하는 계산기 제안은{" "}
          <a href={`mailto:${site.contactEmail}`} className="font-semibold text-brand-700 hover:underline">
            {site.contactEmail}
          </a>
          로 보내 주세요. 확인 후 반영하겠습니다.
        </p>
      </section>

      <p className="mt-8 text-[13px] text-ink-500">
        개인정보 처리에 관한 내용은{" "}
        <Link href="/privacy" className="font-semibold text-brand-700 hover:underline">
          개인정보처리방침
        </Link>
        에서 확인하실 수 있습니다.
      </p>
    </div>
  );
}
