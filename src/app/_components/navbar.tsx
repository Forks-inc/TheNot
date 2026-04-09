import { sharedStyles } from "../utils/shared-styles";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, Globe, Users, Calendar } from "lucide-react";

export default async function Navbar() {
  const session = await getServerAuthSession();
  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Website", href: "/wedding-website", icon: Globe },
    { name: "Guest List", href: "/guest-list", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
  ];

  return (
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
