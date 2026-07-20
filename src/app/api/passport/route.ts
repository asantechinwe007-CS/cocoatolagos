import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const batchId = searchParams.get("batch_id");

    if (!batchId) {
      return NextResponse.json(
        {
          success: false,
          message: "batch_id is required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await pool.query(
      `
      SELECT

        b.id,
        b.batch_code,
        b.weight_kg,
        b.quality_grade,
        b.created_at AS harvest_date,

        f.id AS farm_id,
        f.farmer_name,
        f.phone,
        f.village,
        f.state,
        f.latitude,
        f.longitude,
        f.farm_size,
        f.certification_status,

        s.id AS shipment_id,
        s.status AS shipment_status,
        s.vehicle_id,
        s.current_location,
        s.temperature,
        s.humidity,
        s.delay_hours,
        s.receiver_name,
        s.delivery_condition,

        d.full_name AS driver_name,
        d.phone AS driver_phone,
        d.vehicle_number,

        (
          SELECT COUNT(*)
          FROM shipment_evidence e
          WHERE e.shipment_id = s.id
        ) AS evidence_count

      FROM batches b

      LEFT JOIN farms f
      ON b.farm_id = f.id

      LEFT JOIN shipments s
      ON s.batch_id = b.id

      LEFT JOIN drivers d
      ON s.driver_id = d.id

      WHERE b.id = $1

      LIMIT 1
      `,
      [batchId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Batch not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate passport",
      },
      {
        status: 500,
      }
    );
  }
}