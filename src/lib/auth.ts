import { postData } from "@/hooks/fetchData";
import { Account, NextAuthOptions, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";

const githubId = process.env.AUTH_GITHUB_ID;
const githubSecret = process.env.AUTH_GITHUB_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("환경변수 설정 에러");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AdapterUser | User;
      account: Account | null;
      profile?: Profile;
    }) {
      if (user.email) {
        Promise.resolve().then(() => {
          postData("users", {
            email: user.email,
            name: user.name ?? profile?.name,
            image: user.image ?? profile?.image,
            createdAt: new Date().toISOString(),
          }).catch((error) =>
            console.error("유저 정보 FireStore 저장 에러: ", error),
          );
        });
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
