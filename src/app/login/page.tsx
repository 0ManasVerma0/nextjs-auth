"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login successfull", response.data)
            toast.success("Login Success")
            router.push("/profile")
            
        } catch (error: any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
            <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">{loading ? "Processing..." : "Welcome Back"}</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Sign in to your account</p>
            
            <div className="space-y-4">
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
                    <div className="text-right mt-2">
                        <Link href="/forgotPassword" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                    </div>
                </div>
            </div>
            
            <button
                onClick={onLogin}
                disabled={buttonDisabled}
                className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {buttonDisabled ? "Enter credentials" : "Sign In"}
            </button>
            
            <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
                Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Sign up</Link>
            </p>
        </div>
        </div>
    )
}