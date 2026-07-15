import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const batchCode =
      req.nextUrl.searchParams.get("batchCode");

    const result = await pool.query(
      `
      SELECT
        batches.*,
        farms.farmer_name,
        farms.village,
        farms.state,
        shipments.vehicle_id,
        shipments.current_location,
        shipments.status
      FROM batches
      LEFT JOIN farms
        ON batches.farm_id = farms.id
      LEFT JOIN shipments
        ON shipments.batch_id = batches.id
      WHERE batches.batch_code = $1
      `,
      [batchCode]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Batch not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load trace data",
      },
      { status: 500 }
    );
  }
}