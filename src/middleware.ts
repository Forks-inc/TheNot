import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: () => true, // Let the pages handle the logic or refine this
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/guest-list/:path*"],
};
