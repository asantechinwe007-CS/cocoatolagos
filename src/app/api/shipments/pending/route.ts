import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        b.batch_code,
        b.weight_kg,
        s.status,
        d.full_name AS driver_name,
        d.vehicle_number AS vehicle_id,
        d.id AS driver_id

      FROM shipments s

      JOIN batches b
        ON s.batch_id = b.id

      JOIN drivers d
        ON s.driver_id = d.id

      WHERE s.status = 'In Transit'

      ORDER BY s.created_at ASC
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load pending shipments.",
      },
      { status: 500 }
    );
  }
}