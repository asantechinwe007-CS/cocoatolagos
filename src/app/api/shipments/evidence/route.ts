
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { shipment_id, file_name, file_path, uploaded_by } = await req.json();

    await pool.query(
      `INSERT INTO shipment_evidence
      (shipment_id,file_name,file_path,uploaded_by)
      VALUES ($1,$2,$3,$4)`,
      [shipment_id,file_name,file_path,uploaded_by ?? null]
    );

    return NextResponse.json({ success:true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success:false }, { status:500 });
  }
}
