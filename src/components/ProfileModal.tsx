import React, { useState } from 'react';
import { X, User, Plus, Check, RefreshCw, Hospital, BadgeCheck } from 'lucide-react';
import { UserProfile } from '../types/dialysis';
import {
  getProfiles,
  saveProfiles,
  getActiveProfileId,
  setActiveProfileId,
  getInitialProgressData,
  saveUserProgress,
} from '../services/storageService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileChanged: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileChanged,
}) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(getProfiles());
  const [activeId, setActiveId] = useState<string>(getActiveProfileId());
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // New Profile Form
  const [newName, setNewName] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('S.Kep., Ners');
  const [newHospital, setNewHospital] = useState<string>('');
  const [newNira, setNewNira] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectProfile = (id: string) => {
    setActiveProfileId(id);
    setActiveId(id);
    onProfileChanged();
    onClose();
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const colors = ['#0d9488', '#0284c7', '#4f46e5', '#7c3aed', '#059669', '#d97706'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newProfile: UserProfile = {
      id: `nurse-${Date.now()}`,
      name: newName.trim(),
      title: newTitle.trim(),
      hospital: newHospital.trim() || 'Unit Dialisis',
      niraOrNik: newNira.trim() || 'IPDI-2021',
      avatarColor: randomColor,
      joinedAt: new Date().toISOString(),
    };

    const updated = [...profiles, newProfile];
    saveProfiles(updated);
    setProfiles(updated);
    // Initialize progress for this new user
    saveUserProgress(getInitialProgressData(newProfile.id));
    setActiveProfileId(newProfile.id);
    setActiveId(newProfile.id);

    setIsAddingNew(false);
    setNewName('');
    setNewHospital('');
    setNewNira('');
    onProfileChanged();
    onClose();
  };

  const handleResetProgress = (id: string) => {
    if (confirm('Yakin ingin mereset seluruh histori progres belajar dan skor kuis untuk profil ini?')) {
      saveUserProgress(getInitialProgressData(id));
      onProfileChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Profil Peserta Resertifikasi</h3>
              <p className="text-xs text-slate-400">Kelola akun dan lacak progres belajar personal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isAddingNew ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daftar Profil Perawat
                </span>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Profil Baru</span>
                </button>
              </div>

              {/* List */}
              <div className="space-y-3">
                {profiles.map((p) => {
                  const isActive = p.id === activeId;
                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'border-teal-600 bg-teal-50/70 shadow-xs ring-2 ring-teal-500/20'
                          : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                      }`}
                      onClick={() => handleSelectProfile(p.id)}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs"
                          style={{ backgroundColor: p.avatarColor || '#0d9488' }}
                        >
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-slate-800 text-sm truncate">
                              {p.name}
                            </span>
                            <span className="text-xs text-slate-500">{p.title}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                            <span className="truncate">{p.hospital}</span>
                            <span>•</span>
                            <span className="font-mono text-[11px]">{p.niraOrNik}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {isActive && (
                          <span className="text-teal-700 bg-teal-100 p-1.5 rounded-full">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </span>
                        )}
                        <button
                          title="Reset progres untuk profil ini"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResetProgress(p.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-200/60"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Add New Profile Form */
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <h4 className="font-bold text-slate-800 text-sm">Buat Profil Perawat Baru</h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Batal
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Perawat
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Rahmawati"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gelar / Jenjang
                  </label>
                  <select
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-teal-500 bg-white"
                  >
                    <option value="S.Kep., Ners">S.Kep., Ners</option>
                    <option value="A.Md.Kep">A.Md.Kep</option>
                    <option value="M.Kep., Ners">M.Kep., Ners</option>
                    <option value="Perawat Dialisis">Perawat Dialisis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    No. NIRA IPDI / NIK
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 3171098234"
                    value={newNira}
                    onChange={(e) => setNewNira(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit Hemodialisa / Rumah Sakit
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Unit HD RSUP Dr. Sardjito"
                  value={newHospital}
                  onChange={(e) => setNewHospital(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-teal-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
