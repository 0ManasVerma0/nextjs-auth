import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

type ProfilePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function UserProfile({ params }: ProfilePageProps) {
    const { id } = await params;

    await connect();
    const user = await User.findById(id).select("-password");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">User Profile</h1>
                
                {user ? (
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-slate-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Username</p>
                            <p className="text-2xl font-bold text-blue-600">{user.username}</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                            <p className="text-lg text-gray-800 dark:text-gray-200">{user.email}</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account Status</p>
                            <div className="flex items-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${user.isVerified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                    {user.isVerified ? '✓ Verified' : '⏳ Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-2xl text-red-600 mb-2">✕</p>
                        <p className="text-gray-600 dark:text-gray-400">User not found</p>
                    </div>
                )}
            </div>
        </div>
    );
}