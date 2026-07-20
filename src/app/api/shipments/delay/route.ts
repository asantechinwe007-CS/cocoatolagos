
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { shipment_id, hours_delayed, reason, notes } = await req.json();

    await pool.query(
      `INSERT INTO shipment_delays
      (shipment_id,hours_delayed,reason,notes)
      VALUES ($1,$2,$3,$4)`,
      [shipment_id,hours_delayed,reason,notes]
    );

    await pool.query(
      `UPDATE shipments SET status='Delayed' WHERE id=$1`,
      [shipment_id]
    );

    return NextResponse.json({success:true});
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {success:false,message:"Server error"},
      {status:500}
    );
  }
}
