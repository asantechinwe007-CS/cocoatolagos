import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const batchId = searchParams.get("batchId");

    if (!batchId) {
      return NextResponse.json(
        {
          success: false,
          message: "batchId is required",
        },
        {
          status: 400,
        }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      "https://cocoapass-ashy.vercel.app";

    const passportUrl = `${baseUrl}/passport/${batchId}`;

    const qrCode = await QRCode.toDataURL(passportUrl, {
      width: 500,
      margin: 2,
      errorCorrectionLevel: "H",
    });

    return NextResponse.json({
      success: true,
      passportUrl,
      qrCode,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate QR Code",
      },
      {
        status: 500,
      }
    );
  }
}