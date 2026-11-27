/**
 * 사이트 전역 설정.
 * 브랜드명이나 도메인이 바뀌면 이 파일 한 곳만 고치면 됩니다
 * (헤더 로고·메타데이터·canonical·sitemap·OG·푸터가 모두 여기 값을 씁니다).
 */
export const site = {
  name: "계산허브",
  domain: "gyesanhub.com",
  tagline: "돈이 되는 생활 정보와 계산기",
  description:
    "K-패스 환급액부터 보험료·세금·정부 혜택까지, 숫자로 바로 확인하는 생활 정보 허브. 2026년 기준 최신 제도로 계산하고 정리합니다.",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gyesanhub.com").replace(/\/$/, ""),
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-1119881183254757",
  adsenseSlotInArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE ?? "",
  author: "계산허브 편집팀",
  contactEmail: "kang342982@gmail.com",
  locale: "ko_KR",
} as const;

export const navLinks = [
  { href: "/calc", label: "계산기" },
  { href: "/posts", label: "정보글" },
  { href: "/about", label: "소개" },
] as const;

export function absoluteUrl(path: string): string {
  return `${site.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
