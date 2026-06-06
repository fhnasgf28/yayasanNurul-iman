import { ImageResponse } from "next/og";
import PWAIconMark from "@/components/PWAIconMark";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<PWAIconMark size={size.width} />, {
    ...size,
  });
}
