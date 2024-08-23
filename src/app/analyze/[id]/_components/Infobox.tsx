import { IoClose, IoEllipse, IoTriangle } from "react-icons/io5";

export default function Infobox() {
  // mockup
  return (
    <div className="flex items-center justify-center gap-6 rounded-lg border border-line-default p-5">
      <div className="flex items-center gap-2">
        <IoClose
          viewBox="150 150 212 212"
          className="text-base text-accent-red"
        />
        <span className="text-xl">12</span>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <IoTriangle
          viewBox="30 30 452 452"
          className="text-xl text-accent-orange"
        />
        <span>8</span>
      </div>
      <div className="flex items-center gap-2 text-xl">
        <IoEllipse
          viewBox="50 50 412 412"
          className="text-xl text-accent-green"
        />
        <span>23</span>
      </div>
    </div>
  );
}
