import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/User";
import { ConnectDB } from "@/app/ConnectDB";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { hashPassword } from "../hashedpassword/route";
export async function POST(req: NextRequest,res:NextResponse) {
    try {
        await ConnectDB() ;
        const { NameUP, PasswordUP } = await req.json();
        const existinguser = await User.findOne({ name: NameUP})
        if(existinguser){
            return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
        }; 
        const hashedPassword = await hashPassword(PasswordUP)
        const newUser = new User({
            name: NameUP,
            password: hashedPassword, 
        });
        await newUser.save()
        const secret = process.env.JWT_SECRET;
        if (typeof secret !== 'string') {
            throw new Error('JWT_SECRET must be a string');
        }
        const token = jwt.sign({ NameUP }, secret, {});
        const response = NextResponse.json({ user:existinguser, message: 'Created an account successfully!' });
        response.cookies.set('token', token, {});
        return response;
        
        return NextResponse.json({ user:newUser, message: ' Created an account'  });
    } catch (err:any) {
        console.error('Error occurred', err);
        return NextResponse.json({ error: 'An error occurred',description:err.message }, { status: 500 });
    }
}
