import { cookies } from "next/headers";
import Image from "next/image";
import RepoList from "./_components/RepoList";


export default async function MyLibraryPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");

  if (!sessionToken) {
    return (
      <section className="relative flex w-full h-[84vh] text-primary-purple-500 overflow-hidden dark:text-purple-50 dark:font-bold z-20">
        <div>로그인</div>
      </section>
    );
  }

  return (
    <div className="container">
      <RepoList />
    </div>
  );
}
