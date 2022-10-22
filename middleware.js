import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware (req) {
    const token = req.cookies.get("token");


    console.log("this is the request: ", req)

    if(token === undefined) return NextResponse.redirect(new URL('/', req.url));

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET));
        return NextResponse.next();
    } catch (e) {
        return NextResponse.redirect(new URL('/', req.url))
    }

}

export const config = {
    matcher: ["/padlet/:path*"]
}