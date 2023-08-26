"use client"

import Router, { useRouter } from "next/navigation"

const LoginPage = () => {
    const router = useRouter()
    const handleSubmit = async(event:any) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const username = formData.get("username")
        const password = formData.get("password")

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({username, password})
        })

        const {accessToken} = await res.json()
        console.log(accessToken);
        if(accessToken){
            router.push("/")
        }else{
            alert("Login Failed")
        }
    }
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen gap-8'>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full gap-8">
            <label>Username: 
                <input type='text' placeholder='Username' name="username" className='text-black outline-none border rounded-lg px-2'/>
            </label>
            <label>Password: 
                <input type='password' placeholder='Password' name="password" className='text-black outline-none border rounded-lg px-2'/>
            </label>
            <button type='submit' className='flex gap-8 border bg-blue-300 px-3 py-2 hover:bg-black hover:text-white rounded-lg ease-in duration-300 hover:scale'>Submit</button>
        </form>
    </div>
  )
}

export default LoginPage