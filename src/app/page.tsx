import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";

import { type Metadata } from "next";
import NonAuthenticatedView from "./_components/home/non-authenticated-view";
import AuthenticatedView from "./_components/home/authenticated-view";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <>
      {!session ? <NonAuthenticatedView /> : <AuthenticatedView />}
    </>
  );
}
