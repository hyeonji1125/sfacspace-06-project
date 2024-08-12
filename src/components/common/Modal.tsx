"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type TModalProps = {
  className?: string;
  shadow?: boolean;
  dimmed?: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function ModalPortal({ children }: { children: React.ReactNode }) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById("modal-root"));
  }, []);

  if (!element) return null;

  return createPortal(children, element) as JSX.Element;
}

export default function Modal({
  className,
  shadow,
  dimmed,
  onClose,
  children,
}: TModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div
        ref={modalRef}
        onClick={modalOutsideClick}
        className={twMerge(
          "fixed inset-0 z-10 flex h-full w-full items-center justify-center",
          dimmed && "bg-black bg-opacity-60",
        )}
      >
        <div
          className={twMerge(
            "relative flex flex-col items-center justify-center gap-6 rounded-[20px] bg-white p-8",
            className,
            shadow && "shadow-custom-shadow",
          )}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center p-[10px] text-2xl font-semibold text-custom-light-text dark:text-custom-dark-text">
      {children}
    </div>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center gap-[20px] p-[10px] text-custom-text-footer-gray">
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col justify-center">{children}</div>;
}

function Button({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-center gap-3">{children}</div>;
}

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
}

Modal.Title = Title;
Modal.Desc = Description;
Modal.Content = Content;
Modal.Button = Button;
Modal.Box = Box;
