"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

interface UserTableProps {
  refreshKey: number;
}

export default function UserTable({
  refreshKey,
}: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  loadUsers();
}, [refreshKey]);

async function loadUsers() {
  try {
    const res = await fetch("/api/users", {
      cache: "no-store",
    });

    const data = await res.json();

    if (data.success) {
      setUsers(data.data);
    }
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
}

// 👇 OUTSIDE loadUsers()
async function toggleStatus(id: number) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (data.success) {
      loadUsers();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
  }
}

if (loading) {
    return (
      <div className="bg-[#161b22] rounded-2xl p-8">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] rounded-2xl shadow-xl p-8 overflow-x-auto">

      <h2 className="text-2xl font-bold text-green-400 mb-6">
        👥 Registered Users
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="py-3">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b border-gray-800 hover:bg-[#21262d]"
            >
              <td className="py-4">{user.full_name}</td>

              <td>{user.email}</td>

              <td>{user.phone}</td>

              <td className="capitalize">
                {user.role}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.status === "active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td>
               <div className="flex gap-2">

  <button
    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => toggleStatus(user.id)}
    className={`px-3 py-2 rounded-lg ${
      user.status === "active"
        ? "bg-red-600 hover:bg-red-700"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    {user.status === "active"
      ? "Suspend"
      : "Activate"}
  </button>

</div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}