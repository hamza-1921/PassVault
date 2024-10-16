import crypto from 'crypto' ;
export function EncryptionFunction(Password:any){
    const algorithm = 'aes-256-cbc'; 
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16); 

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encryptedPassword = cipher.update(Password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    return {encryptedPassword,key: key.toString('hex'), iv: iv.toString('hex')};
}