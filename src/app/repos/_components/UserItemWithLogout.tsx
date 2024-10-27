"use client";

import Button from "@/components/common/Button";
import UserItem from "@/components/common/UserItem";
import { useState } from "react";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function UserItemWithLogout() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      {modalOpen && (
        <LogoutConfirmModal isOpen={modalOpen} onClose={setModalOpen} />
      )}
      <div className="flex items-center justify-between">
        <UserItem />
        <Button
          theme="tonal"
          size="small"
          className="h-14 w-[196px] text-2xl font-medium dark:bg-primary-purple-300 dark:text-custom-dark-bg sm:text-2xl md:text-2xl"
          onClick={() => setModalOpen(true)}
        >
          로그아웃
        </Button>
      </div>
    </>
  );
}
