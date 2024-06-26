import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName?: string | null;
      email?: string | null;
      image?: string | null;
    };
    token : JWT;
  }

  interface User {
    id: string;
    fullName?: string | null;
    email?: string | null;
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}
