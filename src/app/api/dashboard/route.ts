import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [
      farms,
      batches,
      shipments,
      documents,
      weight,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM farms"),
      pool.query("SELECT COUNT(*) FROM batches"),
      pool.query("SELECT COUNT(*) FROM shipments"),
      pool.query("SELECT COUNT(*) FROM documents"),
      pool.query(`
        SELECT COALESCE(SUM(weight_kg),0) AS total_weight
        FROM batches
      `),
    ]);

    // Calculate compliance
    const totalFarms = Number(farms.rows[0].count);
    const totalBatches = Number(batches.rows[0].count);

    let complianceScore = 0;

    if (totalFarms > 0 && totalBatches > 0) {
      complianceScore = 100;
    }

    return NextResponse.json({
      success: true,

      totalFarms,

      totalBatches,

      totalShipments: Number(shipments.rows[0].count),

      totalDocuments: Number(documents.rows[0].count),

      totalWeight: Number(weight.rows[0].total_weight),

      complianceScore,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}