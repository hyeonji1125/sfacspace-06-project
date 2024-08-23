import { IoClose, IoEllipse, IoTriangle } from "react-icons/io5";

export default function Infobox() {
  // mockup
  return (
    <ul className="flex items-center justify-center gap-6 rounded-lg border border-line-default p-5">
      <li className="group relative flex items-center gap-2">
        <IoClose
          viewBox="150 150 212 212"
          className="text-base text-accent-red"
        />
        <span className="text-xl">12</span>
        <div className="absolute left-1/2 top-8 w-max -translate-x-1/2 scale-0 rounded-md bg-grayscale-50 p-2 text-xs text-white transition-all duration-200 group-hover:scale-100">
          검출된 취약점
        </div>
      </li>
      <li className="group relative flex items-center gap-2 text-xl">
        <IoTriangle
          viewBox="30 30 452 452"
          className="text-xl text-accent-orange"
        />
        <span>8</span>
        <div className="absolute left-1/2 top-8 w-max -translate-x-1/2 scale-0 rounded-md bg-grayscale-50 p-2 text-xs text-white transition-all duration-200 group-hover:scale-100">
          수정 제안
        </div>
      </li>
      <li className="group relative flex items-center gap-2 text-xl">
        <IoEllipse
          viewBox="50 50 412 412"
          className="text-xl text-accent-green"
        />
        <span>23</span>
        <div className="absolute left-1/2 top-8 w-max -translate-x-1/2 scale-0 rounded-md bg-grayscale-50 p-2 text-xs text-white transition-all duration-200 group-hover:scale-100">
          문제 없음
        </div>
      </li>
    </ul>
  );
}
