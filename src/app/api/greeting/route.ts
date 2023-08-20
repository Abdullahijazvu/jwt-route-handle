import {NextRequest, NextResponse} from 'next/server'

export const GET = (request: NextRequest) => {
    const name = request.nextUrl.searchParams.get("name")

    return NextResponse.json({
        message: `Hello ${name}`
    })
}

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    return NextResponse.json({
        data:body,
        message: "your data is created"
    })
}

export const PUT = async(request: NextRequest) => {
    const body = await request.json()
    return NextResponse.json({
        message: "Data updated"
    })
}