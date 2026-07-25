import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.batch_id,
        p.passport_number,
        p.generated_at,

        b.batch_code,
        b.weight_kg,
        b.quality_grade,
        b.status,

        f.farmer_name

      FROM passports p

      INNER JOIN batches b
        ON p.batch_id = b.id

      LEFT JOIN farms f
        ON b.farm_id = f.id

      ORDER BY p.generated_at DESC
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {

    console.error("Passport API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch passports",
      },
      {
        status: 500,
      }
    );
  }
}