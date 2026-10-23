import React, { useState } from 'react';
import { X, Briefcase, Sparkles, Key, Compass, Sun, ShieldAlert } from 'lucide-react';
import type { InventoryItem } from '../types/game';
import { sounds } from '../utils/audio';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  inventory,
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
    inventory.length > 0 ? inventory[0] : null
  );

  if (!isOpen) return null;

  const getItemIcon = (id: string) => {
    switch (id) {
      case 'uv_torch': return <Sun className="w-8 h-8 text-cyan-400" />;
      case 'clock_key': return <Key className="w-8 h-8 text-amber-400" />;
      case 'star_chart': return <Compass className="w-8 h-8 text-indigo-400" />;
      case 'medallion': return <ShieldAlert className="w-8 h-8 text-amber-300" />;
      default: return <Sparkles className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e111a] border-2 border-slate-700/70 shadow-2xl shadow-indigo-950/60 text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-cinzel font-bold tracking-wide text-indigo-200">
              Detective's Satchel (Inventory)
            </h2>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {inventory.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-serif italic">
              Your satchel is empty. Solve clues in the room to collect essential keys and artifacts.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Slots */}
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase font-mono-code text-slate-400 tracking-wider">
                  Carried Artifacts ({inventory.length})
                </h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {inventory.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          sounds.playDialClick();
                          setSelectedItem(item);
                        }}
                        className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                          isSelected
                            ? 'bg-indigo-950/60 border-indigo-400 shadow-lg shadow-indigo-950'
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                        }`}
                      >
                        <div className="mb-2">{getItemIcon(item.id)}</div>
                        <span className="text-xs font-cinzel font-semibold text-slate-200 truncate w-full">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Item Inspection Panel */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col justify-between">
                {selectedItem ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                      <div className="p-2.5 rounded-lg bg-indigo-950/50 border border-indigo-800/40">
                        {getItemIcon(selectedItem.id)}
                      </div>
                      <div>
                        <h3 className="font-cinzel font-bold text-amber-200 text-sm">
                          {selectedItem.name}
                        </h3>
                        <span className="text-[10px] text-indigo-400 font-mono-code uppercase">
                          Examined Object
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-serif leading-relaxed">
                      {selectedItem.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30 text-amber-300 text-xs font-serif italic">
                      <span className="font-semibold">{selectedItem.actionHint}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic my-auto text-center">
                    Select an item to inspect its details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-all"
          >
            Close Satchel
          </button>
        </div>
      </div>
    </div>
  );
};
