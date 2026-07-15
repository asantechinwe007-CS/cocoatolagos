import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET documents
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        documents.*,
        farms.farmer_name
      FROM documents
      LEFT JOIN farms
      ON documents.farm_id = farms.id
      ORDER BY documents.id DESC
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
        message: "Failed to fetch documents",
      },
      { status: 500 }
    );
  }
}

// CREATE document record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      farm_id,
      file_name,
      file_type,
      file_url,
    } = body;

    const result = await pool.query(
      `
      INSERT INTO documents (
        farm_id,
        file_name,
        file_type,
        file_url
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        farm_id,
        file_name,
        file_type,
        file_url,
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
        message: "Failed to create document",
      },
      { status: 500 }
    );
  }
}