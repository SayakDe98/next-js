"use client" // use client displays errors on browser console instead of terminal
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState({ username: "", _id: "", email: "", isVerified: false });
    const logoutHandler = async () => {
        try {
            const { data } = await axios.post("/api/users/logout");
            console.log(data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get("/api/users/me");
            console.log(data.data._id);
            setUser(data.data);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        {user._id && (
          <Link href={`/profile/${user._id}`}>
            <h2 className="p-3 rounded bg-green-500 mt-2">{user.username}</h2>
          </Link>
        )}
        <hr />
        <button
          className="bg-green-900 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
        <button
          className="bg-violet-500 mt-4 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    );
}

export default Profile;