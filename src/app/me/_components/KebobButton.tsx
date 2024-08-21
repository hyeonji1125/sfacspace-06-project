"use client";

import { useEffect, useRef, useState } from "react";
import { Kebob } from "../../../../public/assets/svg/SvgIcons";

function MenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        className="whitespace-nowrap px-5 py-3 hover:bg-bg-gray-light"
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

export default function KebobButton({
  id,
}: {
  id?: number;
  onDelete?: () => void;
  onShare?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    console.log(`delete item ${id}`);
    setOpen(false);
  };

  const handleShare = () => {
    console.log(`share item ${id}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Kebob />
      </button>
      {open && (
        <ul className="shadow-custom-dropdown-shadow absolute right-0 top-8 overflow-hidden rounded-lg">
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
          <MenuItem onClick={handleShare}>공유</MenuItem>
        </ul>
      )}
    </div>
  );
}
