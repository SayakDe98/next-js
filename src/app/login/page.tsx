"use client"; // use this line to make this a client component because by default all the components are server side

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
    
      console.log(response)
      router.push(`/profile`);
    } catch (error: any) {
      console.log("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user && user.password.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="text-black flex flex-col items-center justify-center min-h-screen py-2 border-1">
      <h1 className="text-white">{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email" className="text-white">
        Email
      </label>
      <input
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="text-white">
        Password
      </label>
      <input
        className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <p className="text-white mb-2">
        Don't have an account? <Link href="/signup">Register Here</Link>
      </p>
      <button
        className="text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600"
        onClick={handleLogin}
        disabled={buttonDisabled}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
