import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Search code is required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      SELECT
          f.id AS farm_id,
          f.farmer_name,
          f.phone,
          f.village,
          f.state,
          f.latitude,
          f.longitude,
          f.farm_size,
          f.certification_status,

          b.id AS batch_id,
          b.batch_code,
          b.weight_kg,
          b.quality_grade,
          b.harvest_date,
          b.moisture_percent,
          b.drying_method,
          b.status AS batch_status,
          b.expected_grade,

          p.passport_number,

          s.id AS shipment_id,
          s.vehicle_id,
          s.current_location,
          s.status AS shipment_status,
          s.departure_time,
          s.arrival_time,
          s.latitude AS shipment_latitude,
          s.longitude AS shipment_longitude,
          s.humidity,
          s.temperature,
          s.delay_hours,
          s.delay_reason,
          s.receiver_name,
          s.delivery_condition,
          s.delivered_at,

          u.full_name AS driver_name,
          u.email AS driver_email,
          u.status AS driver_status,

          COALESCE(
            json_agg(
              json_build_object(
                'id', d.id,
                'file_name', d.file_name,
                'file_url', d.file_url,
                'file_type', d.file_type,
                'uploaded_at', d.uploaded_at
              )
            ) FILTER (WHERE d.id IS NOT NULL),
            '[]'
          ) AS documents

      FROM batches b

      LEFT JOIN farms f
          ON f.id = b.farm_id

      LEFT JOIN passports p
          ON p.batch_id = b.id

      LEFT JOIN shipments s
          ON s.batch_id = b.id

      LEFT JOIN users u
          ON u.id = s.driver_id

      LEFT JOIN documents d
          ON d.farm_id = f.id

      WHERE
          b.batch_code = $1
          OR p.passport_number = $1
          OR CAST(s.id AS TEXT) = $1

      GROUP BY
          f.id,
          b.id,
          p.passport_number,
          s.id,
          u.id

      LIMIT 1;
      `,
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No traceability record found.",
      });
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
        message: "Database error",
      },
      {
        status: 500,
      }
    );
  }
}