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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">
                Profile page
                <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
                    {user?.username ?? "User not found"}
                </span>
            </p>
        </div>
    );
}