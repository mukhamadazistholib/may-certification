import React from 'react';
import { X, Award, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/dialysis';

interface CertificateModalProps {
  user: UserProfile;
  overallScore: number;
  completedDate: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  user,
  overallScore,
  completedDate,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top toolbar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <span className="text-xs font-semibold text-teal-400 flex items-center space-x-1.5">
            <Award className="w-4 h-4" />
            <span>Sertifikat Kelulusan Belajar Mandiri Resertifikasi IPDI</span>
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-4 sm:p-8 md:p-12 bg-gradient-to-b from-amber-50/50 via-white to-teal-50/30 border-4 sm:border-8 border-double border-teal-900/20 text-center relative print:border-none print:p-4">
          {/* Watermark seal background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Award className="w-64 sm:w-96 h-64 sm:h-96 text-teal-950" />
          </div>

          {/* Heading */}
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-teal-800 text-white mx-auto flex items-center justify-center mb-3 shadow-md">
              <ShieldCheck className="w-7 h-7 sm:w-10 sm:h-10" />
            </div>

            <span className="text-[9px] sm:text-[11px] font-black tracking-widest text-teal-800 uppercase block">
              DIALISILEARN • IKATAN PERAWAT DIALISIS INDONESIA (IPDI)
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-slate-900 mt-1 mb-1 sm:mb-2 tracking-tight">
              SERTIFIKAT KOMPETENSI BELAJAR MANDIRI
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 sm:mb-6">
              PROGRAM RESERTIFIKASI PERAWAT DIALISIS 2021
            </p>

            <p className="text-xs text-slate-600 italic mb-1">Diberikan secara resmi kepada:</p>
            <div className="my-2 sm:my-3">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-teal-900 border-b-2 border-teal-700/30 inline-block px-4 sm:px-8 pb-1">
                {user.name}, {user.title}
              </h3>
              <p className="text-xs font-semibold text-slate-600 mt-1">
                {user.hospital} • NIRA/No: {user.niraOrNik}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed mt-3 sm:mt-4 mb-5 sm:mb-6">
              Telah menyelesaikan secara tuntas seluruh materi pembelajaran 9 Bab (Anatomi & TPG, Asuhan Pre, Intra & Post HD, SLED/PIRRT, Masalah Jangka Panjang, CAPD, Reprocessing Dialiser, dan Water Treatment Standar AAMI) serta lulus evaluasi kuis otomatis dengan capaian skor rata-rata:
            </p>

            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 px-4 sm:px-6 py-2 rounded-2xl border border-emerald-300 font-extrabold text-sm sm:text-base mb-6 sm:mb-8">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>Indeks Penguasaan: {overallScore}% (KOMPETEN)</span>
            </div>

            {/* Signature & Date columns */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-slate-200 text-xs text-slate-600 max-w-lg mx-auto">
              <div>
                <p className="text-slate-400 mb-6 sm:mb-8">Tanggal Penerbitan:</p>
                <p className="font-bold text-slate-800 text-[11px] sm:text-xs">
                  {new Date(completedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Verifikasi Sistem Digital</p>
              </div>
              <div>
                <p className="text-slate-400 mb-6 sm:mb-8">Divisi Diklat Resertifikasi:</p>
                <p className="font-bold text-slate-800 underline text-[11px] sm:text-xs">Panitia Diklat IPDI</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Ikatan Perawat Dialisis Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-[11px] text-slate-500 text-center print:hidden">
          Dokumen ini merupakan tanda bukti kelulusan belajar mandiri online berbasis modul resmi IPDI 2021.
        </div>
      </div>
    </div>
  );
};
