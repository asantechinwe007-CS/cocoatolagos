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

    const shipmentsResult = await pool.query(
      "SELECT COUNT(*) FROM shipments"
    );

    const documentsResult = await pool.query(
      "SELECT COUNT(*) FROM documents"
    );

    const totalFarms = Number(
      farmsResult.rows[0].count
    );

    const totalBatches = Number(
      batchesResult.rows[0].count
    );

    const totalShipments = Number(
      shipmentsResult.rows[0].count
    );

    const totalDocuments = Number(
      documentsResult.rows[0].count
    );

  let complianceScore = 0;

if (totalFarms > 0) complianceScore += 25;

if (totalBatches > 0) complianceScore += 25;

if (totalShipments > 0) complianceScore += 25;

if (totalDocuments > 0) complianceScore += 25;
    return NextResponse.json({
      success: true,
      totalFarms,
      totalBatches,
      totalShipments,
      totalDocuments,
      complianceScore,
    });
  } catch (error) {
    console.error("Compliance Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load compliance data",
      },
      { status: 500 }
    );
  }
}