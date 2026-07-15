import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const farmsResult = await pool.query(
      "SELECT COUNT(*) FROM farms"
    );

    const batchesResult = await pool.query(
      "SELECT COUNT(*) FROM batches"
    );

    const weightResult = await pool.query(
      "SELECT COALESCE(SUM(weight_kg), 0) AS total_weight FROM batches"
    );

    return NextResponse.json({
      success: true,
      totalFarms: Number(farmsResult.rows[0].count),
      totalBatches: Number(batchesResult.rows[0].count),
      totalWeight: Number(weightResult.rows[0].total_weight),
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data",
      },
      { status: 500 }
    );
  }
}