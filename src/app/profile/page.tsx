"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState } from "react";

export default function profilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Profile</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Manage your account</p>
                
                <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4 mb-6 border border-blue-200 dark:border-slate-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">User ID:</p>
                    {data === 'nothing' ? (
                        <p className="text-gray-400 italic">Click "Load Profile" to view your ID</p>
                    ) : (
                        <Link href={`/profile/${data}`} className="text-blue-600 hover:underline font-semibold break-all">
                            {data}
                        </Link>
                    )}
                </div>
                
                <div className="space-y-3">
                    <button
                        onClick={getUserDetails}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Load Profile
                    </button>
                    
                    <button
                        onClick={logout}
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}