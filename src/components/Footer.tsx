import Image from 'next/image';
import icons from '../../public/assets/icons';

export default function Footer() {
  return (
    <footer className="relative bg-transparent dark:bg-custom-dark-bg h-auto">
      <div className="absolute inset-0 z-0">
        <Image
          src={icons.FooterPattern}
          alt="FooterBackgroundPattern"
          layout="fill"
          objectFit="cover"
          className="dark:opacity-10 opacity-100"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full px-6 py-6 md:px-20 md:py-[60px]">
        <div className="flex flex-col w-full md:w-[525px] gap-2 mb-6 md:mb-0">
          <Image
            src={icons.SfacLogo}
            alt="SFAC-SPACE-Logo"
            className="w-[120px] h-[55px] flex-shrink-0 max-w-full overflow-hidden mb-[10px] md:mb-[30px]"
          />
          <p className="text-xl font-semibold text-gray-900 dark:text-white">CONTACT</p>
          <div className="flex flex-wrap text-base font-medium text-gray-700 dark:text-gray-300 gap-3 md:gap-10">
            <div>
              <div className='flex gap-[26px]'>
                <p className="text-custom-text-footer-gray">(주)스팩스페이스</p>
                <p className='text-custom-text-footer-gray'>대표자 <span className='text-custom-text-footer-black dark:text-gray-300 ml-[11px]'>염민호</span></p>
              </div>
              <p className='text-custom-text-footer-black dark:text-gray-300'>서울 강서구 마곡중앙2로 11, 3층 303호</p>
              <div className='flex gap-[23px]'>
                <p className="text-custom-text-footer-gray">Email</p>
                <p className='text-custom-text-footer-black dark:text-gray-300'>admin@sfacspace.com</p>
              </div>
            </div>
            <div>
              <div className='flex gap-2'>
                <p className="text-custom-text-footer-gray">사업자등록번호</p>
                <p className='text-custom-text-footer-black dark:text-gray-300'>450-87-01864</p>
              </div>
              <div className='flex gap-2'>
                <p className="text-custom-text-footer-gray">대표전화</p>
                <p className='text-custom-text-footer-black dark:text-gray-300'>02-6217-1119</p>
              </div>
              <div className='flex gap-2'>
                <p className="text-custom-text-footer-gray">팩스</p>
                <p className='text-custom-text-footer-black dark:text-gray-300'>02-6217-1115</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-row items-end justify-end w-full md:w-auto text-gray-700 dark:text-gray-400 mt-auto">
          <div className="flex gap-10 md:gap-14 text-[16px] text-custom-text-footer-gray ">
            <p className="underline">서비스 이용약관</p>
            <p className="underline">개인정보 처리방침</p>
          </div>
          <div className="text-custom-text-footer-black dark:text-gray-300 md:mt-3 mt-1">
            © 2024 Spacspace. All right reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
