import Image from "next/image";
import icons from "../../../public/assets/icons";

export default function Footer() {
  return (
    <footer className="relative h-auto bg-custom-light-bg dark:bg-custom-dark-bg">
      <div className="absolute inset-0 z-0">
        <Image
          src={icons.FooterPattern}
          alt="FooterBackgroundPattern"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="opacity-100 dark:opacity-10"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-6 md:flex-row md:px-20 md:py-[60px]">
        <div className="mb-6 flex flex-col gap-2 md:mb-0">
          <Image
            src={icons.SfacLogo}
            alt="SFAC-SPACE-Logo"
            className="mb-[10px] h-[55px] w-[120px] max-w-full flex-shrink-0 overflow-hidden md:mb-[30px]"
          />
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            CONTACT
          </p>
          <div className="flex flex-wrap gap-3 text-base font-medium text-gray-700 dark:text-gray-300 md:gap-10">
            <div>
              <div className="flex gap-[26px]">
                <p className="text-text-gray-default">(주)스팩스페이스</p>
                <p className="text-text-gray-default">
                  대표자{" "}
                  <span className="ml-[11px] text-custom-text-footer-black dark:text-gray-300">
                    염민호
                  </span>
                </p>
              </div>
              <p className="text-custom-text-footer-black dark:text-gray-300">
                서울 강서구 마곡중앙2로 11, 3층 303호
              </p>
              <div className="flex gap-[23px]">
                <p className="text-text-gray-default">Email</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  admin@sfacspace.com
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <p className="text-text-gray-default">사업자등록번호</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  450-87-01864
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-text-gray-default">대표전화</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  02-6217-1119
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-text-gray-default">팩스</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  02-6217-1115
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto w-full items-end justify-end text-gray-700 dark:text-gray-400 md:w-auto md:flex-row">
          <div className="flex gap-10 text-[16px] text-text-gray-default md:gap-14">
            <p className="underline">서비스 이용약관</p>
            <p className="underline">개인정보 처리방침</p>
          </div>
          <div className="mt-1 text-custom-text-footer-black dark:text-gray-300 md:mt-3">
            © 2024 Spacspace. All right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
