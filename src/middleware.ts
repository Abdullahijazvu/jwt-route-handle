import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";
import next from "next/types";

export async function middleware(request: NextRequest){
    const {pathname, origin} = request.nextUrl

    const headersToken = request.cookies.get("token")?.value

    console.log("Token", headersToken);
    
    try {
        if(pathname === "/login" || pathname === "register"){
            if(headersToken) return NextResponse.redirect(`${origin}`)
            return NextResponse.next()
        }
        if(!headersToken){
            return NextResponse.redirect("http://localhost:3000/login")
        }

        const verifyToken = await jwtVerify(
            headersToken,
            new TextEncoder().encode(getJWTSecretKey())
        )

        console.log("JWT AUTH: ", verifyToken);

        if(verifyToken){
            return NextRequest.next();
        }

        return NextResponse.json(
            {error: {Message: "Authentication Required"}}, {status: 400}
        )
        
    } catch (error) {
        console.log(error);
           
    }
}
export const config = {
    matcher: ["/", "/login", "/protected"]
}