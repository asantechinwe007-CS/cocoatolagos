import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all shipments
export async function GET() {
  try {
   const result = await pool.query(`
    SELECT
        shipments.*,
        batches.batch_code,
        drivers.full_name AS driver_name
    FROM shipments
    LEFT JOIN batches
        ON shipments.batch_id = batches.id
    LEFT JOIN drivers
        ON shipments.driver_id = drivers.id
    ORDER BY shipments.id DESC
`);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET Shipments Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch shipments",
      },
      { status: 500 }
    );
  }
}

// CREATE shipment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      batch_id,
      driver_id,
      vehicle_id,
      current_location,
      latitude,
      longitude,
      temperature,
      humidity,
      delay_hours,
      delay_reason,
      status,
      departure_time,
      arrival_time,
      estimated_arrival,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO shipments (
        batch_id,
        driver_id,
        vehicle_id,
        current_location,
        latitude,
        longitude,
        temperature,
        humidity,
        delay_hours,
        delay_reason,
        status,
        departure_time,
        arrival_time,
        estimated_arrival
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
      )
      RETURNING *
      `,
     [
  batch_id,
  driver_id,
  vehicle_id,
  current_location,
  latitude,
  longitude,
  temperature,
  humidity,
  delay_hours,
  delay_reason,
  status,
  departure_time || null,
  arrival_time || null,
  estimated_arrival || null,
]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("POST Shipment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create shipment",
      },
      { status: 500 }
    );
  }
}