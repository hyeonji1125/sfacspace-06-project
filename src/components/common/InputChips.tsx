import { InputChipsColor, InputChipsShadow, InputChipsSize } from '@/types/chips/chips';
import Image from 'next/image';
import { ReactNode } from 'react';

// type InputChipsSize = 'textOnly' | 'sideIcon' | 'percentage' | 'leftIcon'
// type InputChipsColor = 'white'| 'purpleOne' | 'purpleTwo' | 'purpleThree' | 'purpleFour' | 'purpleFive' | 'purpleSix' | 'purpleSeven' | 'purpleEight' | 'purpleNine' 
// type InputChipsShadow = "have"

function InputChips({color,size , shadow ,children } : {color? : InputChipsColor,children : ReactNode , shadow? :InputChipsShadow , size? : InputChipsSize}) {
  
  // 색상에 따른 클래스
  const BackGround = {
    white: 'bg-white',
    purpleOne : "bg-purple -100" ,
    purpleTwo: 'bg-purple-200',
    purpleThree: 'bg-purple-300',
    purpleFour: 'bg-purple-400',
    purpleFive: 'bg-purple-500',
    purpleSix: 'bg-purple-600',
    purpleSeven: 'bg-purple-700',
    purpleEight: 'bg-purple-800' ,
    purpleNine : "bg-purple-900" ,
  };

 const Shadow = {
  have : "shadow-lg" 
 }

  return (
    <>
    
    <div
    className={`flex gap-[10px] p-[15px] w-[240px] text-md items-center rounded-xl  ${size === 'percentage' ? 'justify-between' : ''} text-black  rounded-md border ${color && BackGround[color]}
    ${shadow && Shadow[shadow]}
    }}`}
  >
    {/* 파일 이미지 */}
    {size !== 'textOnly' &&  <div className='w-[20px] h-[20px] flex-shrink-0'>
      <Image alt="파일이미지" width={40} height={20} src="/assets/images/chipsIcon.png"/></div> }
      {/* 칠드런 박스 */}
    <div className={'overflow-hidden whitespace-nowrap text-ellipsis'}>{children}</div>  
    {/* 퍼센트 */}
      {size === 'percentage'  &&  (<div className='flex gap-[15px]'>
        <div>90%</div> 
      </div> )}
      {/* X표시 */}
      {size === 'percentage' || size === 'sideIcon' ? <div>X</div> : ""}
    </div>
    </>
  );
}

export default InputChips;

// ${size && Size[size]} ${color && Color[color]}