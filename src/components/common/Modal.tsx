"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type TModalProps = {
  className?: string;
  shadow?: boolean;
  dimmed?: boolean;
  isOpen: boolean;
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
  isOpen,
  onClose,
  children,
}: TModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [isOpen]);

  return (
    <ModalPortal>
      <div
        ref={modalRef}
        onClick={modalOutsideClick}
        className={twMerge(
          "fixed inset-0 z-50 flex h-full w-full items-center justify-center",
          dimmed && "bg-black bg-opacity-60",
        )}
      >
        <div
          className={twMerge(
            "relative flex flex-col items-center justify-center gap-6 rounded-[20px] bg-white p-8 dark:bg-custom-dark-bg",
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
    <h3 className="flex justify-center p-[10px] text-2xl font-semibold text-custom-light-text dark:text-custom-dark-text">
      {children}
    </h3>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[20px] p-[10px] text-text-gray-default">
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}

function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge("flex justify-center gap-3", className && className)}
    >
      {children}
    </div>
  );
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
