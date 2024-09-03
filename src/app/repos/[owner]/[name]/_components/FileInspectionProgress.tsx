import { IoClose, IoEllipse, IoTriangle } from "react-icons/io5";

export default function FileInspectionProgress() {
  return (
    <ul className="flex flex-col gap-4 px-2">
      <li className="flex justify-between text-xl">
        <div className="flex items-center gap-[10px]">
          <IoClose viewBox="150 150 212 212" className="text-accent-red" />
          <span>검출된 취약점</span>
        </div>
        <span>12</span>
      </li>
      <li className="flex justify-between text-xl">
        <div className="flex items-center gap-[10px]">
          <IoTriangle
            viewBox="30 30 452 452"
            className="text-xl text-accent-orange"
          />
          <span>수정 제안</span>
        </div>
        <span>8</span>
      </li>
      <li className="flex justify-between text-xl">
        <div className="flex items-center gap-[10px]">
          <IoEllipse
            viewBox="50 50 412 412"
            className="text-xl text-accent-green"
          />
          <span>문제 없음</span>
        </div>
        <span>23</span>
      </li>
    </ul>
  );
}
