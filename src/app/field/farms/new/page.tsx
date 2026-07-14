"use client";

import { useState } from "react";

export default function NewFarmPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    farmer_name: "",
    phone: "",
    village: "",
    state: "",
    latitude: "",
    longitude: "",
    farm_size: "",
    certification_status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/farms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Farm Registered Successfully");

        setFormData({
          farmer_name: "",
          phone: "",
          village: "",
          state: "",
          latitude: "",
          longitude: "",
          farm_size: "",
          certification_status: "",
        });
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Register Farm
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="farmer_name"
          placeholder="Farmer Name"
          value={formData.farmer_name}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="farm_size"
          placeholder="Farm Size (Hectares)"
          value={formData.farm_size}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="certification_status"
          placeholder="Certification Status"
          value={formData.certification_status}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          {loading ? "Saving..." : "Register Farm"}
        </button>
      </form>
    </main>
  );
}