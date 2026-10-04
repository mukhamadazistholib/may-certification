import { Chapter } from '../types/dialysis';

export const chapters7to9: Chapter[] = [
  {
    id: 7,
    romanNumeral: 'MATERI VII',
    title: 'Continuous Ambulatory Peritoneal Dialisis (CAPD)',
    subtitle: 'Prinsip Membran Peritoneum, Kateter Tenckhoff, Komplikasi Infeksi & Uji PET',
    iconName: 'Layers',
    badge: 'Dialisis Peritoneal',
    estimatedMinutes: 30,
    pageRange: 'Hal. 147 - 171',
    overview: 'Membahas prinsip dialisis peritoneum (difusi, ultrafiltrasi osmotik glukosa, absorpsi), pemasangan kateter Tenckhoff, pencegahan dan tatalaksana komplikasi infeksi (peritonitis & infeksi exit-site/tunnel), komplikasi mekanis/non-infeksi, Peritoneal Equilibrium Test (PET), serta paradoks nutrisi pada CAPD.',
    voiceSummary: 'Materi 7 mengupas Continuous Ambulatory Peritoneal Dialysis atau CAPD. CAPD memanfaatkan membran peritoneum alami sebagai membran semipermeabel dengan pergantian cairan 3 hingga 5 kali sehari tanpa menggunakan mesin. Komplikasi infeksi tersering dan paling berbahaya adalah peritonitis yang ditandai dengan cairan buangan dialisat keruh, hitung leukosit lebih dari 100 per mikroliter dengan netrofil di atas 50 persen, serta nyeri perut hebat. Uji kesetimbangan peritoneum atau Peritoneal Equilibrium Test digunakan untuk mengkategorikan permeabilitas membran menjadi High, High Average, Low Average, dan Low Transporter untuk menentukan resep dwell time yang paling tepat bagi pasien.',
    keyTakeaways: [
      {
        id: 't7-1',
        category: 'Safety Alert',
        title: 'Kriteria Diagnosis & Penanganan Peritonitis CAPD',
        summary: 'Diagnosis peritonitis ditegakkan bila memenuhi minimal 2 dari 3 tanda: 1. Cairan dialisat keluar keruh (cloudy effluent); 2. Nyeri perut/rangsangan peritoneum (rebound tenderness); 3. Hitung sel cairan dialisat > 100/µL dengan sel PMN/netrofil > 50%. Penyebab tersering kuman Gram-negatif (E. coli 40%) dan Gram-positif.',
        badge: 'Peritonitis Alert'
      },
      {
        id: 't7-2',
        category: 'Prosedur & Rasional',
        title: 'Uji Peritoneal Equilibrium Test (PET)',
        summary: 'Pemeriksaan untuk menentukan karakteristik permeabilitas membran peritoneum pasien. Dilakukan setelah minimal 4 minggu pemasangan kateter. Hasil mengelompokkan pasien ke 4 tipe: High (H), High Average (HA), Low Average (LA), dan Low Transporter (L). Pasien tipe High memiliki klirens solut cepat namun kehilangan ultrafiltrasi jika dwell time terlalu lama.',
        badge: 'PET Protocol'
      },
      {
        id: 't7-3',
        category: 'Tindakan Keperawatan',
        title: 'Perawatan Akses Exit-Site Kateter Tenckhoff',
        summary: 'Arah lubang keluar (exit-site) diarahkan menghadap ke bawah (downward) untuk mencegah akumulasi keringat dan menurunkan risiko infeksi. Bersihkan rutin dengan alkohol klorheksidin 2% steril. Balutan diganti 1 minggu sekali pada masa awal. Dilarang mandi berendam atau berenang.',
        badge: 'Exit-site Care'
      },
      {
        id: 't7-4',
        category: 'Konsep Dasar',
        title: 'Paradoks Nutrisi & Glukosa pada Pasien CAPD',
        summary: 'Pasien CAPD kehilangan protein melalui cairan dialisat rata-rata 4 - 9 gram/hari (kebutuhan protein lebih tinggi 1.2 - 1.3 g/kgBB/hari), namun menyerap kalori dari glukosa dialisat sebesar 150 - 1000 kkal/hari (400 - 800 kkal rata-rata) yang berisiko memicu hipertrigliseridemia dan obesitas.',
        badge: 'Nutrisi CAPD'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Target Adekuasi Dialisis Peritoneal (Kt/V Mingguan)',
        formula: 'Total Kt/Vurea Mingguan = Kt/V Peritoneal + Kt/V Renal Sisa (RRF)',
        description: 'Menilai total pembersihan urea gabungan antara efisiensi membran peritoneum dan residual ginjal pasien.',
        example: 'Kt/V peritoneal 1.4 + Kt/V residu urin 0.4 = Total Kt/V 1.8 / minggu.',
        clinicalTarget: 'Target minimal total Kt/Vurea ≥ 1.7 per minggu'
      }
    ],
    subtopics: [
      {
        id: 's7-1',
        title: '1. Konsep dan Prinsip Kerja CAPD',
        content: [
          'Prinsip Dialisis Peritoneum: Pembuluh darah kapiler di peritoneum membawa darah kaya urea, kreatinin, dan toksin. Rongga peritoneum (kavum peritoneal) diisi cairan dialisat hiperosmolar yang mengandung dekstrosa berkonsentrasi 1.5%, 2.5%, atau 4.25%.',
          'Mekanisme Perpindahan: Terjadi difusi solut dari darah ke dialisat, ultrafiltrasi cairan akibat daya osmotik glukosa, dan absorpsi zat tertentu.',
          'Jadwal Penggantian (Exchange): Pada CAPD konvensional, pertukaran dilakukan 3-5 kali per hari (setiap siklus meliputi Drain cairan lama 20 menit, Fill cairan baru 10 menit, dan Dwell tinggal di perut 4-6 jam siang hari dan 8 jam malam hari).',
          'Indikasi Klinis: Pasien dengan akses vaskuler gagal untuk HD, penyakit kardiovaskular berat, pasien usia anak atau lanjut usia, tempat tinggal jauh dari unit HD, dan keinginan pasien untuk mandiri di rumah.'
        ]
      },
      {
        id: 's7-2',
        title: '2. Pemasangan & Perawatan Kateter Tenckhoff',
        content: [
          'Jenis Kateter: Tenckhoff lurus (straight), bergelombang (curled), Swan-neck (ujung bengkok menghadap bawah), Missouri, dan Lifecath dengan double cuff dacron untuk fiksasi jaringan.',
          'Teknik Penempatan: Ujung kateter ditempatkan di dalam kavum Douglas (pelvis minor) agar aliran keluar cairan maksimal.',
          'Perawatan Exit-Site Pascaoperasi: Jaga area tetap kering, gunakan balutan absorben steril, fiksasi dengan plester agar selang tidak tertarik. Inisiasi dialisis penuh dimulai 2 minggu pascabedah setelah jaringan cuff menyatu sempurna.'
        ]
      },
      {
        id: 's7-3',
        title: '3. Komplikasi Infeksi dan Non-Infeksi pada CAPD',
        content: [
          'Peritonitis: Komplikasi tersering penyebab gagalnya teknik CAPD dan pergantian ke HD permanen. Kuman Gram-negatif (E. coli, Klebsiella, Pseudomonas) sering berasal dari migrasi transluminal dinding usus atau kontaminasi sentuhan saat pertukaran.',
          'Infeksi Exit-Site & Tunnel: Keluarnya cairan purulen/nanah dari lubang kateter dengan atau tanpa eritema kulit. Memerlukan antibiotik segera untuk mencegah infeksi merembet ke terowongan subkutan (tunnelitis) dan memicu peritonitis.',
          'Komplikasi Mekanis: Malposisi kateter (migrasi ujung kateter keluar panggul menyebabkan hambatan outflow), Kateter kinking (tertekuk), Kateter entrapment (terjerat omentum), Kebocoran cairan (leakage ke dinding abdomen/scrotum), dan Hidrotoraks (cairan peritoneum merembes ke pleura melalui defek diafragma bawaan).'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q7-1',
        chapterId: 7,
        question: 'Diagnosis klinis peritonitis pada pasien CAPD dapat ditegakkan apabila memenuhi minimal 2 dari 3 kriteria berikut:',
        options: [
          'Tekanan darah turun, kram kaki, dan sakit kepala',
          'Cairan dialisat buangan keruh, nyeri perut tekan/lepas, dan hitung sel leukosit dialisat > 100/µL dengan netrofil (PMN) > 50%',
          'Peningkatan berat badan 3 kg dalam semalam dan penurunan Hb',
          'Terdapat darah di selang tanpa adanya keluhan nyeri perut'
        ],
        correctIndex: 1,
        explanation: 'Diagnosis peritonitis CAPD mensyaratkan minimal 2 dari: cairan dialisat keruh (cloudy effluent), nyeri/rangsangan peritoneum, dan pemeriksaan laboratorium hitung sel dialisat >100 sel/µL dengan dominasi neutrofil/PMN >50%.',
        referencePage: 'Modul Hal. 153 & 157'
      },
      {
        id: 'q7-2',
        chapterId: 7,
        question: 'Bakteri gram negatif yang paling sering menjadi penyebab komplikasi peritonitis pada pasien CAPD menurut literatur adalah:',
        options: [
          'Staphylococcus aureus',
          'Escherichia coli (40%)',
          'Mycobacterium tuberculosis',
          'Streptococcus pneumoniae'
        ],
        correctIndex: 1,
        explanation: 'Kuman Gram-negatif tersering penyebab peritonitis adalah Escherichia coli (40%), disusul Klebsiella pneumoniae (7%), Proteus, dan Pseudomonas.',
        referencePage: 'Modul Hal. 152 & 156'
      },
      {
        id: 'q7-3',
        chapterId: 7,
        question: 'Berapakah target adekuasi klirens urea mingguan (Kt/Vurea mingguan) total yang direkomendasikan pada pasien peritoneal dialisis?',
        options: [
          'Minimal 1,2 per minggu',
          'Minimal 1,4 per minggu',
          'Minimal 1,7 per minggu',
          'Minimal 2,5 per minggu'
        ],
        correctIndex: 2,
        explanation: 'Menurut pedoman adekuasi PD modul IPDI, target Kt/Vurea mingguan minimal adalah 1,7 per minggu. Nilai < 1,7 berkorelasi kuat dengan peningkatan risiko komplikasi dan mortalitas.',
        referencePage: 'Modul Hal. 159 & 164'
      }
    ]
  },
  {
    id: 8,
    romanNumeral: 'MATERI VIII',
    title: 'Dialiser Proses Ulang (Dialyzer Reprocessing)',
    subtitle: 'Standar AAMI, Uji Total Cell Volume (TCV), Tes Kebocoran & Keselamatan Pasien',
    iconName: 'RotateCcw',
    badge: 'Reprocessing & Mutu',
    estimatedMinutes: 25,
    pageRange: 'Hal. 168 - 180',
    overview: 'Membahas prinsip pemakaian ulang dialiser pada pasien yang sama untuk efisiensi biaya dan penurunan First Use Syndrome, standar AAMI/KDOQI, tahapan rinsing, cleaning (H2O2 / Na-hipoklorit), testing (uji TCV minimal 80%, uji kebocoran 1-2 bar), disinfeksi germisida (asam perasetat, formalin, glutaraldehid, panas), serta penjaminan mutu dan keselamatan pasien.',
    voiceSummary: 'Materi 8 membahas Dialiser Proses Ulang atau Dialyzer Reprocessing. Di Indonesia, pemakaian ulang dialiser dilakukan pada sekitar 92 persen pusat dialisis dengan frekuensi 2 hingga 10 kali untuk menghemat biaya dan mengurangi kejadian First Use Syndrome. Dialiser hanya boleh digunakan kembali untuk pasien yang sama. Syarat kelayakan fungsi dialiser adalah nilai Total Cell Volume atau TCV minimal 80 persen dari volume awal dialiser baru, serta lolos uji kebocoran membran pada tekanan 1 hingga 2 bar selama 1 menit. Sebelum dialiser dipasangkan kembali ke pasien, sisa cairan germisida harus dibilas tuntas menggunakan minimal 2000 ml NaCl steril dan dipastikan negatif melalui uji carik celup strip indikator.',
    keyTakeaways: [
      {
        id: 't8-1',
        category: 'Nilai Kritis',
        title: 'Batas Minimal Kelayakan Total Cell Volume (TCV)',
        summary: 'Menurut standar AAMI dan KDOQI, dialiser dinyatakan LAYAK PAKAI ULANG apabila memiliki TCV minimal 80% dari priming volume awal saat dialiser masih baru. Penurunan TCV > 20% menunjukkan hilangnya banyak lumen kapiler akibat sumbatan bekuan, menurunkan klirens solut, dan dialiser WAJIB DIBUANG (di-afkir).',
        badge: 'Syarat TCV 80%'
      },
      {
        id: 't8-2',
        category: 'Safety Alert',
        title: 'Kontraindikasi Mutlak Dialiser Proses Ulang',
        summary: 'Proses ulang dialiser MUTLAK DILARANG pada: 1. Pasien dengan Sepsis aktif; 2. Pasien dengan antigenemia Hepatitis B (HBsAg positif) untuk mencegah risiko transmisi nosokomial fatal di ruang sterilisasi dialisis.',
        badge: 'Kontraindikasi Mutlak'
      },
      {
        id: 't8-3',
        category: 'Prosedur & Rasional',
        title: 'Uji Kebocoran Membran & Pembilasan Germisida',
        summary: 'Uji kebocoran: berikan tekanan 1 - 2 bar pada kompartemen darah selama 1 menit (tekanan harus stabil, tidak boleh merosot ke nol). Sebelum dialiser dipasang ke pasien pada sesi berikutnya, lakukan pembilasan (washout) dengan minimal 2000 mL NaCl 0.9% dan uji residu germisida memakai test strip hingga dinyatakan bebas bahan kimia.',
        badge: 'Washout 2000 mL'
      },
      {
        id: 't8-4',
        category: 'Konsep Dasar',
        title: 'Masa Simpan & Karakteristik Asam Perasetat',
        summary: 'Asam para-asetat (3% - 4%) memerlukan waktu kontak sterilisasi minimal 11 jam. Memiliki masa simpan 14 sampai 21 hari (terdegradasi menjadi asam asetat, oksigen, dan air). Efektivitas menurun jika terpapar suhu di atas 27°C, cahaya langsung, atau sisa bekuan darah.',
        badge: 'Germisida Perasetat'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Uji Persentase Total Cell Volume (TCV)',
        formula: 'TCV Sisa (%) = [ Volume Kapiler Terukur (mL) / Priming Volume Dialiser Baru (mL) ] × 100%',
        description: 'Parameter utama menilai jumlah serat kapiler dialiser yang masih paten dan tidak tersumbat bekuan fibrin.',
        example: 'Priming baru 100 mL, volume terukur saat reuse ke-5 adalah 84 mL -> (84/100) × 100% = 84% (LAYAK).',
        clinicalTarget: 'Harus ≥ 80% (Bila < 80%, dialiser harus diafkir/dibuang)'
      }
    ],
    subtopics: [
      {
        id: 's8-1',
        title: '1. Dasar Pemikiran dan Regulasi Reprocessing',
        content: [
          'Tujuan Utama: Mengurangi biaya operasional dialisis (menghemat 11-42%), memungkinkan penggunaan rutin dialiser High-Flux yang lebih baik, mengurangi timbunan limbah medis plastik, dan meningkatkan biokompatibilitas membran sehingga menekan angka first use syndrome.',
          'Regulasi & Standar: Mengikuti panduan KDOQI dan Association for the Advancement of Medical Instrumentation (AAMI). Reprocessing HANYA untuk pasien yang sama (single patient use, multiple sessions).',
          'Kontraindikasi Pemakaian Ulang: Pasien yang terkonfirmasi mengidap Hepatitis B (HBsAg positif) dan pasien sepsis atau bakteremia aktif.'
        ]
      },
      {
        id: 's8-2',
        title: '2. Enam Tahapan Baku Reprocessing Dialiser',
        content: [
          '1. Rinsing (Pembilasan Awal): Mengembalikan darah pasien seoptimal mungkin saat terminasi. Kompartemen darah dialiri air RO standar AAMI selama 8-10 menit hingga bersih dari darah sisa.',
          '2. Cleaning (Pembersihan Bahan Kimia): Mengalirkan agen pembersih berupa sodium hipoklorit encer (≤ 1%) atau hidrogen peroksida (≤ 3%) menggunakan teknik reverse ultrafiltration untuk membersihkan lapisan protein.',
          '3. Testing (Uji Fungsi): Uji Total Cell Volume (TCV) untuk memastikan kapasitas klirens masih ≥ 80%, dan uji kebocoran membran dengan tekanan 1-2 bar selama 1 menit.',
          '4. Disinfection / Sterilization: Pengisian dialiser dengan zat germisida terstandar (Asam perasetat 3-4% kontak 11 jam, Formalin 1.5-4% kontak 24 jam, atau Glutaraldehid).',
          '5. Storage (Penyimpanan): Diberi label identitas lengkap (nama, RM, kode warna, reuse ke berapa, hasil TCV), disimpan di rak bersih berventilasi baik pada suhu sejuk terhindar sinar matahari langsung.',
          '6. Washout & Pre-Dialysis Testing: Sebelum dipakai ke pasien, alirkan bilasan 2000 mL NaCl 0.9% dan periksa keberadaan residu germisida dengan test-strip sensitif.'
        ]
      },
      {
        id: 's8-3',
        title: '3. Keselamatan Pasien dan Kontrol Infeksi',
        content: [
          'Identifikasi Tepat: Label nama dan barcode harus selalu diverifikasi oleh 2 orang perawat sebelum dipasangkan ke sirkuit pasien untuk mencegah insiden salah dialiser (wrong dialyzer accident).',
          'Pencegahan Reaksi Pirogenik: Reaksi demam dan menggigil terjadi jika air RO tercemar endotoksin atau terdapat sisa germisida yang masuk ke sirkulasi darah pasien.',
          'Monitoring Adekuasi Dialiser Reuse: Penelitian Upadhyay et al membuktikan terjadi penurunan klirens urea sebesar 1-2% setelah dialiser diproses ulang 10 kali, sehingga evaluasi berkala Kt/V tetap wajib dilakukan.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q8-1',
        chapterId: 8,
        question: 'Menurut standar AAMI dan KDOQI, berapakah batas minimal Total Cell Volume (TCV) agar suatu dialiser masih dinyatakan layak untuk dipakai ulang (reuse)?',
        options: [
          'Minimal 50% dari priming volume awal',
          'Minimal 60% dari priming volume awal',
          'Minimal 80% dari priming volume dialiser baru',
          'Minimal 95% dari priming volume awal'
        ],
        correctIndex: 2,
        explanation: 'Dialiser dikatakan layak jika mempunyai nilai Total Cell Volume (TCV) minimal 80% dari priming volume dialiser baru. Jika penurunan TCV melebihi 20%, dialiser tidak dapat digunakan lagi dan harus dibuang.',
        referencePage: 'Modul Hal. 172 & 176'
      },
      {
        id: 'q8-2',
        chapterId: 8,
        question: 'Kondisi pasien manakah di bawah ini yang merupakan KONTRAINDIKASI MUTLAK untuk dilakukannya dialiser proses ulang?',
        options: [
          'Pasien lanjut usia dengan diabetes melitus',
          'Pasien dengan HBsAg positif (HBV antigenemia) dan pasien sepsis',
          'Pasien yang memiliki akses AV-Fistula di lengan kiri',
          'Pasien dengan kadar hemoglobin 11 g/dL'
        ],
        correctIndex: 1,
        explanation: 'Kontraindikasi mutlak reprocessing dialiser menurut modul (Levy et al) adalah pasien dengan sepsis dan pasien dengan HBV antigenemia (HBsAg positif) demi mencegah penularan silang.',
        referencePage: 'Modul Hal. 170 & 174'
      },
      {
        id: 'q8-3',
        chapterId: 8,
        question: 'Berapakah jumlah volume cairan NaCl 0,9% minimal yang direkomendasikan untuk membilas tuntas sisa cairan germisida sebelum dialiser proses ulang disambungkan ke pasien?',
        options: [
          '200 - 300 mL',
          '500 mL',
          '1000 mL',
          '2000 mL'
        ],
        correctIndex: 3,
        explanation: 'Sebelum dialiser digunakan, buang germisida dengan mengalirkan NaCl 0.9% sebanyak minimal 2000 mL (2 liter), kemudian verifikasi residu bahan kimia dengan test strip sensitif.',
        referencePage: 'Modul Hal. 175 & 179'
      }
    ]
  },
  {
    id: 9,
    romanNumeral: 'MATERI IX',
    title: 'Pengolahan Air untuk Hemodialisa (Water Treatment)',
    subtitle: 'Standar AAMI, Sistem Pretreatment, Softener, Karbon EBCT, RO, Deionizer & Toksisitas Kontaminan',
    iconName: 'Droplets',
    badge: 'Keselamatan Air & AAMI',
    estimatedMinutes: 30,
    pageRange: 'Hal. 177 - 195',
    overview: 'Membahas pentingnya sistem pengolahan air hemodialisis (Water Treatment), standar AAMI/CMS mengenai batas bakteri dan endotoksin, komponen sistem (filter multimedia, water softener, tangki karbon pekerja & pemoles dengan EBCT 10 menit, membran RO, deionisasi, sinar UV 254 nm, ultrafilter), serta bahaya toksisitas kontaminan air seperti aluminium, kloramin, kalsium, fluorida, dan sulfat.',
    voiceSummary: 'Materi 9 membahas aspek paling krusial bagi keselamatan hidup pasien dialisis: Sistem Pengolahan Air atau Water Treatment. Pasien hemodialisis terpapar 270 hingga 576 liter air dialisat setiap minggu, atau lebih dari 18.000 liter per tahun. Standar mutu AAMI menetapkan jumlah bakteri dalam air dialisis tidak boleh melebihi 200 CFU per mililiter dan kadar endotoksin kurang dari 2 EU per mililiter, bahkan untuk dialisat ultrapure kadar endotoksin harus di bawah 0,03 EU per mililiter. Komponen water softener bertugas mengikat ion kalsium dan magnesium untuk melindungi membran reverse osmosis, sedangkan tangki karbon aktif bekerja menyerap klorin dan kloramin dengan waktu kontak minimal 10 menit guna mencegah komplikasi mematikan berupa hemolisis akut dan methemoglobinemia.',
    keyTakeaways: [
      {
        id: 't9-1',
        category: 'Nilai Kritis',
        title: 'Paparan Air Dialisis Pasien per Tahun',
        summary: 'Pasien HD terpapar 270 hingga 576 Liter air dialisat per minggu (18.000 - 36.000 Liter/tahun)! Bandingkan dengan orang sehat yang hanya minum 10-14 liter/minggu. Karena itu, kontaminan air sekecil apapun dapat menembus pori membran dialiser langsung ke aliran darah pasien.',
        badge: '18.000 L/Tahun'
      },
      {
        id: 't9-2',
        category: 'Nilai Kritis',
        title: 'Standar Mikrobiologi Air Dialisis AAMI & Ultrapure',
        summary: 'Standar Air Baku AAMI: Bakteri < 200 CFU/mL (tindakan koreksi jika > 50 CFU/mL), Endotoksin < 2.0 EU/mL (koreksi jika > 1.0 EU/mL). Standar Air Ultra Murni (Ultrapure Water): Bakteri < 0.1 CFU/mL dan Endotoksin < 0.03 EU/mL.',
        badge: 'Standar AAMI'
      },
      {
        id: 't9-3',
        category: 'Prosedur & Rasional',
        title: 'Empty Bed Contact Time (EBCT) Tangki Karbon',
        summary: 'Tangki karbon berisi Granular Activated Charcoal (GAC) dipasang seri (tangki pekerja dan pemoles) untuk mengadsorpsi klorin & kloramin. Air harus kontak dengan karbon minimal 5 menit di tiap tangki, total EBCT minimal 10 menit. Batas klorin total produk harus < 0.1 ppm.',
        badge: 'EBCT 10 Menit'
      },
      {
        id: 't9-4',
        category: 'Safety Alert',
        title: 'Toksisitas Fatal Kontaminan Air Dialisis',
        summary: 'Kloramin/Klorin/Tembaga/Nitrat: memicu hemolisis masif akut dan methemoglobinemia. Aluminium: memicu Dialysis Encephalopathy (demensia dialisis) dan penyakit tulang osteomalasia ARBD. Kalsium/Magnesium berlebih: memicu "Hard Water Syndrome" (mual, muntah, hipertensi berat). Bakteri/Endotoksin: memicu reaksi pirogenik dan syok sepsis.',
        badge: 'Toksisitas Air'
      }
    ],
    clinicalFormulas: [
      {
        name: 'Empty Bed Contact Time (EBCT) Tangki Karbon',
        formula: 'EBCT = (Volume Media Karbon / Laju Alir Air) ≥ 10 Menit',
        description: 'Waktu kontak minimum yang mutlak diperlukan butiran karbon aktif untuk mengikat klorin dan kloramin terlarut.',
        example: 'Tangki 1 (Pekerja) = 5 menit kontak + Tangki 2 (Pemoles) = 5 menit kontak -> Total 10 menit.',
        clinicalTarget: 'Klorin total air produk < 0.1 ppm'
      },
      {
        name: 'Standar Resistivitas Air Deionizer (DI)',
        formula: 'Resistivitas Air Produk DI > 1.0 MegaOhm / cm',
        description: 'Ukuran kemurnian ionik air keluaran tangki deionisasi. Jika resistivitas turun, alarm wajib berbunyi.',
        example: 'Alarm mesin water treatment berbunyi jika resistivitas drop di bawah 1 MΩ/cm.',
        clinicalTarget: '> 1.0 MegaOhm / cm (Mencegah pelepasan ion berbahaya)'
      }
    ],
    subtopics: [
      {
        id: 's9-1',
        title: '1. Pengertian, Sumber Air & Standar Mutu AAMI',
        content: [
          'Rasionalisasi Pengolahan Air: Air minum biasa yang aman bagi orang sehat sangat beracun bagi pasien hemodialisis karena mengandung klorin, fluoride, kalsium, magnesium, dan aluminium.',
          'Sumber Air Baku: Air tanah (sumur/mata air: kadar mineral tinggi tapi mikroba rendah) dan Air permukaan (sungai/danau/PAM: mengandung pestisida, kloramin, bahan organik, dan mikroba tinggi).',
          'Standar AAMI / CMS: Air untuk membuat dialisat dan reprocessing dialiser wajib diuji mikrobiologis minimal setiap 1 bulan sekali, dan uji kimiawi lengkap setiap 6 sampai 12 bulan.'
        ]
      },
      {
        id: 's9-2',
        title: '2. Rangkaian Komponen Sistem Pengolahan Air (Water Treatment)',
        content: [
          'Pretreatment (Persiapan): Filter multimedia pasir/batuan untuk menyaring sedimen partikel besar (memerlukan siklus backwash rutin), injeksi zat kimia bila pH di luar rentang ideal 5.0 - 8.5.',
          'Water Softener (Pelembut Air): Berisi butiran resin penukar kation yang mengikat ion kalsium (Ca2+) dan magnesium (Mg2+) dengan menukarnya dengan natrium (Na+). Tujuan: mencegah timbulnya kerak (scaling) yang merusak pori membran Reverse Osmosis. Regenerasi menggunakan larutan garam pekat (brine tank) dengan target kekerasan air < 1 gpg (17.24 ppm).',
          'Tangki Karbon Aktif (GAC): Terdiri dari 2 tabung seri ("pekerja" dan "pemoles"). Sangat vital membuang klorin dan kloramin bebas dengan EBCT minimal 10 menit.',
          'Reverse Osmosis (RO): Jantung pengolahan air. Pompa bertekanan tinggi mendorong air menembus membran semipermeabel Thin Film Composite (TFC) poliamida, membuang 95-99% ion terlarut, bakteri, dan virus. Didesinfeksi peracetic acid < 1% sebulan sekali.',
          'Deionisasi (DI Tank): Cadangan darurat penukar resin ion hidrogen (H+) dan hidroksida (OH-). Menghasilkan resistivitas tinggi (> 1 MΩ/cm).',
          'Sinar Ultraviolet (UV 254 nm) & Ultrafilter: Menghancurkan rantai DNA bakteri dan menahan fragmen endotoksin.',
          'Sistem Distribusi Pipa Loop Tertutup: Pipa PVC kontinu tanpa sudut mati (dead leg) dengan aliran air minimal 3 kaki per detik (0.9 m/detik) untuk mencegah adhesi biofilm bakteri.'
        ]
      },
      {
        id: 's9-3',
        title: '3. Toksikologi Kontaminan Air dan Monitoring Klinis',
        content: [
          'Klorin & Kloramin: Mengakibatkan hemolisis akut, methemoglobinemia, dan anemia refrakter.',
          'Aluminium: Mengakibatkan kerusakan saraf pusat berupa Dialysis Dementia (disartria, kejang, apraksia, amnesia) serta penyakit tulang aluminum-related bone disease (ARBD).',
          'Kalsium & Magnesium Tinggi: Menyebabkan "Hard Water Syndrome" dengan gejala mual muntah hebat, sakit kepala berdenyut, kulit memerah, dan hiper/hipotensi mendadak.',
          'Tembaga & Seng: Berasal dari korosi pipa tembaga galvanis, dapat memicu pankreatitis akut, hemolisis, dan gagal hati.',
          'Tindakan Bila Kualitas Air Tercemar: Jika dua atau lebih pasien mendadak mengalami gejala serupa di ruang dialisis, segera aktifkan bypass mode pada seluruh mesin HD, hentikan tindakan, dan evaluasi sistem water treatment!'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q9-1',
        chapterId: 9,
        question: 'Berapakah waktu kontak minimum (Empty Bed Contact Time / EBCT) air dengan media karbon aktif pada tangki karbon untuk mengeliminasi klorin dan kloramin?',
        options: [
          'Minimal 1 menit',
          'Minimal 3 menit',
          'Minimal 5 menit di tiap tangki (total 10 menit untuk tangki pekerja dan pemoles)',
          'Minimal 30 menit'
        ],
        correctIndex: 2,
        explanation: 'Air harus kontak dengan butiran karbon aktif setidaknya selama 5 menit di setiap tangki (tangki pekerja dan tangki pemoles), dengan total minimal 10 menit (Empty Bed Contact Time / EBCT).',
        referencePage: 'Modul Hal. 184 & 188'
      },
      {
        id: 'q9-2',
        chapterId: 9,
        question: 'Kontaminasi logam aluminium dalam air dialisis dalam jangka panjang dapat menimbulkan komplikasi fatal berupa:',
        options: [
          'Hipotermia akut',
          'Demensia dialisis (Dialysis Encephalopathy) dan penyakit tulang osteomalasia (ARBD)',
          'Kanker kandung kemih',
          'Gagal jantung kanan'
        ],
        correctIndex: 1,
        explanation: 'Aluminium yang menumpuk di otak dan tulang memicu Dialysis Dementia (gangguan bicara, kejang, halusinasi, disartria) serta Aluminum-Related Bone Disease (ARBD) dengan nyeri tulang hebat dan patah tulang.',
        referencePage: 'Modul Hal. 189 & 193'
      },
      {
        id: 'q9-3',
        chapterId: 9,
        question: 'Komponen apakah dalam sistem pengolahan air (Water Treatment) yang berfungsi untuk mengeliminasi ion kalsium (Ca2+) dan magnesium (Mg2+) guna melindungi membran RO dari kerak?',
        options: [
          'Filter sedimen multimedia',
          'Pelembut air (Water Softener) dengan resin penukar kation',
          'Lampu ultraviolet (UV 254 nm)',
          'Submicron filter'
        ],
        correctIndex: 1,
        explanation: 'Water softener adalah bagian penting pretreatment yang berfungsi melembutkan air dengan mengeliminasi kalsium dan magnesium menggunakan manik resin penukar ion untuk melindungi membran RO dari scaling/blocking.',
        referencePage: 'Modul Hal. 181 & 185'
      },
      {
        id: 'q9-4',
        chapterId: 9,
        question: 'Berapakah batas jumlah bakteri maksimum dalam air dialisis menurut standar baku mutu AAMI?',
        options: [
          'Kurang dari 10 CFU/mL',
          'Kurang dari 50 CFU/mL',
          'Tidak boleh melebihi 200 CFU/mL (dengan upaya korektif bila > 50 CFU/mL)',
          'Maksimal 1000 CFU/mL'
        ],
        correctIndex: 2,
        explanation: 'Menurut standar AAMI, bakteri dalam air dialisis tidak boleh melebihi 200 CFU/mL. Jika hasil kultur menunjukkan lebih dari 50 CFU/mL, unit dialisis wajib segera melakukan upaya korektif / desinfeksi.',
        referencePage: 'Modul Hal. 187 & 191'
      }
    ]
  }
];
