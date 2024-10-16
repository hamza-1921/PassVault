import bcrypt from "bcrypt"

export async function comparePasswords(plainTextPassword:any, hashedPassword:any) {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
}