import connect from "@/dbConfig/dbConfig"; // @ means root directory
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exists." }, { status: 400 });
    }
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
        return NextResponse.json({
            error: "Invalid password"
        }, {
            status: 401
        });
    }
    // create token data
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
    const response = NextResponse.json({
      message: "User Logged in successfully",
      success: true,
    }, {
        status: 200
    });
    response.cookies.set("token", token, {
        httpOnly: true,
    });
    return response;
  } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
  }
};
