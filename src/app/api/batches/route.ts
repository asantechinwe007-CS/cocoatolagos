import { NextResponse } from "next/server";
import pool from "@/lib/db";

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
    console.error("Batch Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch batches",
      },
      { status: 500 }
    );
  }
}