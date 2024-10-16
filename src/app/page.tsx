import { BiTagAlt, BiTargetLock } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white flex flex-col">



      <div className="flex justify-center items-center h-[40vh] flex-col flex-wrap">
       <h1 className="text-white font-extrabold text-4xl text-center flex gap-2 flex-wrap justify-center">Welcome to <span className="text-green-500">PassVault</span><span className="text-green-500"><FaKey /></span></h1>

    <div className="mt-6">
       <Link href="/SignUp" type="button" className="text-white bg-gradient-to-br from-green-400 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</Link >
       <Link href="/SignIn" type="button" className="text-white bg-gradient-to-br from-black to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignIn</Link>
    </div>
  
      </div>

    </div>
  );
}
