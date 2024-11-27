"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password || !formData.name) {
        setErrorMessage("All fields are required.");
        return;
      }

      const response = await axios.post("/api/authMember", formData);

      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setFormData({ email: "", password: "", name: "" });

      // Redirect to another page after success
      router.push(`/Member/layout?email=${response.data.newMember.email}`);
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex h-screen bg-indigo-700">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 shadow-lg">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://img.icons8.com/fluent/344/year-of-tiger.png"
            alt="Logo"
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500 font-bold">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500 font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500 font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 mb-6 border-b-2 border-indigo-300 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>
          <footer>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 p-2 text-white w-full rounded transition"
            >
              Register Member
            </button>
          </footer>
        </form>
        <div className="content py-4 flex justify-between">
          <div>Sudah Punya Akun?</div>
          <Link href="/Member/login">
            <button className="bg-none text-blue-800 hover:text-blue-500">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
