"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

type AdSlotProps = {
  /** AdSense 광고 단위 슬롯 ID. 비어 있으면 자리만 표시합니다. */
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * 본문·목록에 넣는 광고 자리.
 * - 슬롯 ID가 있으면 AdSense 광고를 렌더링합니다.
 * - 슬롯 ID가 없으면 개발 중에만 자리 표시자를 보여 줍니다(운영 중에는 아무것도 그리지 않음).
 */
export default function AdSlot({ slot = site.adsenseSlotInArticle, format = "auto", label = "광고" }: AdSlotProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // 광고 스크립트가 아직 로드되지 않은 경우: 다음 마운트에서 재시도
    }
  }, [slot]);

  if (!slot) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        aria-hidden
        className="my-8 grid place-items-center rounded-2xl border border-dashed border-ink-200 bg-white/60 py-8 text-xs font-medium text-ink-500"
      >
        광고 자리 · AdSense 슬롯 ID를 넣으면 여기에 광고가 나옵니다
      </div>
    );
  }

  return (
    <div className="my-8">
      <p className="mb-1 text-right text-[10px] uppercase tracking-wider text-ink-500/70">{label}</p>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={site.adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
