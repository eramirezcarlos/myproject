import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  
  // Check if the user is trying to access dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Check for authentication token/session
    const token = request.cookies.get('laravel_session')?.value;
    
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};