export default function page() {
  return (
    <div className="flex w-full flex-col">
      <div className="relative -top-[140px] -mb-[140px] w-full bg-[url('/assets/images/ppa-bg.png')] bg-cover bg-center">
        <div className="mt-[62px] flex flex-col items-center pb-[80px] pt-[240px] text-center text-white md:mt-[140px] md:pb-[100px] md:pt-[336px]">
          <h2 className="mb-[15px] flex flex-col items-center gap-x-1 text-2xl font-medium tracking-tighter md:flex-row md:text-[32px]">
            <span>우리는 당신의 개인정보 보호와</span>
            <span>신뢰를 중요하게 생각합니다.</span>
          </h2>
          <p className="flex w-full flex-col text-sm font-light tracking-tight md:text-xl">
            <span>개인정보 보호 센터는 고객의 정보를</span>
            <span>
              수집해서 사용하는 방법에 대한 고객의 선택 사항을 비롯하여
            </span>
            <span>
              개인정보 보호 항목에 대한 정보를 쉽게 찾을 수 있도록 해 줍니다.
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-center px-[30px] pb-[120px] pt-20 text-black dark:text-white md:px-[50px] xl:px-[100px]">
        <div className="flex w-full flex-col gap-4 2xl:max-w-[1760px]">
          <p>
            법관이 중대한 심신상의 장해로 직무를 수행할 수 없을 때에는 법률이
            정하는 바에 의하여 퇴직하게 할 수 있다. 국회는 헌법개정안이 공고된
            날로부터 60일 이내에 의결하여야 하며, 국회의 의결은 재적의원 3분의 2
            이상의 찬성을 얻어야 한다. 헌법재판소는 법률에 저촉되지 아니하는
            범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을
            제정할 수 있다.
          </p>
          <p>
            대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 모든
            국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 사법권은
            법관으로 구성된 법원에 속한다. 대법원장의 임기는 6년으로 하며,
            중임할 수 없다. 대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그
            헌법개정 제안 당시의 대통령에 대하여는 효력이 없다.
          </p>
          <p>
            모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 외국인은
            국제법과 조약이 정하는 바에 의하여 그 지위가 보장된다. 나는 헌법을
            준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의
            증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히
            수행할 것을 국민 앞에 엄숙히 선서합니다.
          </p>
          <p>
            제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을
            상실한다. 이 경우 그 명령에 의하여 개정 또는 폐지되었던 법률은 그
            명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다. 국회에 제출된
            법률안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지
            아니한다. 다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다.
          </p>
          <p>
            대법원장과 대법관이 아닌 법관은 대법관회의의 동의를 얻어 대법원장이
            임명한다. 국무총리는 대통령을 보좌하며, 행정에 관하여 대통령의 명을
            받아 행정각부를 통할한다. 정당은 그 목적·조직과 활동이 민주적이어야
            하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다.
            공개하지 아니한 회의내용의 공표에 관하여는 법률이 정하는 바에
            의한다.
          </p>
          <p>
            대통령은 조국의 평화적 통일을 위한 성실한 의무를 진다. 대통령은
            국무총리·국무위원·행정각부의 장 기타 법률이 정하는 공사의 직을 겸할
            수 없다. 선거에 있어서 최고득표자가 2인 이상인 때에는 국회의
            재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로
            한다. 모든 국민은 주거의 자유를 침해받지 아니한다. 주거에 대한
            압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을
            제시하여야 한다.
          </p>
          <p>
            국회나 그 위원회의 요구가 있을 때에는 국무총리·국무위원 또는
            정부위원은 출석·답변하여야 하며, 국무총리 또는 국무위원이 출석요구를
            받은 때에는 국무위원 또는 정부위원으로 하여금 출석·답변하게 할 수
            있다. 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는
            공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며,
            제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.
          </p>
        </div>
      </div>
    </div>
  );
}
