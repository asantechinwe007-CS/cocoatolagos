import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all shipments
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        shipments.*,
        batches.batch_code
      FROM shipments
      LEFT JOIN batches
      ON shipments.batch_id = batches.id
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
      vehicle_id,
      current_location,
      status,
      departure_time,
      arrival_time,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO shipments (
        batch_id,
        vehicle_id,
        current_location,
        status,
        departure_time,
        arrival_time
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        batch_id,
        vehicle_id,
        current_location,
        status,
        departure_time,
        arrival_time,
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