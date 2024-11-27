"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    // === Mengambil cookie menggunakan `document.cookie` === //
    const cookies = document.cookie.split("; ");
    const memberToken = cookies.find(cookie => cookie.startsWith("memberToken="));
    

    // === jika tidak ada cookie maka lempar ke login awal === //
    if (!memberToken) {
      router.push("/Member/login"); 
      return;
    }

    // === Mengambil token dan mendekode JWT (gunakan library seperti `jwt-decode`) === //
    const token = memberToken?.split("=")[1]; 
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      setEmail(decodedToken.email);
      setName(decodedToken.name); 
    }
  }, [router]);

  return (
    <div className="container-body w-full h-full">
      {/* == component navbar == */}
      <nav className="bg-white shadow">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize">
          <a href="#" className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">home</a>
          <a href="#" className="text-gray-800 hover:border-b-2 hover:border-blue-500 mx-1.5 sm:mx-6">Profile</a>
          <a href="#" className="text-red-800 hover:border-b-2 hover:border-red-500 font-semibold mx-1.5 sm:mx-6">Logout</a>
        </div>
      </nav>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to Member Layout</h1>
        {email ? <p className="text-lg">Email: {email}</p> : <p>Loading email...</p>}
        {name ? <p className="text-lg">Name: {name}</p> : <p>Loading name...</p>}
      </div>
    </div>
  );
}
