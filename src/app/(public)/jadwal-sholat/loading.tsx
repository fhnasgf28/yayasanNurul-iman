import Image from "next/image";

export default function LoadingPrayerSchedulePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white bg-islamic pt-16 md:pt-20">
      <div className="absolute inset-x-0 top-0 h-[470px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=2070&auto=format&fit=crop"
          alt="Masjid Nurul Iman"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/72 to-primary/90" />
        <div className="absolute inset-0 bg-islamic opacity-[0.06]" />
      </div>

      <section className="relative px-4 pb-24 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] bg-[#15554c] p-6 shadow-[0_24px_70px_rgba(7,54,46,0.18)]">
              <div className="h-4 w-28 animate-pulse rounded-full bg-white/20" />
              <div className="mt-5 h-12 w-4/5 animate-pulse rounded-3xl bg-white/16" />
              <div className="mt-4 h-20 animate-pulse rounded-[1.8rem] bg-white/10" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="h-24 animate-pulse rounded-[1.6rem] bg-white/10" />
                <div className="h-24 animate-pulse rounded-[1.6rem] bg-white/10" />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/85 p-6 shadow-[0_22px_56px_rgba(7,54,46,0.08)]">
              <div className="h-4 w-32 animate-pulse rounded-full bg-emerald-100" />
              <div className="mt-5 h-11 w-3/4 animate-pulse rounded-3xl bg-emerald-50" />
              <div className="mt-4 h-14 animate-pulse rounded-2xl bg-emerald-50" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-16 animate-pulse rounded-2xl bg-emerald-50" />
                <div className="h-16 animate-pulse rounded-2xl bg-emerald-50" />
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-white bg-islamic pt-8">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-[1.8rem] bg-white/90 shadow-[0_18px_44px_rgba(15,23,42,0.05)]" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
