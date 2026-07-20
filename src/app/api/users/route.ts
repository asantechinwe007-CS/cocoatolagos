import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

/* ===========================
   GET ALL USERS
=========================== */

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        phone,
        role,
        status,
        created_at
      FROM users
      ORDER BY id DESC
    `);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load users",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===========================
   CREATE USER
=========================== */

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      password,
      role,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        phone,
        password_hash,
        role,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,'active')
      RETURNING id
      `,
      [
        full_name,
        email,
        phone,
        hashedPassword,
        role,
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create user",
      },
      {
        status: 500,
      }
    );
  }
}