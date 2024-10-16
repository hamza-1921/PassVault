import { NextRequest,NextResponse } from "next/server";
import crypto from "crypto"
export function decryptPassword(encryptedData:any) {
    const { encryptedPassword, key, iv } = encryptedData; 
    const algorithm = 'aes-256-cbc';

   
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key, 'hex'),  
        Buffer.from(iv, 'hex')     
    );


    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8'); 

    return  {decrypted} ; 
}
