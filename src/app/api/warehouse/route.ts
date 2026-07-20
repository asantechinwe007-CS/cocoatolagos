import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ==========================
// GET - All Warehouse Receipts
// ==========================
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        wr.*,
        s.batch_code,
        s.vehicle_id,
        s.driver_name
      FROM warehouse_receipts wr
      JOIN shipments s
        ON wr.shipment_id = s.id
      ORDER BY wr.received_at DESC
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
        message: "Failed to load warehouse receipts.",
      },
      { status: 500 }
    );
  }
}

// ==========================
// POST - Receive Shipment
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      shipment_id,
      received_weight,
      quality_grade,
      warehouse_name,
      storage_location,
      condition,
      remarks,
      received_by,
    } = body;

    const receipt = await pool.query(
      `
      INSERT INTO warehouse_receipts
      (
        shipment_id,
        received_weight,
        quality_grade,
        warehouse_name,
        storage_location,
        condition,
        remarks,
        received_by
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        shipment_id,
        received_weight,
        quality_grade,
        warehouse_name,
        storage_location,
        condition,
        remarks,
        received_by,
      ]
    );

    await pool.query(
      `
      UPDATE shipments
      SET status='Received'
      WHERE id=$1
      `,
      [shipment_id]
    );

    return NextResponse.json({
      success: true,
      message: "Shipment received successfully.",
      data: receipt.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to receive shipment.",
      },
      { status: 500 }
    );
  }
}