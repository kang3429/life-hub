import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import KPassCalculator from "@/components/KPassCalculator";
import { absoluteUrl, site } from "@/lib/site";
import { getLatestPosts } from "@/lib/posts";
import { PostCard } from "@/components/Cards";

const TITLE = "K-패스(모두의 카드) 월 환급액 계산기";
const DESCRIPTION =
  "2026년 기준 K-패스(모두의 카드) 환급액을 계산합니다. 일반 20%·청년 30%·2자녀 30%·3자녀 50%·저소득 53.3%에 시차 출퇴근 추가 환급, 일반형·플러스형 정액 환급까지 비교해 가장 유리한 금액을 보여 드립니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/calc/k-pass" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/calc/k-pass"), type: "website" },
};

const faqs = [
  {
    q: "월 15회를 못 채우면 환급이 아예 없나요?",
    a: "네. 매월 1일~말일 기준 15회 이상 이용해야 환급됩니다. 다만 가입한 첫 달은 15회 미만이어도 지급됩니다. 환승은 한 번의 통행으로 묶여 1회로 계산됩니다.",
  },
  {
    q: "예전에 있던 월 60회 제한은 없어졌나요?",
    a: "2026년 모두의 카드 기준으로는 월 최대 이용 횟수 제한이 없습니다. 60회 제한이 적힌 자료는 과거 기준이니 현재 계산에 적용하지 않아도 됩니다.",
  },
  {
    q: "정률형이 유리한가요, 정액형이 유리한가요?",
    a: "매달 자동으로 비교됩니다. 기본형(정률)·일반형·플러스형 세 가지 중 환급금이 가장 큰 방식이 적용되므로, 교통비가 적으면 정률형이, 많으면 정액형이 유리한 경우가 많습니다. 이 계산기에서 세 가지를 한 번에 비교할 수 있습니다.",
  },
  {
    q: "청년·다자녀·저소득 환급률은 자동으로 적용되나요?",
    a: "아닙니다. 청년은 주민등록번호 검증으로 확인되고, 다자녀·저소득은 앱이나 누리집에서 신청해 '혜택 적용 중' 상태가 되어야 적용됩니다.",
  },
  {
    q: "계산 결과와 실제 환급액이 다를 수 있나요?",
    a: "네. 이 계산기는 공개된 기준금액과 환급률로 계산한 참고용 추정치입니다. 실제 금액은 이용 내역 검증, 지자체 추가 혜택, 카드사 처리에 따라 달라질 수 있습니다.",
  },
];

