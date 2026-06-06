import { ImageResponse } from "next/og";
import PWAIconMark from "@/components/PWAIconMark";

const ALLOWED_SIZES = new Set([192, 512]);

function getIconSize(value: string | undefined) {
  const parsed = Number(value);
  return ALLOWED_SIZES.has(parsed) ? parsed : 512;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size } = await params;
  const iconSize = getIconSize(size);

  return new ImageResponse(<PWAIconMark size={iconSize} />, {
    width: iconSize,
    height: iconSize,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
