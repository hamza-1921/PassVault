import mongoose from "mongoose";
import Passwords from "@/app/models/Passwords";
import { NextRequest,NextResponse } from "next/server";
import slugify from "slugify";
import { ConnectDB } from "@/app/ConnectDB";
import bcrypt from "bcrypt"
import { EncryptionFunction } from "../EncryptionFunction/route";
import { decryptPassword } from "../DecryptionFunction/route";

export async function POST(req:NextRequest,res:NextResponse){
try{
await ConnectDB()

const {NameUP,NameUPP,Username,Password,URL} = await  req.json() ;
const url = slugify(URL) ;
const {encryptedPassword,key,iv} = await EncryptionFunction(Password) ;





const newPasswords = new Passwords({
    username : Username ,
    passwords : encryptedPassword , 
    key:key,
    iv:iv,
    Url : url ,
    Name : NameUP ||undefined , 
    NameU : NameUPP || undefined
})
await newPasswords.save()




return NextResponse.json({message:"Password successfully stored",username:Username,key:key,iv:iv,Url:url,Name:NameUP,NameU:NameUPP})
}
catch(err:any){
    return NextResponse.json({err:'An error occured',details: err.message}) ;
}
}
