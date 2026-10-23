import React, { useState } from 'react';
import { X, Settings, Sparkles, Check, Share2, Save } from 'lucide-react';
import type { MysteryConfig } from '../types/game';
import { sounds } from '../utils/audio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MysteryConfig;
  onSaveConfig: (newConfig: MysteryConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<MysteryConfig>({ ...config });
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof MysteryConfig, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    sounds.playUnlockSuccess();
    onSaveConfig(formData);
    onClose();
  };

  const handleCopyLink = () => {
    sounds.playTick();
    const url = new URL(window.location.href);
    url.searchParams.set('name', formData.recipientName);
    url.searchParams.set('age', String(formData.turningAge));
    url.searchParams.set('sender', formData.senderName);
    if (formData.surpriseGift) {
      url.searchParams.set('gift', encodeURIComponent(formData.surpriseGift));
    }
    if (formData.cryptexWord) {
      url.searchParams.set('word', formData.cryptexWord);
    }
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0f121d] border-2 border-amber-600/60 shadow-2xl shadow-black text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/40 bg-amber-950/20">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-lg font-cinzel font-bold tracking-wide text-amber-200">
                Mystery Personalization & Settings
              </h2>
              <p className="text-xs text-amber-400/70 font-serif">
                Customize who this midnight mystery is created for
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
                Birthday Person's Name
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm font-cinzel"
                placeholder="e.g. Maya"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
                Your Name / Sender Title
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => handleChange('senderName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm"
                placeholder="e.g. Your Secret Admirer"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
                Turning Age
              </label>
              <input
                type="number"
                value={formData.turningAge}
                onChange={(e) => handleChange('turningAge', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm font-mono-code"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
                Cryptex Password Word
              </label>
              <input
                type="text"
                value={formData.cryptexWord}
                onChange={(e) => handleChange('cryptexWord', e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm font-mono-code tracking-widest uppercase"
                placeholder="e.g. MIDNIGHT"
                maxLength={10}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
              Personalized Midnight Letter
            </label>
            <textarea
              rows={4}
              value={formData.customMessage}
              onChange={(e) => handleChange('customMessage', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm font-serif leading-relaxed"
              placeholder="Write a heartfelt birthday message that appears when the vault is opened..."
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase text-amber-300/80 mb-1">
              Secret Surprise Gift (Revealed in the Vault)
            </label>
            <input
              type="text"
              value={formData.surpriseGift}
              onChange={(e) => handleChange('surpriseGift', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:border-amber-500 focus:outline-none text-slate-100 text-sm"
              placeholder="e.g. Weekend getaway tickets to Paris & dinner at 8 PM!"
            />
          </div>

          {/* Share Link Banner */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-200 font-serif">
                Generate a personalized share link with these settings
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 text-xs font-mono-code flex items-center space-x-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-amber-900/40 bg-slate-950/70 flex justify-between items-center">
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-sans transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold text-xs tracking-wider flex items-center space-x-1.5 shadow-md transition-all hover:scale-105"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Apply Customization</span>
          </button>
        </div>
      </div>
    </div>
  );
};
