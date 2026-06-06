type Props = {
  size: number;
  rounded?: boolean;
};

export default function PWAIconMark({ size, rounded = true }: Props) {
  const borderRadius = rounded ? Math.round(size * 0.22) : 0;
  const innerRadius = Math.round(size * 0.16);
  const badgeSize = Math.round(size * 0.52);
  const fontSize = Math.round(size * 0.22);
  const smallTextSize = Math.round(size * 0.055);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius,
        background: "linear-gradient(145deg, #0F3A26 0%, #1A4D2E 54%, #C9A84C 140%)",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: Math.round(size * 0.075),
          borderRadius: innerRadius,
          border: `${Math.max(2, Math.round(size * 0.012))}px solid rgba(253, 250, 244, 0.2)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -Math.round(size * 0.1),
          right: -Math.round(size * 0.12),
          width: Math.round(size * 0.46),
          height: Math.round(size * 0.46),
          borderRadius: 999,
          background: "rgba(201, 168, 76, 0.26)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -Math.round(size * 0.16),
          left: -Math.round(size * 0.14),
          width: Math.round(size * 0.58),
          height: Math.round(size * 0.58),
          borderRadius: 999,
          background: "rgba(253, 250, 244, 0.08)",
        }}
      />
      <div
        style={{
          width: badgeSize,
          height: badgeSize,
          borderRadius: Math.round(size * 0.18),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(253, 250, 244, 0.13)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.2)",
          border: `${Math.max(2, Math.round(size * 0.01))}px solid rgba(253, 250, 244, 0.2)`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize,
            lineHeight: 1,
            fontWeight: 800,
            letterSpacing: -Math.round(size * 0.012),
          }}
        >
          NI
        </div>
        <div
          style={{
            display: "flex",
            marginTop: Math.round(size * 0.035),
            fontSize: smallTextSize,
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: Math.round(size * 0.008),
            color: "#F5F0E8",
          }}
        >
          NURUL IMAN
        </div>
      </div>
    </div>
  );
}
