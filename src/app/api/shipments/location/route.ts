import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      shipment_id,
      latitude,
      longitude,
      current_location,
    } = body;

    const result = await pool.query(
      `
      UPDATE shipments
      SET
        latitude = $1,
        longitude = $2,
        current_location = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        latitude,
        longitude,
        current_location,
        shipment_id,
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
        message: "Location update failed",
      },
      {
        status: 500,
      }
    );
  }
}