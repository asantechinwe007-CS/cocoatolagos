import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ==============================
// GET ALL EXPORT LOTS
// ==============================
export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT
          e.*,
          w.received_weight,
          w.quality_grade
      FROM export_lots e
      JOIN warehouse_receipts w
      ON e.warehouse_receipt_id = w.id
      ORDER BY e.id DESC
      `
    );

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
        message: "Failed to fetch export lots",
      },
      {
        status: 500,
      }
    );
  }
}

// ==============================
// CREATE EXPORT LOT
// ==============================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      lot_number,
      warehouse_receipt_id,
      buyer_name,
      destination_country,
      destination_port,
      container_number,
      seal_number,
      export_weight,
      status,
      export_date,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO export_lots
      (
        lot_number,
        warehouse_receipt_id,
        buyer_name,
        destination_country,
        destination_port,
        container_number,
        seal_number,
        export_weight,
        status,
        export_date
      )

      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      )

      RETURNING *
      `,
      [
        lot_number,
        warehouse_receipt_id,
        buyer_name,
        destination_country,
        destination_port,
        container_number,
        seal_number,
        export_weight,
        status || "Pending",
        export_date,
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
        message: "Failed to create export lot",
      },
      {
        status: 500,
      }
    );
  }
}
