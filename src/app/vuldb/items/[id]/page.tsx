"use client";

import AskButton from "@/components/common/AskButton";
import Modal from "@/components/common/Modal";
import { usePostStore } from "@/store/usePostStore";
import { PostDataType } from "@/types";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SmallPostCardList from "../../_components/smallPostCard/SmallPostCardList";
import DetailHeader from "./_components/DetailHeader";
import DetailMainSection from "./_components/DetailMainSection";

export default function PostDetailPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const { posts, fetchPosts } = usePostStore();
  const [post, setPost] = useState<PostDataType | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ID에 해당하는 게시글 찾기
  useEffect(() => {
    if (id && posts.length > 0) {
      const postData = posts.find((post) => post.id === id);
      setPost(postData || null);
    }
  }, [id, posts]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
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
        <div>
          <h2 className="mb-4 text-2xl font-semibold">비슷한 정보글</h2>
          <SmallPostCardList
            currentLabel={post.label || ""}
            excludePostId={post.id}
          />
        </div>
      </div>
      <AskButton />
    </main>
  );
}
