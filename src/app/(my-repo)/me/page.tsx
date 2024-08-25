import PageTitle from "@/components/common/PageTitle";
import UserItem from "../_components/UserItem";
import Input from "@/components/common/Input";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function MePage() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <>
      <PageTitle link="/mylibrary">Profile Information</PageTitle>
      <div className="flex w-full flex-col">
        <UserItem />
        <hr className="my-20" />
        <div className="flex flex-col gap-12">
          <h3 className="text-[32px] font-semibold text-black">내 정보</h3>
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl text-text-gray-dark">계정</h4>
            {user?.email && (
              <Input
                disabled
                className="w-[842px] text-text-gray-light"
                value={user.email}
              />
            )}
          </div>
        </div>
        <hr className="my-20" />
        <div className="flex flex-col gap-14">
          <h3 className="text-[32px] font-semibold text-black">라이브러리</h3>
          <ul className="flex flex-col gap-9">
            <li>
              <Link href="/me/detected-files">
                <h4 className="text-2xl text-text-gray-dark">검출된 파일</h4>
              </Link>
            </li>
            <li>
              <Link href="/me/clipping-articles">
                <h4 className="text-2xl text-text-gray-dark">스크랩</h4>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-20" />
        <ul className="mb-20 flex flex-col gap-9">
          <li>
            <Link href="/me/setting">
              <h4 className="text-2xl text-text-gray-dark">설정</h4>
            </Link>
          </li>
          <li>
            <Link href="/">
              <h4 className="text-2xl text-text-gray-dark">고객센터</h4>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
