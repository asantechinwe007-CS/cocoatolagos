import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        shipments.id,
        shipments.vehicle_id,
        shipments.current_location,
    shipments.latitude,
    shipments.longitude,
        shipments.status,
        shipments.batch_id,
        batches.batch_code
      FROM shipments
      LEFT JOIN batches
      ON shipments.batch_id = batches.id
      ORDER BY shipments.id DESC
    `);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load shipments",
      },
      { status: 500 }
    );
  }
}