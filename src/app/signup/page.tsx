"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            router.push("/login")
        } catch (error: any) {
            console.log("Sign Up failed !", error.message)
            toast.error(error.message)
        } finally{
            setLoading(true)
        }
    }
    
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
            <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">{loading ? "Creating Account..." : "Create Account"}</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Join us today</p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Username</label>
                    <input 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="johndoe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                    <input 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
                    <input 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="••••••••"
                    />
                </div>
            </div>
            
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {buttonDisabled ? "Complete all fields" : "Create Account"}
            </button>
            
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-semibold">Log in</Link>
            </p>
        </div>
        </div>
    )
}