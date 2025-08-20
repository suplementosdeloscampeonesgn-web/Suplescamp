(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__75b147bf._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/ [middleware-edge] (unsupported edge import crypto, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
__turbopack_context__.n(__import_unsupported(`crypto`));
}}),
"[project]/src/auth.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "auth": ()=>auth,
    "handlers": ()=>handlers,
    "signIn": ()=>signIn,
    "signOut": ()=>signOut
});
(()=>{
    const e = new Error("Cannot find module 'next-auth'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'next-auth/providers/credentials'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [middleware-edge] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/mongodb'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/models/User'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    await connectDB();
                    const user = await User.findOne({
                        email: credentials.email
                    });
                    if (!user) return null;
                    const isValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                    if (!isValid) return null;
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name
                    };
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async session ({ session, token }) {
            session.user.id = token.sub;
            return session;
        }
    }
});
}),
"[project]/src/middleware.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "config": ()=>config,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.js [middleware-edge] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth"])((req)=>{
    // Verificar si la ruta requiere autenticación
    const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
    if (isProtected && !req.auth) {
        // Redirigir al login si no está autenticado
        const url = req.url.replace(req.nextUrl.pathname, '/auth/login');
        return Response.redirect(url);
    }
});
const config = {
    matcher: [
        "/dashboard/:path*"
    ]
};
}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__75b147bf._.js.map