"use client";

import { useMemo, useState } from "react";
import {
  BASE_AMOUNTS,
  MIN_RIDES,
  METHOD_LABEL,
  REGIONS,
  USER_TYPES,
  calculateKPass,
  compareTypes,
  type KPassInput,
  type RefundMethod,
  type Region,
  type UserType,
} from "@/lib/kpass";

const won = (value: number) => `${new Intl.NumberFormat("ko-KR").format(Math.round(value))}원`;
const pct = (value: number) => `${(Math.round(value * 1000) / 10).toFixed(1).replace(/\.0$/, "")}%`;

const QUICK_AMOUNTS = [50_000, 70_000, 100_000, 150_000];

function digits(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function MoneyInput({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-bold text-ink-700">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">{hint}</p>}
      <div className="mt-1.5 flex items-center rounded-xl border border-ink-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value === 0 ? "" : new Intl.NumberFormat("ko-KR").format(value)}
          onChange={(event) => onChange(digits(event.target.value))}
          placeholder={placeholder ?? "0"}
          className="w-full bg-transparent py-2.5 text-right text-base font-bold tabular-nums text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-500/60"
        />
        <span className="ml-1.5 shrink-0 text-sm font-semibold text-ink-500">원</span>
      </div>
    </div>
  );
}

function MethodBar({
  label,
  amount,
  max,
  active,
}: {
  label: string;
  amount: number;
  max: number;
  active: boolean;
}) {
  const width = max > 0 ? Math.max((amount / max) * 100, amount > 0 ? 4 : 0) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-[13px]">
        <span className={active ? "font-bold text-brand-700" : "font-medium text-ink-500"}>{label}</span>
        <span className={`tabular-nums ${active ? "font-extrabold text-brand-700" : "font-semibold text-ink-700"}`}>
          {won(amount)}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${active ? "bg-brand-500" : "bg-ink-200"}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function KPassCalculator() {
  const [userType, setUserType] = useState<UserType>("general");
  const [region, setRegion] = useState<Region>("local");
  const [totalFare, setTotalFare] = useState(70_000);
  const [rides, setRides] = useState(40);
  const [fareOver3000, setFareOver3000] = useState(0);
  const [offPeakFare, setOffPeakFare] = useState(0);
  const [firstMonth, setFirstMonth] = useState(false);

  const input: KPassInput = useMemo(
    () => ({ userType, region, totalFare, rides, fareOver3000, offPeakFare, firstMonth }),
    [userType, region, totalFare, rides, fareOver3000, offPeakFare, firstMonth],
  );

  const result = useMemo(() => calculateKPass(input), [input]);
  const comparison = useMemo(() => compareTypes(input), [input]);
  const maxAmount = Math.max(result.basic, result.regular, result.plus, 1);
  const applied: RefundMethod | null = result.applied;
  const selectedType = USER_TYPES.find((t) => t.id === userType)!;
  const base = BASE_AMOUNTS[region][selectedType.group];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      {/* 입력 */}
      <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-extrabold text-ink-900">내 조건 입력</h2>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-500">
          입력한 값은 브라우저 밖으로 나가지 않습니다. 저장·전송하지 않습니다.
        </p>

        <fieldset className="mt-5">
          <legend className="text-[13px] font-bold text-ink-700">1. 이용 유형</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {USER_TYPES.map((type) => {
              const active = type.id === userType;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setUserType(type.id)}
                  aria-pressed={active}
                  className={`rounded-xl border px-3 py-2.5 text-left transition ${
                    active
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                      : "border-ink-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <span className={`block text-[13px] font-bold ${active ? "text-brand-700" : "text-ink-900"}`}>
                    {type.label}
                    <span className="ml-1 text-[11px] font-semibold text-brand-600">{type.short}</span>
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-ink-500">{type.condition}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-[13px] font-bold text-ink-700">2. 거주 지역</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {REGIONS.map((item) => {
              const active = item.id === region;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRegion(item.id)}
                  aria-pressed={active}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    active
                      ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                      : "border-ink-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <span className={`block text-[13px] font-bold ${active ? "text-brand-700" : "text-ink-900"}`}>
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-ink-500">{item.note}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-[13px] font-bold text-ink-700">3. 한 달 교통비</legend>
          <div className="mt-2">
            <MoneyInput
              id="total-fare"
              label="월 대중교통 이용금액"
              hint="버스·지하철·광역철도 등 K-패스 대상 교통수단의 한 달 합계"
              value={totalFare}
              onChange={setTotalFare}
              placeholder="70,000"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {QUICK_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setTotalFare(amount)}
                className="rounded-lg border border-ink-200 bg-ink-50 px-2.5 py-1 text-[11.5px] font-semibold text-ink-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {won(amount)}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rides" className="block text-[13px] font-bold text-ink-700">
              월 이용 횟수
            </label>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">환승은 1회로 계산합니다</p>
            <div className="mt-1.5 flex items-center rounded-xl border border-ink-200 bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
              <input
                id="rides"
                inputMode="numeric"
                value={rides === 0 ? "" : rides}
                onChange={(event) => setRides(digits(event.target.value))}
                className="w-full bg-transparent py-2.5 text-right text-base font-bold tabular-nums text-ink-900 outline-none"
              />
              <span className="ml-1.5 shrink-0 text-sm font-semibold text-ink-500">회</span>
            </div>
            <p className={`mt-1.5 text-[11px] font-semibold ${rides >= MIN_RIDES ? "text-brand-700" : "text-amber-600"}`}>
              {rides >= MIN_RIDES ? `월 ${MIN_RIDES}회 조건 충족` : `월 ${MIN_RIDES}회 이상 이용해야 환급됩니다`}
            </p>
          </div>
          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-start gap-2 rounded-xl border border-ink-200 bg-ink-50/60 px-3 py-2.5">
              <input
                type="checkbox"
                checked={firstMonth}
                onChange={(event) => setFirstMonth(event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-600"
              />
              <span className="text-[12px] leading-relaxed text-ink-700">
                <strong className="font-bold">가입 첫 달</strong>
                <span className="block text-[11px] text-ink-500">15회 미만도 환급</span>
              </span>
            </label>
          </div>
        </div>

        <details className="mt-5 rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3">
          <summary className="cursor-pointer text-[13px] font-bold text-ink-700">
            정액형·시차 환급까지 정확히 계산하기 (선택)
          </summary>
          <div className="mt-3 space-y-4">
            <MoneyInput
              id="fare-over-3000"
              label="3,000원 이상 결제한 이용금액"
              hint="일반형(정액)은 3,000원 미만 이용분만 계산합니다. 광역버스·GTX 등 고액 구간이 있으면 입력하세요."
              value={fareOver3000}
              onChange={setFareOver3000}
            />
            <MoneyInput
              id="off-peak"
              label="시차 출퇴근 시간에 승차한 이용금액"
              hint="05:30~06:30 · 09:00~10:00 · 16:00~17:00 · 19:00~20:00 승차분은 기본 환급률에 +30%p"
              value={offPeakFare}
              onChange={setOffPeakFare}
            />
          </div>
        </details>
      </div>

      {/* 결과 */}
      <div className="space-y-4 lg:sticky lg:top-20">
        <div className="rounded-2xl border border-brand-200 bg-gradient-to-b from-brand-50 to-white p-6 shadow-sm">
          <p className="text-[12px] font-bold uppercase tracking-wider text-brand-700">예상 월 환급액</p>
          <p className="mt-2 text-4xl font-extrabold tabular-nums tracking-tight text-ink-900">
            {new Intl.NumberFormat("ko-KR").format(result.amount)}
            <span className="ml-1 text-xl font-bold text-ink-700">원</span>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {applied ? (
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white">
                {METHOD_LABEL[applied]} 자동 적용
              </span>
            ) : (
              <span className="rounded-full bg-ink-200 px-2.5 py-1 text-[11px] font-bold text-ink-700">환급 대상 아님</span>
            )}
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink-700 ring-1 ring-ink-200">
              실효 환급률 {pct(result.effectiveRate)}
            </span>
          </div>

          {result.blockedByRides && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[12px] font-semibold leading-relaxed text-amber-700">
              월 {MIN_RIDES}회 미만 이용으로 이번 달 환급액은 0원입니다. (가입 첫 달은 예외)
            </p>
          )}

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-brand-200/70 pt-4 text-[12px]">
            <div>
              <dt className="text-ink-500">적용 환급률</dt>
              <dd className="font-bold text-ink-900">
                {result.ratePct}%
                {offPeakFare > 0 && (
                  <span className="ml-1 font-semibold text-brand-700">(시차 {result.offPeakRatePct}%)</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">정액형 기준금액</dt>
              <dd className="font-bold text-ink-900">
                {won(base.regular)} / {won(base.plus)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-sm">
          <h3 className="text-[13px] font-extrabold text-ink-900">세 가지 방식 비교</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-500">
            모두의 카드는 매달 가장 큰 금액을 자동으로 적용합니다.
          </p>
          <div className="mt-4 space-y-3.5">
            <MethodBar label="① 기본형 (정률)" amount={result.basic} max={maxAmount} active={applied === "basic"} />
            <MethodBar label="② 일반형 (3천원 미만분 − 기준금액)" amount={result.regular} max={maxAmount} active={applied === "regular"} />
            <MethodBar label="③ 플러스형 (전체 − 기준금액)" amount={result.plus} max={maxAmount} active={applied === "plus"} />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200/80 bg-white p-5 shadow-sm">
          <h3 className="text-[13px] font-extrabold text-ink-900">같은 교통비, 유형별 환급액</h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-ink-100">
            <table className="w-full text-[12px]">
              <thead className="bg-ink-50 text-[11px] text-ink-500">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">유형</th>
                  <th className="px-3 py-2 text-right font-semibold">환급률</th>
                  <th className="px-3 py-2 text-right font-semibold">예상 환급액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {comparison.map((row) => (
                  <tr key={row.id} className={row.id === userType ? "bg-brand-50/70" : "bg-white"}>
                    <td className={`px-3 py-2 ${row.id === userType ? "font-bold text-brand-700" : "font-medium text-ink-700"}`}>
                      {row.label}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-ink-500">{row.ratePct}%</td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums text-ink-900">{won(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
