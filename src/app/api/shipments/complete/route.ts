import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const {
      shipment_id,
      receiver_name,
      delivery_condition,
      photo_url,
    } = await req.json();

    if (!shipment_id) {
      return NextResponse.json(
        { success: false, message: "shipment_id is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      UPDATE shipments
      SET
        status = 'Delivered',
        receiver_name = $2,
        delivery_condition = $3,
        delivered_at = CURRENT_TIMESTAMP,
        photo_url = COALESCE($4, photo_url)
      WHERE id = $1
      RETURNING *;
      `,
      [
        shipment_id,
        receiver_name ?? null,
        delivery_condition ?? null,
        photo_url ?? null,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: "Shipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Delivery completed successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Complete Delivery Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to complete delivery" },
      { status: 500 }
    );
  }
}
