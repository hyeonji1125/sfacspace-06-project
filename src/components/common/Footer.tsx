import Image from "next/image";
import icons from "../../../public/assets/icons";

export default function Footer() {
  return (
    <footer className="relative h-auto bg-transparent dark:bg-custom-dark-bg">
      <Image
        src={icons.FooterPattern}
        alt="FooterBackgroundPattern"
        layout="fill"
        objectFit="cover"
        className="dark:opacity-20"
      />
      <div className="relative flex h-full items-center justify-between px-20 py-[60px]">
        <div className="flex w-[525px] flex-col gap-2">
          <Image
            src={icons.SfacLogo}
            alt="SFAC SPACE Logo"
            className="mb-[30px] h-[55px] w-[120px] max-w-full flex-shrink-0 overflow-hidden"
          />
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            CONTACT
          </p>
          <div className="flex flex-wrap gap-10 text-base font-medium text-gray-700 dark:text-gray-300">
            <div>
              <div className="flex gap-[26px]">
                <p className="text-custom-text-footer-gray">(주)스팩스페이스</p>
                <p className="text-custom-text-footer-gray">
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
                <p className="text-custom-text-footer-gray">Email</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  admin@sfacspace.com
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <p className="text-custom-text-footer-gray">사업자등록번호</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  450-87-01864
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-custom-text-footer-gray">대표전화</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  02-6217-1119
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-custom-text-footer-gray">팩스</p>
                <p className="text-custom-text-footer-black dark:text-gray-300">
                  02-6217-1115
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
