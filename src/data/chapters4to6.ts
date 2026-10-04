import { Chapter } from '../types/dialysis';

export const chapters4to6: Chapter[] = [
  {
    id: 4,
    romanNumeral: 'MATERI IV',
    title: 'Asuhan Keperawatan Post HD & Adekuasi Dialisis',
    subtitle: 'Penilaian Kelayakan Pulang, Rumus URR & Kt/V, serta Teknik Sampling Ureum yang Benar',
    iconName: 'CheckCircle2',
    badge: 'Kualitas & Adekuasi',
    estimatedMinutes: 25,
    pageRange: 'Hal. 75 - 84',
    overview: 'Membahas evaluasi pasien pasca-dialisis, pelepasan jarum akses, kompres hemostasis, dan penghitungan adekuasi dialisis sebagai tolok ukur dosis bersihan toksin uremik menggunakan rumus URR dan spKt/V serta protokol pengambilan sampel darah pre dan post dialisis.',
    voiceSummary: 'Materi 4 membahas Asuhan Keperawatan Post Hemodialisis dan Pengukuran Adekuasi. Adekuasi dialisis adalah kecukupan dosis terapi untuk mengontrol gejala uremik dan menjamin kualitas hidup pasien. Rekomendasi target KDOQI untuk dialisis 3 kali seminggu selama 4 jam adalah Kt/V minimal 1,4 atau URR minimal 70 persen. Sedangkan PERNEFRI menetapkan target Kt/V 1,8 atau URR 80 persen untuk jadwal 2 kali seminggu selama 5 jam. Saat mengambil sampel darah post-dialisis, selalu matikan ultrafiltrasi, turunkan kecepatan pompa darah ke 100 ml per menit selama 10 hingga 20 detik, lalu ambil sampel dari arterial line dalam waktu maksimal 2 menit.',
    keyTakeaways: [
      {
        id: 't4-1',
        category: 'Nilai Kritis',
        title: 'Target Adekuasi Dialisis KDOQI vs PERNEFRI',
        summary: 'KDOQI (HD 3x/minggu @ 4 jam): Single Pool Kt/V ≥ 1.4 atau URR ≥ 70% (minimal Kt/V 1.2). PERNEFRI (HD 2x/minggu @ 5 jam): Target Kt/V ≥ 1.8 atau setara URR ≥ 80%. Target mingguan stdKt/V ≥ 2.0 per minggu.',
        badge: 'Standar Nasional'
      },
      {
        id: 't4-2',
        category: 'Prosedur & Rasional',
        title: 'Prosedur Stop Pump / Slow Flow Sampling Ureum Post-HD',
        summary: 'Langkah mencegah resirkulasi dan rebound saat ambil darah ureum post-HD: 1. Set UF rate ke 0 (nol); 2. Turunkan pompa darah (Qb) ke 100 ml/menit selama 10-20 detik; 3. Ambil sampel dari jalur arteri (ABL port); 4. Pengambilan sampel darah TIDAK BOLEH lebih dari 2 menit setelah HD berakhir.',
        badge: 'Metode Sampling'
      },
      {
        id: 't4-3',
        category: 'Safety Alert',
        title: 'Faktor Penyebab Under-dialysis (Dosis Tidak Tercapai)',
        summary: 'Penyebab klirens rendah: resirkulasi akses vaskuler (jarum terlalu dekat), kecepatan Qb kurang dari yang diresepkan, koagulasi/bekuan pada kapiler dialiser, waktu dialisis terpotong (interupsi kram/hipotensi), dan kesalahan kalibrasi mesin.',
        badge: 'Koreksi Klinis'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Urea Reduction Rate (URR)',
        formula: 'URR = [ (Ureum Pre - Ureum Post) / Ureum Pre ] × 100%',
        description: 'Persentase pembersihan konsentrasi ureum darah selama satu sesi dialisis berlangsung.',
        example: 'Pre-HD: 150 mg/dL, Post-HD: 30 mg/dL -> [(150 - 30) / 150] × 100% = 80%.',
        clinicalTarget: '≥ 70% (KDOQI 3x/mgg) atau ≥ 80% (PERNEFRI 2x/mgg)'
      },
      {
        name: 'Single Pool Kt/V (Daugirdas Gen-2 Logaritma)',
        formula: 'spKt/V = -ln(R - 0.008 × t) + (4 - 3.5 × R) × (UF / W)',
        description: 'R = rasio ureum post/pre; t = durasi dialisis (jam); UF = cairan ditarik (kg); W = berat badan kering post-HD (kg).',
        example: 'R=0.25, t=4 jam, UF=2.5 kg, W=50 kg -> spKt/V ~ 1.48.',
        clinicalTarget: '≥ 1.4 untuk HD 3x/minggu; ≥ 1.8 untuk HD 2x/minggu'
      }
    ],
    subtopics: [
      {
        id: 's4-1',
        title: '1. Pengakhiran HD dan Evaluasi Pasien Pulang',
        content: [
          'Proses Pengembalian Darah (Rinseback): Darah di sirkuit ekstrakorporeal dibilas menggunakan cairan NaCl 0.9% secara perlahan hingga warna selang jernih kembali ke tubuh pasien.',
          'Pelepasan Jarum Akses Vaskuler: Dilakukan penekanan kasa/deper steril pada titik keluar pembuluh darah secara lembut selama 5-10 menit. Penekanan tidak boleh terlalu kuat atau diputar-putar karena dapat mematikan aliran darah (trombosis AVF).',
          'Kriteria Pasien Layak Pulang: Tanda-tanda vital stabil (tensi duduk dan berdiri tidak hipotensi ortostatik), tidak ada perdarahan aktif dari bekas kanulasi, berat badan pasca HD mendekati berat kering yang ditargetkan, keluhan lemas/pusing minimal.'
        ]
      },
      {
        id: 's4-2',
        title: '2. Konsep dan Pengukuran Adekuasi Dialisis',
        content: [
          'Adekuasi hemodialisis adalah kecukupan dosis terapi dialisis yang diberikan kepada pasien untuk mengontrol sindrom uremikum, menstabilkan biokimia darah, menjaga status nutrisi, dan meningkatkan angka harapan serta kualitas hidup.',
          'Model Kinetika Urea (Urea Kinetic Modeling / UKM): Menggunakan urea sebagai penanda representatif karena urea mudah diukur, terdistribusi merata di air tubuh (Total Body Water), dan berkorelasi langsung dengan morbiditas uremik.',
          'Single Pool vs Double Pool: Single pool mengasumsikan urea terdistribusi merata di satu wadah air tubuh. Double pool memperhitungkan perpindahan urea yang lebih lambat dari kompartemen intraseluler ke kompartemen intravaskuler, sehingga terjadi fenomena "urea rebound" 30-60 menit setelah HD selesai.'
        ]
      },
      {
        id: 's4-3',
        title: '3. Tata Cara Pengambilan Sampel Darah Ureum (BUN)',
        content: [
          'Pengambilan Sampel Darah Pre-Dialisis: Dilakukan saat kanulasi jarum fistula sebelum dialisis dimulai dan sebelum darah terpapar infus saline atau antikoagulan sirkuit.',
          'Pengambilan Sampel Darah Post-Dialisis: Berpotensi terjadi bias akibat pengenceran sirkuit atau resirkulasi akses. Protokol KDOQI:',
          '1. Matikan ultrafiltrasi (UF rate = 0).',
          '2. Turunkan kecepatan pompa darah (Qb) ke 100 ml/menit selama 10 hingga 20 detik untuk mengisi kembali jalur arteri dengan darah sirkulasi murni tanpa resirkulasi.',
          '3. Hentikan pompa darah atau ambil langsung dari sampling port jalur arteri (ABL).',
          '4. Waktu pengambilan tidak boleh melebihi 2 menit setelah dialisis selesai agar tidak terpengaruh oleh urea rebound.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q4-1',
        chapterId: 4,
        question: 'Rekomendasi target nilai adekuasi dialisis menurut PERNEFRI untuk pasien yang menjalani hemodialisis 2 kali seminggu selama 5 jam adalah:',
        options: [
          'Kt/V target 1,2 atau URR 65%',
          'Kt/V target 1,4 atau URR 70%',
          'Kt/V target 1,8 atau URR 80%',
          'Kt/V target 2,2 atau URR 90%'
        ],
        correctIndex: 2,
        explanation: 'PERNEFRI merekomendasikan target Kt/V 1,8 yang ekuivalen dengan URR 80% untuk jadwal HD 2x/minggu (5 jam per sesi), sedangkan KDOQI menargetkan Kt/V 1,4 (URR 70%) untuk jadwal HD 3x/minggu (4 jam per sesi).',
        referencePage: 'Modul Hal. 76'
      },
      {
        id: 'q4-2',
        chapterId: 4,
        question: 'Mengapa pengambilan sampel darah ureum post-dialisis dilarang dilakukan lebih dari 2 menit setelah hemodialisis dihentikan?',
        options: [
          'Karena selang darah akan segera membeku',
          'Karena akan terjadi fenomena "urea rebound" dari jaringan tubuh lain ke sirkulasi darah yang membuat nilai adekuasi tampak lebih rendah semu',
          'Karena hemoglobin darah pasien akan langsung pecah',
          'Karena kadar natrium serum akan meningkat cepat'
        ],
        correctIndex: 1,
        explanation: 'Setelah dialisis berhenti, urea dari kompartemen intraseluler dan interstitial akan mengalir kembali (rebound) ke kompartemen vaskuler dalam beberapa menit, menyebabkan peningkatan kadar ureum darah dan merancukan akurasi delivered dose.',
        referencePage: 'Modul Hal. 79 & 83'
      },
      {
        id: 'q4-3',
        chapterId: 4,
        question: 'Seorang pasien memiliki kadar Ureum Pre-HD 200 mg/dL dan Ureum Post-HD 50 mg/dL. Berapakah nilai URR (Urea Reduction Rate) pasien tersebut?',
        options: [
          '65%',
          '70%',
          '75%',
          '80%'
        ],
        correctIndex: 2,
        explanation: 'URR = [(Ureum Pre - Ureum Post) / Ureum Pre] × 100% = [(200 - 50) / 200] × 100% = (150 / 200) × 100% = 75%.',
        referencePage: 'Modul Hal. 77 & 79'
      }
    ]
  },
  {
    id: 5,
    romanNumeral: 'MATERI V',
    title: 'HD Khusus: PIRRT, SLED & CRRT',
    subtitle: 'Modalitas Hibrid Pasien Kritis AKI di Ruang Rawat Intensif (ICU)',
    iconName: 'HeartPulse',
    badge: 'Dialisis Khusus',
    estimatedMinutes: 25,
    pageRange: 'Hal. 81 - 93',
    overview: 'Membahas teknologi hibrida Prolonged Intermittent Renal Replacement Therapy (PIRRT) / Sustained Low Efficiency Dialysis (SLED) yang mengawinkan keunggulan hemodialisis intermiten dengan hemofiltrasi kontinu pada pasien kritis di ICU yang hemodinamiknya tidak stabil.',
    voiceSummary: 'Materi 5 membahas Hemodialisis Khusus: PIRRT dan SLED. Prolonged Intermittent Renal Replacement Therapy atau SLED adalah metode hibrid yang dirancang untuk pasien sakit kritis dengan hemodinamik tidak stabil di ruang intensif. SLED memadukan keunggulan dialisis intermiten dan CRRT dengan memperpanjang durasi tindakan menjadi 6 hingga 12 jam, namun menurunkan kecepatan aliran darah ke 100 hingga 150 ml per menit dan aliran dialisat ke 200 hingga 300 ml per menit. Teknik ini memberikan stabilitas kardiovaskular tinggi, biaya jauh lebih murah dibandingkan CRRT 24 jam, serta memberi waktu jeda bagi pasien untuk tindakan diagnostik dan mobilisasi di siang hari.',
    keyTakeaways: [
      {
        id: 't5-1',
        category: 'Konsep Dasar',
        title: 'Konsep Dasar Hybrid Dialysis (PIRRT / SLED)',
        summary: 'SLED mengawinkan efisiensi IHD dengan stabilitas hemodinamik CRRT. Kecepatan Qb diturunkan (100 - 150 ml/mnt) dan Qd diturunkan (200 - 300 ml/mnt), namun durasi dipanjangkan menjadi 6 - 12 jam (atau semalam / overnight treatment).',
        badge: 'Konsep SLED'
      },
      {
        id: 't5-2',
        category: 'Nilai Kritis',
        title: 'Perbandingan IHD vs CRRT vs SLED',
        summary: 'IHD: Durasi 3-5 jam, Qb 200-300, Qd 500, risiko instabilitas hemodinamik tinggi. CRRT: Durasi 24 jam kontinu, hemofiltrasi konveksi lambat, sangat stabil tapi membutuhkan cairan substitusi >40 L/hari dan sangat mahal. SLED: Durasi 6-12 jam, Qb 100-150, Qd 100-300, murah, hemodinamik stabil, dan pasien leluasa dimobilisasi.',
        badge: 'Komparasi Klinis'
      },
      {
        id: 't5-3',
        category: 'Tindakan Keperawatan',
        title: 'Protokol Profiling pada SLED',
        summary: 'Gunakan Sodium Profiling (natrium dialisat lebih tinggi di awal untuk menarik cairan interstitial ke intravaskuler via difusi osmotik), Bicarbonate Profiling untuk koreksi cepat asidosis metabolik, dan UF Profiling bertahap sesuai respon tekanan darah.',
        badge: 'SLED Protocol'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Parameter Operasional Standar SLED / PIRRT',
        formula: 'Durasi = 6 - 12 jam | Qb = 100 - 150 mL/menit | Qd = 200 - 300 mL/menit | Suhu = 35 - 36 °C',
        description: 'Parameter teknis mesin dialisis volumetrik yang digunakan untuk terapi hibrid pasien kritis ICU.',
        example: 'Pasien AKI dengan syok sepsis: Qb 120 ml/mnt, Qd 250 ml/mnt, waktu 8 jam, UF rate 50-100 ml/jam.',
        clinicalTarget: 'Klirens toksin adekuat setara CRRT tanpa gejolak hipotensi'
      }
    ],
    subtopics: [
      {
        id: 's5-1',
        title: '1. Pengertian dan Rasional PIRRT / SLED',
        content: [
          'Pasien sakit kritis di ICU dengan Gangguan Ginjal Akut (AKI) sering mengalami instabilitas hemodinamik berat, penggunaan obat inotropik/vasopresor, dan overload cairan masif.',
          'Hemodialisis konvensional (IHD) sering tidak dapat ditoleransi karena pembuangan cairan 3-4 liter dalam 4 jam memicu syok dan iskemia organ vital.',
          'CRRT 24 jam sangat stabil namun membutuhkan biaya operasional yang sangat mahal, antikoagulasi kontinyu, serta pasien harus tirah baring total 24 jam tanpa bisa berpindah untuk pemeriksaan CT scan atau fisioterapi.',
          'SLED (Sustained Low Efficiency Dialysis) hadir sebagai solusi hemat biaya (menggunakan mesin HD standar yang memiliki kontrol volumetrik) dengan memperlambat kecepatan klirens dan memperpanjang waktu sesi menjadi 6-12 jam.'
        ]
      },
      {
        id: 's5-2',
        title: '2. Parameter Mesin & Pelaksanaan Klinis SLED',
        content: [
          'Waktu: 6 sampai 12 jam per sesi. Penelitian Flieser & Kielstein (2004) membuktikan SLED 12 jam memiliki efisiensi klirens solut yang setara dengan Continuous Veno-Venous Hemofiltration (CVVH) 24 jam.',
          'Aliran Darah (Qb): 100 - 150 ml/menit untuk mencegah hipotensi intradialitik namun cukup menjaga sirkuit tidak membeku.',
          'Aliran Dialisat (Qd): 200 - 300 ml/menit (pada beberapa mesin diatur minimal 300 ml/menit).',
          'Suhu Dialisat: Diatur lebih rendah (35 - 36°C) untuk merangsang vasokonstriksi fisiologis dan mempertahankan tekanan darah.',
          'Antikoagulasi: SLED dapat dilakukan bebas heparin (free heparin) dengan risiko bekuan 26-46%, atau menggunakan heparin reguler dosis rendah (bolus 1000-2000 IU, maintenance 500-1000 IU/jam) dengan target APTT 1.5 kali baseline.'
        ]
      },
      {
        id: 's5-3',
        title: '3. Sodium, Bicarbonate & UF Profiling pada SLED',
        content: [
          'Profiling Natrium: Natrium dialisat yang lebih tinggi menarik cairan dari ruang ekstravaskuler masuk ke kompartemen intravaskuler secara difusi osmotik, sehingga volume vaskuler dipertahankan saat ultrafiltrasi berjalan.',
          'Profiling Bikarbonat: Peningkatan kadar bikarbonat dialisat mengoreksi asidosis laktat dan asidosis metabolik uremik pasien kritis dengan cepat, meningkatkan kontraktilitas miokard.',
          'Ultrafiltration Profiling: Pada pasien sangat tidak stabil, UFR dimulai sangat rendah (0 - 100 ml/jam), kemudian dinaikkan perlahan seiring tekanan darah arterial stabil.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q5-1',
        chapterId: 5,
        question: 'Berapakah kecepatan aliran darah (Quick Blood / Qb) yang direkomendasikan pada pelaksanaan SLED (Sustained Low Efficiency Dialysis)?',
        options: [
          '50 - 80 ml/menit',
          '100 - 150 ml/menit',
          '250 - 300 ml/menit',
          '350 - 400 ml/menit'
        ],
        correctIndex: 1,
        explanation: 'Pada SLED, kecepatan aliran darah (Qb) sengaja diperlambat menjadi 100-150 ml/menit agar kondisi kardiovaskular pasien kritis tetap stabil tanpa memicu hipotensi mendadak.',
        referencePage: 'Modul Hal. 85 & 88'
      },
      {
        id: 'q5-2',
        chapterId: 5,
        question: 'Manakah keunggulan utama terapi dialisis hibrida SLED dibandingkan CRRT (Continuous Renal Replacement Therapy) 24 jam?',
        options: [
          'SLED tidak membutuhkan mesin atau listrik sama sekali',
          'Biaya jauh lebih murah, dan pasien memiliki waktu bebas (off-therapy) untuk pemeriksaan diagnostik atau mobilisasi fisik',
          'SLED dapat dilakukan tanpa akses vaskuler',
          'SLED sama sekali tidak memerlukan air RO'
        ],
        correctIndex: 1,
        explanation: 'Keuntungan SLED: tidak berjalan 24 jam penuh (hanya 6-12 jam), sehingga siang hari pasien dapat menjalani prosedur diagnostik/fisioterapi, hemat biaya cairan substitusi, dan antikoagulan lebih rendah dibanding CRRT.',
        referencePage: 'Modul Hal. 83 & 88'
      },
      {
        id: 'q5-3',
        chapterId: 5,
        question: 'Berapakah pengaturan suhu dialisat yang dianjurkan pada program SLED untuk membantu menjaga stabilitas hemodinamik pasien?',
        options: [
          '38 - 39 derajat Celcius',
          '35 - 36 derajat Celcius',
          '30 - 32 derajat Celcius',
          '40 - 42 derajat Celcius'
        ],
        correctIndex: 1,
        explanation: 'Suhu dialisat pada SLED diatur lebih rendah (35 - 36°C) untuk merangsang tonus vasokonstriksi vaskuler perifer sehingga menjaga tekanan darah pasien tetap stabil.',
        referencePage: 'Modul Hal. 88'
      }
    ]
  },
  {
    id: 6,
    romanNumeral: 'MATERI VI',
    title: 'Asuhan Masalah Jangka Panjang Pasien HD',
    subtitle: 'Berat Badan Kering, Anemia & ESA, CKD-MBD, Malnutrisi, Psikososial & Neurologi',
    iconName: 'HeartHandshake',
    badge: 'Masalah Jangka Panjang',
    estimatedMinutes: 40,
    pageRange: 'Hal. 90 - 146',
    overview: 'Membahas komprehensif masalah komplikasi kronik pasien hemodialisis rutin: tata kelola berat badan kering & overload cairan, penatalaksanaan anemia renal & terapi ESA/besi, metabolisme kalsium-fosfat-PTH (CKD-MBD) & kalsifikasi vaskuler, status nutrisi (SGA & MIS), dukungan psikososial/keluarga/SEFT, serta komplikasi neuropati uremik.',
    voiceSummary: 'Materi 6 mengupas tuntas masalah jangka panjang pasien hemodialisis. Pasien harus menjaga kenaikan berat badan interdialitik di bawah 3 hingga 5 persen dari berat badan kering. Pada tata laksana anemia renal akibat defisiensi hormon eritropoietin, terapi ESA ditargetkan mencapai kadar hemoglobin 10 hingga 12 gram per desiliter dengan syarat cadangan besi cukup yaitu saturasi transferin di atas 20 persen dan feritin serum di atas 200 mikrogram per liter. Terapi transfusi darah sedapat mungkin dihindari. Pada komplikasi CKD-MBD, penumpukan fosfat memicu hiperparatiroidisme sekunder dan kalsifikasi vaskuler berbahaya bila produk kalsium dikali fosfat melebihi 55. Pasien juga rentan malnutrisi energi protein, depresi, serta neuropati perifer yang membutuhkan intervensi keperawatan holistik.',
    keyTakeaways: [
      {
        id: 't6-1',
        category: 'Nilai Kritis',
        title: 'Target Hemoglobin & Syarat Terapi ESA',
        summary: 'Target Hb pada terapi ESA adalah 10 - 12 g/dL (Hb dilarang > 13 g/dL karena risiko stroke & trombosis vaskuler). Syarat memulai ESA: Tidak ada defisiensi besi absolut, yaitu Saturasi Transferin (ST) ≥ 20% dan Serum Feritin (SF) ≥ 200 ng/mL pada pasien dialisis.',
        badge: 'Manajemen Anemia'
      },
      {
        id: 't6-2',
        category: 'Nilai Kritis',
        title: 'Batasan Kenaikan Berat Badan Interdialitik (IDWG)',
        summary: 'Kenaikan berat badan antar dua sesi hemodialisis (IDWG) idealnya TIDAK BOLEH MELEBIHI 3% - 5% dari berat badan kering (sekitar 1.0 - 1.5 kg). Rumus asupan cairan harian: Urin 24 jam + 500 mL (Insensible Water Loss / IWL).',
        badge: 'Cairan & Dry Weight'
      },
      {
        id: 't6-3',
        category: 'Safety Alert',
        title: 'Bahaya Kalsifikasi Metastatik (Perkalian Ca × P > 55)',
        summary: 'Jika hasil perkalian kadar Kalsium serum (mg/dL) dikali Fosfat serum (mg/dL) melebihi 55, garam kalsium-fosfat akan mengendap di tunika media pembuluh darah (aorta, miokard, kalsifilaksis) dan merupakan PENYEBAB KEMATIAN KARDIOVASKULAR TERBESAR pada pasien hemodialisis.',
        badge: 'CKD-MBD Alert'
      },
      {
        id: 't6-4',
        category: 'Prosedur & Rasional',
        title: 'Kebutuhan Nutrisi & Protein Pasien Hemodialisis',
        summary: 'Kebutuhan protein: 1.2 ± 0.2 g/kgBB/hari dengan minimal 50% bernilai biologis tinggi (telur, daging, ikan, ayam). Kebutuhan energi: 35 kkal/kgBB/hari. Batasi asupan fosfor 800-1000 mg/hari (minum pengikat fosfat bersama makanan).',
        badge: 'Diet HD'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Produk Kalsium-Fosfat (Ca × P)',
        formula: 'Produk Ca × P = Kalsium Serum (mg/dL) × Fosfor Serum (mg/dL)',
        description: 'Menilai risiko terjadinya presipitasi kalsium fosfat dan kalsifikasi vaskuler sistemik.',
        example: 'Kalsium 9.5 mg/dL × Fosfor 6.5 mg/dL = 61.75 (Tinggi / Berbahaya!).',
        clinicalTarget: 'Harus dipertahankan < 55 mg²/dL²'
      },
      {
        name: 'Asupan Cairan Harian Pasien HD',
        formula: 'Total Cairan Maksimal / Hari = Volume Urin 24 Jam + 500 mL (IWL)',
        description: 'Batasan cairan masuk (termasuk air minum, sup, kuah sayur) untuk menjaga euvolemia.',
        example: 'Pasien anuri (urin 0 mL) -> maksimal asupan cairan total hanya 500 mL per hari.',
        clinicalTarget: 'Kenaikan IDWG < 5% dari Berat Badan Kering'
      }
    ],
    subtopics: [
      {
        id: 's6-1',
        title: '1. Berat Badan Kering dan Manajemen Cairan',
        content: [
          'Definisi Berat Badan Kering (Dry Weight): Berat badan terendah yang dapat dicapai pasien tanpa menimbulkan hipotensi intradialitik atau kram, serta bebas dari edema paru, edema ekstremitas, dan distensi vena jugularis.',
          'Dampak Kelebihan Cairan: Hipertensi refrakter, hipertrofi ventrikel kiri (LVH), gagal jantung kongestif, dan edema paru akut yang mengancam nyawa.',
          'Bahaya Penarikan Ultrafiltrasi Berlebihan: Jika UFR > 30 cc/kgBB/jam atau melampaui kemampuan pengisian plasma, terjadi iskemia usus, hipoperfusi otak, trombosis akses AVF mendadak, dan hilangnya sisa fungsi ginjal (RRF).'
        ]
      },
      {
        id: 's6-2',
        title: '2. Anemia pada Hemodialisis & Terapi ESA',
        content: [
          'Patogenesis Anemia Renal: Kerusakan massa parenkim ginjal menyebabkan defisiensi relatif eritropoietin (EPO). Diperberat oleh masa hidup eritrosit memendek (dari normal 120 hari menjadi 60-90 hari), kehilangan darah sirkuit (2-3 liter/tahun), dan defisiensi besi.',
          'Terapi Eritropoietin (ESA): Diberikan secara subkutan dosis awal 2000-5000 IU 2 kali seminggu. Evaluasi Hb setiap 4 minggu dengan target kenaikan 0.5 - 1.5 g/dL per bulan sampai mencapai target 10-12 g/dL.',
          'Titrasi Dosis ESA: Naikkan dosis 25% jika respon belum tercapai; turunkan dosis 25% jika Hb naik >1.5 g/dL per bulan atau Hb mencapai 12-13 g/dL; HENTIKAN pemberian ESA bila Hb > 13 g/dL.',
          'Indikasi Transfusi Darah: Dihindari sedapat mungkin (risiko infeksi, penumpukan besi, terbentuk antibodi HLA pada calon resipien cangkok ginjal). Transfusi HANYA diberikan jika Hb < 7 g/dL atau Hb < 8 g/dL dengan gejala instabilitas jantung/perdarahan aktif, target Hb transfusi 7-9 g/dL.'
        ]
      },
      {
        id: 's6-3',
        title: '3. Gangguan Mineral dan Tulang (CKD-MBD)',
        content: [
          'Patogenesis: Penurunan laju filtrasi ginjal menyebabkan retensi fosfat dan defisiensi kalsitriol (1,25-(OH)2-vit D3). Hipokalsemia dan hiperfosfatemia merangsang kelenjar paratiroid mensekresikan Parathyroid Hormone (PTH) secara berlebih, memicu Hiperparatiroidisme Sekunder (sHPT).',
          'Renal Osteodystrophy (ROD): Osteitis fibrosa kistika (turnover tulang tinggi akibat lonjakan PTH), Osteomalasia (gangguan mineralisasi), dan Adynamic Bone Disease (turnover tulang rendah akibat over-supresi PTH atau toksisitas aluminium).',
          'Kalsifikasi Jaringan Lunak & Pembuluh Darah: Kadar Ca × P > 55 memicu deposit kalsium fosfat pada dinding aorta dan arteri koroner, menyebabkan kekakuan vaskuler dan kematian kardiovaskular.',
          'Tatalaksana Hiperfosfatemia: Diet rendah fosfat (800-1000 mg/hari, batasi cola, keju, makanan olahan berpengawet) serta pemberian pengikat fosfat bersamaan saat makan (Kalsium asetat, Kalsium karbonat, Sevelamer, Lanthanum).'
        ]
      },
      {
        id: 's6-4',
        title: '4. Nutrisi, Aspek Psikososial & Neurologi',
        content: [
          'Malnutrisi Protein Energi (PEM / PEW): Prevalensi mencapai 40%. Disebabkan anoreksia uremik, asidosis metabolik, kehilangan asam amino 4-9 gram per sesi HD, dan status inflamasi kronik (sitokin IL-6 dan TNF-alfa tinggi).',
          'Penilaian Status Gizi: Subjective Global Assessment (SGA Klas A, B, C) dan Malnutrition Inflammation Score (MIS skor 0-30). Fenomena "Obesity Paradox": pasien HD dengan IMT 25-30 justru memiliki angka harapan hidup lebih tinggi dibanding pasien dengan IMT < 19 kg/m².',
          'Aspek Psikososial: Depresi, kecemasan, rasa tak berdaya menghadapi ketergantungan mesin HD seumur hidup. Terapi pendukung: Peer Support Group, peran aktif keluarga, dan teknik relaksasi psikoreligius SEFT (Spiritual Emotional Freedom Technique).',
          'Gangguan Neurologi: Ensefalopati uremikum (asteriksis, flapping tremor, kejang), Neuropati perifer sensorimotorik, Restless Leg Syndrome (sensasi merayap/kesemutan di betis saat diam yang membaik dengan bergerak), dan Carpal Tunnel Syndrome akibat penumpukan amiloid beta-2 mikroglobulin.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q6-1',
        chapterId: 6,
        question: 'Berapakah target kadar Hemoglobin (Hb) yang direkomendasikan pada pasien hemodialisis yang menerima terapi ESA (Erythropoietin Stimulating Agent)?',
        options: [
          '8 - 9 g/dL',
          '10 - 12 g/dL',
          '13 - 15 g/dL',
          '> 15 g/dL'
        ],
        correctIndex: 1,
        explanation: 'Menurut panduan KDIGO dan modul IPDI, target kadar Hb pada terapi ESA adalah 10-12 g/dL. Kadar Hb dilarang melebihi 13 g/dL karena terbukti meningkatkan risiko kematian mendadak akibat stroke dan trombosis.',
        referencePage: 'Modul Hal. 114 & 118'
      },
      {
        id: 'q6-2',
        chapterId: 6,
        question: 'Kapan pemberian obat pengikat fosfat (phosphate binder seperti kalsium asetat / kalsium karbonat) paling tepat dikonsumsi pasien?',
        options: [
          'Saat perut kosong sebelum tidur malam',
          'Bersamaan dengan makanan atau kudapan (di sela-sela suapan makan)',
          '2 jam setelah selesai makan besar',
          'Hanya pada pagi hari saat bangun tidur'
        ],
        correctIndex: 1,
        explanation: 'Obat pengikat fosfat bekerja dengan mengikat fosfat yang ada di dalam makanan di saluran cerna agar tidak diserap ke aliran darah. Karena itu wajib diminum bersamaan saat makan.',
        referencePage: 'Modul Hal. 128'
      },
      {
        id: 'q6-3',
        chapterId: 6,
        question: 'Kenaikan berat badan interdialitik (IDWG) yang masih dapat ditoleransi dengan aman oleh pasien hemodialisis rutin adalah:',
        options: [
          'Tidak lebih dari 3% - 5% dari berat badan kering (sekitar 1,0 - 1,5 kg)',
          'Bebas berapapun asalkan tidak batuk',
          'Minimal 10% dari berat badan kering',
          'Maksimal 5 kg setiap sesi HD'
        ],
        correctIndex: 0,
        explanation: 'IDWG yang dapat ditoleransi tubuh pasien hemodialisis adalah tidak lebih dari 1,0 - 1,5 kg atau tidak melebihi 3% hingga 5% dari berat badan kering.',
        referencePage: 'Modul Hal. 108 & 112'
      },
      {
        id: 'q6-4',
        chapterId: 6,
        question: 'Pada komplikasi CKD-MBD, pengendapan garam kalsium-fosfat pada pembuluh darah (kalsifikasi vaskuler) sangat berisiko terjadi bila perkalian kadar kalsium dan fosfat serum (Ca × P) melebihi:',
        options: [
          '> 35',
          '> 45',
          '> 55',
          '> 75'
        ],
        correctIndex: 2,
        explanation: 'Perkalian produk Ca × P di atas 55 mg²/dL² dapat mengakibatkan presipitasi garam kalsium fosfat (metastatic calcification) di tunika media pembuluh darah besar dan miokardium.',
        referencePage: 'Modul Hal. 120 & 124'
      }
    ]
  }
];
