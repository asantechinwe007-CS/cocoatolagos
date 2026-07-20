import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Save evidence
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      shipment_id,
      fileName,
      fileUrl,
      uploaded_by,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO shipment_evidence
      (
        shipment_id,
        file_name,
        file_path,
        uploaded_by
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        shipment_id,
        fileName,
        fileUrl,
        uploaded_by,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save evidence",
      },
      {
        status: 500,
      }
    );
  }
}

// Get evidence
export async function GET() {

  try {

    const result = await pool.query(`
      SELECT
        shipment_evidence.*,
        batches.batch_code
      FROM shipment_evidence

      LEFT JOIN shipments
      ON shipment_evidence.shipment_id = shipments.id

      LEFT JOIN batches
      ON shipments.batch_id = batches.id

      ORDER BY shipment_evidence.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch evidence",
      },
      {
        status: 500,
      }
    );

  }

}