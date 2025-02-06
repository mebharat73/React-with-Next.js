"use client";
import { getUserById } from "@/api/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function UserById() {
  const [user, setUser] = useState(null);

  const params = useParams();

  async function getById() {
    const id = params?.id;

    getUserById(id).then((data) => setUser(data));
  }

  useEffect(() => {
    getById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-10">
      <ol>
        <li>Id: {user?.id}</li>
        <li>Name: {user?.name}</li>
        <li>Email: {user?.email}</li>
        <li>Phone: {user?.phone}</li>
      </ol>
    </div>
  );
}

export default UserById;
