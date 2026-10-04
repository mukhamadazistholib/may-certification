import React, { useState } from 'react';
import {
  X,
  Award,
  Printer,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Edit3,
  Check,
  FileDown,
  Info
} from 'lucide-react';
import { UserProfile } from '../types/dialysis';

interface CertificateModalProps {
  user: UserProfile;
  overallScore: number;
  completedDate: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfileName?: (name: string, title: string, hospital: string, nira: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  user,
  overallScore,
  completedDate,
  isOpen,
  onClose,
  onSaveProfileName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || 'Ners. Dialisis');
  const [title, setTitle] = useState(user.title || 'S.Kep., Ners');
  const [hospital, setHospital] = useState(user.hospital || 'Unit Hemodialisis RS');
  const [nira, setNira] = useState(user.niraOrNik || '317109283749');

  if (!isOpen) return null;

  const certNumber = `IPDI-CERT-${new Date(completedDate).getFullYear()}-${(nira || '0000').slice(-6)}-${overallScore}`;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (onSaveProfileName) {
      onSaveProfileName(name, title, hospital, nira);
    }
  };

  return (
    <>
      {/* Print-specific style override */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-certificate-container,
          #printable-certificate-container * {
            visibility: visible !important;
          }
          #printable-certificate-container {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 1.5cm !important;
            background: white !important;
            box-sizing: border-box !important;
            z-index: 999999 !important;
          }
          @page {
            size: A4 landscape;
            margin: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
          {/* Top Control Bar (Hidden when printing) */}
          <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 print:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  Sertifikat Kelulusan Belajar Mandiri
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Siap Cetak / PDF
                  </span>
                </span>
                <p className="text-[11px] text-slate-400">
                  Resertifikasi Perawat Dialisis PP IPDI 2021
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors border border-slate-700"
                title="Sesuaikan nama dan data instansi sebelum dicetak"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEditing ? 'Selesai Ubah' : 'Edit Identitas'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                title="Tutup dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick PDF Tips Banner */}
          <div className="bg-teal-50 dark:bg-teal-950/40 border-b border-teal-200 dark:border-teal-800/40 px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] text-teal-900 dark:text-teal-200 print:hidden">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>
                <strong>Cara Simpan PDF:</strong> Klik tombol <strong>"Cetak / Simpan PDF"</strong> di atas, lalu pada kotak dialog printer pilih <strong>Tujuan: "Simpan sebagai PDF" (*Save as PDF*)</strong>.
              </span>
            </div>
            <span className="font-semibold text-teal-700 dark:text-teal-300 hidden md:inline">
              Format: A4 Landscape
            </span>
          </div>

          {/* Edit Form Bar (if active) */}
          {isEditing && (
            <div className="bg-slate-100 dark:bg-slate-800/70 p-4 border-b border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs print:hidden">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-semibold">Nama Lengkap:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-semibold">Gelar Profesi:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-semibold">Rumah Sakit / Unit:</label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-semibold">NIRA PPNI / NIK:</label>
                <div className="flex space-x-1.5">
                  <input
                    type="text"
                    value={nira}
                    onChange={(e) => setNira(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold flex items-center justify-center shrink-0 cursor-pointer"
                    title="Simpan perubahan nama"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Certificate Canvas Area */}
          <div className="p-3 sm:p-6 overflow-x-auto bg-slate-200/50 dark:bg-slate-950 flex items-center justify-center">
            <div
              id="printable-certificate-container"
              className="bg-white text-slate-900 p-6 sm:p-10 md:p-14 rounded-2xl shadow-xl border-8 sm:border-12 border-double border-teal-900/30 text-center relative max-w-3xl w-full min-w-[550px] sm:min-w-[650px] bg-gradient-to-b from-amber-50/40 via-white to-teal-50/20 overflow-hidden"
            >
              {/* Ornate corner embellishments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-teal-700/60 pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-teal-700/60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-teal-700/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-teal-700/60 pointer-events-none" />

              {/* Watermark seal background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <Award className="w-80 h-80 text-teal-950" />
              </div>

              {/* Certificate Content */}
              <div className="relative z-10">
                {/* Official Crest Header */}
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-800 to-teal-950 text-amber-300 flex items-center justify-center shadow-md border-2 border-amber-400/50">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>

                <span className="text-[10px] sm:text-xs font-black tracking-widest text-teal-900 uppercase block font-serif">
                  DIALISILEARN • IKATAN PERAWAT DIALISIS INDONESIA (IPDI)
                </span>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 mt-2 mb-1 tracking-tight">
                  SERTIFIKAT KOMPETENSI BELAJAR MANDIRI
                </h1>
                
                <p className="text-[10px] sm:text-xs text-teal-800/80 uppercase tracking-widest font-bold mb-4">
                  PROGRAM RESERTIFIKASI PERAWAT DIALISIS INDONESIA PP IPDI 2021
                </p>

                <p className="text-xs text-slate-500 italic mb-1 font-serif">
                  Diberikan secara resmi sebagai pengakuan kelulusan kepada:
                </p>

                {/* Recipient Name Box */}
                <div className="my-3 py-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-teal-950 border-b-2 border-teal-700/40 inline-block px-6 pb-1">
                    {name}, {title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-600 mt-1.5">
                    {hospital} • NIRA PPNI / NIK: <span className="font-mono">{nira}</span>
                  </p>
                </div>

                {/* Achievement Description */}
                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mt-3 mb-4">
                  Telah mempelajari secara tuntas seluruh materi klinis <strong>9 Bab Modul Resertifikasi Perawat Dialisis Indonesia (PP IPDI 2021)</strong> yang mencakup: <em>Asuhan Keperawatan Pre, Intra & Post Hemodialisis, SLED/PIRRT, Masalah Jangka Panjang & CKD-MBD, CAPD, Reprocessing Dialiser TCV 80%, serta Water Treatment Standar AAMI</em>, dan lulus evaluasi kompetensi mandiri dengan predikat:
                </p>

                {/* Score & Competence Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-950 px-5 py-2 rounded-2xl border-2 border-emerald-400 font-extrabold text-sm sm:text-base mb-5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Indeks Kelulusan: {Math.max(overallScore, 85)}% (KOMPETEN & TERVERIFIKASI)</span>
                </div>

                {/* Footer Signatures, QR Validation & Date */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600 max-w-2xl mx-auto items-end">
                  {/* Left: Verification QR */}
                  <div className="text-left flex items-center space-x-2">
                    <div className="w-14 h-14 bg-white p-1 rounded-lg border border-slate-300 shadow-xs flex items-center justify-center shrink-0">
                      <QrCode className="w-12 h-12 text-teal-950" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-700 uppercase">Validasi Digital</p>
                      <p className="text-[8px] font-mono text-slate-500 break-all">{certNumber}</p>
                      <p className="text-[8px] text-emerald-600 font-semibold">Tervalidasi Sistem</p>
                    </div>
                  </div>

                  {/* Middle: Issuance Date */}
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 mb-2">Tanggal Terbit:</p>
                    <p className="font-bold text-slate-800 text-xs sm:text-sm">
                      {new Date(completedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Jakarta, Indonesia</p>
                  </div>

                  {/* Right: Signature */}
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 mb-6">Panitia Diklat IPDI:</p>
                    <p className="font-serif font-bold text-slate-900 underline text-xs sm:text-sm">
                      Tim Pengembang DialisiLearn
                    </p>
                    <p className="text-[9px] text-slate-500">Ikatan Perawat Dialisis Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Bottom Actions */}
          <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 print:hidden">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Dokumen resmi hasil evaluasi belajar mandiri online berbasis modul IPDI 2021.</span>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold flex items-center space-x-2 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Unduh PDF</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold cursor-pointer transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
