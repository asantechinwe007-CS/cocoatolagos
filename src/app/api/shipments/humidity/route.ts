import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { shipment_id, humidity } = await req.json();

    const result = await pool.query(
      `
      UPDATE shipments
      SET humidity = $1
      WHERE id = $2
      RETURNING *
      `,
      [humidity, shipment_id]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Humidity Update Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Humidity update failed",
      },
      { status: 500 }
    );
  }
}