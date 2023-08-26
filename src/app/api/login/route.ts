import { getJWTSecretKey } from '@/lib/auth'
import {SignJWT} from 'jose'
import {cookies} from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async(request: Request) => {
    const body = await request.json()

    if(body.username === "admin" && body.password === "admin"){
        const jwt = await new SignJWT({
            username: body.username,
            role: "admin"
        }).setProtectedHeader({alg: "HS256", typ: "JWT"}).setIssuedAt().setExpirationTime("1m").sign(new TextEncoder().encode(getJWTSecretKey()))

        console.log(jwt);
        

        cookies().set("user-token", jwt, {
            httpOnly: true
        })
        return NextResponse.json({accessToken: jwt}, {status: 200})
    }

    return NextResponse.json(
        {Error: "Failed to create token"}, {status: 400}
    )
}