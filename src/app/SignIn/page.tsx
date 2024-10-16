"use client"
import Link from "next/link"
import { useState } from "react";
export default function SignIn (){
    const [NameUP, setNameUP] = useState('')
    const [PasswordUP, setPasswordUP] = useState('')
    const [notExists, setnotExists] = useState('')
    const [WrongPassword, setWrongPassword] = useState('')
    const [Message, setMessage] = useState('')
    const [User, setUser] = useState('')

      const SignIn = async (e:any) => {
        e.preventDefault()
        localStorage.removeItem("NameUPP");
        localStorage.removeItem("NameUP");
            const response = await fetch('/api/SignIn', {
            method: 'POST',
            body: JSON.stringify({ NameUP, PasswordUP }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            console.log(data)
            setMessage(data.message)
            setUser(data.user.name)
        window.location.reload()
        localStorage.setItem('NameUP',NameUP)
}




        if(response.status===400){
           setnotExists('User donot exists')
       
        }
        else if(response.status===200){
            setnotExists('')
            setWrongPassword('')
           
        }
        else if(response.status===500){
              setWrongPassword('Incorrect Password')
             
        }
    };



    return(
        <div className="h-screen flex justify-center items-center bg-opacity-10">

        <form className="max-w-sm mx-auto flex flex-col justify-center items-center gap-4 border-4 rounded-xl border-l-green-500 border-r-black border-t-green-500 border-b-black h-96 w-80 bg-gradient-to-br from-green-500 via-black to-black " onSubmit={SignIn}>

            <h1 className="text-white font-bold text-4xl text-center">SignIn</h1>
           <p className="text-red-500">{notExists}</p>
           <p className="text-red-500">{WrongPassword}</p>
           <p className="text-green-500"><span className="text-bold text-white">{User}</span>{Message}</p>
            <div className="">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" value={NameUP}  onChange={(e)=>{setNameUP(e.target.value)}}  id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Name" required />
            </div>
            <div className="">
                <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input placeholder="password" value={PasswordUP} onChange={(e)=>{setPasswordUP(e.target.value)}} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >SignIn</button>
            </div>
            <p className=" flex justify-center text-center text-white">Donot have an account? <Link href="/SignUp" className="text-blue-700 underline">  SignUp</Link></p>

        </form>

    </div>
    )
}
