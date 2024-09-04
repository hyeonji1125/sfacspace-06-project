"use client";

import Modal from "@/components/common/Modal";
import { MockPostCardTypes } from "@/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCardMock from "../../_components/_data/postCardMock";
import SmallPostCardList from "../../_components/smallPostCard/SmallPostCardList";
import DetailHeader from "./_components/DetailHeader";
import DetailMainSection from "./_components/DetailMainSection";

export default function PostDetailPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const [post, setPost] = useState<MockPostCardTypes | null>(null);

  useEffect(() => {
    if (id) {
      const postData = PostCardMock.find((post) => post.id === Number(id));
      setPost(postData || null);
    }
  }, [id]);

  if (!post) {
    return <div></div>;
  }

  if (!session) {
    return (
      <Modal isOpen={true} onClose={() => {}} dimmed={true} shadow>
        <Modal.Title>로그인이 필요합니다</Modal.Title>
        <Modal.Desc>로그인 후 해당 게시글에 접근할 수 있습니다.</Modal.Desc>
        <Modal.Button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="rounded bg-primary-purple-500 px-4 py-2 text-white"
          >
            로그인
          </button>
        </Modal.Button>
      </Modal>
    );
  }

  return (
    <main className="h-auto max-w-[1920px] px-6 pt-9">
      <div className="mx-auto flex w-full max-w-[1313px] flex-col gap-[60px]">
        <div>
          <DetailHeader post={post} />
        </div>
        <div>
          <DetailMainSection post={post} />
        </div>
        <SmallPostCardList />
      </div>
    </main>
  );
}
