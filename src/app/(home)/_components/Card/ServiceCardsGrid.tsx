import ServiceCard from "./ServiceCard";

export default function ServiceCardsGrid() {
  return (
    <>
      <ServiceCard
        labelBg="#FFF2F7"
        labelColor="#FF81A7"
        emoji="🔐"
        labelchildren="보안 강화"
        description1="보안 취약점 사전 식별 후 해결"
        description2="소프트웨어 보안성 강화"
      />
      <ServiceCard
        labelBg="#DDFFF3"
        emoji="⚙️"
        labelColor="#00987C"
        labelchildren="미션 크리티컬한 개발에 적합"
        description1="미션 크리티컬한 개발 특별 제작"
        description2="안전한 솔루션 제공"
      />
      <ServiceCard
        labelBg="#F5E4FF"
        emoji="🔏"
        labelColor="#A54CFF"
        labelchildren="실시간 보안 업데이트"
        description1="최신 보안 동향 및 취약점 정보 실시간 제공"
        description2="개발자 보안 강화를 도움"
      />
      <ServiceCard
        labelBg="#E4F2FF"
        emoji="✋🏻"
        labelColor="#4C93FF"
        labelchildren="사용자 데이터 보호"
        description1="데이터 무단 액세스 및 정보 유출 방지"
        description2="개인 정보 안전하게 보호"
      />
      <ServiceCard
        labelBg="#FFFBE4"
        emoji="🔄"
        labelColor="#FF8A00"
        labelchildren="효율적인 개발"
        description1="보안 취약점 자동 분석후 수정"
        description2="개발 집중 및 생산성 향상"
      />
      <ServiceCard
        labelBg="#FFEAE4"
        emoji="✅️"
        labelColor="#FF3D00"
        labelchildren="신속한 대응과 수정"
        description1="발견된 취약점 대응 및 수정"
        description2="안전한 소프트웨어 개발 가능"
      />
    </>
  );
}
