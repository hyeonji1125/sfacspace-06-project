import { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AdapterUser } from "next-auth/adapters";
import { Account, Profile } from "next-auth";
import { postData } from "@/hooks/fetchData";

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
          scope: "read:user user:email repo"
        }
      }
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
        // 사용자 정보를 Firestore에 저장
        await postData('users', {
          email: user.email,
          name: user.name ?? profile?.name,
          image: user.image ?? profile?.image,
          createdAt: new Date().toISOString(),
        });
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
