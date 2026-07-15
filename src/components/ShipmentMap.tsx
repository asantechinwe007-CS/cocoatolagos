"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

// import "leaflet/dist/leaflet.css";

interface Shipment {
  id: number;
  vehicle_id: string;
  latitude: string;
  longitude: string;
  status: string;
  batch_code: string;
}

interface Props {
  shipments: Shipment[];
}

export default function ShipmentMap({
  shipments,
}: Props) {
  const farmPosition: [number, number] = [
    7.1023,
    5.1345,
  ];

  const shipment =
    shipments.length > 0
      ? [
          Number(shipments[0].latitude),
          Number(shipments[0].longitude),
        ]
      : null;

  return (
    <MapContainer
      center={[7.4, 4.8]}
      zoom={8}
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Farm Marker */}
      <Marker position={farmPosition}>
        <Popup>
          Farm: Afua
        </Popup>
      </Marker>

      {/* Shipment Marker */}
      {shipment && (
        <Marker
          position={[
            shipment[0],
            shipment[1],
          ]}
        >
          <Popup>
            <div>
              <strong>
                Vehicle:
              </strong>{" "}
              {
                shipments[0]
                  .vehicle_id
              }
              <br />

              <strong>
                Batch:
              </strong>{" "}
              {
                shipments[0]
                  .batch_code
              }
              <br />

              <strong>
                Status:
              </strong>{" "}
              {
                shipments[0]
                  .status
              }
            </div>
          </Popup>
        </Marker>
      )}

      {/* Route Line */}
      {shipment && (
        <Polyline
          positions={[
            farmPosition,
            [
              shipment[0],
              shipment[1],
            ],
          ]}
        />
      )}
    </MapContainer>
  );
}