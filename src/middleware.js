export function middleware(req) {
  // Cambia el nombre de la cookie a "__Secure-next-auth.session-token" si tu NextAuth está en producción,
  // o "next-auth.session-token" para desarrollo (verifica en tu navegador).
  const token = req.cookies.get('next-auth.session-token'); 

  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtected && !token) {
    const url = req.url.replace(req.nextUrl.pathname, '/auth/login');
    return Response.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
