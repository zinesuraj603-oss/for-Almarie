import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Camera,
  Disc3,
  Mail,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { siteContent } from '../data/content';

export type NavTab = 'dashboard' | 'teddy' | 'scrapbook' | 'playlist' | 'letter';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function Navbar({
  activeTab,
  onTabChange,
  isPlaying,
  onTogglePlay,
}: NavbarProps) {
  const tabs = [
    { id: 'dashboard' as NavTab, label: 'Home', icon: Sparkles },
    { id: 'teddy' as NavTab, label: 'Giant Teddy', icon: Heart },
    { id: 'scrapbook' as NavTab, label: 'Memories', icon: Camera },
    { id: 'playlist' as NavTab, label: 'Playlist', icon: Disc3 },
    { id: 'letter' as NavTab, label: 'Letter', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200/50 bg-[#FFF0F5]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6">
        {/* Left: Brand / Title */}
        <button
          type="button"
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-2.5 text-left transition hover:opacity-85 focus:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 text-white shadow-sm shadow-pink-300/40">
            <Heart className="h-4 w-4 fill-white text-white" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A64D70]">
              Sanctuary
            </span>
            <span className="block font-cinzel text-sm font-semibold tracking-wide text-[#78344F] sm:text-base">
              Marie
            </span>
          </div>
        </button>

        {/* Center: Navigation Pills (Image 2 style) */}
        <nav
          className="flex items-center gap-1 rounded-full border border-pink-200/70 bg-white/70 p-1 shadow-sm backdrop-blur-md overflow-x-auto max-w-[50vw] sm:max-w-none"
          aria-label="Main Navigation"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-[#874A62] hover:bg-pink-100/50 hover:text-[#5F243B]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 shadow-sm shadow-pink-400/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Music Toggle & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Audio Playback button */}
          <button
            type="button"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause music' : 'Play music'}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className={`flex h-8 w-8 items-center justify-center rounded-full border border-pink-200/70 shadow-sm transition ${
              isPlaying
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse'
                : 'bg-white/70 text-[#874A62] hover:bg-pink-100/70'
            }`}
          >
            {isPlaying ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          {/* Quick Letter Icon with badge */}
          <button
            type="button"
            onClick={() => onTabChange('letter')}
            title="Read Birthday Letter"
            aria-label="Read Birthday Letter"
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-pink-200/70 bg-white/70 text-[#874A62] shadow-sm transition hover:bg-pink-100/70"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Avatar with online dot */}
          <div className="relative hidden sm:block">
            <img
              src={siteContent.recipient.avatar}
              alt="Marie"
              className="h-8 w-8 rounded-full border border-pink-300 object-cover shadow-sm"
            />
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400"
              title="Babu · Online"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
