import { NextResponse } from "next/server";

export const POST = async (response: NextResponse) => {
    try {
        const response = NextResponse.json({
            message: "User Logged out successful",
            success: true
        });
        response.cookies.delete("token");
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}