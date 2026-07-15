import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  try {
    const batchCode =
      req.nextUrl.searchParams.get("batchCode");

    if (!batchCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Batch code required",
        },
        { status: 400 }
      );
    }
  const url =
  `http://172.20.10.5:3000/trace/${batchCode}`;
    const qr = await QRCode.toDataURL(url);

    return NextResponse.json({
      success: true,
      qr,
      url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "QR generation failed",
      },
      { status: 500 }
    );
  }
}