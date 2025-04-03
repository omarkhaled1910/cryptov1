import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = cookies().get("auth")?.value;
  console.log("midduleare auth", cookies().get("auth"), auth, pathname);
  // if (pathname.includes("/login") || pathname.includes("/register")) {
  //   if (auth) return NextResponse.redirect(new URL("/", request.url));

  //   return NextResponse.next();
  // }
  // if (pathname.startsWith("/api") && !auth) {
  //   console.log("Dashboard path accessed:", pathname, "auth:", auth);

  //   return NextResponse.json(
  //     { success: false, message: "authentication failed" },
  //     { status: 403 }
  //   );
  // }
  console.log(
    cookies().get("clientAuth"),
    "client auththththht",
    cookies().get("auth")
  );
  if (pathname.startsWith("/dashboard") && !auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Middleware logic
  // if (pathname.includes("/dashboard")) {
  //   // Example logic for paths including "/dashboard"
  //   // You can perform actions like redirects or adding headers here
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
