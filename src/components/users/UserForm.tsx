"use client";

import { useState } from "react";

interface UserFormProps {
  onUserCreated: () => void;
}

export default function UserForm({
  onUserCreated,
}: UserFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "driver",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ User created successfully!");
        onUserCreated();

        setForm({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          role: "driver",
        });

      } else {
        alert(data.message || "Failed to create user.");
      }

    } catch (error) {
      console.error(error);
      alert("Server error.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b22] rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        ➕ Create User
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="bg-[#21262d] p-3 rounded-lg"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="bg-[#21262d] p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="bg-[#21262d] p-3 rounded-lg"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="bg-[#21262d] p-3 rounded-lg"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="bg-[#21262d] p-3 rounded-lg"
        >
          <option value="admin">Admin</option>
          <option value="exporter">Exporter</option>
          <option value="warehouse">Warehouse</option>
          <option value="driver">Driver</option>
          <option value="farmer">Farmer</option>
          <option value="auditor">Auditor</option>
        </select>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold"
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}