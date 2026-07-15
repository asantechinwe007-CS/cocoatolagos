import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        farmer_name,
        latitude,
        longitude,
        village,
        state
      FROM farms
      ORDER BY id DESC
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
        message: "Failed to load farms",
      },
      { status: 500 }
    );
  }
}