(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__e07e566a._.js", {

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
"[project]/src/middleware.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "config": ()=>config,
    "default": ()=>__TURBOPACK__default__export__
});
(()=>{
    const e = new Error("Cannot find module 'next-auth/middleware'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const __TURBOPACK__default__export__ = withAuth(function middleware(req) {
// Tu lógica de middleware aquí
}, {
    callbacks: {
        authorized: ({ token })=>!!token
    }
});
const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/user/:path*"
    ]
};
}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__e07e566a._.js.map