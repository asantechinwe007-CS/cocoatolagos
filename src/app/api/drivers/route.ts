import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all drivers
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM drivers ORDER BY id DESC"
    );

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET Drivers Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch drivers",
      },
      { status: 500 }
    );
  }
}

// CREATE driver
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      phone,
      license_number,
      vehicle_number,
      vehicle_type,
      status,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO drivers (
        full_name,
        phone,
        license_number,
        vehicle_number,
        vehicle_type,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        full_name,
        phone,
        license_number,
        vehicle_number,
        vehicle_type,
        status,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("POST Driver Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create driver",
      },
      { status: 500 }
    );
  }
}