export default function KPassPage() {
  const posts = getLatestPosts(3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: TITLE,
      url: absoluteUrl("/calc/k-pass"),
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "ko",
      description: DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      publisher: { "@type": "Organization", name: site.name, url: site.siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "계산기", item: absoluteUrl("/calc") },
        { "@type": "ListItem", position: 3, name: "K-패스 환급액", item: absoluteUrl("/calc/k-pass") },
      ],
    },
  ];

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-[12px] font-medium text-ink-500">
        <Link href="/" className="hover:text-brand-700">
          홈
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/calc" className="hover:text-brand-700">
          계산기
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-700">K-패스 환급액</span>
      </nav>

      <header className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-600/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
            교통비 환급
          </span>
          <span className="text-[11px] font-medium text-ink-500">기준일 2026.11.27 · 매달 갱신</span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-3xl">
          K-패스(모두의 카드) 월 환급액 계산기
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-700">
          한 달 교통비를 넣으면 <strong className="font-semibold text-ink-900">기본형(정률)·일반형·플러스형(정액)</strong>을
          모두 계산해 실제로 적용될 금액을 보여 드립니다. 시차 출퇴근 시간 추가 환급(최대 +30%p)도 반영됩니다.
        </p>
      </header>

      <div className="mt-6">
        <KPassCalculator />
      </div>

      <AdSlot label="광고" />

      {/* 요약 표 */}
      <section className="mt-4">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900">2026년 환급 기준 한눈에 보기</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-ink-200">
          <table className="w-full text-[13px]">
            <caption className="sr-only">2026년 K-패스(모두의 카드) 환급 기준</caption>
            <thead className="bg-ink-50 text-[12px] text-ink-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-bold">구분</th>
                <th scope="col" className="px-4 py-3 text-left font-bold">기본형 환급률</th>
                <th scope="col" className="px-4 py-3 text-left font-bold">시차시간 승차 시</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 bg-white">
              {[
                ["일반", "20%", "50%"],
                ["청년(만 19~34세)", "30%", "60%"],
                ["어르신(만 65세 이상)", "30%", "60%"],
                ["2자녀", "30%", "60%"],
                ["3자녀 이상", "50%", "80%"],
                ["저소득(수급자·차상위)", "53.3%", "83.3%"],
              ].map(([label, rate, offPeak]) => (
                <tr key={label}>
                  <th scope="row" className="px-4 py-2.5 text-left font-semibold text-ink-900">{label}</th>
                  <td className="px-4 py-2.5 tabular-nums text-ink-700">{rate}</td>
                  <td className="px-4 py-2.5 tabular-nums text-brand-700">{offPeak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-500">
          시차 출퇴근 시간은 승차 시각 기준 05:30~06:30, 09:00~10:00, 16:00~17:00, 19:00~20:00입니다. 2026년 말까지
          한시 적용되며 연장 여부는 공지로 확인해야 합니다.
        </p>
      </section>

      {/* 계산 방식 */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900">환급액은 이렇게 계산됩니다</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "① 기본형 (정률)",
              formula: "이용금액 × 환급률",
              body: "내 유형의 환급률을 그대로 곱합니다. 시차시간 승차분은 환급률이 30%p 올라갑니다.",
            },
            {
              title: "② 일반형 (정액)",
              formula: "(3천원 미만 이용분 − 기준금액)",
              body: "3,000원 미만 결제분에서 지역·유형별 기준금액을 뺀 차액을 100% 돌려받습니다.",
            },
            {
              title: "③ 플러스형 (정액)",
              formula: "(전체 이용금액 − 기준금액)",
              body: "광역버스·GTX처럼 3,000원 이상 결제분까지 모두 포함해 기준금액 초과분을 돌려받습니다.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-ink-200/80 bg-white p-5">
              <h3 className="text-[14px] font-extrabold text-ink-900">{card.title}</h3>
              <p className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-[12px] font-semibold tabular-nums text-ink-700">
                {card.formula}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">{card.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-brand-50 px-4 py-3 text-[13px] leading-relaxed text-brand-900">
          세 방식은 선택하는 것이 아니라 <strong className="font-bold">매달 자동으로 비교되어 가장 큰 금액</strong>이
          적용됩니다. 그래서 교통비가 적은 달은 정률형이, 많은 달은 정액형이 유리할 수 있습니다.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900">자주 묻는 질문</h2>
        <div className="mt-4 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200 bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-[14px] font-bold text-ink-900 marker:hidden">
                <span className="mr-1.5 text-brand-600">Q.</span>
                {item.q}
              </summary>
              <p className="mt-2 pl-5 text-[13px] leading-relaxed text-ink-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 출처 */}
      <section className="mt-10 rounded-2xl border border-ink-200/80 bg-white p-5">
        <h2 className="text-[14px] font-extrabold text-ink-900">출처와 기준</h2>
        <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-ink-500">
          <li>· 모두의 카드(구 K-패스) 공식 안내 — 환급 기준·기준금액: korea-pass.kr</li>
          <li>· 한국교통안전공단 모빌리티 정보서비스 — 대중교통비 환급 지원 사업 안내</li>
          <li>· 정부24 보조금24 — K-패스 지원 조건(2026.05.08 최종 수정)</li>
          <li>· 기준일: 2026년 11월 27일. 제도 변경 시 이 페이지와 계산기를 함께 갱신합니다.</li>
        </ul>
        <p className="mt-3 rounded-lg bg-ink-50 px-3 py-2 text-[12px] leading-relaxed text-ink-700">
          이 계산기는 참고용입니다. 실제 환급액은 이용 내역 검증과 지자체 추가 혜택, 카드사 처리 결과에 따라 달라질 수
          있습니다.
        </p>
      </section>

      {posts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-extrabold text-ink-900">함께 읽으면 좋은 글</h2>
          <div className="mt-3 grid gap-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
