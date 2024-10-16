"use client"

import React, { useEffect, useState } from 'react'
import { IoIosLock } from "react-icons/io";
const Dashboard = () => {
  const [User, setUser] = useState(null)
  const [Password, setPassword] = useState('')
  const [URL, setURL] = useState('')
  const [Username, setUsername] = useState<String>('')
  const [ShowPassword, setShowPassword] = useState<String[]>([]);
  const [ShowURL, setShowURL] = useState<String[]>([]);
  const [ShowUsername, setShowUsername] = useState<String[]>([])
  useEffect(() => {

    async function DisplayWelcome() {
    
  
      try {
        const res = await fetch('/api/Profile', {
        })
        const data = await res.json();
        if (res.ok) {
          console.log(data)
          setUser(data.user.NameUP)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    DisplayWelcome()

  }, [])

  const SavePasswords = async()=>{

    try{
      const NameUPP = localStorage.getItem("NameUPP")
   
      const NameUP = localStorage.getItem("NameUP");
   
      const response  = await fetch('/api/savePasswords',{
        method: 'POST',
        
        body:JSON.stringify({NameUP,NameUPP,Username,Password,URL}),
        headers: {
          'Content-Type': 'application/json',
          },
      });
      const data = await response.json() ;
      
    if(response.ok){
     console.log('yeah',data)
    }
    else{ 
      console.log('failed',data)
    }
    }catch(err){console.error(err)}

  }

  useEffect(() => {
   
    
    const saveNameUPUPP  = async() =>{
      const NameUPP = localStorage.getItem("NameUPP")
      const NameUP = localStorage.getItem("NameUP");
    try{
      const response  = await fetch('/api/returnNameUPandNameUPP',{
        method: 'POST',
        body:JSON.stringify({NameUP,NameUPP}),
        headers: {
          'Content-Type' : 'application/json'
          }
        })
      const data  =  await response.json()
      if(response.ok){
  
      }
    }catch(err){console.log(err)}
          
    }
  saveNameUPUPP()
  }, [])


interface Password {
  decryptedPassword: string;
  Url:String,
  username : String,
}

interface FetchPasswordsResponse {
  passwords: Password[] | null; 
}

useEffect(() => {
 
  const ShowPasswords = async()=>{

    try{
      const response  = await fetch('/api/fetchPasswords',{
        method:'GET'
      }
      ) 
      const data:FetchPasswordsResponse = await response.json()
      console.log(data)
      if(response.ok){
      
        if (data.passwords && Array.isArray(data.passwords)) {
          setShowPassword(data.passwords.map(pwd => pwd.decryptedPassword || ""));
           setShowURL(data.passwords.map(url=>url.Url||""))
           setShowUsername(data.passwords.map(user=>user.username||""))
        } else {
          setShowPassword([]);
        }
      }
    }catch(err){console.log(err)}
  }
  ShowPasswords()
}, [])


  

  return (
    <div className='flex justify-center mt-2 flex-col gap-20'>

      <div className='font-bold flex justify-center text-white text-3xl gap-2'>Welcome <span className='font-extrabold text-green-500'>{User}</span>!</div>

      <form className="flex justify-center mx-auto  flex-col gap-5" onSubmit={SavePasswords}>

        <div className="flex flex-col">
        <div className="flex flex-col ">
          <input
            type="text"
            id="usernameOrEmail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
            placeholder="Username/Email"
            required
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </div>
          <input
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            required
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            id="websiteURL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Website URL"
            required
            onChange={(e) => { setURL(e.target.value) }}
          />
        </div>
        <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Save Password</button>
      </form>
  

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg text-white flex justify-center flex-col items-center'>
  {ShowPassword.length > 0 && ShowURL && ShowUsername.length > 0 ? (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 border-2 rounded-xl border-green-500'>
      <caption className='p-5 text-lg font-semibold text-left text-gray-900 bg-gradient-to-br from-black via-black to-green-500 dark:text-white'>
        Your Passwords
        <p className='mt-1 text-sm font-normal dark:text-green-300 text-green-300 flex items-center'>
          Your passwords are end-to-end encrypted <IoIosLock />
        </p>
      </caption>
      <thead className='text-xs text-gray-700 uppercase bg-gradient-to-br from-black via-black to-green-500 dark:bg-gray-800 dark:text-gray-400'>
        <tr>
          <th scope='col' className='px-6 py-3 border-b border-green-500'>
            Username/Email
          </th>
          <th scope='col' className='px-6 py-3 border-b border-green-500'>
            Password
          </th>
          <th scope='col' className='px-6 py-3 border-b border-green-500'>
            URL
          </th>
        </tr>
      </thead>
      <tbody className='bg-gray-800'>
        {ShowPassword.map((password, index) => (
          <tr key={index} className='bg-gradient-to-tl from-black via-black to-green-500'>
            <td className='px-6 py-4 border-b text-gray-900 dark:text-white'>
              {ShowUsername[index]}
            </td>
            <td className='px-6 py-4 border-b text-gray-900 dark:text-white'>
              {password}
            </td>
            <td className='px-6 py-4 border-b text-gray-900 dark:text-white'>
              {ShowURL[index]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No passwords to show</p>
  )}
</div>



    </div>
  )
}

export default Dashboard