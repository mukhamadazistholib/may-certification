import { QuizQuestion } from '../types/dialysis';

/**
 * Smart Clinical Case Vignette Generator for IPDI Dialysis Modules
 * Provides dynamic, randomized patient scenarios with rotating parameters,
 * distractors, and detailed clinical rationales grounded in the IPDI 2021 module.
 */

interface CaseTemplate {
  chapterId: number;
  generate: (salt: number) => QuizQuestion;
}

const TEMPLATES: CaseTemplate[] = [
  // BAB 1
  {
    chapterId: 1,
    generate: (s) => {
      const kreatininPre = (1.2 + (s % 5) * 0.1).toFixed(1);
      const kreatininPost = (Number(kreatininPre) + 0.4 + (s % 3) * 0.1).toFixed(1);
      return {
        id: `dyn-q1-${s}`,
        chapterId: 1,
        question: `Seorang pasien laki-laki berusia ${45 + (s % 25)} tahun dirawat di ICU pascaoperasi abdomen. Hasil laboratorium menunjukkan kadar kreatinin serum meningkat dari ${kreatininPre} mg/dL menjadi ${kreatininPost} mg/dL dalam 36 jam, dengan produksi urin 0,3 mL/kgBB/jam selama 8 jam terakhir. Berdasarkan kriteria KDIGO, pasien tersebut mengalami:`,
        options: [
          'Acute Kidney Injury (AKI) karena memenuhi kriteria kenaikan kreatinin ≥ 0,3 mg/dL dalam 48 jam dan oliguria',
          'Penyakit Ginjal Kronik stadium 4',
          'Kondisi dehidrasi biasa tanpa gangguan fungsi ginjal',
          'End-Stage Renal Disease (ESRD) yang membutuhkan hemodialisis seumur hidup'
        ],
        correctIndex: 0,
        explanation: 'Menurut kriteria KDIGO pada Modul IPDI Hal. 10, AKI ditegakkan jika terjadi kenaikan kreatinin serum ≥ 0,3 mg/dL dalam 48 jam atau produksi urin < 0,5 mL/kg/jam selama > 6 jam.',
        referencePage: 'Modul Hal. 10 & 13'
      };
    }
  },
  {
    chapterId: 1,
    generate: (s) => {
      const kalium = (6.6 + (s % 4) * 0.2).toFixed(1);
      const ph = (7.15 - (s % 3) * 0.05).toFixed(2);
      return {
        id: `dyn-q1-aeious-${s}`,
        chapterId: 1,
        question: `Pasien rujukan datang dengan keluhan sesak napas berat, edema anasarka, analisis gas darah menunjukkan pH ${ph} dan kadar kalium serum ${kalium} mEq/L dengan gambaran EKG T-tall lancip. Dokter menginstruksikan hemodialisis cito. Alasan mutlak inisiasi darurat ini mengacu pada kriteria:`,
        options: [
          'Indikasi darurat AEIOUS: Asidosis refrakter (pH < 7,20), Hiperkalemia fatal (> 6,5 mEq/L), dan Volume Overload',
          'Koreksi kadar hemoglobin',
          'Pemberian nutrisi parenteral',
          'Penurunan berat badan interdialitik'
        ],
        correctIndex: 0,
        explanation: 'Indikasi darurat hemodialisis disingkat AEIOUS: Asidosis berat (pH < 7,25), Elektrolit (Hiperkalemia > 6,5 mEq/L dengan perubahan EKG), Intoksikasi, Overload cairan (edema paru), Uremia berat, dan Sepsis.',
        referencePage: 'Modul Hal. 12 & 15'
      };
    }
  },

  // BAB 2
  {
    chapterId: 2,
    generate: (s) => {
      const minggu = 6 + (s % 3);
      const diameter = 6 + (s % 2);
      return {
        id: `dyn-q2-${s}`,
        chapterId: 2,
        question: `Seorang perawat unit dialisis mengevaluasi AV-Fistula baru pada lengan kiri pasien berumur ${50 + (s % 15)} tahun pascaoperasi minggu ke-${minggu}. Hasil palpasi teraba thrill kuat, terdengar bruit jelas, diameter lumen vena ${diameter} mm, kedalaman 4 mm dari permukaan kulit, dan aliran darah USG Doppler 650 mL/menit. Tindakan keperawatan yang tepat adalah:`,
        options: [
          'AV-Fistula telah memenuhi standar Rule of Six KDOQI dan aman untuk dikanulasi pertama kali',
          'Menunda kanulasi hingga 6 bulan ke depan',
          'Melakukan kompres es batu pada luka operasi',
          'Menusuk fistula dengan jarum ukuran 14G langsung pada satu titik yang sama'
        ],
        correctIndex: 0,
        explanation: 'Fistula telah memenuhi Rule of Six: usia minimal 6 minggu, diameter lumen ≥ 6 mm, kedalaman < 6 mm dari kulit, laju aliran > 600 mL/menit, dan panjang segmen lurus 6 inci.',
        referencePage: 'Modul Hal. 42 & 46'
      };
    }
  },
  {
    chapterId: 2,
    generate: (s) => {
      return {
        id: `dyn-q2-cvc-${s}`,
        chapterId: 2,
        question: `Sebelum menyambungkan blood line mesin hemodialisis ke kateter CVC Double Lumen temporer yang terpasang di vena jugularis interna, langkah aseptik pertama yang WAJIB dilakukan perawat terhadap sisa heparin lock adalah:`,
        options: [
          'Mengaspirasi dan membuang 3 sampai 5 mL darah beserta sisa heparin lock di kedua lumen, jangan didorong masuk ke pasien',
          'Mendorong seluruh isi heparin lock menggunakan spuit 20 mL NaCl',
          'Menyuntikkan antibiotik gentamisin langsung tanpa aspirasi',
          'Membuka klem kateter tanpa memakai sarung tangan steril'
        ],
        correctIndex: 0,
        explanation: 'Heparin lock di dalam lumen CVC berkonsentrasi tinggi. Sebelum inisiasi HD, cairan tersebut harus diaspirasi 3-5 mL dari masing-masing lumen lalu dibuang untuk mencegah efek antikoagulasi sistemik mendadak.',
        referencePage: 'Modul Hal. 48 & 51'
      };
    }
  },

  // BAB 3
  {
    chapterId: 3,
    generate: (s) => {
      const sistolAwal = 140 + (s % 20);
      const sistolDrop = sistolAwal - 45;
      return {
        id: `dyn-q3-${s}`,
        chapterId: 3,
        question: `Pada jam ke-3 hemodialisis, tensi pasien turun drastis dari ${sistolAwal}/85 mmHg menjadi ${sistolDrop}/55 mmHg, pasien tampak menguap berulang kali, berkeringat dingin, dan mengeluh pusing berputar. Tindakan prioritas pertama perawat adalah:`,
        options: [
          'Posisikan pasien telentang mendatar/kaki diangkat, matikan laju ultrafiltrasi (UFR), dan berikan bolus normal salin 100 - 200 mL',
          'Menaikkan laju penarikan cairan (UFR) agar sesi cepat selesai',
          'Memberikan tablet kaptopril sublingual',
          'Mematikan mesin dan mencabut jarum segera'
        ],
        correctIndex: 0,
        explanation: 'Tata laksana awal Hipotensi Intradialisis: letakkan pasien posisi datar/Trendelenburg, hentikan/matikan ultrafiltrasi, berikan bolus salin normal 100-200 mL, dan pantau respon tanda vital.',
        referencePage: 'Modul Hal. 61 & 66'
      };
    }
  },
  {
    chapterId: 3,
    generate: (s) => {
      return {
        id: `dyn-q3-durant-${s}`,
        chapterId: 3,
        question: `Perawat mendeteksi gelembung udara dalam jumlah besar melewati venous line dan masuk ke sirkulasi pasien akibat selang infus yang kosong. Pasien tiba-tiba batuk dan sesak napas. Posisi darurat yang harus segera diberikan kepada pasien adalah:`,
        options: [
          'Posisi Durant: Miring ke sisi kiri tubuh dengan kepala lebih rendah dari badan (Trendelenburg miring kiri)',
          'Posisi Fowler tegak 90 derajat',
          'Posisi tengkurap menghadap kasur',
          'Posisi miring ke kanan dengan kepala ditinggikan'
        ],
        correctIndex: 0,
        explanation: 'Posisi Durant (miring ke sisi kiri dengan kepala rendah/Trendelenburg) bertujuan memerangkap gelembung udara di apeks ventrikel kanan dan mencegah penyumbatan arteri pulmonalis (air lock).',
        referencePage: 'Modul Hal. 71'
      };
    }
  },

  // BAB 4
  {
    chapterId: 4,
    generate: (s) => {
      const preU = 180 + (s % 30);
      const postU = Math.round(preU * 0.28);
      const urr = Math.round(((preU - postU) / preU) * 100);
      return {
        id: `dyn-q4-${s}`,
        chapterId: 4,
        question: `Seorang pasien dengan jadwal HD reguler 3x seminggu memiliki kadar Ureum Pre-HD ${preU} mg/dL dan Ureum Post-HD ${postU} mg/dL. Berdasarkan hasil tersebut, persentase URR pasien adalah ${urr}%. Menurut standar KDOQI, capaian adekuasi ini:`,
        options: [
          `Telah memenuhi standar adekuasi KDOQI (target URR ≥ 70% atau Kt/V ≥ 1,4)`,
          'Belum adekuat dan dosis dialisis harus dinaikkan',
          'Menunjukkan pasien mengalami intoksikasi urea',
          'Tidak valid karena ureum pre-HD terlalu rendah'
        ],
        correctIndex: 0,
        explanation: `URR = [(${preU} - ${postU}) / ${preU}] × 100% = ${urr}%. Karena URR ≥ 70%, pasien telah mencapai target kecukupan dialisis KDOQI untuk jadwal 3 kali per minggu.`,
        referencePage: 'Modul Hal. 76 & 79'
      };
    }
  },

  // BAB 5
  {
    chapterId: 5,
    generate: (s) => {
      const qb = 100 + (s % 5) * 10;
      const qd = 200 + (s % 5) * 20;
      return {
        id: `dyn-q5-${s}`,
        chapterId: 5,
        question: `Pasien di ruang ICU dengan syok kardiogenik dan gagal ginjal akut direncanakan menjalani dialisis hibrid SLED selama 8 jam. Pengaturan parameter mesin yang paling tepat untuk menjaga stabilitas hemodinamik pasien adalah:`,
        options: [
          `Qb lambat ${qb} mL/menit, Qd ${qd} mL/menit, suhu dialisat 35 - 36 °C, dan profil natrium`,
          'Qb 350 mL/menit, Qd 800 mL/menit, dan suhu dialisat 39 °C',
          'Tanpa cairan dialisat sama sekali',
          'Durasi dialisis dipersingkat menjadi 1 jam dengan UF 3000 mL'
        ],
        correctIndex: 0,
        explanation: 'Parameter teknis SLED: Qb diperlambat 100-150 mL/menit, Qd 200-300 mL/menit, suhu dingin 35-36°C untuk vasokonstriksi fisiologis, dan durasi diperpanjang 6-12 jam.',
        referencePage: 'Modul Hal. 85 & 88'
      };
    }
  },

  // BAB 6
  {
    chapterId: 6,
    generate: (s) => {
      const ca = (9.8 + (s % 3) * 0.2).toFixed(1);
      const p = (6.2 + (s % 3) * 0.3).toFixed(1);
      const cap = (Number(ca) * Number(p)).toFixed(1);
      return {
        id: `dyn-q6-${s}`,
        chapterId: 6,
        question: `Pasien hemodialisis kronis memiliki hasil laboratorium: Kalsium serum ${ca} mg/dL dan Fosfor serum ${p} mg/dL, sehingga produk Ca × P mencapai ${cap} mg²/dL². Edukasi dan tindakan klinis yang paling mendesak adalah:`,
        options: [
          `Waspadai kalsifikasi metastatik vaskuler aorta/jantung karena produk Ca × P > 55, segera evaluasi konsumsi pengikat fosfat saat makan dan batasi diet tinggi fosfor`,
          'Menganjurkan pasien minum susu sapi 2 liter per hari',
          'Menaikkan asupan suplemen vitamin D aktif dosis tinggi',
          'Tidak perlu tindakan karena nilai Ca × P masih normal'
        ],
        correctIndex: 0,
        explanation: 'Produk Ca × P > 55 mg²/dL² memicu presipitasi garam kalsium fosfat pada dinding pembuluh darah (kalsifikasi vaskuler) dan jaringan lunak miokardium yang sangat mematikan.',
        referencePage: 'Modul Hal. 120 & 124'
      };
    }
  },

  // BAB 7
  {
    chapterId: 7,
    generate: (s) => {
      const leuko = 180 + (s % 5) * 50;
      return {
        id: `dyn-q7-${s}`,
        chapterId: 7,
        question: `Seorang pasien CAPD datang dengan keluhan cairan dialisat buangan keruh, perut terasa nyeri tekan, dan hasil laboratorium cairan dialisat menunjukkan leukosit ${leuko}/µL dengan neutrofil 75%. Berdasarkan panduan IPDI, kondisi ini didiagnosis sebagai:`,
        options: [
          'Peritonitis CAPD karena memenuhi kriteria cairan keruh, nyeri perut, dan hitung sel > 100/µL dengan neutrofil > 50%',
          'Apendisitis akut murni',
          'Malnutrisi protein',
          'Reaksi alergi terhadap bahan plastik kantong dialisat'
        ],
        correctIndex: 0,
        explanation: 'Diagnosis peritonitis ditegakkan jika terdapat minimal 2 dari 3 tanda: cairan dialisat keruh, nyeri perut/rangsang peritoneum, dan hitung sel leukosit > 100/µL dengan dominasi PMN > 50%.',
        referencePage: 'Modul Hal. 153 & 157'
      };
    }
  },

  // BAB 8
  {
    chapterId: 8,
    generate: (s) => {
      const initialVol = 100;
      const measuredVol = 74 - (s % 4);
      return {
        id: `dyn-q8-${s}`,
        chapterId: 8,
        question: `Pada proses reprocessing dialiser ke-6, hasil uji Total Cell Volume (TCV) menunjukkan volume kapiler terukur ${measuredVol} mL dari volume awal dialiser baru ${initialVol} mL. Rekomendasi tindakan perawat penanggung jawab adalah:`,
        options: [
          `Dialiser TIDAK LAYAK PAKAI dan WAJIB DIAFKIR (dibuang) karena nilai TCV sisa < 80% dari volume awal baru`,
          'Dialiser tetap dapat digunakan hingga 10 kali reuse',
          'Merendam dialiser dengan air panas mendidih selama 24 jam',
          'Mengganti tutup header dialiser saja'
        ],
        correctIndex: 0,
        explanation: 'Menurut standar AAMI dan KDOQI, batas minimal kelayakan dialiser reuse adalah TCV minimal 80% dari priming volume awal. Jika penurunan TCV > 20%, dialiser harus dibuang.',
        referencePage: 'Modul Hal. 172 & 176'
      };
    }
  },

  // BAB 9
  {
    chapterId: 9,
    generate: (s) => {
      return {
        id: `dyn-q9-${s}`,
        chapterId: 9,
        question: `Perawat unit dialisis melakukan pemeriksaan residu klorin dan kloramin pada sampel air setelah melewati tangki karbon aktif. Standar batas kadar klorin bebas/kloramin total yang diizinkan menurut AAMI adalah:`,
        options: [
          'Kurang dari 0,1 mg/L (ppm) untuk klorin total / 0,5 mg/L untuk klorin bebas',
          'Boleh sampai 5,0 mg/L seperti air kolam renang',
          'Tidak perlu diuji jika air tampak jernih dan tidak berbau',
          'Minimal 10 mg/L untuk membunuh bakteri di dialiser'
        ],
        correctIndex: 0,
        explanation: 'Kadar klorin total air produk hemodialisis harus < 0,1 mg/L (0,1 ppm). Bila klorin/kloramin lolos ke sirkuit darah pasien, akan terjadi hemolisis akut masif dan methemoglobinemia fatal.',
        referencePage: 'Modul Hal. 184 & 188'
      };
    }
  }
];

export const generateSmartClinicalQuestions = (
  chapterId?: number,
  count = 5
): QuizQuestion[] => {
  const salt = Date.now() % 10000;
  let pool = TEMPLATES;
  if (chapterId && chapterId >= 1 && chapterId <= 9) {
    pool = TEMPLATES.filter((t) => t.chapterId === Number(chapterId));
    if (pool.length === 0) pool = TEMPLATES;
  }

  // Shuffle and generate
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const results: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const template = shuffled[i % shuffled.length];
    results.push(template.generate(salt + i * 17));
  }

  return results;
};
