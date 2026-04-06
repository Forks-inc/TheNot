"use client";

import { signIn } from "next-auth/react";

export default function NonAuthenticatedView() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="inline-block border-2 border-black p-2 cursor-pointer" onClick={() => void signIn()}>
        Sign In
      </div>
    </div>
  );
}
