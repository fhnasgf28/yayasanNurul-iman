type Props = {
  size: number;
  rounded?: boolean;
};

// PENTING: ImageResponse menggunakan Satori renderer.
// Setiap <div> yang memiliki child element WAJIB punya style display:"flex"
// Tidak support position:absolute tanpa display:flex pada parent
export default function PWAIconMark({ size, rounded = true }: Props) {
  const borderRadius = rounded ? Math.round(size * 0.22) : 0;
  const s = (ratio: number) => Math.round(size * ratio);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius,
        background: "linear-gradient(145deg, #0A2E1A 0%, #1A4D2E 60%, #123D22 100%)",
      }}
    >
      {/* Bulan sabit — pojok kanan atas (absolute, parent display:flex) */}
      <div
        style={{
          position: "absolute",
          top: s(0.07),
          right: s(0.07),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: s(0.2),
          height: s(0.2),
        }}
      >
        {/* Lingkaran emas */}
        <div
          style={{
            width: s(0.16),
            height: s(0.16),
            borderRadius: 9999,
            background: "#C8963E",
            display: "flex",
            position: "relative",
          }}
        >
          {/* Lingkaran gelap overlap → efek bulan sabit */}
          <div
            style={{
              position: "absolute",
              top: -s(0.01),
              left: s(0.045),
              width: s(0.13),
              height: s(0.13),
              borderRadius: 9999,
              background: "#0A2E1A",
              display: "flex",
            }}
          />
        </div>
      </div>

      {/* Konten utama: ikon masjid + teks */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Siluet masjid — SVG inline */}
        <svg
          width={s(0.55)}
          height={s(0.36)}
          viewBox="0 0 110 72"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Menara kiri */}
          <rect x="4" y="28" width="11" height="44" rx="2" fill="#C8963E" />
          <ellipse cx="9.5" cy="27" rx="7" ry="8" fill="#C8963E" />
          {/* Menara kanan */}
          <rect x="95" y="28" width="11" height="44" rx="2" fill="#C8963E" />
          <ellipse cx="100.5" cy="27" rx="7" ry="8" fill="#C8963E" />
          {/* Kubah kecil kiri */}
          <ellipse cx="28" cy="44" rx="11" ry="11" fill="#C8963E" />
          {/* Kubah kecil kanan */}
          <ellipse cx="82" cy="44" rx="11" ry="11" fill="#C8963E" />
          {/* Kubah utama */}
          <ellipse cx="55" cy="30" rx="20" ry="19" fill="#C8963E" />
          {/* Finial kubah utama */}
          <rect x="53" y="8" width="4" height="9" rx="1" fill="#C8963E" />
          <circle cx="55" cy="7" r="3.5" fill="#C8963E" />
          {/* Badan utama masjid */}
          <rect x="17" y="48" width="76" height="24" rx="2" fill="#C8963E" />
          {/* Pintu lengkung */}
          <path d="M48 72 L48 58 Q55 50 62 58 L62 72 Z" fill="#0A2E1A" />
        </svg>

        {/* Teks "NI" */}
        <div
          style={{
            display: "flex",
            fontSize: s(0.27),
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: s(0.01),
            lineHeight: 1,
            marginTop: s(0.025),
          }}
        >
          NI
        </div>

        {/* Sub-teks "NURUL IMAN" */}
        <div
          style={{
            display: "flex",
            fontSize: s(0.068),
            fontWeight: 700,
            color: "#C8963E",
            letterSpacing: s(0.008),
            lineHeight: 1,
            marginTop: s(0.018),
          }}
        >
          NURUL IMAN
        </div>
      </div>
    </div>
  );
}
