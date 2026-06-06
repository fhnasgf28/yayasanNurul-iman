import { ImageResponse } from "next/og";
import PWAIconMark from "@/components/PWAIconMark";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<PWAIconMark size={size.width} rounded={false} />, {
    ...size,
  });
}
