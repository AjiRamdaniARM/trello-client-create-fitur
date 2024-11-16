"use client";

import { User } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

export const ListCardUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log(User);
    return <div>User not found</div>;
  }

  return (
    <div className="main">
      <h1>User Info</h1>
      <div className="p-4 border rounded-md">
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
      </div>
    </div>
  );
};
