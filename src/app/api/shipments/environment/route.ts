import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const {
      shipment_id,
      temperature,
      humidity,
    } = await req.json();

    // Validation
    if (!shipment_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipment ID is required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      UPDATE shipments
      SET
        temperature = $1,
        humidity = $2
      WHERE id = $3
      RETURNING *
      `,
      [
        temperature,
        humidity,
        shipment_id,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Environmental conditions updated successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Environment Update Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update environmental conditions",
      },
      { status: 500 }
    );
  }
}