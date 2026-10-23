// -----------------------------------------------------------------------------
// TYPE DEFINITIONS — MARIE'S BIRTHDAY SANCTUARY CONTENT MODEL
// -----------------------------------------------------------------------------

export interface RecipientInfo {
  name: string;
  nicknames: string[];
  nationality: string;
  avatar: string;
  birthday: string;
  role: string;
  personality: string;
}

export interface FavoritesInfo {
  colorName: string;
  colorHex: string;
  colorSecondaryHex: string;
  flower: string;
  hobby: string;
  pet: string;
  place: string;
  artists: string[];
}

export interface ChildhoodMemory {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  caption: string;
  note: string;
  rotation: string;
  date?: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration: string;
  cover: string;
}

export interface TeddyOption {
  id: string;
  name: string;
  description: string;
}

export interface SanctuaryContent {
  recipient: RecipientInfo;
  favorites: FavoritesInfo;
  wish: {
    title: string;
    description: string;
    reflection: string;
  };
  childhoodMemories: ChildhoodMemory[];
  photos: GalleryPhotoItem[];
  playlist: SongTrack[];
  letter: {
    envelopeLabel: string;
    tapToOpen: string;
    title: string;
    greeting: string;
    paragraphs: string[];
    signoff: string;
    sender: string;
    text: string;
    continueLabel: string;
  };
}

// -----------------------------------------------------------------------------
// LEGACY COMPATIBILITY TYPES
// -----------------------------------------------------------------------------

export interface QuizOption {
  id: string;
  label: string;
  image?: string;
}

export interface QuizChapterContent {
  type: 'quiz';
  title: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  hint: string;
  successMessage: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  atmosphericEffect: 'rain' | 'snow';
}

export interface ChoiceChapterContent {
  type: 'choice';
  title: string;
  question: string;
  options: ChoiceOption[];
  successMessage: string;
}

export interface RiddleChapterContent {
  type: 'riddle';
  title: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  hint: string;
  finalMessage: string;
  continueLabel: string;
}

export interface ChaptersData {
  chapter1: QuizChapterContent;
  chapter2: QuizChapterContent;
  chapter3: ChoiceChapterContent;
  chapter4: RiddleChapterContent;
}

export interface AudioTrack {
  id: string;
  title: string;
  src: string;
}

export interface AudioControls {
  isPlaying: boolean;
  isMuted: boolean;
  isUnconfigured: boolean;
  hasError: boolean;
  toggle: () => void;
  toggleMute: () => void;
}

export interface SiteContent extends SanctuaryContent {
  entrance: {
    heading: string;
    supporting: string;
    ctaLabel: string;
    welcomeMessage: string;
    welcomeSubtext: string;
  };
  birthdayGift: {
    greeting: string;
    subtext: string;
    boxPrompt: string;
    continueLabel: string;
  };
  chapters: ChaptersData;
  audio: {
    mainTrack: AudioTrack;
    finalTrack: AudioTrack;
    startMuted: boolean;
  };
  a11y: {
    enterButtonLabel: string;
    musicPlayLabel: string;
    musicPauseLabel: string;
    musicMuteLabel: string;
    musicUnmuteLabel: string;
    starFieldLabel: string;
  };
}