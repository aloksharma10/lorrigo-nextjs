import { NextRequest, NextResponse } from 'next/server'; 

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value;

  if (!currentUser) {
    if (!request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/signup') && !request.nextUrl.pathname.startsWith('/forgot-password')) {
      return NextResponse.redirect(new URL('/login', request.url)); 
    }
  } else {
    if (!request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', request.url)); 
    }
  }

  return;
}

export const config = {
  // Matcher to apply middleware on all routes except those starting with /api, _next/static, _next/image, and ending with .png
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
