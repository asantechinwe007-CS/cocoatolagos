"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

interface Farm {
  id: number;
  farmer_name: string;
  latitude: string;
  longitude: string;
  village: string;
  state: string;
}

export default function FarmMap() {
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    loadFarms();
  }, []);

  async function loadFarms() {
    const res = await fetch("/api/mapfarms");
    const data = await res.json();

    if (data.success) {
      setFarms(data.data);
    }
  }

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {farms.map((farm) => (
        <Marker
          key={farm.id}
          position={[
            Number(farm.latitude),
            Number(farm.longitude),
          ]}
        >
          <Popup>
            <strong>{farm.farmer_name}</strong>
            <br />
            {farm.village}
            <br />
            {farm.state}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}