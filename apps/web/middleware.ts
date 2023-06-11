export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard', '/games', '/grooming/:path*', '/team/:path*', '/teams', '/gameResults'],
};
