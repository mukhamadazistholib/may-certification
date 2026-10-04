import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateSmartClinicalQuestions } from './src/data/dynamicScenarioGenerator';
import { getSmartIpdiAnswer } from './src/data/ipdiClinicalKnowledge';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chapter reference context for AI generation grounded strictly in IPDI 2021 module
const CHAPTER_CONTEXTS: Record<number, string> = {
  1: 'Materi I: Terapi Pengganti Ginjal (TPG), Anatomi & Fisiologi Ginjal (kortikal 85%, jukstamedular 15%, lengkung Henle, reabsorpsi >99%, filtrasi GFR 125 ml/mnt), AKI kriteria RIFLE & KDIGO (kenaikan serum kreatinin >=0.3 mg/dL dlm 48 jam atau 1.5x baseline, urin <0.5 ml/kg/jam >6 jam), etiologi PGK (Hipertensi 35%, DM 26%), indikasi darurat AEIOUS, prinsip fisika HD: Difusi, Ultrafiltrasi (TMP), Konveksi (Solvent Drag).',
  2: 'Materi II: Asuhan Keperawatan Pre HD. Dialiser Hollow Fiber (Richard Stewart 1966), membran sintetik vs selulosa, bloodline inlet (merah) & outlet (biru), priming volume 160-270 ml, dialisat bikarbonat (12-16 mS/cm, suhu 33-39°C). Akses AV-Fistula (Brescia-Cimino), Rule of 6 (6 minggu, 6 mm, <6 mm kedalaman, 600 ml/mnt, 6 inci), teknik Rope ladder (geser 3 mm, jangan tusuk titik sama dlm 2 minggu), sudut 20-25 derajat, jarak 5-7 cm. CVC Double Lumen: heparin lock aspirasi 5 ml lalu buang (jangan didorong), klorheksidin 2%.',
  3: 'Materi III: Asuhan Keperawatan Intra HD. Monitoring tensi/GDS tiap jam (kehilangan gula 25-35g), heparin disuntik di pasca-pompa (tekanan positif). Komplikasi non-teknis: Hipotensi intradialisis (UFR > plasma refilling, posisi datar, stop UF, bolus NaCl 100-200 ml s/d 500 ml), DDS (edema serebri akibat beda osmolaritas urea otak vs darah, cegah dg HD lambat 2 jam Qb 150-200), HIT Tipe I & II. Komplikasi teknis fatal: Hemolisis akut (darah seperti anggur merah, dialisat pink, hiperkalemia fatal, klem sirkuit & JANGAN kembalikan darah), Emboli udara (Durant maneuver: miring kiri kepala rendah), Clotting dialiser, Blood leak.',
  4: 'Materi IV: Asuhan Keperawatan Post HD & Adekuasi Hemodialisa. Target KDOQI (HD 3x/minggu 4 jam) spKt/V >= 1.4 atau URR >= 70%. Target PERNEFRI (HD 2x/minggu 5 jam) Kt/V >= 1.8 atau URR >= 80%. Standar mingguan stdKt/V >= 2.0. Protokol sampling ureum post-HD: UF=0, turunkan Qb ke 100 ml/mnt selama 10-20 detik, ambil dari jalur arteri maksimal 2 menit setelah HD berhenti untuk cegah rebound & resirkulasi.',
  5: 'Materi V: HD Khusus: PIRRT & SLED. Modalitas hibrid ICU mengawinkan IHD dan CRRT untuk pasien kritis tidak stabil. Durasi 6-12 jam, Qb 100-150 ml/mnt, Qd 200-300 ml/mnt, suhu dingin 35-36°C (vasokonstriksi), sodium profiling (tarik cairan interstitial), bikarbonat profiling. Keuntungan: hemat biaya dibanding CRRT 24 jam dan pasien dapat dimobilisasi di siang hari.',
  6: 'Materi VI: Asuhan Keperawatan Masalah Jangka Panjang. Berat badan kering & IDWG <= 3-5% (1.0-1.5 kg), cairan = urin 24 jam + 500 ml IWL. Anemia & ESA: target Hb 10-12 g/dL (maks 13), syarat ST >= 20% & feritin >= 200 ng/ml. Transfusi dihindari (hanya bila Hb < 7 g/dL). CKD-MBD: bahaya kalsifikasi vaskuler aorta/miokard bila Ca x P > 55, diet rendah fosfor 800-1000 mg/hari & pengikat fosfat bersama makanan. Nutrisi: protein 1.2 g/kg/hari (50% nilai biologis tinggi), SGA & MIS, obesity paradox.',
  7: 'Materi VII: Continuous Ambulatory Peritoneal Dialisis (CAPD). Membran peritoneum, kateter Tenckhoff, exit-site menghadap ke bawah, dilarang berendam/berenang. Kriteria peritonitis: 2 dari 3 (cairan keruh, nyeri perut tekan/lepas, leukosit > 100/uL dg PMN > 50%), kuman tersering E. coli (40%). Uji PET (High, High Average, Low Average, Low), target Kt/Vurea mingguan >= 1.7. Paradoks nutrisi: kehilangan protein 4-9 g/hari, absorpsi kalori glukosa 400-800 kkal/hari.',
  8: 'Materi VIII: Dialiser Proses Ulang (Reprocessing). Standar AAMI & KDOQI, hanya untuk pasien sama, KONTRAINDIKASI MUTLAK: sepsis & Hepatitis B (HBsAg positif). Syarat kelayakan TCV minimal 80% dari baru (penurunan >20% harus dibuang). Uji kebocoran 1-2 bar selama 1 menit. Asam perasetat 3-4% kontak 11 jam simpan 14-21 hari. Washout bilas NaCl minimal 2000 ml dan uji strip residu germisida harus negatif.',
  9: 'Materi IX: Pengolahan Air untuk Hemodialisa (Water Treatment). Pasien terpapar 270-576 L/minggu (18.000-36.000 L/tahun). Standar AAMI: bakteri < 200 CFU/ml (koreksi bila > 50 CFU/ml), endotoksin < 2.0 EU/ml. Air ultrapure: bakteri < 0.1 CFU/ml, endotoksin < 0.03 EU/ml. Tangki karbon GAC: EBCT minimal 10 menit (klorin total < 0.1 ppm). Water softener: mengikat Ca2+ & Mg2+ cegah kerak RO, kekerasan < 1 gpg (17 ppm). Toksisitas kontaminan: kloramin/nitrat memicu hemolisis akut & methemoglobinemia, aluminium memicu demensia dialisis & ARBD, kalsium berlebih memicu hard water syndrome.'
};

