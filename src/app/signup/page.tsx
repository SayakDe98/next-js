"use client"; // use this line to make this a client component because by default all the components are server side

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleSignup = async () => {
        try {
            const { data } = await axios.post("/api/users/signup", user);
            console.log("Signup successful", data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed."); // we used use client so console goes to chrome console
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 border-1">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600 color-red"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <p className="mb-2">
          Already Registered? <Link href="/login">Login Here</Link>
        </p>
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
          onClick={handleSignup}
          disabled={buttonDisabled}
        >
          Register
        </button>
      </div>
    );
}

export default Signup;