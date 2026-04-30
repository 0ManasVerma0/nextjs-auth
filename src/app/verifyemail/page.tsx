"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Verify Email</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Confirming your email address</p>

                {verified && (
                    <div className="bg-green-50 dark:bg-slate-800 border-2 border-green-500 rounded-lg p-6 text-center">
                        <div className="text-4xl mb-3">✓</div>
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verified!</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Your email has been successfully verified.</p>
                        <Link href="/login" className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                            Go to Login
                        </Link>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 dark:bg-slate-800 border-2 border-red-500 rounded-lg p-6 text-center">
                        <div className="text-4xl mb-3">✕</div>
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">The verification link is invalid or has expired.</p>
                        <Link href="/signup" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                            Try Again
                        </Link>
                    </div>
                )}

                {!verified && !error && (
                    <div className="text-center">
                        <div className="inline-block animate-spin mb-4">⏳</div>
                        <p className="text-gray-600 dark:text-gray-400">Verifying your email...</p>
                    </div>
                )}
            </div>
        </div>
    )

}