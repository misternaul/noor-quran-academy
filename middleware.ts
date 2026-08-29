import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect /admin routes
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const session = request.cookies.get("admin_session")?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    try {
      await decrypt(session);
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  // Redirect logged-in users away from login page
  if (path === "/admin/login") {
    const session = request.cookies.get("admin_session")?.value;
    if (session) {
      try {
        await decrypt(session);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch (error) {
        // invalid session, allow them to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
