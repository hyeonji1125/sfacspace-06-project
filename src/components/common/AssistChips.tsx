
import { AssistChipsBg, AssistChipsBorder, AssistChipsShadow, AssistChipsText } from "@/types/chips/chips";
import { ReactNode } from "react";



function AssistChips({text,bg,border,shadow ,children } : {text? : AssistChipsText ,bg? : AssistChipsBg ,border? : AssistChipsBorder, shadow? :AssistChipsShadow, children : ReactNode}) {
  
    // 여기서 받는 props는 다 색상을 나타냅니다.
    // text: 텍스트 컬러 , bg: 백그라운드 컬러 , border: 박스의 테두리 컬러
    //색상이 없을 시 검정,흰색 조합의 기본으로 나옵니다.
    const Text = {
        purple: 'text-purple-800',
        white: 'text-white',
        red : 'text-red-500',
        redLight : 'text-red-400'
      };
      const BackGround = {
        white: 'bg-white',
        grayLight : 'bg-gray-100',
        grayNormal : 'bg-gray-200',
        grayDark : 'bg-gray-300',
        purple : 'bg-purple-50' ,
        blue : 'bg-blue-300' ,
        red : 'bg-red-400' ,
        redLight : 'bg-red-200'
      };
      const Border = {
        black: 'border-black',
        purpleLight : 'border-purple-500',
        purpleMiddle : 'border-purple-700',
        purpleDark : 'border-purple-800' ,
      };
      const Shadow = {
        have : "shadow-xl" 
       }
  
    return (
      <>
      <div className={`flex w-[60px]  h-[30px] justify-center items-center font-bold border rounded-full ${text && Text[text]} ${bg? BackGround[bg] : ''} ${border && Border[border]} ${shadow && Shadow[shadow] }` }>
        {children}
      </div>
      </>
    );
  }
  
  export default AssistChips;
  