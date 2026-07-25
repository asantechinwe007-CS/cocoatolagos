import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      report_name,
      report_type,
      generated_by,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO saved_reports
      (
        report_name,
        report_type,
        generated_by
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        report_name,
        report_type,
        generated_by,
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
        message: "Unable to save report",
      },
      {
        status: 500,
      }
    );
  }
}