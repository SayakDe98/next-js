import connect from "@/dbConfig/dbConfig"; // @ means root directory
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const { username, email, password } = requestBody;

      
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists." }, {
                status: 400
            });
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({ email, username, password: hashedPassword });
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            data: savedUser
        }, {
            status: 201
        })
    } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
    }
}
