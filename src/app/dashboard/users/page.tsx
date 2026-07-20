"use client";

import { useState } from "react";
import UserForm from "@/components/users/UserForm";
import UserTable from "@/components/users/UserTable";

export default function UsersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshUsers() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div className="p-8 bg-[#0d1117] min-h-screen text-white">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        👥 User Management
      </h1>

      <UserForm onUserCreated={refreshUsers} />

      <div className="mt-10">
       <UserTable refreshKey={refreshKey} />
      </div>

    </div>
  );
}