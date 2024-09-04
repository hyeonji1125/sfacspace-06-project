import { IoClose, IoEllipse, IoTriangle } from "react-icons/io5";

const inspectionData = [
  {
    icon: <IoClose viewBox="150 150 212 212" className="text-accent-red" />,
    label: "검출된 취약점",
    count: 12,
  },
  {
    icon: (
      <IoTriangle
        viewBox="30 30 452 452"
        className="text-xl text-accent-orange"
      />
    ),
    label: "수정 제안",
    count: 8,
  },
  {
    icon: (
      <IoEllipse
        viewBox="50 50 412 412"
        className="text-xl text-accent-green"
      />
    ),
    label: "문제 없음",
    count: 23,
  },
];

export default function FileInspectionProgress() {
  return (
    <ul className="flex flex-col gap-4 px-2">
      {inspectionData.map((item, index) => (
        <li key={index} className="flex justify-between text-xl">
          <div className="flex items-center gap-[10px]">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <span>{item.count}</span>
        </li>
      ))}
    </ul>
  );
}
