import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ============================
// GET ALL EXPORTS
// ============================

export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM exports
      ORDER BY created_at DESC
      `
    );

    return NextResponse.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET EXPORTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exports",
      },
      { status: 500 }
    );
  }
}

// ============================
// CREATE EXPORT
// ============================

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      shipment_id,
      exporter_name,
      exporter_id,
      destination_country,
      port_of_loading,
      container_number,
      vessel_name,
      etd,
      eta,
      customs_status,
      export_status,
      bill_of_lading,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO exports
      (
        shipment_id,
        exporter_name,
        exporter_id,
        destination_country,
        port_of_loading,
        container_number,
        vessel_name,
        etd,
        eta,
        customs_status,
        export_status,
        bill_of_lading
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      RETURNING *
      `,
      [
        shipment_id,
        exporter_name,
        exporter_id,
        destination_country,
        port_of_loading,
        container_number,
        vessel_name,
        etd,
        eta,
        customs_status,
        export_status,
        bill_of_lading,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("CREATE EXPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create export",
      },
      { status: 500 }
    );
  }
}