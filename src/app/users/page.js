'use client';

import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://node-20240823-eta.vercel.app/api/products")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  }, []);

  return (
    <div className="flex items-center justify-center flex-col container mx-auto py-12 ">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="w-full bg-primary px-8 py-3 my-3">
            <div className="w-full h-6 text-white">{user.name}</div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">Loading or no users found.</div>
      )}
    </div>
  );
}
