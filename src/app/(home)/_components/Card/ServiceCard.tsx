import Label from "./Label";

type ServiceCardProps = {
  labelBg: string;
  labelColor: string;
  labelchildren: string;
  emoji: string;
  description1: string;
  description2: string;
};
export default function ServiceCard({
  labelBg,
  labelColor,
  labelchildren,
  emoji,
  description1,
  description2,
}: ServiceCardProps) {
  return (
    <div className="mx-6 flex h-[332px] w-[244px] flex-col items-center rounded-[40px] bg-white p-6 shadow-[0px_80px_60px_-40px_rgba(0,0,0,0.25)] md:h-[442px] md:w-[325px]">
      <div className="flex flex-1 items-center">
        <Label bg={labelBg} color={labelColor}>
          {labelchildren}
        </Label>
      </div>

      <div className="flex flex-1">
        <p className="text-[70px] md:text-[120px]">{emoji}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center text-center text-xs text-[#606060] md:text-base">
        <p>{description1}</p>
        <p>{description2}</p>
      </div>
    </div>
  );
}
