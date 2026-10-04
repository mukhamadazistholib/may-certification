import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const ClinicalCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'urr' | 'ufr' | 'cap' | 'rule6'>('urr');

  // URR & Kt/V State
  const [preUreum, setPreUreum] = useState<number>(180);
  const [postUreum, setPostUreum] = useState<number>(45);
  const [hours, setHours] = useState<number>(4);
  const [preWeight, setPreWeight] = useState<number>(62);
  const [postWeight, setPostWeight] = useState<number>(59.5);

  // UFR State
  const [dryWeight, setDryWeight] = useState<number>(60);
  const [ufTarget, setUfTarget] = useState<number>(2500); // in mL
  const [dialysisDuration, setDialysisDuration] = useState<number>(4); // in hours

  // Ca x P State
  const [calcium, setCalcium] = useState<number>(9.2);
  const [phosphorus, setPhosphorus] = useState<number>(5.8);

  // Calculations
  const urrValue = preUreum > 0 ? ((preUreum - postUreum) / preUreum) * 100 : 0;
  const R = preUreum > 0 ? postUreum / preUreum : 0;
  const ufKg = Math.max(0, preWeight - postWeight);
  const spKtV =
    R > 0 && R < 1 && postWeight > 0
      ? -Math.log(Math.max(0.01, R - 0.008 * hours)) +
        (4 - 3.5 * R) * (ufKg / postWeight)
      : 0;

  // UFR calculation (mL/kg/hour)
  const ufrMlKgHr =
    dryWeight > 0 && dialysisDuration > 0
      ? ufTarget / (dryWeight * dialysisDuration)
      : 0;

  // Ca x P
  const caXpValue = calcium * phosphorus;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Kalkulator Klinis Dialisis</h3>
            <p className="text-xs text-slate-500">Hitung otomatis parameter adekuasi, cairan, dan keselamatan pasien</p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('urr')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'urr' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Adekuasi URR & Kt/V
          </button>
          <button
            onClick={() => setActiveTab('ufr')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'ufr' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Laju UF (UFR)
          </button>
          <button
            onClick={() => setActiveTab('cap')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'cap' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Produk Ca × P
          </button>
          <button
            onClick={() => setActiveTab('rule6')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'rule6' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rule of 6 AVF
          </button>
        </div>
      </div>

      {activeTab === 'urr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Ureum Pre-HD (mg/dL)</label>
                <input
                  type="number"
                  value={preUreum}
                  onChange={(e) => setPreUreum(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Ureum Post-HD (mg/dL)</label>
                <input
                  type="number"
                  value={postUreum}
                  onChange={(e) => setPostUreum(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Waktu HD (Jam)</label>
                <input
                  type="number"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">BB Pre (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={preWeight}
                  onChange={(e) => setPreWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">BB Post (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={postWeight}
                  onChange={(e) => setPostWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
                />
              </div>
            </div>
            <p className="text-xs text-slate-400">
              *Sampel post-HD diambil dengan metode slow flow Qb 100 ml/mnt selama 15 detik sebelum pompa dimatikan.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Hasil URR</span>
                <span className="text-2xl font-black text-teal-700">{urrValue.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">Estimasi Single Pool Kt/V</span>
                <span className="text-2xl font-black text-blue-700">{spKtV.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg text-xs flex items-start space-x-2 bg-white border border-slate-200">
              {spKtV >= 1.4 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-emerald-800">
                    <strong>Adekuat!</strong> Memenuhi standar KDOQI (Kt/V ≥ 1.4 / URR ≥ 70%). Jika jadwal 2x/minggu (PERNEFRI), target ideal adalah Kt/V ≥ 1.8.
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-amber-800">
                    <strong>Belum Adekuat.</strong> Target dosis KDOQI belum tercapai (Kt/V &lt; 1.4). Periksa akses vaskuler (resirkulasi), durasi dialisis aktual, atau koagulasi dialiser.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ufr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Berat Badan Kering Pasien (kg)</label>
              <input
                type="number"
                value={dryWeight}
                onChange={(e) => setDryWeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Target Penarikan Cairan / UF Goal (mL)</label>
              <input
                type="number"
                step="100"
                value={ufTarget}
                onChange={(e) => setUfTarget(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Lama Dialisis (Jam)</label>
              <input
                type="number"
                value={dialysisDuration}
                onChange={(e) => setDialysisDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Laju Ultrafiltrasi (UFR)
              </div>
              <div className="text-3xl font-black text-slate-800">
                {ufrMlKgHr.toFixed(1)}{' '}
                <span className="text-sm font-semibold text-slate-500">mL/kg/jam</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Setara dengan penarikan {(ufTarget / dialysisDuration).toFixed(0)} mL per jam.
              </p>
            </div>

            <div className="mt-4 p-3 rounded-lg text-xs flex items-start space-x-2 bg-white border border-slate-200">
              {ufrMlKgHr > 13 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="text-rose-800">
                    <strong>Peringatan Risiko Hipotensi!</strong> UFR &gt; 13 mL/kg/jam berisiko tinggi memicu syok intradialisis, kram berat, serta iskemia organ. Pertimbangkan memperpanjang waktu HD atau menurunkan target UF.
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-emerald-800">
                    <strong>Aman.</strong> Laju UFR masih dalam rentang fisiologis toleransi plasma refilling pasien (&le; 10 - 13 mL/kg/jam).
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cap' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kalsium Serum Total (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                value={calcium}
                onChange={(e) => setCalcium(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
              />
              <span className="text-[11px] text-slate-400">Rentang rujukan normal: 8.4 - 9.5 mg/dL</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fosfor / Fosfat Serum (mg/dL)</label>
              <input
                type="number"
                step="0.1"
                value={phosphorus}
                onChange={(e) => setPhosphorus(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-teal-500"
              />
              <span className="text-[11px] text-slate-400">Target KDOQI HD: 3.5 - 5.5 mg/dL</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Produk Kalsium × Fosfat (Ca × P)
              </div>
              <div className="text-3xl font-black text-slate-800">
                {caXpValue.toFixed(2)}{' '}
                <span className="text-sm font-semibold text-slate-500">mg²/dL²</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Ambang batas risiko kalsifikasi metastatik vaskuler: <strong>55 mg²/dL²</strong>
              </p>
            </div>

            <div className="mt-4 p-3 rounded-lg text-xs flex items-start space-x-2 bg-white border border-slate-200">
              {caXpValue > 55 ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-red-800">
                    <strong>BAHAYA: Kalsifikasi Vaskuler!</strong> Produk Ca × P &gt; 55 memicu presipitasi garam kalsium fosfat pada aorta dan miokard. Segera evaluasi dosis pengikat fosfat (ganti ke non-kalsium) dan batasi vitamin D aktif.
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-emerald-800">
                    <strong>Terkendali.</strong> Nilai Ca × P &lt; 55 mg²/dL². Risiko pengendapan kalsifikasi metastatik jaringan lunak dan pembuluh darah rendah.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rule6' && (
        <div className="space-y-4">
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs text-teal-900 flex items-start space-x-3">
            <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm mb-1">Panduan Standar "Rule of 6 (Six)" AV-Fistula</h4>
              <p>
                KDOQI merekomendasikan 5 parameter kunci sebelum AV-Fistula baru aman untuk ditusuk pertama kali (inisiasi) pada pasien hemodialisis rutin:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-teal-700 text-sm block mb-1">1. Waktu 6 Minggu</span>
              <p className="text-slate-600">Minimal 6 minggu pasca pembedahan agar terjadi arterialisasi (penebalan) dinding vena.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-teal-700 text-sm block mb-1">2. Diameter 6 mm</span>
              <p className="text-slate-600">Diameter lumen vena minimal 6 mm dengan batas tegas agar mudah dikanulasi jarum 16G/15G.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-teal-700 text-sm block mb-1">3. Kedalaman &lt; 6 mm</span>
              <p className="text-slate-600">Terletak di subkutis kurang dari 6 mm dari permukaan kulit agar mudah teraba dan ditusuk.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-teal-700 text-sm block mb-1">4. Aliran 600 ml/menit</span>
              <p className="text-slate-600">Laju aliran darah (flow rate) vena minimal 600 ml/menit untuk mencegah resirkulasi.</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 sm:col-span-2 md:col-span-2">
              <span className="font-bold text-teal-700 text-sm block mb-1">5. Panjang Akses 6 Inci (15 cm)</span>
              <p className="text-slate-600">Memiliki segmen pembuluh darah lurus minimal 6 inci dari garis anastomosis untuk rotasi tusukan Rope Ladder (jarak jarum arteri dan vena minimal 5-7 cm).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
