import { useEffect, useState } from 'react';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const ListCardUser = () => {
  const [users, setUsers] = useState<User[]>([]); // State users bertipe User[]
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET', // Pastikan metode sesuai dengan handler API
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const data: User[] = await response.json(); // Data harus sesuai tipe User[]
        setUsers(data); // Set data ke state users
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Loading selesai
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
