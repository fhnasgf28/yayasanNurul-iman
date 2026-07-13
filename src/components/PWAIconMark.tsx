type Props = {
  size: number;
  rounded?: boolean;
};

export default function PWAIconMark({ size, rounded = true }: Props) {
  const borderRadius = rounded ? Math.round(size * 0.22) : 0;

  // Proporsi relatif terhadap size
  const s = (ratio: number) => Math.round(size * ratio);

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
        background: "linear-gradient(145deg, #0A2E1A 0%, #1A4D2E 60%, #123D22 100%)",
      }}
    >
      {/* Subtle radial glow tengah */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: s(1.1),
          height: s(1.1),
          borderRadius: 999,
          background: "radial-gradient(circle, rgba(200,150,62,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Bulan sabit — pojok kanan atas */}
      <div
        style={{
          position: "absolute",
          top: s(0.08),
          right: s(0.09),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Bulan sabit menggunakan dua lingkaran */}
        <div
          style={{
            width: s(0.16),
            height: s(0.16),
            borderRadius: 999,
            background: "#C8963E",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: s(-0.02),
              left: s(0.04),
              width: s(0.13),
              height: s(0.13),
              borderRadius: 999,
              background: "#0A2E1A",
            }}
          />
        </div>
      </div>

      {/* Konten utama: masjid + teks NI */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          marginTop: s(0.02),
        }}
      >
        {/* Siluet Masjid SVG */}
        <svg
          width={s(0.52)}
          height={s(0.35)}
          viewBox="0 0 100 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Kubah utama */}
          <ellipse cx="50" cy="28" rx="18" ry="17" fill="#C8963E" />
          {/* Kubah kecil kiri */}
          <ellipse cx="22" cy="38" rx="10" ry="10" fill="#C8963E" />
          {/* Kubah kecil kanan */}
          <ellipse cx="78" cy="38" rx="10" ry="10" fill="#C8963E" />
          {/* Badan utama masjid */}
          <rect x="15" y="43" width="70" height="24" rx="2" fill="#C8963E" />
          {/* Menara kiri */}
          <rect x="5" y="26" width="10" height="41" rx="2" fill="#C8963E" />
          <ellipse cx="10" cy="25" rx="6" ry="7" fill="#C8963E" />
          {/* Menara kanan */}
          <rect x="85" y="26" width="10" height="41" rx="2" fill="#C8963E" />
          <ellipse cx="90" cy="25" rx="6" ry="7" fill="#C8963E" />
          {/* Pintu masjid */}
          <path d="M43 67 L43 52 Q50 44 57 52 L57 67 Z" fill="#1A4D2E" />
          {/* Finial kubah utama */}
          <rect x="48" y="8" width="4" height="8" rx="1" fill="#C8963E" />
          <circle cx="50" cy="7" r="3" fill="#C8963E" />
        </svg>

        {/* Teks "NI" */}
        <div
          style={{
            display: "flex",
            fontSize: s(0.26),
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: s(0.015),
            lineHeight: 1,
            marginTop: s(0.02),
            fontFamily: "sans-serif",
          }}
        >
          NI
        </div>

        {/* Sub-teks kecil */}
        <div
          style={{
            display: "flex",
            fontSize: s(0.07),
            fontWeight: 600,
            color: "#C8963E",
            letterSpacing: s(0.008),
            lineHeight: 1,
            marginTop: s(0.02),
            fontFamily: "sans-serif",
          }}
        >
          NURUL IMAN
        </div>
      </div>
    </div>
  );
}
