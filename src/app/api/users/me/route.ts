import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

connect(); // we need to call databse connection always in each route in nextjs

export const GET = async (request: NextRequest) => {
    try {
        const userId = await getDataFromToken(request);
      
        const user = await User.findOne({ _id: userId }).select('-password -isAdmin -__v');
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        })
    }
}