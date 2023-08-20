import { NextRequest, NextResponse } from "next/server";


export const GET = (request: NextRequest, {params}: {params: {id: string}}) =>{
    console.log(params.id);
    
    return new NextResponse("hello to dynamic segments")
}