import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { shipment_id, temperature } = await req.json();

    const result = await pool.query(
      `
      UPDATE shipments
      SET temperature = $1
      WHERE id = $2
      RETURNING *
      `,
      [temperature, shipment_id]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Temperature Update Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Temperature update failed",
      },
      { status: 500 }
    );
  }
}