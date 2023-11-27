import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// Define constants for route names
const ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  CHECKOUT: '/checkout',
  SUCCESS: '/success',
  ORDERS: '/orders',
  ADDRESS: '/address',
};

// Function to check if a user is authenticated
const isUserAuthenticated = async (supabase: any) => {
  const { data } = await supabase.auth.getSession();
  return !!data?.session;
};

// Function to check if a URL matches a pattern
const matchesRoutePattern = (pathname: any, pattern: any) => {
  return pathname.startsWith(pattern);
};

export async function middleware(req: any) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { pathname } = req.nextUrl;

  // Check if the user is authenticated
  const isAuthenticated = await isUserAuthenticated(supabase);

  // Redirect authenticated users away from /auth
  if (isAuthenticated && matchesRoutePattern(pathname, ROUTES.AUTH)) {
    return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
  }

  // Enforce authentication for specific routes
  if (!isAuthenticated) {
    const protectedRoutes = [
      ROUTES.CHECKOUT,
      ROUTES.SUCCESS,
      ROUTES.ORDERS,
      ROUTES.ADDRESS,
    ];

    if (protectedRoutes.some((route) => matchesRoutePattern(pathname, route))) {
      return NextResponse.redirect(new URL(ROUTES.AUTH, req.url));
    }
  }

  return res;
}
