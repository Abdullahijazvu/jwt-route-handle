import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
    
    const headersToken = request.cookies.get("user-token")?.value

    const {pathname, origin} = request.nextUrl

    console.log("Token", headersToken);
    
    try {
        if(pathname === "/login"){
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
            return NextResponse.next();
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