# 계산허브 (gyesanhub.com)

생활정보 블로그 + 인터랙티브 계산기 허브. Next.js(App Router) · TypeScript · Tailwind CSS v4 기반, Vercel 배포를 전제로 만든 정적 우선 사이트입니다.

## 구성

```
app/
  page.tsx                 홈 — 추천 계산기 + 최신 정보글
  calc/                    계산기 목록 · K-패스 환급액 계산기
  posts/                   정보글 목록 · 상세 (content/posts/*.md 자동 생성)
  sitemap.ts, robots.ts    SEO
  about, privacy           사이트 소개 · 개인정보처리방침(애드센스 심사 대응)
components/
  KPassCalculator.tsx      K-패스 계산기 (클라이언트)
  AdSlot.tsx               본문 광고 자리
lib/
  kpass.ts                 환급 계산 로직(순수 함수)
  posts.ts                 마크다운 로더
  calculators.ts           계산기 목록 메타데이터
  site.ts                  사이트 이름·도메인·애드센스 ID 설정
content/posts/*.md         블로그 글 (프론트매터 + 마크다운)
public/ads.txt             애드센스 승인용 (pub-1119881183254757)
.github/workflows/build.yml  push 시 타입체크 + 빌드 검증 CI
```

## 로컬 실행

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드 검증
```

## 글 추가하는 법

`content/posts/` 에 마크다운 파일을 하나 만들면 됩니다. 파일명이 그대로 URL(`/posts/파일명`)이 됩니다.

```markdown
---
title: "글 제목"
description: "검색 결과에 나갈 한 줄 요약 (80~120자)"
date: "2026-11-27"
updated: "2026-11-27"   # 선택
tags: ["K-패스", "환급"]
emoji: "🚌"             # 선택
---

본문은 마크다운으로 작성합니다. 표, 목록, 링크 모두 지원합니다.
```

## 환경 변수

| 이름 | 기본값 | 설명 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://gyesanhub.com` | 도메인이 정해지면 이 값만 바꾸면 canonical·sitemap·OG가 모두 반영됩니다. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-1119881183254757` | 애드센스 게시자 ID |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE` | (없음) | 본문 광고 단위 슬롯 ID. 넣으면 `AdSlot` 자리에 실제 광고가 렌더링됩니다. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | (없음) | 서치콘솔 소유 확인 코드 |

## 배포 (다음 단계)

1. Vercel에서 이 저장소를 Import → 프레임워크는 Next.js 자동 인식, 빌드 명령·출력은 기본값 그대로.
2. Vercel 프로젝트 설정 → Domains 에서 구매한 도메인 연결.
3. 애드센스: `public/ads.txt`는 이미 반영되어 있고, 사이트 승인 후 광고 단위를 만들어 슬롯 ID를 환경 변수에 넣으면 됩니다.
4. 서치콘솔·네이버 서치어드바이저에 `sitemap.xml` 제출.

## 주의

- 계산 결과는 참고용이며, 실제 지급·부과 금액은 소관 기관 기준을 따릅니다. 제도가 바뀌면 `lib/kpass.ts`의 환급률·기준금액과 관련 글을 함께 갱신하세요.
- 계산기 입력값은 브라우저 안에서만 처리되며 서버로 전송하지 않습니다(상태를 URL이나 쿠키에 저장하지 않음).
