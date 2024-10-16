"use client"

import { FaKey } from "react-icons/fa"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
export const Header = () => {
    const [User, setUser] = useState('')
    const [Loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {

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
            } finally {
                setLoading(false)
            }
        }

        fetchData()


    }, [])

    const LogOut = async () => {
        try {
            const response = await fetch('/api/SignOut');
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setUser('')
                router.push('SignIn')
            } else {
                console.log('Failed')
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        if (!Loading) {
            if (User) {
                router.push('/Dashboard')
            }
          else if(!User){
            router.push('/')
          }
        }
    }, [User, Loading, router])


    if (Loading) {
        return <div>Loading...</div>
    }

    return (

        <nav className="flex justify-around p-6 flex-wrap">
            <h1 className="text-green-500 font-bold flex text-3xl gap-2">PassVault<span><FaKey /></span></h1>
            {User && <ul className="text-white gap-3 flex cursor-pointer hover:text-gray-200">
                <Link href="/Dashboard">Dashboard</Link>
                <li>About</li>
                <li>Contact</li>
                <li onClick={LogOut} className="flex items-center mb-5">LogOut<span ><IoIosLogOut/></span></li>
                <li className="font-bold flex items-center mb-5 gap-1">{User}<span><FaUser/></span></li>
            </ul>}
            {!User &&
                <ul className="text-white gap-3 flex cursor-pointer hover:text-gray-200">
                    <Link href="/SignUp" type="button" className="text-white bg-gradient-to-br from-green-400 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</Link >
                    <Link href="/SignIn" type="button" className="text-white bg-gradient-to-br from-black to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignIn</Link>
                </ul>
            }

        </nav>
    )
}