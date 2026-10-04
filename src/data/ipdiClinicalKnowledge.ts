/**
 * Comprehensive Knowledge Base & Clinical Answer Engine
 * Strictly grounded in "Modul Resertifikasi Perawat Dialisis Indonesia (PP IPDI 2021)"
 */

interface TopicRule {
  keywords: string[];
  reply: string;
}

const KNOWLEDGE_RULES: TopicRule[] = [
  // 1. RULE OF SIX & AKSES VASKULER AV-FISTULA
  {
    keywords: ['rule of six', 'rule of 6', 'avf', 'av-fistula', 'fistula', 'cimino', 'kanulasi', 'rope ladder', 'buttonhole'],
    reply: `**Kriteria Rule of Six (KDOQI) untuk AV-Fistula yang Siap Dikanulasi:**
1. **Usia Fistula:** Minimal **6 minggu** pascaoperasi penyambungan arteri-vena.
2. **Diameter Vena:** Minimal **6 mm** pada pemeriksaan klinis atau USG Doppler.
3. **Kedalaman Vena:** Kurang dari **6 mm** dari permukaan kulit (agar mudah dipalpasi dan dikanulasi).
4. **Aliran Darah (Blood Flow):** Minimal **600 mL/menit**.
5. **Panjang Segmen Lurus:** Minimal **6 inci (15 cm)** untuk memungkinkan rotasi kanulasi jarum arteri dan vena.

**Teknik Kanulasi yang Direkomendasikan:**
• **Rope Ladder:** Menusuk dengan rotasi jarak 3–5 mm sepanjang segmen fistula, jangan menusuk titik yang sama berulang kali dalam 2 minggu untuk mencegah aneurisma dan stenosis.
• **Sudut Kanulasi:** 20–25° untuk AVF native, 45° untuk AV Graft.

📚 *Rujukan: Modul IPDI 2021 - Bab 2: Asuhan Keperawatan Pre HD (Hal. 42 & 46)*`
  },

  // 2. EMBOLI UDARA & POSISI DURANT
  {
    keywords: ['durant', 'emboli', 'udara', 'air embolism', 'gelembung'],
    reply: `**Tatalaksana Kedaruratan Emboli Udara Intradialisis & Posisi Durant:**
1. **Klem Sirkuit Segera:** Klem venous line dan matikan pompa darah (blood pump) untuk menghentikan masuknya udara lebih lanjut.
2. **Posisi Durant:** Segera miringkan pasien ke sisi **tubuh sebelah kiri** dengan posisi **kepala lebih rendah dari badan (Trendelenburg miring kiri)**.
3. **Rasional Patofisiologis:** Posisi Durant bertujuan memerangkap gelembung udara di apeks ventrikel kanan jantung, mencegah gelembung tersebut menyumbat arteri pulmonalis (*pulmonary air lock*) yang dapat berakibat henti jantung mendadak.
4. **Oksigenasi:** Berikan oksigen konsentrasi tinggi 100% untuk mempercepat reabsorpsi gas nitrogen.
5. **Hubungi Dokter Sp.PD-KGH/Dokter Jaga:** Lakukan observasi tanda vital dan rekam EKG cito.

📚 *Rujukan: Modul IPDI 2021 - Bab 3: Asuhan Keperawatan Intra HD (Hal. 71)*`
  },

  // 3. REPROCESSING DIALISER, TCV 80% & AFKIR
  {
    keywords: ['reprocessing', 'tcv', 'afkir', 'reuse', 'perasetat', 'kebocoran', 'cuci dialiser'],
    reply: `**Kriteria Kelayakan & Alasan Mutlak Pengafkiran Dialiser Proses Ulang (Reprocessing):**
Menurut standar AAMI dan KDOQI, dialiser **WAJIB DIAFKIR (DIBUANG)** apabila:
1. **Penurunan Total Cell Volume (TCV):** Nilai TCV terukur **< 80%** dari priming volume awal (penurunan serat kapiler aktif > 20%).
2. **Uji Kebocoran Membran (Pressure Leak Test):** Gagal menahan tekanan udara 1–2 bar selama 1 menit (terjadi penurunan tekanan drastis).
3. **Kerusakan Fisik:** Terdapat keretakan pada header, serat berbekuan darah masif (*clotting* > 20%), atau sambungan longgar.
4. **Kontraindikasi Mutlak Reuse:** Pasien didiagnosis **Sepsis/bakteremia aktif** atau terkonfirmasi **Hepatitis B (HBsAg positif)**.

**Parameter Sterilisasi Kimia:**
• Menggunakan asam perasetat konsentrasi 3–4% dengan waktu kontak minimal 11 jam sebelum dipakai ulang, batas simpan 14–21 hari. Bilas NaCl 0,9% minimal 2000 mL hingga uji residu strip negatif.

📚 *Rujukan: Modul IPDI 2021 - Bab 8: Dialiser Proses Ulang (Hal. 170–176)*`
  },

  // 4. ADEKUASI DIALISIS: KT/V & URR (KDOQI VS PERNEFRI)
  {
    keywords: ['kt/v', 'urr', 'adekuasi', 'kdoqi', 'pernefri', 'rebound', 'sampling ureum'],
    reply: `**Standar Target Adekuasi Hemodialisis (KDOQI vs PERNEFRI):**
• **Target KDOQI (Frekuensi HD 3x/minggu @ 4 jam):**
  - Target minimal single-pool **spKt/V ≥ 1,4** per sesi.
  - Urea Reduction Ratio **URR ≥ 70%**.
  - Target mingguan **stdKt/V ≥ 2,0**.
• **Target PERNEFRI (Frekuensi HD 2x/minggu @ 5 jam):**
  - Target **Kt/V = 1,8** per sesi.
  - Target **URR = 80%**.

**Protokol Baku Pengambilan Sampel Darah Ureum Post-HD (Metode Slow Flow):**
1. Saat sesi HD selesai, atur ultrafiltrasi ke **UF = 0 mL/jam**.
2. Turunkan laju aliran darah (Qb) ke **100 mL/menit selama 10–20 detik** untuk membersihkan sisa resirkulasi akses.
3. Hentikan pompa darah, klem jalur arteri dan vena.
4. Ambil sampel darah dari port sampling jalur arteri (merah/ABL) dalam waktu maksimal 2 menit untuk mencegah kesalahan nilai akibat *urea rebound*.

📚 *Rujukan: Modul IPDI 2021 - Bab 4: Asuhan Keperawatan Post HD (Hal. 76–84)*`
  },

  // 5. PERITONITIS PADA CAPD
  {
    keywords: ['peritonitis', 'capd', 'peritoneum', 'tenckhoff', 'cairan keruh', 'cloudy'],
    reply: `**Kriteria Diagnosis & Penanganan Peritonitis pada Pasien CAPD:**
Diagnosis peritonitis ditegakkan jika ditemukan **minimal 2 dari 3 tanda berikut**:
1. **Cairan Dialisat Buangan Keruh (*Cloudy Effluent*):** Merupakan tanda fisik paling awal akibat eksudat leukosit.
2. **Nyeri Perut:** Disertai nyeri tekan atau nyeri lepas (*rebound tenderness*), demam, mual, atau muntah.
3. **Pemeriksaan Laboratorium Cairan Dialisat:** Hitung leukosit **> 100 sel/µL** dengan persentase neutrofil segmen (**PMN > 50%**).

**Mikroorganisme Penyebab Tersering:**
• Bakteri gram positif (Staphylococcus epidermidis/aureus karena kontaminasi sentuhan).
• Bakteri gram negatif (*Escherichia coli* ~40% akibat translokasi usus).

**Prinsip Penanganan Awal:**
• Lakukan pembilasan (*flush*) cepat dengan dialisat 1,5% heparin, berikan antibiotik intraperitoneal dosis empiris sesuai kultur.

📚 *Rujukan: Modul IPDI 2021 - Bab 7: Continuous Ambulatory Peritoneal Dialysis (Hal. 153–158)*`
  },

  // 6. BAKU MUTU WATER TREATMENT AAMI
  {
    keywords: ['aami', 'water', 'air', 'wt', 'ebct', 'karbon', 'klorin', 'kloramin', 'softener', 'kesadahan', 'endotoksin', 'reverse osmosis', 'ro'],
    reply: `**Standar Baku Mutu Air Hemodialisa (Standar AAMI / ISO 23500):**
Pasien HD terpapar 18.000–36.000 liter air per tahun, sehingga kualitas air sangat vital:
1. **Bakteriologi Air Produk:**
   - Standar Baku: **< 200 CFU/mL** (Tindakan koreksi wajib jika > 50 CFU/mL).
   - Air Ultrapure: **< 0,1 CFU/mL**.
2. **Kadar Endotoksin:**
   - Standar Baku: **< 2,0 EU/mL**.
   - Air Ultrapure: **< 0,03 EU/mL**.
3. **Tangki Karbon Aktif (GAC):**
   - **EBCT (Empty Bed Contact Time):** Wajib minimal **10 menit** (5 menit tangki utama + 5 menit tangki polishing).
   - Target Klorin Total: **< 0,1 mg/L (ppm)** dan Klorin Bebas **< 0,5 mg/L**. (Bila lolos memicu hemolisis akut masif dan methemoglobinemia).
4. **Water Softener (Pelembut Air):**
   - Mengeliminasi ion Kalsium (Ca²⁺) dan Magnesium (Mg²⁺) melalui pertukaran ion resin Na⁺.
   - Ambang kesadahan air produk: **< 1 gpg (17 ppm)** untuk mencegah *Hard Water Syndrome* dan kerak membran RO.

📚 *Rujukan: Modul IPDI 2021 - Bab 9: Pengolahan Air Hemodialisa (Hal. 181–192)*`
  },

  // 7. SLED / PIRRT DI ICU
  {
    keywords: ['sled', 'pirrt', 'icu', 'kritis', 'sodium profiling', 'bikarbonat profiling'],
    reply: `**Konsep & Parameter Teknis Dialisis Hibrid SLED / PIRRT:**
SLED (Sustained Low-Efficiency Dialysis) mengombinasikan keunggulan IHD (hemat biaya) dan CRRT (stabilitas hemodinamik):
• **Indikasi Utama:** Pasien gagal ginjal akut di ICU dengan instabilitas hemodinamik, syok sepsis, atau pascaoperasi jantung terbuka.
• **Parameter Mesin yang Dianjurkan:**
  - **Durasi Sesi:** 6 hingga 12 jam (biasanya dilakukan di malam hari).
  - **Laju Aliran Darah (Qb):** Rendah/lambat **100–150 mL/menit**.
  - **Laju Aliran Dialisat (Qd):** Lambat **200–300 mL/menit**.
  - **Suhu Dialisat Dingin:** **35,0–36,0 °C** (memicu vasokonstriksi perifer simpatis untuk menjaga tekanan darah).
  - **Sodium Profiling:** Menjaga osmolaritas vaskuler guna mengoptimalkan *plasma refilling rate*.

📚 *Rujukan: Modul IPDI 2021 - Bab 5: HD Khusus: PIRRT & SLED (Hal. 85–92)*`
  },

  // 8. HIPOTENSI INTRADIALISIS & SINDROM DIALISIS
  {
    keywords: ['hipotensi', 'drop', 'pusing', 'dds', 'disequilibrium', 'kram', 'komplikasi'],
    reply: `**Tatalaksana Hipotensi Intradialisis & Sindrom Disekuilibrium Dialisis (DDS):**

**A. Hipotensi Intradialisis (IDH):**
• *Penyebab:* Laju ultrafiltrasi (UFR) melebihi laju pengisian ulang plasma (*plasma refilling rate*).
• *Tindakan Keperawatan:*
  1. Segera baringkan pasien pada posisi datar (*flat*) atau posisi kaki ditinggikan (Trendelenburg).
  2. Matikan atau turunkan laju ultrafiltrasi (UF rate = 0).
  3. Berikan bolus salin normal (NaCl 0,9%) **100–200 mL** (dapat diulang bertahap hingga tensi stabil).
  4. Turunkan laju aliran darah (Qb) sementara bila tensi sangat rendah.

**B. Dialysis Disequilibrium Syndrome (DDS):**
• *Penyebab:* Penurunan kadar urea darah yang terlalu cepat menyebabkan perbedaan osmolaritas antara darah dan cairan serebrospinal, memicu edema serebri.
• *Pencegahan pada Pasien Baru (Inisiasi):* Gunakan waktu HD singkat (2 jam), Qb rendah (150–200 mL/menit), dan dialiser berukuran kecil (*low flux*).

📚 *Rujukan: Modul IPDI 2021 - Bab 3: Asuhan Keperawatan Intra HD (Hal. 61–68)*`
  },

  // 9. MASALAH JANGKA PANJANG (ANEMIA, ESA, CKD-MBD, IDWG)
  {
    keywords: ['anemia', 'esa', 'epo', 'hb', 'feritin', 'st', 'ckd-mbd', 'ca x p', 'kalsium', 'fosfor', 'idwg', 'bb kering'],
    reply: `**Asuhan Masalah Jangka Panjang Pasien Dialisis Kronis:**

1. **Target Anemia Renal & Terapi ESA:**
   - Target Hemoglobin (Hb): **10–12 g/dL** (tidak boleh > 13 g/dL karena risiko trombosis kardiovaskuler).
   - Syarat Mutlak Inisiasi ESA: Cadangan besi harus cukup (Saturasi Transferin **ST ≥ 20%** dan **Feritin Serum ≥ 200 ng/mL**).
   - Transfusi PRC dihindari kecuali Hb < 7 g/dL dengan gejala klinis tidak stabil.

2. **Keseimbangan Mineral & Tulang (CKD-MBD):**
   - **Produk Kalsium × Fosfor (Ca × P):** Wajib dipertahankan **< 55 mg²/dL²**.
   - Jika Ca × P > 55 mg²/dL², terjadi risiko fatal presipitasi kalsifikasi metastatik pada katup aorta dan arteri koroner. Pengikat fosfat (*phosphate binder*) diminum bersamaan dengan suapan makan.

3. **Interdialytic Weight Gain (IDWG):**
   - Target kenaikan berat badan antar-sesi dialisis adalah **< 3–5%** dari berat badan kering (*dry weight*), atau rata-rata 1,0–1,5 kg.

📚 *Rujukan: Modul IPDI 2021 - Bab 6: Masalah Jangka Panjang (Hal. 110–128)*`
  },

  // 10. ANATOMI GINJAL, AKI KDIGO & INDIKASI DARURAT AEIOUS
  {
    keywords: ['anatomi', 'ginjal', 'nefron', 'gfr', 'aki', 'kdigo', 'aeious', 'indikasi darurat', 'pgk'],
    reply: `**Ringkasan Anatomi Ginjal & Indikasi Darurat Terapi Pengganti Ginjal (TPG):**

• **Anatomi & Fisiologi:**
  - Tiap ginjal manusia memiliki sekitar 1–1,2 juta nefron (85% nefron kortikal, 15% nefron jukstamedular).
  - Laju Filtrasi Glomerulus (LFG/GFR) normal: **125 mL/menit** atau 180 liter/hari filtrat, dengan reabsorpsi tubulus > 99%.

• **Kriteria AKI (KDIGO):**
  - Kenaikan kreatinin serum **≥ 0,3 mg/dL** dalam 48 jam, atau kenaikan ≥ 1,5 kali baseline dalam 7 hari, atau produksi urin **< 0,5 mL/kgBB/jam** selama 6 jam berturut-turut.

• **Indikasi Kedaruratan Hemodialisis (Mnemonic AEIOUS):**
  - **A (Acidosis):** Asidosis metabolik berat refrakter (pH < 7,15 – 7,20).
  - **E (Electrolytes):** Hiperkalemia refrakter (> 6,5 mEq/L) dengan gambaran EKG T-tall.
  - **I (Intoxication):** Keracunan toksin dialisabel (metanol, etilen glikol, litium, salisilat).
  - **O (Overload):** Kelebihan volume cairan refrakter diuretika (*edema paru akut*).
  - **U (Uremia):** Gejala uremia berat (ensefalopati uremikum, perikarditis uremikum, pleuritis).
  - **S (Sepsis/Severe):** Kegagalan multiorgan terkait sindrom sepsis.

📚 *Rujukan: Modul IPDI 2021 - Bab 1: Terapi Pengganti Ginjal & Anatomi (Hal. 1–25)*`
  }
];

