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
const documentsResult = await pool.query(
  `
  SELECT
    id,
    file_name,
    file_url,
    file_type,
    uploaded_at
  FROM documents
  WHERE farm_id = $1
  ORDER BY uploaded_at DESC
  `,
  [result.rows[0]?.farm_id]
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
  documents: documentsResult.rows,
  timeline: [
    {
      event: "Farm Registered",
      date: result.rows[0].created_at,
    },
    {
      event: "Batch Created",
      date: result.rows[0].created_at,
    },
    {
      event: "Shipment Created",
      date: new Date(),
    },
    {
      event: "Certificate Uploaded",
      date:
        documentsResult.rows[0]
          ?.uploaded_at || null,
    },
    {
      event: "Passport Verified",
      date: new Date(),
    },
  ],
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