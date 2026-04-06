import { sharedStyles } from "../utils/shared-styles";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerAuthSession();
  const user = session?.user;
  return (
    <div
      className={`pt-5 ${sharedStyles.desktopPaddingSides} ${sharedStyles.minPageWidth}`}
    >
      <h1 className="pb-4 text-3xl">{user?.name}</h1>
      <ul className="flex justify-between">
        <div className="flex gap-7">
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link className="" href="/">
              Planning Tools
            </Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Vendors</Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Wedding Website</Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Invitations</Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Registry</Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Attire & Rings</Link>
          </li>
          <li className="border-b-4 border-transparent pb-5 hover:border-gray-600">
            <Link href="/">Ideas & Advice</Link>
          </li>
          <li>
            <Link
              className="border-b-4 border-transparent pb-5 hover:border-gray-600"
              href="/"
            >
              Gifts & Favors
            </Link>
          </li>
        </div>
        <div className="pb-5">
          {session === null ? (
            <Link href="/api/auth/signin">Sign In</Link>
          ) : (
            <Link href="/api/auth/signout">Sign Out</Link>
          )}
        </div>
      </ul>
      <hr className="relative -left-48 bottom-0 w-screen border-gray-300" />
    </div>
  );
}
