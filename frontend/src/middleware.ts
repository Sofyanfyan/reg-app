import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

console.log("====================================");
console.log("masuk");
console.log("====================================");

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
