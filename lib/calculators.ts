export type CalculatorStatus = "live" | "soon";

export type CalculatorMeta = {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  emoji: string;
  tags: string[];
  status: CalculatorStatus;
  updated: string;
};

export const calculators: CalculatorMeta[] = [
  {
    slug: "k-pass",
    href: "/calc/k-pass",
    title: "K-패스(모두의 카드) 월 환급액 계산기",
    shortTitle: "K-패스 환급액",
    description:
      "일반 20% · 청년·2자녀·어르신 30% · 3자녀 50% · 저소득 53.3%, 시차 출퇴근 추가 환급과 정액형(일반형·플러스형)까지 한 번에 비교합니다.",
    emoji: "🚌",
    tags: ["교통비", "환급", "2026"],
    status: "live",
    updated: "2026-11-27",
  },
  {
    slug: "year-end-tax",
    href: "/calc/year-end-tax",
    title: "연말정산 환급액 계산기",
    shortTitle: "연말정산 환급액",
    description: "소득·공제 항목을 넣으면 예상 환급액과 추가 납부액을 계산해 드립니다.",
    emoji: "🧾",
    tags: ["세금", "13월의 월급"],
    status: "soon",
    updated: "2026-11-27",
  },
  {
    slug: "car-insurance",
    href: "/calc/car-insurance",
    title: "자동차보험료 비교 계산기",
    shortTitle: "자동차보험료",
    description: "차량·운전자 조건별 예상 보험료와 할인·할증 요인을 정리해 드립니다.",
    emoji: "🚗",
    tags: ["보험", "고정비"],
    status: "soon",
    updated: "2026-11-27",
  },
  {
    slug: "multi-child",
    href: "/calc/multi-child",
    title: "다자녀 혜택 총정리 계산기",
    shortTitle: "다자녀 혜택",
    description: "입학준비금·K-패스·고속도로 감면 등 자녀 수에 따라 받는 혜택을 모아 계산합니다.",
    emoji: "👨‍👩‍👧‍👦",
    tags: ["다자녀", "지원금"],
    status: "soon",
    updated: "2026-11-27",
  },
  {
    slug: "electricity",
    href: "/calc/electricity",
    title: "전기요금 계산기",
    shortTitle: "전기요금",
    description: "월 사용량(kWh)으로 누진제 적용 전기요금을 미리 계산해 봅니다.",
    emoji: "💡",
    tags: ["공과금", "절약"],
    status: "soon",
    updated: "2026-11-27",
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export const liveCalculators = calculators.filter((c) => c.status === "live");
