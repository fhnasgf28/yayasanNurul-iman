"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Coins, 
  Heart, 
  Copy, 
  Check, 
  MessageSquare, 
  ChevronRight, 
  Sparkles,
  Info
} from "lucide-react";

interface DonationCalculatorProps {
  settings: Record<string, string>;
}

export default function DonationCalculator({ settings }: DonationCalculatorProps) {
  const [activeTab, setActiveTab] = useState<"penghasilan" | "maal" | "infaq">("penghasilan");
  const [copied, setCopied] = useState(false);
  
  // Zakat Penghasilan States
  const [gaji, setGaji] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [hutangBulan, setHutangBulan] = useState<number>(0);
  
  // Zakat Maal States
  const [tabungan, setTabungan] = useState<number>(0);
  const [emasPerak, setEmasPerak] = useState<number>(0);
  const [investasi, setInvestasi] = useState<number>(0);
  const [piutang, setPiutang] = useState<number>(0);
  const [hutangJatuhTempo, setHutangJatuhTempo] = useState<number>(0);
  
  // Infaq & Sedekah States
  const [jumlahSantri, setJumlahSantri] = useState<number>(1);
  const [jumlahQuran, setJumlahQuran] = useState<number>(1);
  const [infaqMasjid, setInfaqMasjid] = useState<number>(100000);
  const [infaqRenovasi, setInfaqRenovasi] = useState<number>(0);
  const [selectedInfaqType, setSelectedInfaqType] = useState<"santri" | "quran" | "masjid" | "renovasi">("santri");

  // Output States
  const [totalZakat, setTotalZakat] = useState<number>(0);
  const [isWajibZakat, setIsWajibZakat] = useState<boolean>(false);

  // Settings parsing
  const bankName = settings.bank_name || "Bank Syariah Indonesia (BSI)";
  const bankAccount = settings.bank_account_number || "7144002026";
  const bankAccountName = settings.bank_account_holder || "Yayasan Nurul Iman";
  const rawWa = settings.whatsapp_number || settings.contact_phone || "6283823290281";
  
  const formatWhatsAppNumber = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    return cleaned || "6283823290281";
  };
  
  const whatsappNumber = formatWhatsAppNumber(rawWa);

  // Constants
  const EMAS_PRICE = 1400000; // Harga emas per gram default
  const BERAS_PRICE = 15000; // Harga beras per kg default
  const MONTHLY_NISAB_BERAS_KG = 522;
  const ANNUAL_NISAB_EMAS_GR = 85;

  const monthlyNisab = MONTHLY_NISAB_BERAS_KG * BERAS_PRICE; // 522 * 15.000 = Rp 7.830.000
  const annualNisab = ANNUAL_NISAB_EMAS_GR * EMAS_PRICE; // 85 * 1.400.000 = Rp 119.000.000

  // Calculate Zakat Penghasilan
  useEffect(() => {
    if (activeTab === "penghasilan") {
      const bersih = gaji + bonus - hutangBulan;
      const finalBersih = bersih > 0 ? bersih : 0;
      const isEligible = finalBersih >= monthlyNisab;
      setIsWajibZakat(isEligible);
      setTotalZakat(isEligible ? Math.round(finalBersih * 0.025) : 0);
    }
  }, [gaji, bonus, hutangBulan, activeTab, monthlyNisab]);

  // Calculate Zakat Maal
  useEffect(() => {
    if (activeTab === "maal") {
      const totalHarta = tabungan + emasPerak + investasi + piutang - hutangJatuhTempo;
      const finalHarta = totalHarta > 0 ? totalHarta : 0;
      const isEligible = finalHarta >= annualNisab;
      setIsWajibZakat(isEligible);
      setTotalZakat(isEligible ? Math.round(finalHarta * 0.025) : 0);
    }
  }, [tabungan, emasPerak, investasi, piutang, hutangJatuhTempo, activeTab, annualNisab]);

  // Calculate Infaq Total
  const getInfaqTotal = () => {
    switch (selectedInfaqType) {
      case "santri":
        return jumlahSantri * 150000;
      case "quran":
        return jumlahQuran * 50000;
      case "masjid":
        return infaqMasjid;
      case "renovasi":
        return infaqRenovasi;
      default:
        return 0;
    }
  };

  const currentDonationTotal = activeTab === "infaq" ? getInfaqTotal() : totalZakat;

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDonationLabel = () => {
    if (activeTab === "penghasilan") return "Zakat Penghasilan";
    if (activeTab === "maal") return "Zakat Maal (Harta)";
    if (activeTab === "infaq") {
      if (selectedInfaqType === "santri") return `Infaq Beasiswa Santri (${jumlahSantri} Santri)`;
      if (selectedInfaqType === "quran") return `Wakaf Al-Qur'an (${jumlahQuran} Mushaf)`;
      if (selectedInfaqType === "masjid") return "Infaq Operasional Masjid";
      if (selectedInfaqType === "renovasi") return "Infaq Renovasi Masjid";
    }
    return "Donasi";
  };

  const getWaLink = () => {
    const label = getDonationLabel();
    const formattedTotal = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(currentDonationTotal);

    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Saya ingin mengonfirmasi donasi untuk Yayasan Nurul Iman dengan rincian berikut:
- *Nama*: [Tulis Nama Anda]
- *Jenis Donasi*: ${label}
- *Nominal*: ${formattedTotal}
- *Metode*: Transfer Bank (${bankName})

Mohon berkenan memverifikasi. Jazakumullahu Khairan Katsiran.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const formatCurrencyInput = (value: number) => {
    if (value === 0) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseCurrencyInput = (value: string) => {
    const parsed = parseInt(value.replace(/\./g, ""), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-secondary/10 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Calculator Form */}
      <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-primary">Kalkulator Infaq & Zakat</h3>
            <p className="text-xs text-gray-500">Hitung kewajiban zakat atau pilih paket infaq secara praktis.</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-light p-1.5 rounded-2xl border border-secondary/5">
          <button
            onClick={() => setActiveTab("penghasilan")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "penghasilan"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Coins size={16} />
            <span className="hidden sm:inline">Zakat</span> Pendapatan
          </button>
          <button
            onClick={() => setActiveTab("maal")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "maal"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Coins size={16} />
            <span className="hidden sm:inline">Zakat</span> Maal
          </button>
          <button
            onClick={() => setActiveTab("infaq")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "infaq"
                ? "bg-primary text-white shadow-md shadow-primary/10"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Heart size={16} />
            <span>Infaq Paket</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {activeTab === "penghasilan" && (
              <motion.div
                key="penghasilan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10 flex items-start space-x-3 text-xs leading-relaxed text-gray-600">
                  <Info className="text-secondary shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-primary mb-1">Ketentuan Zakat Profesi</p>
                    Nisab Zakat Penghasilan disetarakan dengan 522 kg beras per bulan (bernilai sekitar <strong className="text-primary">Rp 7.830.000</strong>). Dikenakan sebesar 2.5% jika penghasilan bersih telah mencapai nisab.
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Pendapatan Tetap Bulanan (Rp)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                      <input
                        type="text"
                        value={formatCurrencyInput(gaji)}
                        onChange={(e) => setGaji(parseCurrencyInput(e.target.value))}
                        className="w-full bg-light border border-secondary/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-secondary transition-all text-sm font-semibold text-primary"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Bonus & Pendapatan Lain (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(bonus)}
                          onChange={(e) => setBonus(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-secondary transition-all text-sm font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Hutang/Kewajiban Bulanan (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(hutangBulan)}
                          onChange={(e) => setHutangBulan(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-secondary transition-all text-sm font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "maal" && (
              <motion.div
                key="maal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10 flex items-start space-x-3 text-xs leading-relaxed text-gray-600">
                  <Info className="text-secondary shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-primary mb-1">Ketentuan Zakat Maal (Harta)</p>
                    Nisab Zakat Maal disetarakan dengan 85 gram emas per tahun (bernilai sekitar <strong className="text-primary">Rp 119.000.000</strong>). Wajib dikeluarkan sebesar 2.5% jika telah tersimpan selama 1 tahun (haul) dan mencapai nisab.
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Tabungan / Uang Tunai / Deposito</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(tabungan)}
                          onChange={(e) => setTabungan(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-xs font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Nilai Emas & Perak (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(emasPerak)}
                          onChange={(e) => setEmasPerak(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-xs font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Investasi / Saham (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(investasi)}
                          onChange={(e) => setInvestasi(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-xs font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Piutang Lancar (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(piutang)}
                          onChange={(e) => setPiutang(parseCurrencyInput(e.target.value))}
                          className="w-full bg-light border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-xs font-semibold text-primary"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Hutang Jatuh Tempo / Pengurang Harta (Rp)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                      <input
                        type="text"
                        value={formatCurrencyInput(hutangJatuhTempo)}
                        onChange={(e) => setHutangJatuhTempo(parseCurrencyInput(e.target.value))}
                        className="w-full bg-light border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-xs font-semibold text-primary"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "infaq" && (
              <motion.div
                key="infaq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedInfaqType("santri")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedInfaqType === "santri"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-secondary/10 hover:border-secondary/35 bg-white"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Paket A</p>
                    <h4 className="text-sm font-serif font-bold text-primary mb-1">Beasiswa Santri</h4>
                    <p className="text-xs text-gray-400">Rp 150.000 / anak / bln</p>
                  </button>
                  <button
                    onClick={() => setSelectedInfaqType("quran")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedInfaqType === "quran"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-secondary/10 hover:border-secondary/35 bg-white"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Paket B</p>
                    <h4 className="text-sm font-serif font-bold text-primary mb-1">Wakaf Al-Qur'an</h4>
                    <p className="text-xs text-gray-400">Rp 50.000 / mushaf</p>
                  </button>
                  <button
                    onClick={() => setSelectedInfaqType("masjid")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedInfaqType === "masjid"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-secondary/10 hover:border-secondary/35 bg-white"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Pilihan C</p>
                    <h4 className="text-sm font-serif font-bold text-primary mb-1">Operasional Masjid</h4>
                    <p className="text-xs text-gray-400">Nominal Bebas</p>
                  </button>
                  <button
                    onClick={() => setSelectedInfaqType("renovasi")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedInfaqType === "renovasi"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-secondary/10 hover:border-secondary/35 bg-white"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">Pilihan D</p>
                    <h4 className="text-sm font-serif font-bold text-primary mb-1">Renovasi Masjid</h4>
                    <p className="text-xs text-gray-400">Nominal Bebas</p>
                  </button>
                </div>

                <div className="bg-light p-6 rounded-2xl border border-secondary/5">
                  {selectedInfaqType === "santri" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-primary">Jumlah Santri yang Disponsori</h4>
                        <p className="text-xs text-gray-400 mt-1">Membantu biaya SPP dan buku santri dhuafa.</p>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-1 rounded-xl border border-secondary/10">
                        <button
                          type="button"
                          onClick={() => setJumlahSantri(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-light text-primary font-bold flex items-center justify-center hover:bg-secondary/10"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-primary">{jumlahSantri}</span>
                        <button
                          type="button"
                          onClick={() => setJumlahSantri(prev => prev + 1)}
                          className="w-8 h-8 rounded-lg bg-light text-primary font-bold flex items-center justify-center hover:bg-secondary/10"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedInfaqType === "quran" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-primary">Jumlah Mushaf Al-Qur'an</h4>
                        <p className="text-xs text-gray-400 mt-1">Mushaf dibagikan untuk santri & jamaah masjid.</p>
                      </div>
                      <div className="flex items-center space-x-3 bg-white p-1 rounded-xl border border-secondary/10">
                        <button
                          type="button"
                          onClick={() => setJumlahQuran(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-light text-primary font-bold flex items-center justify-center hover:bg-secondary/10"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-primary">{jumlahQuran}</span>
                        <button
                          type="button"
                          onClick={() => setJumlahQuran(prev => prev + 1)}
                          className="w-8 h-8 rounded-lg bg-light text-primary font-bold flex items-center justify-center hover:bg-secondary/10"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedInfaqType === "masjid" && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-primary block">Masukkan Nominal Infaq Masjid (Rp)</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[50000, 100000, 250000, 500000].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setInfaqMasjid(val)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              infaqMasjid === val
                                ? "bg-primary border-primary text-white"
                                : "bg-white border-secondary/10 text-gray-600 hover:border-secondary"
                            }`}
                          >
                            Rp {new Intl.NumberFormat("id-ID").format(val)}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(infaqMasjid)}
                          onChange={(e) => setInfaqMasjid(parseCurrencyInput(e.target.value))}
                          className="w-full bg-white border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-sm font-bold text-primary"
                          placeholder="Bebas..."
                        />
                      </div>
                    </div>
                  )}

                  {selectedInfaqType === "renovasi" && (
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-primary block">Masukkan Nominal Infaq Renovasi (Rp)</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[100000, 250000, 500000, 1000000].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setInfaqRenovasi(val)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              infaqRenovasi === val
                                ? "bg-primary border-primary text-white"
                                : "bg-white border-secondary/10 text-gray-600 hover:border-secondary"
                            }`}
                          >
                            Rp {new Intl.NumberFormat("id-ID").format(val)}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
                        <input
                          type="text"
                          value={formatCurrencyInput(infaqRenovasi)}
                          onChange={(e) => setInfaqRenovasi(parseCurrencyInput(e.target.value))}
                          className="w-full bg-white border border-secondary/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-secondary transition-all text-sm font-bold text-primary"
                          placeholder="Bebas..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Summary Sidebar Panel */}
      <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-6 sm:p-10 text-white flex flex-col justify-between space-y-8 relative overflow-hidden">
        {/* Pattern Background overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-islamic pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 text-secondary font-bold tracking-widest uppercase text-[10px] bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles size={12} className="text-secondary animate-pulse" />
            <span>Ringkasan Donasi</span>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Jenis Transaksi</p>
            <h4 className="text-lg font-serif font-bold text-secondary">{getDonationLabel()}</h4>
          </div>

          {activeTab !== "infaq" && (
            <div className="py-2.5 px-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60">Status Wajib Zakat:</span>
              {isWajibZakat ? (
                <span className="bg-secondary/20 text-secondary border border-secondary/20 px-2 py-0.5 rounded-md font-bold">Wajib Zakat</span>
              ) : (
                <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-md">Belum Wajib</span>
              )}
            </div>
          )}

          <div className="space-y-1 border-t border-white/10 pt-4">
            <p className="text-xs text-white/60 font-semibold uppercase tracking-wider">Jumlah yang Disalurkan</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(currentDonationTotal)}
            </h2>
          </div>
        </div>

        {/* Transfer & Bank details */}
        <div className="relative z-10 space-y-6 border-t border-white/10 pt-6">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Tujuan Transfer</p>
                <p className="text-sm font-bold text-secondary mt-0.5">{bankName}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-secondary/20 hover:text-secondary flex items-center justify-center transition-colors text-white"
                title="Salin No Rekening"
              >
                {copied ? <Check size={16} className="text-secondary" /> : <Copy size={16} />}
              </button>
            </div>
            <div>
              <p className="text-lg font-mono font-bold tracking-wider text-white select-all">{bankAccount}</p>
              <p className="text-xs text-white/60 mt-1">A/N: <strong className="text-white">{bankAccountName}</strong></p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-white/60 leading-relaxed">
              Silakan transfer sesuai nominal di atas, lalu klik tombol di bawah untuk mengirimkan konfirmasi bukti transfer via WhatsApp.
            </p>

            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-secondary text-primary font-bold text-center rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all hover:bg-white hover:scale-[1.02]"
            >
              <MessageSquare size={18} className="fill-current" />
              <span>Konfirmasi via WhatsApp</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
