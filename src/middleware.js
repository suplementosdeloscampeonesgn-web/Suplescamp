import { auth } from "./auth"

export default auth((req) => {
  // Verificar si la ruta requiere autenticación
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard')
  
  if (isProtected && !req.auth) {
    // Redirigir al login si no está autenticado
    const url = req.url.replace(req.nextUrl.pathname, '/auth/login')
    return Response.redirect(url)
  }
})

export const config = {
  matcher: ["/dashboard/:path*"]
}
