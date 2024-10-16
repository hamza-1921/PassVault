import { NextRequest,NextResponse } from "next/server";

let storedNames={} ;
export async function  POST(req:NextRequest){
 const{NameUP,NameUPP} = await req.json();
 storedNames = { NameUP, NameUPP };
  return NextResponse.json({name:NameUP,nameup:NameUPP})
}

export interface StoredNames{
    NameUP: any ,
    NameUPP: any ,
}
export const getStoredNames = () => storedNames;