import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET all batches
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        batches.*,
        farms.farmer_name
      FROM batches
      LEFT JOIN farms
      ON batches.farm_id = farms.id
      ORDER BY batches.id DESC
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET Batch Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch batches",
      },
      { status: 500 }
    );
  }
}

// CREATE batch
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      farm_id,
      batch_code,
      weight_kg,
      quality_grade,
      harvest_date,
      moisture_percent,
      drying_method,
      status,
      expected_grade,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO batches (
        farm_id,
        batch_code,
        weight_kg,
        quality_grade,
        harvest_date,
        moisture_percent,
        drying_method,
        status,
        expected_grade
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
      `,
      [
        farm_id,
        batch_code,
        weight_kg,
        quality_grade,
        harvest_date,
        moisture_percent,
        drying_method,
        status,
        expected_grade,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("POST Batch Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create batch",
      },
      { status: 500 }
    );
  }
}