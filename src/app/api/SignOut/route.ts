
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    try{

        
      const response = NextResponse.json({message:'Logged out successfully'})
      response.cookies.set('token', '', { expires: new Date(0), path: '/' });
       
      return response ;
    }
    catch(err){
        return NextResponse.json({message:'Logout failed'})
    }
}