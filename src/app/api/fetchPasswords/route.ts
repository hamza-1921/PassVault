import { NextRequest, NextResponse } from "next/server";
import { getStoredNames, StoredNames } from "../returnNameUPandNameUPP/route";
import { ConnectDB } from "@/app/ConnectDB";
import Passwords from "@/app/models/Passwords"; 
import { decryptPassword } from "../DecryptionFunction/route"; 

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const names = getStoredNames() as StoredNames;
    const { NameUP, NameUPP } = names;

    let filter: any = {};

    console.log("Retrieved Names:", NameUP, NameUPP);

    if (NameUP && NameUPP) {
      if (NameUP === NameUPP) {
        filter = { $or: [{ NameU: NameUP }, { Name: NameUP }] };
      } else {
       
        filter = { $or: [{ NameU: NameUP }, { NameUP: NameUPP }] };
      }
   } else if (NameUP) {

      filter = { $or: [{ NameU: NameUP }, { Name: NameUP }] };
   } else if (NameUPP) {

      filter = { $or: [{ NameU: NameUPP }, { NameUP: NameUPP }] }; 
   } else {
      return NextResponse.json({ error: "Missing required name parameters" });
    }

    const passwordEntries = await Passwords.find(filter);

    if (!passwordEntries || passwordEntries.length === 0) {
      return NextResponse.json({ message: "No password found" });
    }

    const decryptedPasswords = await Promise.all(passwordEntries.map(async (entry) => {
      const { passwords: encryptedPassword, key, iv } = entry;

      if (!encryptedPassword || !key || !iv) {
        throw new Error("Missing required fields for decryption.");
      }

      const decryptedData = await decryptPassword({ encryptedPassword, key, iv });
      return {
        username: entry.username,
        decryptedPassword: decryptedData.decrypted,
        Url: entry.Url,
        Name: entry.Name,
        NameU: entry.NameU,
      };
    }));

    return NextResponse.json({
      message: "Success",
      passwords: decryptedPasswords,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "An error occurred", details: err.message });
  }
}
