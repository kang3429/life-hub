import type { Metadata } from "next";
import { CalculatorCard } from "@/components/Cards";
import AdSlot from "@/components/AdSlot";
import { calculators } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "계산기 · 웹툴 전체 보기",
  description:
    "K-패스 환급액, 연말정산, 자동차보험료, 다자녀 혜택, 전기요금까지 생활비와 직결되는 계산기를 한곳에서 확인하세요.",
  alternates: { canonical: "/calc" },
};

export default function CalcIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">계산기 · 웹툴</h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-700">
        숫자만 넣으면 바로 결과가 나오는 계산기입니다. 회원가입 없이, 입력값 저장 없이 동작합니다.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <CalculatorCard key={calc.slug} calc={calc} />
        ))}
      </div>
      <AdSlot label="광고" />
    </div>
  );
}
