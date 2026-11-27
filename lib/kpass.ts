/**
 * K-패스(2026년 '모두의 카드') 환급액 계산 로직.
 *
 * 근거
 * - 환급 방식: 기본형(정률) · 일반형 · 플러스형(정액) 중 매달 가장 큰 금액을 자동 적용
 * - 기본형 환급률: 일반 20%, 청년·2자녀·어르신 30%, 3자녀 이상 50%, 저소득 53.3%
 * - 시차 출퇴근 시간(승차 기준 05:30~06:30, 09:00~10:00, 16:00~17:00, 19:00~20:00) 이용분은 +30%p
 * - 정액형 기준금액: 지역·유형별 차등, 일반형은 3,000원 미만 이용분, 플러스형은 전체 이용분 기준
 * - 지급 조건: 월 15회 이상 이용(가입 첫 달은 예외), 2026년 기준 월 최대 이용 횟수 제한 없음
 *
 * 기준일: 2026-11-27 / 출처: 모두의 카드(korea-pass.kr)·한국교통안전공단 안내
 */

export type UserType = "general" | "youth" | "senior" | "twoChild" | "threeChild" | "lowIncome";
export type Region = "metro" | "local" | "priority" | "special";
export type RefundMethod = "basic" | "regular" | "plus";

type Group = "A" | "B" | "C";

export const USER_TYPES: {
  id: UserType;
  label: string;
  short: string;
  rate: number;
  group: Group;
  condition: string;
}[] = [
  { id: "general", label: "일반", short: "20%", rate: 0.2, group: "A", condition: "만 35~64세" },
  { id: "youth", label: "청년", short: "30%", rate: 0.3, group: "B", condition: "만 19~34세" },
  { id: "senior", label: "어르신", short: "30%", rate: 0.3, group: "B", condition: "만 65세 이상" },
  { id: "twoChild", label: "2자녀", short: "30%", rate: 0.3, group: "B", condition: "미성년 자녀 2명" },
  { id: "threeChild", label: "3자녀 이상", short: "50%", rate: 0.5, group: "C", condition: "미성년 자녀 3명 이상" },
  { id: "lowIncome", label: "저소득", short: "53.3%", rate: 0.533, group: "C", condition: "수급자·차상위" },
];

export const REGIONS: { id: Region; label: string; note: string }[] = [
  { id: "metro", label: "수도권", note: "서울·경기·인천" },
  { id: "local", label: "비수도권(지방)", note: "대구·부산 등" },
  { id: "priority", label: "우대지원지역", note: "인구감소·교통취약 지역" },
  { id: "special", label: "특별지원지역", note: "지자체별 특별 지원" },
];

/** 지역·유형군별 정액형 기준금액(원) */
export const BASE_AMOUNTS: Record<Region, Record<Group, { regular: number; plus: number }>> = {
  metro: { A: { regular: 62_000, plus: 100_000 }, B: { regular: 55_000, plus: 90_000 }, C: { regular: 45_000, plus: 80_000 } },
  local: { A: { regular: 55_000, plus: 95_000 }, B: { regular: 50_000, plus: 85_000 }, C: { regular: 40_000, plus: 75_000 } },
  priority: { A: { regular: 50_000, plus: 90_000 }, B: { regular: 45_000, plus: 80_000 }, C: { regular: 35_000, plus: 70_000 } },
  special: { A: { regular: 45_000, plus: 85_000 }, B: { regular: 40_000, plus: 75_000 }, C: { regular: 30_000, plus: 65_000 } },
};

/** 시차 출퇴근 시간 추가 환급률(%p) */
export const OFF_PEAK_BONUS = 0.3;
export const MIN_RIDES = 15;

export type KPassInput = {
  userType: UserType;
  region: Region;
  /** 월 대중교통 이용금액 합계(원) */
  totalFare: number;
  /** 월 이용 횟수(환승 포함 1통행 기준) */
  rides: number;
  /** 그중 3,000원 이상 결제한 이용금액 합계(원) — 일반형 계산용 */
  fareOver3000: number;
  /** 그중 시차 출퇴근 시간에 승차한 이용금액 합계(원) */
  offPeakFare: number;
  /** 가입 첫 달 여부(15회 미만도 지급) */
  firstMonth: boolean;
};

export type KPassResult = {
  /** 최종 적용 방식 */
  applied: RefundMethod | null;
  /** 최종 예상 환급액(원) */
  amount: number;
  /** 유형별 기본형 환급률(%) */
  ratePct: number;
  /** 시차시간 적용 환급률(%) */
  offPeakRatePct: number;
  basic: number;
  regular: number;
  plus: number;
  /** 실효 환급률 (0~1) */
  effectiveRate: number;
  /** 15회 조건 미달로 지급 불가 */
  blockedByRides: boolean;
  base: { regular: number; plus: number };
};

const clampMoney = (value: number) => (Number.isFinite(value) && value > 0 ? Math.floor(value) : 0);

export function getRates(userType: UserType): { rate: number; offPeakRate: number; group: Group } {
  const type = USER_TYPES.find((t) => t.id === userType) ?? USER_TYPES[0];
  return { rate: type.rate, offPeakRate: Math.min(type.rate + OFF_PEAK_BONUS, 0.99), group: type.group };
}

export function calculateKPass(input: KPassInput): KPassResult {
  const { rate, offPeakRate, group } = getRates(input.userType);
  const total = clampMoney(input.totalFare);
  const over3000 = Math.min(clampMoney(input.fareOver3000), total);
  const offPeak = Math.min(clampMoney(input.offPeakFare), total);
  const base = BASE_AMOUNTS[input.region][group];

  // ① 기본형(정률): 시차 출퇴근 시간 이용분은 환급률 +30%p
  const basic = Math.round((total - offPeak) * rate + offPeak * offPeakRate);

  // ② 일반형(정액): 3,000원 미만 이용분에서 기준금액을 뺀 차액
  const regular = Math.max(0, total - over3000 - base.regular);

  // ③ 플러스형(정액): 전체 이용분에서 기준금액을 뺀 차액
  const plus = Math.max(0, total - base.plus);

  const candidates: { method: RefundMethod; amount: number }[] = [
    { method: "basic", amount: basic },
    { method: "regular", amount: regular },
    { method: "plus", amount: plus },
  ];
  candidates.sort((a, b) => b.amount - a.amount);

  const rides = Math.max(0, Math.floor(input.rides || 0));
  const blockedByRides = rides > 0 && rides < MIN_RIDES && !input.firstMonth;
  const best = candidates[0];
  const amount = blockedByRides ? 0 : best.amount;

  return {
    applied: amount > 0 ? best.method : null,
    amount,
    ratePct: Math.round(rate * 1000) / 10,
    offPeakRatePct: Math.round(offPeakRate * 1000) / 10,
    basic,
    regular,
    plus,
    effectiveRate: total > 0 ? amount / total : 0,
    blockedByRides,
    base,
  };
}

/** 같은 이용금액을 다른 유형이 냈을 때의 기본형 환급액 비교 */
export function compareTypes(input: KPassInput): { id: UserType; label: string; amount: number; ratePct: number }[] {
  return USER_TYPES.map((type) => {
    const result = calculateKPass({ ...input, userType: type.id });
    return { id: type.id, label: type.label, amount: result.amount, ratePct: result.ratePct };
  });
}

export const METHOD_LABEL: Record<RefundMethod, string> = {
  basic: "기본형 (정률)",
  regular: "일반형 (정액)",
  plus: "플러스형 (정액)",
};
