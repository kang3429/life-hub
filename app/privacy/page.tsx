import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "개인정보 처리 방침, 쿠키 및 광고(Google AdSense) 관련 안내입니다.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "2026-11-27";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">개인정보처리방침</h1>
      <p className="mt-2 text-[12px] font-medium text-ink-500">시행일 {updated}</p>

      <div className="prose prose-ko prose-sm mt-6 max-w-none">
        <p>
          {site.name}(이하 &ldquo;사이트&rdquo;)는 이용자의 개인정보를 소중히 다루며, 아래와 같이 처리 방침을
          공개합니다.
        </p>

        <h2>1. 수집하는 개인정보</h2>
        <p>
          사이트는 회원가입 기능을 운영하지 않으며, 계산기에 입력한 금액·나이·지역 등의 값은 이용자의 브라우저 안에서만
          처리되고 서버로 전송되거나 저장되지 않습니다. 문의 메일을 보내는 경우에는 이용자가 자발적으로 제공한 이메일
          주소와 문의 내용이 해당 목적에 한해 처리됩니다.
        </p>

        <h2>2. 쿠키 및 자동 수집 정보</h2>
        <p>
          사이트는 방문 통계와 광고 게재를 위해 쿠키를 사용할 수 있습니다. 이 과정에서 접속 기록, 브라우저 종류, 기기
          정보, 방문 페이지 등이 자동으로 수집될 수 있으며, 이는 특정 개인을 식별하는 데 사용되지 않습니다.
        </p>

        <h2>3. 광고(Google AdSense) 및 제3자 제공</h2>
        <p>
          사이트는 Google AdSense를 통해 광고를 게재합니다. Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여
          이용자가 이 사이트 또는 다른 사이트를 방문한 기록을 바탕으로 광고를 표시할 수 있습니다.
        </p>
        <ul>
          <li>
            Google의 광고 쿠키 사용에 대한 자세한 내용과 맞춤 광고 비활성화는{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google 광고 정책
            </a>
            에서 확인할 수 있습니다.
          </li>
          <li>
            맞춤 광고를 원하지 않는 경우{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google 광고 설정
            </a>
            에서 해제할 수 있으며,{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            에서 제3자 광고 쿠키를 관리할 수 있습니다.
          </li>
          <li>브라우저 설정에서 쿠키 저장을 거부할 수 있으나, 이 경우 일부 기능 이용에 제한이 있을 수 있습니다.</li>
        </ul>

        <h2>4. 개인정보의 보유 및 이용 기간</h2>
        <p>
          문의를 통해 제공받은 정보는 문의 처리 완료 후 지체 없이 파기합니다. 관련 법령에서 보존을 요구하는 경우에는
          해당 기간 동안 보관합니다.
        </p>

        <h2>5. 이용자의 권리</h2>
        <p>
          이용자는 언제든지 자신의 개인정보 처리에 대한 열람·정정·삭제를 요청할 수 있습니다. 요청은 아래 문의처로
          보내 주시면 지체 없이 처리합니다.
        </p>

        <h2>6. 문의처</h2>
        <p>
          개인정보 관련 문의: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>

        <h2>7. 방침의 변경</h2>
        <p>
          본 방침이 변경되는 경우 사이트 공지 또는 본 페이지를 통해 안내하며, 변경된 방침은 게시한 날부터 적용됩니다.
        </p>
      </div>
    </div>
  );
}