// API Endpoint to dynamically generate clinical questions grounded in the IPDI Module
app.post('/api/generate-quiz', async (req, res) => {
  const { chapterId, count = 5, difficulty = 'kasus_klinis' } = req.body;

  let contextScope = '';
  if (chapterId && CHAPTER_CONTEXTS[Number(chapterId)]) {
    contextScope = `FOKUS KHUSUS BAB ${chapterId}: ${CHAPTER_CONTEXTS[Number(chapterId)]}`;
  } else {
    contextScope = `LINTAS SELURUH 9 BAB MODUL IPDI 2021:\n` + Object.entries(CHAPTER_CONTEXTS).map(([k, v]) => `Bab ${k}: ${v}`).join('\n');
  }

  const systemPrompt = `Anda adalah Tim Penguji Ahli Resertifikasi Perawat Dialisis dari Pengurus Pusat Ikatan Perawat Dialisis Indonesia (PP IPDI).
Buat soal kuis pilihan ganda berbasis studi kasus klinis dialisis yang bermutu tinggi, realistis, dan berfokus pada penalaran klinis perawat.
SEMUA materi soal WAJIB berakar 100% pada Modul Resertifikasi Perawat Dialisis IPDI 2021:
${contextScope}
Sediakan 4 pilihan jawaban (A, B, C, D) dan berikan penjelasan rasional klinis lengkap.`;

  const userPrompt = `Buatlah tepat ${count} butir soal pilihan ganda baru dengan tingkat kesulitan ${difficulty}. Format jawaban wajib berupa JSON array.`;

  // Attempt live Gemini model with 15s timeout
  try {
    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            description: 'Daftar soal pilihan ganda kuis dialisis IPDI',
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                chapterId: { type: Type.INTEGER },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                correctIndex: { type: Type.INTEGER, description: 'Index 0, 1, 2, atau 3' },
                explanation: { type: Type.STRING, description: 'Rasional klinis lengkap' },
                referencePage: { type: Type.STRING, description: 'Rujukan bab/halaman modul IPDI 2021' },
              },
              required: ['id', 'chapterId', 'question', 'options', 'correctIndex', 'explanation', 'referencePage'],
            },
          },
        },
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('API Timeout 15s')), 15000))
    ]) as any;

    const outputText = response?.text || '[]';
    const parsedQuestions = JSON.parse(outputText);

    if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
      return res.json({
        success: true,
        source: 'gemini-3.8-flash',
        count: parsedQuestions.length,
        questions: parsedQuestions,
      });
    }
  } catch (err: any) {
    console.warn(`Gemini live call transient failure or 503 spike (${err?.message || err}), serving smart clinical case generator...`);
  }

  // Graceful zero-failure fallback: Smart Clinical Case Generator
  // If Google API encounters temporary 503 high demand or network timeout,
  // we immediately serve freshly synthesized dynamic clinical scenarios!
  const fallbackQuestions = generateSmartClinicalQuestions(Number(chapterId) || undefined, Number(count) || 5);

  return res.json({
    success: true,
    source: 'smart-clinical-case-engine',
    count: fallbackQuestions.length,
    questions: fallbackQuestions,
  });
});

