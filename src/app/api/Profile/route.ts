import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    const secret = process.env.JWT_SECRET;


    if (typeof secret !== 'string') {
        console.error('JWT_SECRET is not a valid string');
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

  
    const token = req.cookies.get('token')?.value;

  
    if (!token) {
        return NextResponse.json({ message: 'Token not found, user not authenticated' }, { status: 401 });
    }

    
    return new Promise((resolve) => {
        jwt.verify(token, secret, (err, userInfo) => {
            if (err) {
                console.error('JWT verification error:', err);
                resolve(NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 }));
            } else {
                resolve(NextResponse.json({
                    message: 'User is authenticated',
                    user: userInfo,
                }));
            }
        });
    });
}
