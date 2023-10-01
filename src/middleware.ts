import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    // check path is public or private
    const isPublicPath = path === "/login" || path === "/signup"
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/profile/:id*'],
};
