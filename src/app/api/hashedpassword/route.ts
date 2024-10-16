import bcrypt from "bcrypt"

export async function hashPassword(plainTextPassword:any) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}