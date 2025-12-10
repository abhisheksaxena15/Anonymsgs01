(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__df03c0ba._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/my-app/src/middleware.ts [middleware-edge] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
(()=>{
    const e = new Error("Cannot find module 'next-auth/middleware'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'next-auth/jwt'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
async function middleware(request) {
    const token = await getToken({
        req: request
    });
    const url = request.nextUrl;
    if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/verify') || url.pathname === '/' || url.pathname.startsWith('/sign-up'))) {
        return (void 0).redirect(new URL('/dashboard', request.url));
    }
    return (void 0).redirect(new URL('/home', request.url));
}
const config = {
    matcher: [
        '/sign-in',
        '/verify/:path*',
        '/',
        'sign-up',
        '/dashboard'
    ]
};
}),
"[project]/my-app/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$src$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["config"],
    "middleware",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$src$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["middleware"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$app$2f$src$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/my-app/src/middleware.ts [middleware-edge] (ecmascript) <locals>");
(()=>{
    const e = new Error("Cannot find module 'next-auth/middleware'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__df03c0ba._.js.map