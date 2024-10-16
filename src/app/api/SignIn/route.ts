import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/User";
import { ConnectDB } from "@/app/ConnectDB";
import jwt from 'jsonwebtoken'
import { comparePasswords } from "../Comparehashedpassword/route";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await ConnectDB();
        const { NameUP, PasswordUP } = await req.json();
        const existinguser = await User.findOne({ name: NameUP })

        if (!existinguser) {
            return NextResponse.json({ message: 'This user does not exist!' }, { status: 400 });

        };


const isPasswordCorrect = await comparePasswords(PasswordUP,existinguser.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ message: 'Password is incorrect!' }, { status: 500 });
        }

        const secret = process.env.JWT_SECRET;
        if (typeof secret !== 'string') {
            throw new Error('JWT_SECRET must be a string');
        }

        const token = jwt.sign({ NameUP }, secret, {});
        const response = NextResponse.json({ user:existinguser, message: ' logged in successfully!' });
        response.cookies.set('token', token, {});
        return response;
    } catch (err) {
        console.error('Error occurred', err);

    }
}
