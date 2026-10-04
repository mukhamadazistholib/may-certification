import { Chapter } from '../types/dialysis';

export const chapters1to3: Chapter[] = [
  {
    id: 1,
    romanNumeral: 'MATERI I',
    title: 'Terapi Pengganti Ginjal (TPG)',
    subtitle: 'Anatomi Fisiologi Ginjal, GGA (AKI), PGK (CKD) & Prinsip Hemodialisa',
    iconName: 'Activity',
    badge: 'Dasar Dialisis',
    estimatedMinutes: 25,
    pageRange: 'Hal. 1 - 28',
    overview: 'Membahas dasar pemikiran terapi pengganti ginjal (TPG), anatomi nefron, fisiologi ekskresi dan non-ekskresi ginjal, kriteria AKI menurut ADQI (RIFLE) dan KDIGO, stadium PGK, serta prinsip fisika hemodialisis: difusi, ultrafiltrasi, dan konveksi.',
    voiceSummary: 'Poin penting materi satu terapi pengganti ginjal yang wajib diingat. Pertama, terapi dialisis hanya menggantikan fungsi ekskresi cairan, racun nitrogen, dan elektrolit, serta tidak dapat menggantikan fungsi endokrin ginjal seperti produksi eritropoietin, renin, dan kalsitriol. Kedua, ginjal menerima 20 sampai 25 persen curah jantung melalui arteri renalis. Laju filtrasi glomerulus normal adalah 125 mililiter per menit. Ketiga, nefron kortikal berjumlah 85 persen dengan lengkung Henle pendek, dan nefron jukstamedular 15 persen dengan lengkung Henle panjang untuk pemekatan urin. Keempat, kriteria gagal ginjal akut KDIGO meliputi kenaikan kreatinin serum 0,3 miligram per desiliter dalam 48 jam, atau kenaikan 1,5 kali baseline dalam satu minggu, atau produksi urin kurang dari 0,5 mililiter per kilogram berat badan per jam selama lebih dari 6 jam. Kelima, indikasi darurat dialisis pada AKI disingkat AEIOUS: asidosis pH kurang dari 7,25, hiperkalemia lebih dari 6,5 miliekuivalen per liter, intoksikasi racun, overload edema paru, uremia ureum lebih dari 180 sampai 210 miligram per desiliter, dan sepsis. Keenam, hemodialisis bekerja melalui tiga prinsip: difusi zat terlarut menuruni gradien konsentrasi, ultrafiltrasi air akibat tekanan hidrostatik, dan konveksi atau solvent drag.',
    keyTakeaways: [
      {
        id: 't1-1',
        category: 'Konsep Dasar',
        title: 'Batasan Fungsi TPG Hemodialisis',
        summary: 'TPG dialisis dan hemofiltrasi HANYA menggantikan fungsi ekskresi (pembuangan sisa metabolit urea, kreatinin, kelebihan cairan dan elektrolit). Fungsi non-ekskresi/endokrin (renin, eritropoietin, aktivasi vit D3, degradasi insulin) TIDAK DAPAT digantikan oleh dialisis.',
        badge: 'Prinsip TPG'
      },
      {
        id: 't1-2',
        category: 'Nilai Kritis',
        title: 'Aliran Darah Ginjal & Laju Filtrasi (GFR)',
        summary: 'Ginjal menerima 20-25% Cardiac Output melalui arteri renalis. Laju filtrasi glomerulus normal adalah 125 ml/menit. Lebih dari 99% plasma yang difiltrasi direabsorpsi kembali ke sirkulasi tubuh.',
        badge: 'Fisiologi'
      },
      {
        id: 't1-3',
        category: 'Safety Alert',
        title: 'Indikasi Darurat Dialisis (Mnemonic AEIOUS)',
        summary: 'A: Acidosis berat (pH < 7.25), E: Electrolyte imbalance (Hiperkalemia > 6.5 mEq/L refrakter), I: Intoxications (litium, etilen glikol, dll), O: Overload volume (edema paru akut refrakter), U: Uremia berat (ureum > 180-210 mg/dL, perikarditis uremik, ensefalopati), S: Sepsis berat.',
        badge: 'Emergency HD'
      },
      {
        id: 't1-4',
        category: 'Prosedur & Rasional',
        title: '3 Prinsip Utama Perpindahan Hemodialisis',
        summary: '1. Difusi: perpindahan solut karena gradien konsentrasi (efektif molekul kecil seperti urea). 2. Ultrafiltrasi: perpindahan air karena perbedaan tekanan hidrostatik (Transmembrane Pressure/TMP). 3. Konveksi: gerakan solut terseret aliran air melintasi pori membran (solvent drag).',
        badge: 'Fisika Dialisis'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Estimasi Klirens Kreatinin (Cockcroft-Gault)',
        formula: 'Ccr = [((140 - Umur) × Berat Badan (kg)) / (72 × SCr)] × (0.85 jika wanita)',
        description: 'Menilai estimasi klirens kreatinin ginjal dari kreatinin serum dan berat badan aktual pasien.',
        example: 'Pria 50 th, BB 60 kg, SCr 2.0 mg/dL -> [(140-50)×60]/(72×2) = 5400/144 = 37.5 ml/menit.',
        clinicalTarget: 'Stadium 5 PGK jika Ccr / eGFR < 15 ml/menit/1.73m²'
      }
    ],
    subtopics: [
      {
        id: 's1-1',
        title: '1. Anatomi dan Fisiologi Ginjal',
        content: [
          'Ginjal merupakan sepasang organ berbentuk kacang yang terletak di retroperitoneal rongga abdomen.',
          'Ginjal kiri terletak sedikit lebih tinggi dibanding ginjal kanan karena keberadaan organ hepar di sisi kanan.',
          'Berat setiap ginjal rata-rata ± 150 gram dengan panjang 10-12 cm. Menerima 20-25% curah jantung (Cardiac Output) via arteri renalis dari aorta abdominalis.',
          'Setiap ginjal tersusun dari 400.000 hingga 1.200.000 unit fungsional yang disebut nefron.',
          'Tipe nefron: 85% Cortical nephrons dengan lengkung Henle pendek di bagian luar korteks, dan 15% Juxtamedullary nephrons dengan lengkung Henle panjang menembus jauh ke medula yang berperan vital memekatkan urin.',
          'Proses pembentukan urin melewati 3 tahap: Filtrasi di glomerulus (GFR normal ~125 ml/menit), Reabsorpsi selektif di tubulus kontortus proksimal dan lengkung Henle (>99% filtrat diserap kembali), dan Sekresi tubuler di tubulus kontortus distal dan koligens.'
        ],
        keyPoints: [
          'Pars desenden lengkung Henle sangat permeabel air tapi kedap ion (osmolaritas naik hingga 1200 mOsm/L).',
          'Pars asenden lengkung Henle kedap air namun aktif memompa ion Na/Cl (osmolaritas turun hingga 100 mOsm/L).',
          'Fungsi endokrin ginjal: sekresi renin (regulasi tensi), eritropoietin (eritropoiesis sumsum tulang), dan aktivasi 1,25-dihidroksikolekalsiferol (vitamin D aktif).'
        ]
      },
      {
        id: 's1-2',
        title: '2. Gangguan Ginjal Akut (AKI) & Penyakit Ginjal Kronik (PGK)',
        content: [
          'Acute Kidney Injury (AKI) didefinisikan sebagai penurunan mendadak fungsi filtrasi ginjal dalam jam hingga hari.',
          'Kriteria diagnosis AKI: kenaikan serum kreatinin ≥ 0.3 mg/dL dalam 48 jam, ATAU kenaikan kreatinin ≥ 1.5 kali lipat baseline dalam 7 hari, ATAU produksi urin < 0.5 mL/kgBB/jam selama > 6 jam berturut-turut.',
          'Etiologi AKI terbagi 3: Pre-renal (hipoperfusi: dehidrasi berat, syok kardiogenik, perdarahan), Intra-renal (kerusakan parenkim: glomerulonefritis akut, nekrosis tubular akut, nefrotoksik), Post-renal (obstruksi: hipertrofi prostat, batu saluran kemih bilateral).',
          'Penyakit Ginjal Kronik (PGK) didefinisikan K/DOQI sebagai kerusakan struktur atau fungsi ginjal ≥ 3 bulan.',
          'Stadium PGK menurut KDIGO: Stadium 1 (eGFR ≥90 dengan bukti kerusakan), Stadium 2 (eGFR 60-89), Stadium 3A (45-59), Stadium 3B (30-44), Stadium 4 (15-29), Stadium 5 (<15 ml/menit/1.73m² atau dialysis/transplantasi).',
          'Etiologi PGK tersering di Indonesia (PERNEFRI 2012): Penyakit ginjal hipertensi (35%), Nefropati diabetika (26%), Glomerulopati primer (12%), Nefropati obstruksi (8%), Pielonefritis kronik (7%).'
        ]
      },
      {
        id: 's1-3',
        title: '3. Konsep dan Prinsip Hemodialisa',
        content: [
          'Hemodialisa adalah terapi pengganti ginjal ekstrakorporeal untuk mengeliminasi sisa metabolisme protein dan mengoreksi keseimbangan air dan elektrolit melalui membran semipermeabel.',
          'Mekanisme Difusi: pergerakan partikel solut secara spontan dari konsentrasi tinggi (darah) ke konsentrasi rendah (dialisat) menembus membran.',
          'Faktor penentu difusi: perbedaan gradien konsentrasi, luas permukaan membran, porositas dan ketebalan membran, berat molekul solut, dan laju aliran countercurrent (Qb dan Qd berlawanan arah).',
          'Mekanisme Ultrafiltrasi: pergerakan air melalui membran semipermeabel akibat gradien tekanan hidrostatik (Transmembrane Pressure / TMP) antara kompartemen darah dan dialisat.',
          'Mekanisme Konveksi: solut terlarut terseret bersama aliran air yang berpindah akibat tekanan hidrostatik (solvent drag). Sangat dominan pada teknik hemofiltrasi dan dialiser High Flux (Kuf > 15 ml/jam/mmHg).'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q1-1',
        chapterId: 1,
        question: 'Manakah fungsi ginjal yang TIDAK DAPAT digantikan oleh terapi hemodialisis?',
        options: [
          'Pembuangan racun urea dan kreatinin',
          'Koreksi gangguan keseimbangan elektrolit kalium dan natrium',
          'Sekresi hormon eritropoietin dan aktivasi vitamin D',
          'Pembuangan kelebihan cairan intravaskuler melalui ultrafiltrasi'
        ],
        correctIndex: 2,
        explanation: 'Menurut modul (Ronco & Sukandar), hemodialisis hanya menggantikan fungsi ekskresi (cairan, elektrolit, toksin nitrogen). Fungsi non-ekskresi/endokrin seperti produksi eritropoietin, renin, dan aktivasi kalsitriol tidak dapat digantikan.',
        referencePage: 'Modul Hal. 1 & 21'
      },
      {
        id: 'q1-2',
        chapterId: 1,
        question: 'Berdasarkan kriteria KDIGO, pasien dikatakan mengalami AKI (Acute Kidney Injury) apabila memenuhi salah satu kriteria berikut:',
        options: [
          'Penurunan berat badan 5% dalam 1 bulan',
          'Kenaikan kreatinin serum ≥ 0,3 mg/dL dalam waktu 48 jam',
          'Urin output < 1,5 ml/kg/jam selama 2 jam',
          'Hemoglobin turun di bawah 10 g/dL'
        ],
        correctIndex: 1,
        explanation: 'Kriteria AKI meliputi kenaikan kreatinin serum ≥ 0,3 mg/dL dalam 48 jam, atau kenaikan ≥ 1,5 kali nilai referensi dalam 7 hari, atau produksi urin < 0,5 ml/kg/jam selama > 6 jam.',
        referencePage: 'Modul Hal. 10'
      },
      {
        id: 'q1-3',
        chapterId: 1,
        question: 'Menurut data PERNEFRI, penyebab terbanyak Penyakit Ginjal Kronik (PGK) di Indonesia adalah:',
        options: [
          'Penyakit ginjal polikistik',
          'Pielonefritis kronik',
          'Penyakit ginjal hipertensi (35%)',
          'Nefropati asam urat'
        ],
        correctIndex: 2,
        explanation: 'Etiologi GGK menurut PERNEFRI 2012: Penyakit ginjal hipertensi (35%), Nefropati diabetika (26%), Glomerulopati primer (12%), Nefropati obstruksi (8%).',
        referencePage: 'Modul Hal. 14'
      },
      {
        id: 'q1-4',
        chapterId: 1,
        question: 'Perpindahan zat terlarut (solute) yang ikut terbawa oleh aliran cairan yang melintasi membran semipermeabel karena gradien tekanan hidrostatik disebut:',
        options: [
          'Difusi murni',
          'Konveksi (Solvent Drag)',
          'Osmosis balik',
          'Adsorpsi selektif'
        ],
        correctIndex: 1,
        explanation: 'Konveksi adalah gerakan solut akibat perbedaan tekanan hidrostatik melalui membran semipermeabel, sering disebut dengan fenomena "solvent drag".',
        referencePage: 'Modul Hal. 23'
      },
      {
        id: 'q1-5',
        chapterId: 1,
        question: 'Dialiser dikategorikan sebagai High-Flux apabila memiliki koefisien ultrafiltrasi (Kuf):',
        options: [
          'Kuf < 5 ml/jam/mmHg',
          'Kuf 5 - 10 ml/jam/mmHg',
          'Kuf > 15 ml/jam/mmHg atau klirens β2-mikroglobulin > 20 ml/menit',
          'Kuf tepat 10 ml/jam/mmHg'
        ],
        correctIndex: 2,
        explanation: 'High-Flux dialyzer memiliki Kuf > 15 ml/jam/mmHg atau klirens beta-2 mikroglobulin > 20 ml/menit, sehingga mampu membuang molekul sedang-besar.',
        referencePage: 'Modul Hal. 24 & 31'
      },
      {
        id: 'q1-6',
        chapterId: 1,
        question: 'Berapakah persentase curah jantung (Cardiac Output) yang disalurkan ke ginjal dalam kondisi normal melalui arteri renalis?',
        options: [
          '5 - 10%',
          '10 - 15%',
          '20 - 25%',
          '40 - 50%'
        ],
        correctIndex: 2,
        explanation: 'Ginjal menerima 20% sampai 25% dari Cardiac Output (curah jantung) melalui arteri renalis yang berasal langsung dari aorta abdominalis.',
        referencePage: 'Modul Hal. 2 & 7'
      },
      {
        id: 'q1-7',
        chapterId: 1,
        question: 'Bagian manakah dari tubulus nefron yang sangat permeabel terhadap air namun kedap ion sehingga meningkatkan osmolaritas cairan hingga 1200 mOsm/L?',
        options: [
          'Tubulus kontortus proksimal',
          'Lengkung Henle pars desenden (bagian menurun)',
          'Lengkung Henle pars asenden (bagian menaik)',
          'Tubulus kontortus distal'
        ],
        correctIndex: 1,
        explanation: 'Bagian menurun (pars desenden) dari lengkung Henle sangat permeabel terhadap air tapi sangat kedap ion, menyebabkan sejumlah besar air diserap kembali dan meningkatkan osmolaritas hingga 1200 mOsm/L.',
        referencePage: 'Modul Hal. 4'
      },
      {
        id: 'q1-8',
        chapterId: 1,
        question: 'Indikasi darurat hemodialisis pada pasien Acute Kidney Injury (AKI) disingkat AEIOUS. Huruf "O" dalam singkatan tersebut merujuk pada:',
        options: [
          'Oliguria tanpa gejala sesak',
          'Overload volume cairan dengan edema paru akut refrakter',
          'Osteoporosis berat',
          'Osmolaritas plasma tinggi tanpa edema'
        ],
        correctIndex: 1,
        explanation: 'Huruf "O" merujuk pada Volume Overload (kelebihan volume cairan tubuh) yang memicu edema paru berat (pulmonary oedema) dan tidak responsif terhadap diuretik.',
        referencePage: 'Modul Hal. 12'
      }
    ]
  },
  {
    id: 2,
    romanNumeral: 'MATERI II',
    title: 'Asuhan Keperawatan Pre HD',
    subtitle: 'Alat & Bahan HD, Dialiser, Dialisat, serta Akses Vaskuler AV-Fistula & CVC HD',
    iconName: 'ShieldAlert',
    badge: 'Klinis & Akses',
    estimatedMinutes: 30,
    pageRange: 'Hal. 29 - 52',
    overview: 'Membahas persiapan alat dan bahan hemodialisa (jenis dialiser, membran sintetis vs selulosa, blood line, komposisi dialisat bikarbonat vs asetat) serta manajemen akses vaskuler permanen (AVF / Brescia-Cimino, Rule of 6, kanulasi Rope ladder vs Buttonhole) dan akses temporer (CVC double lumen, heparin lock).',
    voiceSummary: 'Poin penting asuhan keperawatan pre hemodialisis yang harus diingat. Pertama, dialiser hollow fiber dialiri darah dan dialisat secara counter-current dengan volume priming sirkuit total 160 sampai 270 mililiter. Suhu dialisat diatur 33 sampai 39 derajat Celsius dengan konduktivitas normal 12 sampai 16 miliSiemens per sentimeter. Kedua, kriteria pematangan AV-Fistula mengikuti Rule of Six: waktu 6 minggu pascaoperasi, diameter vena minimal 6 milimeter, kedalaman kurang dari 6 milimeter dari kulit, aliran darah minimal 600 mililiter per menit, dan panjang akses lurus 6 inci dari anastomosis. Ketiga, sudut penusukan jarum AV-Fistula adalah 20 sampai 25 derajat, dengan jarak antar jarum arteri dan vena minimal 5 sampai 7 sentimeter, dan 3 sentimeter di atas garis anastomosis. Gunakan teknik kanulasi Rope Ladder dengan memindahkan titik tusuk minimal 3 milimeter dan dilarang menusuk titik yang sama dalam 2 minggu. Keempat, pada kateter double lumen, sebelum dialisis dimulai, sisa heparin lock di kedua lumen wajib diaspirasi sebanyak 5 mililiter lalu dibuang, jangan didorong balik.',
    keyTakeaways: [
      {
        id: 't2-1',
        category: 'Nilai Kritis',
        title: 'Kriteria Maturasi AV-Fistula "Rule of 6 (Six)"',
        summary: 'Fistula dianggap siap pakai (mature) jika memenuhi: 1. Waktu pematangan 6 minggu pascaoperasi; 2. Diameter lumen vena minimal 6 mm; 3. Kedalaman vena < 6 mm dari permukaan kulit; 4. Blood flow sekitar 600 ml/menit; 5. Area akses lurus sepanjang minimal 6 inci (15 cm).',
        badge: 'Rule of 6'
      },
      {
        id: 't2-2',
        category: 'Tindakan Keperawatan',
        title: 'Teknik Kanulasi & Rotasi Penusukan AVF',
        summary: 'Sudut jarum penusukan AVF adalah 20-25 derajat, sedangkan graft (AVG) 45 derajat. Jarak jarum arteri dan vena minimal 5-7 cm, dan minimal 3 cm dari garis anastomosis. Geser titik tusukan minimal 3 mm dari lokasi sebelumnya (Rope Ladder) dan jangan menusuk titik yang sama dalam 2 minggu.',
        badge: 'Kanulasi AVF'
      },
      {
        id: 't2-3',
        category: 'Safety Alert',
        title: 'Penanganan Arterial Steal Syndrome (ASS)',
        summary: 'Tanda: tangan dingin, nyeri, parestesia, dan sianosis di jari distal fistula yang memburuk saat dialisis. Diagnosis dengan tes Allen & Doppler. Tindakan segera: evaluasi bedah untuk penutupan atau ligasi AV shunt sebelum terjadi iskemik jaringan permanen.',
        badge: 'Steal Syndrome'
      },
      {
        id: 't2-4',
        category: 'Prosedur & Rasional',
        title: 'Prosedur Heparin Lock pada Kateter Double Lumen (CVC)',
        summary: 'Gunakan teknik aseptik ketat dengan chlorhexidine 2% dalam alkohol 70%. Sebelum dialisis dimulai, heparin lock di kedua lumen WAJIB diaspirasi 5 cc dan langsung dibuang (jangan didorong/bolak-balik) agar pasien tidak menerima bolus antikoagulan sisa lock.',
        badge: 'CVC Protocol'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Volume Priming Sirkuit Ekstrakorporeal',
        formula: 'Total Priming = Priming Dialiser (60 - 120 mL) + Priming AVBL (100 - 150 mL)',
        description: 'Menghitung total cairan NaCl 0.9% pengisi sirkuit darah sebelum darah pasien dimasukkan.',
        example: 'Dialiser 100 mL + Bloodline 130 mL = Total volume sirkuit 230 mL.',
        clinicalTarget: 'Rentang standar sirkuit dewasa: 160 - 270 mL.'
      }
    ],
    subtopics: [
      {
        id: 's2-1',
        title: '1. Alat dan Bahan Hemodialisa',
        content: [
          'Dialiser (Ginjal Buatan): Tipe yang paling banyak digunakan saat ini adalah Capillary Dialyzer / Hollow Fiber (HF), ditemukan oleh Richard Stewart tahun 1966, terdiri dari 10.000 - 15.000 serat kapiler dengan aliran darah di dalam fiber dan dialisat di luar fiber berlawanan arah (counter-current).',
          'Material Membran: Cellulose (Cuprophane), Substituted Cellulose (Cellulose acetate), Cellulosynthetic (Hemophan), dan Synthetic (Polysulfone, Polyacrylonitrile/PAN, PMMA, Polyamide). Membran sintetik memiliki biokompatibilitas paling tinggi dan risiko First Use Syndrome rendah.',
          'Blood Line (AVBL): Arterial Blood Line (ABL/warna merah) mengalirkan darah dari pasien ke dialiser; Venous Blood Line (VBL/warna biru) mengalirkan darah bersih kembali ke pasien.',
          'Larutan Dialisat: Terdiri dari dialisat bikarbonat (campuran air murni RO, konsentrat Acid, dan Bikarbonat). Suhu dihangatkan mesin pada 33 - 39°C. Nilai normal konduktivitas dialisat adalah 12 - 16 mS/cm (ideal 13.8 - 14.5 mS/cm).',
          'Sistem Pengaman Mesin HD: Dilengkapi Blood Pump (200-300 ml/mnt), sensor tekanan arterial (negatif), sensor tekanan vena (positif), Transmembrane Pressure (TMP), detektor kebocoran darah (Blood Leak Detector), dan detektor udara ultrasonik.'
        ]
      },
      {
        id: 's2-2',
        title: '2. Akses Vaskuler Permanen: AV-Fistula (Brescia-Cimino)',
        content: [
          'AV-Fistula adalah penyambungan (anastomosis) antara pembuluh darah arteri dengan vena superfisial, paling sering dilakukan di lengan non-dominan (Radiocephalic di pergelangan tangan atau Brachiocephalic di siku).',
          'Teknik anastomosis tersering: Side to End (sisi arteri disambungkan ke ujung vena) karena aliran darah vena ke jantung paling optimal dan mencegah hipertensi vena di tangan.',
          'Persiapan & Kriteria: Minimal diameter lumen vena 2.5 mm dan arteri 2.0 mm sebelum operasi. Waktu penggunaan ideal setelah pematangan 6 - 8 minggu (aturan Rule of 6).',
          'Edukasi Pasien AVF: Deteksi sensasi desiran (thrill) dan dengung (bruit) setiap hari di rumah, dilarang mengukur tensi atau mengambil darah di lengan AVF, dilarang tidur menindih lengan akses, dan lakukan latihan bola tangan (handgrip exercise).',
          'Komplikasi AVF: Early thrombosis (<48 jam pascaop), Late thrombosis (akibat trauma jarum, hipotensi berat, atau stenosis intimal), Aneurisma vena, Arterial Steal Syndrome (iskemia jari tangan), Hipertensi vena, dan infeksi lokal.'
        ]
      },
      {
        id: 's2-3',
        title: '3. Akses Vaskuler Temporer: Catheter Double Lumen (CVC)',
        content: [
          'Kateter berbahan polyurethane/silikon dengan dua lumen: merah (inlet/arterial line) berlubang 2-3 cm lebih proksimal dibanding biru (outlet/venous line) untuk meminimalkan resirkulasi darah.',
          'Lokasi penempatan: Vena jugularis interna (paling direkomendasikan, risiko stenosis sentral rendah), Vena subklavia (risiko stenosis tinggi), Vena femoralis (hanya darurat/sementara karena risiko infeksi lipat paha).',
          'Teknik Aseptik Penggantian Dressing: Gunakan APD lengkap dan masker steril (pasien juga memakai masker), bersihkan exit-site dengan alkohol klorheksidin 2% dengan gerakan melingkar keluar.',
          'Heparin Lock: Setiap akhir sesi HD, isi lumen dengan larutan heparin sesuai volume yang tertera pada wing kateter. Saat memulai sesi berikutnya, lakukan aspirasi heparin lock 5 cc lalu buang ke bengkok (tidak boleh didorong balik!).'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q2-1',
        chapterId: 2,
        question: 'Kapan AV-Fistula baru idealnya mulai ditusuk untuk hemodialisis rutin menurut standar NKF-KDOQI?',
        options: [
          '1 minggu pascaoperasi jika luka jahitan kering',
          '2 minggu pascaoperasi dengan jarum ukuran 15G',
          'Minimal 6 sampai 8 minggu pascaoperasi setelah terjadi proses arterialisasi vena',
          '3 bulan khusus pada semua jenis graft sintetik'
        ],
        correctIndex: 2,
        explanation: 'Fistula AV membutuhkan waktu sekitar 6-8 minggu untuk matang (terjadi penebalan dinding vena atau arterialisasi) agar tidak mudah robek atau trombosis saat ditusuk jarum dialisis.',
        referencePage: 'Modul Hal. 42 & 46'
      },
      {
        id: 'q2-2',
        chapterId: 2,
        question: 'Teknik kanulasi AV-Fistula yang TIDAK LAGI DIREKOMENDASIKAN karena risiko tinggi memicu aneurisma dan penipisan kulit adalah:',
        options: [
          'Rope ladder technique',
          'Buttonhole technique',
          'Area cannulation (tusukan berulang pada lokasi yang sama)',
          'Single needle dual lumen'
        ],
        correctIndex: 2,
        explanation: 'Area cannulation menusuk berulang di tempat yang sama sehingga melemahkan dinding pembuluh vena, memicu dilatasi aneurisma, stenosis di sekitarnya, dan risiko ruptur perdarahan.',
        referencePage: 'Modul Hal. 44'
      },
      {
        id: 'q2-3',
        chapterId: 2,
        question: 'Jika pasien dengan CVC HD mengeluh aliran darah macet (poor blood flow), langkah pertama keperawatan yang dapat dicoba sebelum membalik selang adalah:',
        options: [
          'Mendorong bekuan secara paksa menggunakan NaCl 20 mL',
          'Menurunkan posisi kepala pasien atau menolehkan kepala ke sisi berlawanan dari posisi kateter',
          'Mencabut kateter di ruang dialisis segera',
          'Menaikkan laju pompa darah ke 350 ml/menit'
        ],
        correctIndex: 1,
        explanation: 'Menurunkan kepala pasien atau memutar kepala pasien ke sisi berlawanan dengan kateter dapat melepaskan ujung kateter yang menempel di dinding vena jugularis/subklavia.',
        referencePage: 'Modul Hal. 50'
      },
      {
        id: 'q2-4',
        chapterId: 2,
        question: 'Berapakah batas kisaran nilai normal konduktivitas (conductivity) cairan dialisat pada mesin hemodialisis?',
        options: [
          '5 - 8 mS/cm',
          '12 - 16 mS/cm (ideal 13,8 - 14,5 mS/cm)',
          '20 - 25 mS/cm',
          '35 - 40 mS/cm'
        ],
        correctIndex: 1,
        explanation: 'Kisaran konduktivitas normal larutan dialisis adalah 12-16 mS/cm (umumnya 13,8 - 14,5 mS/cm). Di luar batas ini mesin akan alarm dan masuk ke bypass mode untuk melindungi darah pasien.',
        referencePage: 'Modul Hal. 57'
      },
      {
        id: 'q2-5',
        chapterId: 2,
        question: 'Berapakah jarak minimal antara jarum kanulasi arteri dan vena pada akses AV-Fistula serta jaraknya dari garis anastomosis?',
        options: [
          'Jarak antar jarum 1 - 2 cm, dan 1 cm dari anastomosis',
          'Jarak antar jarum minimal 5 - 7 cm, dan minimal 3 cm di atas anastomosis',
          'Jarak antar jarum minimal 15 cm, dan tepat di atas luka sayatan operasi',
          'Bebas diletakkan bersebelahan tanpa batasan jarak'
        ],
        correctIndex: 1,
        explanation: 'Jarak antara jarum inlet (arteri) dan outlet (vena) minimal 5-7 cm untuk mencegah resirkulasi darah yang sudah dibersihkan, dan berjarak minimal 3 cm di atas anastomosis agar tidak merusak sambungan bedah.',
        referencePage: 'Modul Hal. 43'
      },
      {
        id: 'q2-6',
        chapterId: 2,
        question: 'Berapakah sudut penusukan jarum fistula yang direkomendasikan pada akses AV-Fistula (AVF) asli dan AV-Graft (AVG) sintetik?',
        options: [
          'AVF 10 derajat, AVG 20 derajat',
          'AVF 20 - 25 derajat, AVG 45 derajat',
          'AVF 60 derajat, AVG 90 derajat',
          'AVF 45 derajat, AVG 15 derajat'
        ],
        correctIndex: 1,
        explanation: 'Secara umum sudut penusukan jarum fistula untuk AVF asli adalah 20-25 derajat, sedangkan untuk graft vaskuler sintetik (AVG) adalah 45 derajat.',
        referencePage: 'Modul Hal. 43'
      },
      {
        id: 'q2-7',
        chapterId: 2,
        question: 'Seorang pasien mengeluh tangan kiri terasa dingin, baal, kesemutan hebat, dan pucat pada jari-jari distal setelah operasi pembuatan AV-Shunt. Kondisi klinis ini mengindikasikan komplikasi:',
        options: [
          'Sindrom Disekuilibrium Dialisis',
          'Arterial Steal Syndrome (ASS)',
          'Hipertensi Vena Murni',
          'First Use Syndrome'
        ],
        correctIndex: 1,
        explanation: 'Arterial Steal Syndrome terjadi saat aliran darah arteri tercuri masuk ke vena anastomosis, menyebabkan hipoperfusi dan iskemia jaringan jari-jari tangan distal dengan keluhan dingin, nyeri, dan parestesia.',
        referencePage: 'Modul Hal. 47'
      },
      {
        id: 'q2-8',
        chapterId: 2,
        question: 'Bahan membran dialiser manakah di bawah ini yang tergolong polimer sintetis (synthetic) dengan tingkat biokompatibilitas tinggi?',
        options: [
          'Cuprophane dan Cuprammonium rayon',
          'Polysulfone (PS) dan Polyacrylonitrile (PAN)',
          'Regenerated cellulose murni',
          'Cellulose triacetate primer'
        ],
        correctIndex: 1,
        explanation: 'Membran sintetik meliputi Polysulfone (PS), Polyacrylonitrile (PAN), Polycarbonate (PC), Polyamide (PA), dan PMMA yang memiliki biokompatibilitas paling baik dibanding cellulose murni.',
        referencePage: 'Modul Hal. 31'
      }
    ]
  },
  {
    id: 3,
    romanNumeral: 'MATERI III',
    title: 'Asuhan Keperawatan Intra HD',
    subtitle: 'Monitoring Pasien & Sirkuit Mesin, Komplikasi Non-Teknis & Komplikasi Teknis',
    iconName: 'AlertTriangle',
    badge: 'Monitoring & Kegawatan',
    estimatedMinutes: 35,
    pageRange: 'Hal. 53 - 74',
    overview: 'Membahas pengawasan ketat tanda vital intra HD (hipotensi, hipoglikemia pasien DM), pemantauan sirkuit ekstrakorporeal (Arterial Pressure, Venous Pressure, TMP, detektor udara), komplikasi klinis non-teknis (aritmia, kram, dialisis disequilibrium, HIT), serta komplikasi teknis fatal (hemolisis akut, emboli udara, kebocoran darah, dialiser clotting).',
    voiceSummary: 'Poin penting asuhan keperawatan intra hemodialisis yang harus diingat. Pertama, pantau tanda vital dan gula darah setiap 1 jam karena 20 sampai 60 persen pasien berisiko mengalami hipotensi intradialisis dan kehilangan glukosa hingga 35 gram. Kedua, tatalaksana darurat hipotensi intradialisis: posisikan pasien telentang datar atau kaki ditinggikan, matikan laju ultrafiltrasi, dan berikan bolus normal salin 100 sampai 200 mililiter hingga maksimal 500 mililiter. Ketiga, sindrom disekuilibrium dialisis dicegah pada sesi pertama dengan pompa darah lambat 150 sampai 200 mililiter per menit, waktu dialisis singkat 2 jam, dan target penurunan ureum di bawah 30 persen. Keempat, komplikasi fatal hemolisis akut ditandai darah di sirkuit berwarna merah anggur gelap transparan dan dialisat berwarna merah muda: segera matikan pompa darah, klem sirkuit, dan dilarang keras mengembalikan darah ke tubuh pasien karena risiko henti jantung akibat hiperkalemia masif. Kelima, penanganan emboli udara: segera matikan pompa darah, berikan oksigen murni, dan posisikan pasien miring ke sisi kiri dengan kepala lebih rendah atau posisi Durant.',
    keyTakeaways: [
      {
        id: 't3-1',
        category: 'Safety Alert',
        title: 'Tanda Kritis & Protokol Darurat Hemolisis Akut',
        summary: 'Tanda klinis: darah pada selang outlet terlihat merah gelap transparan seperti anggur merah (port wine), dialisat berwarna pink, nyeri dada, sesak, dan pusing. PROTOKOL DARURAT: 1. Matikan pompa darah seketika; 2. Klem selang arterial & venous; 3. JANGAN KEMBALIKAN DARAH ke tubuh (risiko henti jantung akibat lonjakan kalium!); 4. Cek kalium serum dan atasi hiperkalemia.',
        badge: 'FATAL RISK'
      },
      {
        id: 't3-2',
        category: 'Tindakan Keperawatan',
        title: 'Tatalaksana Hipotensi Intradialisis (IDH)',
        summary: 'Tanda: penurunan tekanan darah sistolik ≥30 mmHg atau sistolik <100 mmHg disertai mual, menguap, kram, pusing. Langkah: 1. Posisikan pasien telentang datar (Trendelenburg); 2. Turunkan atau matikan laju ultrafiltrasi (UFR); 3. Berikan bolus NaCl 0.9% 100 - 200 ml (dapat diulang s/d 500 ml); 4. Re-evaluasi tensi.',
        badge: 'Protokol IDH'
      },
      {
        id: 't3-3',
        category: 'Konsep Dasar',
        title: 'Sindrom Disekuilibrium Dialisis (DDS)',
        summary: 'Patofisiologi: klirens urea darah yang terlalu cepat melewati sawar darah otak menyebabkan penurunan osmolaritas plasma mendadak, sementara urea di sel otak lambat keluar, memicu edema serebri akut (mual, muntah, sakit kepala, kejang). Pencegahan: sesi HD pertama harus perlahan (Qb 150-200 ml/mnt, waktu 2 jam, dialiser kecil, target reduksi urea <30%).',
        badge: 'DDS Prevention'
      },
      {
        id: 't3-4',
        category: 'Safety Alert',
        title: 'Tatalaksana Emboli Udara (Durant Maneuver)',
        summary: 'Tanda: pasien duduk berteriak memegang telinga (udara ke sirkulasi otak) atau sesak napas akut & sianosis (udara ke arteri pulmonal). Tindakan segera: Matikan blood pump, klem sirkuit, berikan oksigen 100%, dan miringkan pasien ke sisi kiri tubuh dengan posisi kepala lebih rendah (Trendelenburg lateral dekubitus kiri).',
        badge: 'Air Embolism'
      }
    ],
    subtopics: [
      {
        id: 's3-1',
        title: '1. Pemantauan Pasien dan Sirkuit Ekstrakorporeal',
        content: [
          'Pengukuran Tanda Vital: Tensi dan nadi diperiksa minimal setiap 1 jam (lebih sering pada pasien tidak stabil). Pasien DM wajib dipantau gula darah karena kehilangan glukosa 25-35 gram per sesi HD ke dalam dialisat.',
          'Pemberian Antikoagulan: Heparin diinfuskan secara kontinu ke segmen bertekanan positif sirkuit darah (pasca pompa, pra-dialiser). Dilarang menginfuskan di segmen tekanan negatif karena meningkatkan risiko sedotan emboli udara.',
          'Arterial Pressure (AP): Mengukur tekanan negatif pra-pompa (fistula pressure). Jika AP terlalu negatif (< -200 s/d -250 mmHg), berarti ada hambatan aliran darah masuk dari akses, jarum menempel dinding, atau kinking.',
          'Venous Pressure (VP): Mengukur tekanan positif darah pasca-dialiser kembali ke pasien. Peningkatan VP abnormal (> 150-200 mmHg) disebabkan oleh bekuan pada bubble trap vena, jarum vena kecil/menempel, kinking selang, atau stenosis vena akses.',
          'Detektor Udara: Menggunakan sensor ultrasonik yang membedakan udara dan darah. Segera membunyikan alarm dan menghentikan pompa darah bila terdeteksi gelembung mikro.'
        ]
      },
      {
        id: 's3-2',
        title: '2. Komplikasi Non-Teknis Intra Hemodialisa',
        content: [
          'Hipotensi Intradialisis (Prevalensi 25-60%): Penyebab utama adalah penarikan cairan (UFR) yang melebihi laju pengisian ulang plasma (plasma refilling rate), target dry weight terlalu rendah, atau konsumsi antihipertensi sebelum HD.',
          'Kram Otot (Prevalensi 5-15%): Biasa terjadi di tungkai bawah/betis pada paruh kedua dialisis akibat penurunan volume intravaskuler cepat dan hiponatremia relatif dialisat.',
          'Heparin-Induced Thrombocytopenia (HIT): HIT Tipe I (ringan, non-imun) dan HIT Tipe II (imunologis termediasi antibodi PF4-heparin kompleks yang memicu trombosis fatal). Pasien dengan riwayat HIT wajib dialisis bebas heparin atau menggunakan antikoagulan sitrat.',
          'Hipoglikemia: Terjadi pada pasien diabetes atau malnutrisi, ditandai gemetar, keringat dingin, takikardi, dan bingung. Tatalaksana: beri glukosa per oral atau bolus Dextrose 40% intravena melalui sirkuit darah.'
        ]
      },
      {
        id: 's3-3',
        title: '3. Komplikasi Teknis Intra Hemodialisa',
        content: [
          'Hemolisis Akut: Diakibatkan dialisat kepanasan (> 42°C), dialisat hipotonik parah (kerusakan sistem proporsional air/konsentrat), atau kontaminasi kloramin/tembaga dari sistem pengolahan air.',
          'Kebocoran Darah (Blood Leak): Pecahnya membran dialiser kapiler. Bedakan Major Leak (darah merah jelas terlihat di selang dialisat) dan Minor Leak (darah tidak kasat mata tapi strip Hemastix positif). Bila positif, dialisis harus distop dan darah dibuang (jangan dimasukkan kembali).',
          'Clotting Dialiser: Ditandai dialiser berwarna ungu tua/hitam pekat, peningkatan tekanan vena dan TMP drastis. Dibilas dengan NaCl tetap berwarna gelap. Disebabkan antikoagulan tidak adekuat atau pompa darah sempat mati.',
          'First Use Syndrome: Reaksi alergi hipersensitivitas tipe I terhadap membran dialiser berbasis selulosa (cuprophane) atau sisa gas etilen oksida (ETO) pada dialiser baru.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q3-1',
        chapterId: 3,
        question: 'Pada kejadian hemolisis akut di sirkuit dialisis, tindakan pertama yang PALING PENTING dan tidak boleh dilanggar adalah:',
        options: [
          'Mendorong darah kembali ke pasien dengan membilas 500 mL NaCl',
          'Menghentikan dialisis dan mengklem sirkuit tanpa mengembalikan darah ke tubuh pasien',
          'Menaikkan suhu dialisat ke 40 derajat Celcius',
          'Memberikan bolus heparin 5000 IU'
        ],
        correctIndex: 1,
        explanation: 'Pada hemolisis akut, sel darah merah pecah melepaskan kalium dalam jumlah sangat masif. Jika darah di sirkuit dimasukkan kembali, hiperkalemia fatal dapat langsung memicu henti jantung.',
        referencePage: 'Modul Hal. 65 & 69'
      },
      {
        id: 'q3-2',
        chapterId: 3,
        question: 'Posisi darurat yang dianjurkan untuk pasien yang mengalami emboli udara pada posisi telentang adalah:',
        options: [
          'Posisi Fowler tinggi 90 derajat',
          'Trendelenburg miring ke sisi kiri tubuh (Durant Maneuver)',
          'Tengkurap menghadap ke bawah',
          'Semi fowler miring ke kanan'
        ],
        correctIndex: 1,
        explanation: 'Pasien harus diposisikan di sisi kiri dalam posisi telentang dengan kepala lebih rendah (Durant maneuver) agar udara terperangkap di apeks ventrikel kanan dan tidak masuk ke arteri pulmonal.',
        referencePage: 'Modul Hal. 71'
      },
      {
        id: 'q3-3',
        chapterId: 3,
        question: 'Penyebab utama dari Sindrom Disekuilibrium Dialisis (DDS) pada pasien baru yang menjalani hemodialisis adalah:',
        options: [
          'Kadar hemoglobin yang naik terlalu tinggi',
          'Transfer pembuangan urea dari jaringan otak ke darah lebih lambat dibanding pembersihan darah, memicu edema serebri',
          'Penurunan kadar asam urat secara mendadak',
          'Infeksi bakteri gram negatif di dialisat'
        ],
        correctIndex: 1,
        explanation: 'DDS terjadi karena pembuangan ureum darah jauh lebih cepat daripada pengeluaran ureum di jaringan otak dan cairan serebrospinal, menciptakan gradien osmotik yang menarik air ke dalam sel otak sehingga memicu edema serebri.',
        referencePage: 'Modul Hal. 63 & 141'
      },
      {
        id: 'q3-4',
        chapterId: 3,
        question: 'Apabila sensor Venous Pressure (VP) pada mesin HD mendadak melonjak tinggi di atas batas normal, kemungkinan penyebabnya adalah:',
        options: [
          'Ujung jarum arteri menempel di dinding pembuluh darah',
          'Adanya bekuan (clotting) di venous bubble trap atau kinking pada venous line',
          'Quick Blood (Qb) diturunkan ke 100 ml/menit',
          'Pasien mengalami dehidrasi berat'
        ],
        correctIndex: 1,
        explanation: 'Tekanan vena (Venous Pressure) memonitor resistensi darah yang kembali dari dialiser ke tubuh pasien. Kenaikan tinggi disebabkan sumbatan/clotting di bubble trap vena, selang terlipat (kinking), atau jarum vena tertutup/stenosis.',
        referencePage: 'Modul Hal. 55 & 56'
      },
      {
        id: 'q3-5',
        chapterId: 3,
        question: 'Di manakah lokasi penyuntikan infus antikoagulan heparin kontinu yang tepat pada sirkuit darah hemodialisis untuk mencegah risiko komplikasi emboli udara?',
        options: [
          'Pada segmen selang pra-pompa darah (tekanan negatif)',
          'Pada segmen bertekanan positif sirkuit darah (pasca-pompa darah, pra-dialiser)',
          'Langsung ke dalam cairan dialisat bikarbonat',
          'Pada selang venous bubble trap setelah dialiser'
        ],
        correctIndex: 1,
        explanation: 'Heparin diinfuskan ke segmen bertekanan positif (pasca-pompa; pra-dialiser). Jika diinfuskan pra-pompa pada segmen tekanan negatif dapat menyedot udara dan memicu emboli udara.',
        referencePage: 'Modul Hal. 54'
      },
      {
        id: 'q3-6',
        chapterId: 3,
        question: 'Seorang pasien hemodialisis mengalami penurunan tekanan darah sistolik sebesar 35 mmHg disertai keringat dingin, menguap, dan kram perut. Tindakan keperawatan pertama yang paling tepat adalah:',
        options: [
          'Menaikkan laju ultrafiltrasi (UFR) agar cairan cepat terbuang',
          'Posisikan pasien datar/Trendelenburg, matikan UFR, dan berikan bolus NaCl 0,9% 100 - 200 mL',
          'Berikan obat antihipertensi sublingual segera',
          'Tingkatkan kecepatan pompa darah ke 350 ml/menit'
        ],
        correctIndex: 1,
        explanation: 'Penatalaksanaan awal hipotensi intradialisis: posisikan pasien datar/kaki ditinggikan, turunkan/matikan laju UFR, berikan bolus salin normal 100-200 mL, lalu evaluasi tanda vital.',
        referencePage: 'Modul Hal. 61'
      },
      {
        id: 'q3-7',
        chapterId: 3,
        question: 'Pada komplikasi Heparin-Induced Thrombocytopenia (HIT) Tipe II yang termediasi respon imun antibodi kompleks heparin-trombosit, alternatif antikoagulasi yang disarankan adalah:',
        options: [
          'Mengganti dengan heparin dosis dua kali lipat',
          'Dialisis non-heparin (free heparin) atau antikoagulan sitrat regional',
          'Memberikan transfusi trombosit tanpa menghentikan heparin',
          'Menambahkan aspirin dosis tinggi ke dalam sirkuit'
        ],
        correctIndex: 1,
        explanation: 'Pada HIT Tipe II, semua heparin harus dihentikan segera dan dialihkan ke dialisis non-heparin atau antikoagulan sitrat regional / direct thrombin inhibitor untuk mencegah trombosis fatal.',
        referencePage: 'Modul Hal. 64'
      },
      {
        id: 'q3-8',
        chapterId: 3,
        question: 'Alarm kebocoran darah (Blood Leak Detector) berbunyi dan terlihat bercak darah nyata pada selang dialisat yang keluar dari dialiser (Major Leak). Tindakan perawat adalah:',
        options: [
          'Meneruskan dialisis dan membilas sirkuit dengan heparin',
          'Segera hentikan dialisis, buang semua darah pada sirkuit dan dialiser, ganti dengan dialiser dan blood line baru',
          'Membalik selang arteri dan vena',
          'Menaikkan suhu dialisat ke 42 derajat Celcius'
        ],
        correctIndex: 1,
        explanation: 'Pada Major Blood Leak, dialisis harus segera dihentikan, seluruh darah pada sirkuit dan dialiser dibuang (karena risiko kontaminasi dialisat non-steril ke darah), dan pasang dialiser serta sirkuit baru.',
        referencePage: 'Modul Hal. 58 & 70'
      }
    ]
  }
];
