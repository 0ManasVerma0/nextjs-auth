"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage(){
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if(password.length < 6){
            setError('Password must be at least 6 characters')
            return
        }
        if(password !== confirmPassword){
            setError('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            await axios.post('/api/users/resetPassword', { token, password })
            setSuccess(true)
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Reset Password</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Set a new password for your account.</p>

                {success ? (
                    <div className="bg-green-50 dark:bg-slate-800 border-2 border-green-500 rounded-lg p-6 text-center">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Password Reset</h2>
                        <p className="text-gray-600 dark:text-gray-400">Your password has been updated.</p>
                        <Link href="/login" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Go to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            />
                        </div>

                        {error && <p className="text-red-600">{error}</p>}

                        <div>
                            <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