// Dedicated Clinical Chatbot Endpoint strictly bounded by the IPDI 2021 Module
app.post('/api/chat-ai', async (req, res) => {
  try {
    const { message, history = [], chapterId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Pesan pertanyaan wajib diisi.' });
    }

    const ipdiKnowledgeBase = Object.entries(CHAPTER_CONTEXTS)
      .map(([k, v]) => `[BAB ${k}] ${v}`)
      .join('\n\n');

    const systemInstruction = `Anda adalah "Asisten Ahli Klinis Dialisis IPDI" (Ikatan Perawat Dialisis Indonesia).
Peran Anda adalah membantu perawat dialisis memahami konsep, prosedur asuhan keperawatan, tabel nilai kritis, patofisiologi mendalam, dan pedoman resertifikasi perawat dialisis.

BATASAN KETAT RUANG LINGKUP (STRICT BOUNDARY):
1. Anda HANYA diperkenankan menjawab pertanyaan yang berkaitan langsung dengan materi "Modul Resertifikasi Perawat Dialisis Indonesia PP IPDI 2021" yang mencakup 9 Bab berikut:
${ipdiKnowledgeBase}

2. ATURAN PENOLAKAN PERTANYAAN DI LUAR MODUL:
Jika pengguna menanyakan topik di luar dialisis, ginjal, keperawatan nefrologi, atau di luar cakupan 9 Bab modul IPDI di atas (contoh: topik politik, resep masakan, koding/teknologi umum, otomotif, penyakit organ lain yang tidak terkait ginjal/dialisis, lelucon, atau pengetahuan umum), Anda WAJIB MENOLAK SECARA RAMAH DAN MENGARAHKAN KEMBALI, contoh:
"Mohon maaf Ners, sebagai Asisten Khusus Modul IPDI, saya hanya dapat menjawab pertanyaan seputar materi hemodialisis, CAPD, akses vaskuler, komplikasi dialisis, dan pengolahan air sesuai Modul Resertifikasi Perawat Dialisis Indonesia PP IPDI 2021. Silakan ajukan pertanyaan seputar materi dialisis."

3. ATURAN FORMAT PENULISAN (MARKDOWN FORMATTING):
- Tuliskan jawaban yang berbobot, mendalam, dan langsung menjawab esensi pertanyaan secara komprehensif.
- Gunakan **Tebal (Bold)** untuk istilah penting, angka kritis, batas nilai laboratorium, dan tindakan prioritas keperawatan.
- Gunakan *Miring (Italic)* untuk istilah patofisiologi, bahasa medis latin/asing (misal: *air lock*, *bruit*, *thrill*, *urea rebound*, *plasma refilling rate*).
- Gunakan heading (###) untuk memecah bagian penjelasan agar hierarkis dan nyaman dibaca.
- Gunakan nomor berurutan (1., 2., 3.) untuk langkah-langkah penanganan darurat atau kriteria terstruktur.
- Gunakan bullet (•) untuk poin-poin fitur atau daftar pendukung.
- Selalu sertakan rujukan bab modul terkait di akhir jawaban (contoh: "📚 Rujukan: Modul IPDI 2021 - Bab 3: Asuhan Keperawatan Intra HD (Hal. 71)").`;

    // Construct conversation contents
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Multi-model cascade: Try gemini-2.5-flash first (available quota), followed by other flash variants
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
    ];

    for (const model of candidateModels) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.6,
            },
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout 25s')), 25000))
        ]) as any;

        const reply = response?.text;
        if (reply && reply.trim().length > 0) {
          return res.json({
            success: true,
            source: model,
            reply: reply.trim(),
          });
        }
      } catch (apiErr: any) {
        console.warn(`Model ${model} attempt had error (${apiErr?.message || apiErr}), trying next candidate...`);
      }
    }

    // Instant clinical answer engine strictly grounded in IPDI 2021 module
    const smartReply = getSmartIpdiAnswer(message);

    return res.json({
      success: true,
      source: 'smart-ipdi-knowledge-base',
      reply: smartReply,
    });
  } catch (error: any) {
    console.error('Error in /api/chat-ai:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses pertanyaan AI.',
      error: error?.message || String(error),
    });
  }
});

// In development, mount Vite middlewares; in production serve dist
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`DialisiLearn Server running on port ${PORT}`);
});
