import { NextResponse } from "next/server";
import pool from "@/lib/db";

/* ===========================
   SUSPEND / ACTIVATE USER
=========================== */

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get current status
    const current = await pool.query(
      "SELECT status FROM users WHERE id=$1",
      [id]
    );

    if (current.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const newStatus =
      current.rows[0].status === "active"
        ? "suspended"
        : "active";

    await pool.query(
      `
      UPDATE users
      SET
        status=$1,
        updated_at=NOW()
      WHERE id=$2
      `,
      [newStatus, id]
    );

    return NextResponse.json({
      success: true,
      status: newStatus,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update status",
      },
      {
        status: 500,
      }
    );
  }
}