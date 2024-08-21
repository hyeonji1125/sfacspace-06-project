import NextAuth, { User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AdapterUser } from "next-auth/adapters";
import { Account, Profile } from "next-auth";

const githubId = process.env.AUTH_GITHUB_ID;
const githubSecret = process.env.AUTH_GITHUB_SECRET;

if (!githubId || !githubSecret) {
  throw new Error("환경변수 설정 에러");
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: AdapterUser | User, account: Account | null, profile?: Profile }) {
      const email = user.email ?? profile?.email;

      if (!email) {
        return false;
      }

      const userDocRef = doc(db, "users", email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        
        // 사용자 정보가 없으면 Firestore에 저장
        await setDoc(userDocRef, {
          name: user.name ?? profile?.name,
          email: email,
          image: user.image ?? profile?.image,
          createdAt: new Date().toISOString(),
        });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
