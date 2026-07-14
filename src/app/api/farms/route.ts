import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all farms
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM farms ORDER BY id DESC"
    );

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET Farms Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch farms",
      },
      { status: 500 }
    );
  }
}

// CREATE a farm
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      farmer_name,
      phone,
      village,
      state,
      latitude,
      longitude,
      farm_size,
      certification_status,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO farms (
        farmer_name,
        phone,
        village,
        state,
        latitude,
        longitude,
        farm_size,
        certification_status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        farmer_name,
        phone,
        village,
        state,
        latitude,
        longitude,
        farm_size,
        certification_status,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("POST Farm Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create farm",
      },
      { status: 500 }
    );
  }
}