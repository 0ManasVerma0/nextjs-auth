import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody

        if(!token || !password){
            return NextResponse.json({error: "Token and new password are required"}, {status: 400})
        }

        // find user with non-expired reset token
        const user = await User.findOne({forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        const isValidToken = await bcrypt.compare(token, user.forgotPasswordToken || "")

        if(!isValidToken){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        // hash and set new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({message: "Password reset successful", success: true})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