export const getSmartIpdiAnswer = (userMessage: string): string => {
  const query = userMessage.toLowerCase().trim();

  // Filter out non-medical topics explicitly
  const isNonMedical = /resep|masak|bakar|goreng|politik|pemilu|game|film|musik|otomotif|motor|mobil|cuaca|koding|javascript|python|hp|pacar|baju/.test(query);
  if (isNonMedical) {
    return `Mohon maaf Ners, sebagai Asisten Khusus Modul IPDI, saya hanya dapat menjawab pertanyaan seputar materi hemodialisis, CAPD, akses vaskuler, komplikasi dialisis, dan keselamatan pasien sesuai Modul Resertifikasi Perawat Dialisis Indonesia PP IPDI 2021.

Silakan ajukan pertanyaan seputar materi dialisis atau pilih salah satu topik modul yang tersedia pada tombol saran di bawah.`;
  }

  // Find best match in knowledge base
  for (const item of KNOWLEDGE_RULES) {
    if (item.keywords.some((k) => query.includes(k))) {
      return item.reply;
    }
  }

  // Fallback response grounded in the module
  return `Sesuai panduan **Modul Resertifikasi Perawat Dialisis Indonesia (PP IPDI 2021)**, seluruh asuhan keperawatan dialisis berfokus pada:
1. Keselamatan pasien (*patient safety*) dan pencegahan komplikasi teknis & non-teknis.
2. Penilaian kelayakan akses vaskuler (AVF Rule of Six & aseptik kateter CVC double lumen).
3. Pencapaian target adekuasi (spKt/V ≥ 1,4 / URR ≥ 70% KDOQI; Kt/V = 1,8 PERNEFRI).
4. Penanganan dialisis khusus (SLED/PIRRT di ICU), CAPD steril, dan baku mutu air hemodialisa (AAMI).

Silakan ajukan pertanyaan spesifik seperti:
• *"Apa saja kriteria Rule of Six pada AV-Fistula?"*
• *"Bagaimana posisi Durant saat terjadi emboli udara?"*
• *"Kapan dialiser proses ulang harus diafkir?"*
• *"Berapa standar AAMI untuk bakteri dan endotoksin air dialisis?"*

📚 *Rujukan: Modul Resertifikasi Perawat Dialisis Indonesia (PP IPDI 2021)*`;
};
