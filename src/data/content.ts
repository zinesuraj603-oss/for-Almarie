// -----------------------------------------------------------------------------
// CENTRAL CONTENT FILE — MARIE'S BIRTHDAY SANCTUARY
// Absolutely zero unicode emoji characters. Clean SVG and Lucide icons only.
// -----------------------------------------------------------------------------

import type { SiteContent } from '../types/content';

const baseUrl = (import.meta.env.BASE_URL || '/').endsWith('/')
  ? (import.meta.env.BASE_URL || '/')
  : `${import.meta.env.BASE_URL || '/'}/`;

export const resolveAsset = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

export const siteContent: SiteContent = {
  recipient: {
    name: 'Marie',
    nicknames: ['Penguin', 'Marie Gold Biscuit', 'Babu'],
    nationality: 'Proud Filipina',
    avatar: resolveAsset('images/photo1.jpg'),
    birthday: 'December 19',
    role: 'Daydreamer & Gamer',
    personality: 'Kind, Ambivert, Gentle Soul',
  },

  favorites: {
    colorName: 'Blue-Black',
    colorHex: '#0f172a',
    colorSecondaryHex: '#1e293b',
    flower: 'Tulips',
    hobby: 'Listening to music & playing games',
    pet: 'Dog',
    place: 'Home',
    artists: ['Evan Lee', 'Jungkook', 'V (Taehyung)'],
  },

  wish: {
    title: "Her Heart's Most Selfless Wish",
    description:
      'That my parents have a healthy life and live so long until I succeed.',
    reflection:
      'A wish that speaks volumes about who you are at your core — a deeply loving daughter whose highest aspiration is the health and happiness of the family she cherishes. Your dedication will take you to every height you dream of, Marie.',
  },

  childhoodMemories: [
    {
      id: 'mom-charm',
      tag: 'The Charmer',
      title: 'Winning Over Every Mother',
      description:
        'Someone helped me, and his mother liked me so much! You have that effortless kindness and charm that makes anyone’s family instantly want to adopt you.',
    },
    {
      id: 'glass-throw',
      tag: 'The Little Rebel',
      title: 'The Legendary Glass Toss',
      description:
        'When I threw something at the other kid... which turned out to be a glass! Proof that behind that gentle penguin smile is a fierce protector you never want to challenge.',
    },
  ],

  photos: [
    {
      id: 'photo1',
      src: resolveAsset('images/photo1.jpg'),
      caption: 'A moment I will always treasure.',
      note: 'A little memory',
      rotation: '-rotate-2',
      date: 'Treasured Memory',
    },
    {
      id: 'photo2',
      src: resolveAsset('images/photo2.jpg'),
      caption: 'That beautiful, heartwarming smile.',
      note: 'Pure happiness',
      rotation: 'rotate-1',
      date: 'Sweet Moments',
    },
    {
      id: 'photo3',
      src: resolveAsset('images/photo3.jpg'),
      caption: 'Always bringing comfort and light.',
      note: 'Sunshine',
      rotation: '-rotate-1',
      date: 'Golden Days',
    },
    {
      id: 'photo4',
      src: resolveAsset('images/photo4.jpg'),
      caption: 'Just being completely and wonderfully you.',
      note: 'Simply Marie',
      rotation: 'rotate-2',
      date: 'Everlasting',
    },
  ],

  playlist: [
    {
      id: 'lover',
      title: 'Lover',
      artist: 'Taylor Swift',
      src: resolveAsset('songs/lover.mp3'),
      duration: '3:41',
      cover: resolveAsset('images/photo2.jpg'),
    },
    {
      id: 'perfect',
      title: 'Perfect',
      artist: 'Ed Sheeran',
      src: resolveAsset('songs/perfect.mp3'),
      duration: '4:23',
      cover: resolveAsset('images/photo3.jpg'),
    },
  ],

  letter: {
    envelopeLabel: 'A birthday letter, written just for you',
    tapToOpen: 'Open with love',
    title: 'A Letter for Marie',
    greeting: 'To Marie,',
    paragraphs: [
      'My favourite penguin, my Marie gold biscuit, my babu...',
      'Happy Birthday, Marie!',
      'On your special day, I wish you all the peace, good health, and beautiful moments this world has to offer. I hope your parents stay healthy and happy for a very, very long time, and that you get to see every single dream of yours come true. You deserve every bit of happiness that comes your way.',
      "I'll always be grateful that we crossed paths on June 12. Who would have thought that random reels and casual talks would turn into such precious memories? From your voice notes and lovely accent to all our silly little moments, you have become someone genuinely special to me. Honestly, talking to you is one of my favourite parts of the day — even the simplest conversations have a way of making an ordinary day feel so much lighter.",
      'And you know what? Sometimes you remind me of Hinata from Naruto — sweet, gentle, and quiet in a way that just stays with you. Maybe that is why you hold such a unique place in my heart.',
      'I hope this new year brings you immense warmth, peace of mind, and memories you will treasure forever. Keep smiling, stay exactly who you are, and never hold back from going after what sets your heart on fire.',
      'Happy Birthday once again, Marie. May this year be exceptionally kind to you, today and always.',
    ],
    signoff: 'With lots of love and a warm penguin hug,',
    sender: 'Yours, Suraj',
    text: `To Marie,

My favourite penguin, my Marie gold biscuit, my babu...

Happy Birthday, Marie!

On your special day, I wish you all the peace, good health, and beautiful moments this world has to offer. I hope your parents stay healthy and happy for a very, very long time, and that you get to see every single dream of yours come true. You deserve every bit of happiness that comes your way.

I'll always be grateful that we crossed paths on June 12. Who would have thought that random reels and casual talks would turn into such precious memories? From your voice notes and lovely accent to all our silly little moments, you have become someone genuinely special to me. Honestly, talking to you is one of my favourite parts of the day — even the simplest conversations have a way of making an ordinary day feel so much lighter.

And you know what? Sometimes you remind me of Hinata from Naruto — sweet, gentle, and quiet in a way that just stays with you. Maybe that is why you hold such a unique place in my heart.

I hope this new year brings you immense warmth, peace of mind, and memories you will treasure forever. Keep smiling, stay exactly who you are, and never hold back from going after what sets your heart on fire.

Happy Birthday once again, Marie. May this year be exceptionally kind to you, today and always.

With lots of love and a warm penguin hug,
Yours, Suraj`,
    continueLabel: 'Continue the Journey',
  },

  // Legacy compat fields
  entrance: {
    heading: 'A Little World Made Just for You',
    supporting: "There's something special waiting inside.",
    ctaLabel: 'Enter Your Birthday World',
    welcomeMessage: 'Welcome, {name}.',
    welcomeSubtext: 'Your midnight is almost here.',
  },

  birthdayGift: {
    greeting: 'Happy Birthday, {name}!',
    subtext: "I made this little universe just for you. Ready to see what's inside?",
    boxPrompt: 'Tap to open',
    continueLabel: 'Unlock the First Mystery',
  },

  chapters: {
    chapter1: {
      type: 'quiz',
      title: 'Chapter 1: Her Favourite Colour',
      question: 'Which colour feels most like Marie?',
      options: [
        { id: 'pink', label: 'Pink' },
        { id: 'blue-black', label: 'Blue-black' },
        { id: 'purple', label: 'Purple' },
      ],
      correctOptionId: 'blue-black',
      hint: 'Think of the midnight sky.',
      successMessage: 'Deep, calming, and beautiful — just like you.',
    },
    chapter2: {
      type: 'quiz',
      title: 'Chapter 2: Her Favourite Songs',
      question: "Which songs are among Marie's favourites?",
      options: [
        { id: 'lover', label: 'Lover' },
        { id: 'perfect', label: 'Perfect' },
        { id: 'both', label: 'Both Lover and Perfect' },
      ],
      correctOptionId: 'both',
      hint: 'Two beautiful songs for a beautiful soul.',
      successMessage: 'Two timeless melodies for an unforgettable birthday.',
    },
    chapter3: {
      type: 'choice',
      title: 'Chapter 3: Choose Her Sky',
      question: 'If you could give Marie the perfect night sky, which would it be?',
      options: [
        { id: 'rainy', label: 'Rainy Night', atmosphericEffect: 'rain' },
        { id: 'snowy', label: 'Snowy Night', atmosphericEffect: 'snow' },
      ],
      successMessage: 'A soothing choice. Let the atmosphere surround you.',
    },
    chapter4: {
      type: 'riddle',
      title: 'Chapter 4: A Little Message for Marie',
      question: 'I bloom in beautiful colours with an elegant cup-like shape. What am I?',
      options: [
        { id: 'tulip', label: 'Tulip' },
        { id: 'sunflower', label: 'Sunflower' },
        { id: 'rose', label: 'Rose' },
        { id: 'lily', label: 'Lily' },
      ],
      correctOptionId: 'tulip',
      hint: 'Known for its elegant, cup-like shape.',
      finalMessage: 'You found the secrets hidden in this world.',
      continueLabel: 'Discover Your Little World',
    },
  },

  audio: {
    mainTrack: {
      id: 'lover',
      title: 'Lover',
      src: '/songs/lover.mp3',
    },
    finalTrack: {
      id: 'perfect',
      title: 'Perfect',
      src: '/songs/perfect.mp3',
    },
    startMuted: false,
  },

  a11y: {
    enterButtonLabel: 'Enter the birthday experience',
    musicPlayLabel: 'Play music',
    musicPauseLabel: 'Pause music',
    musicMuteLabel: 'Mute music',
    musicUnmuteLabel: 'Unmute music',
    starFieldLabel: 'Decorative star field',
  },
};

export const content = siteContent;

export function interpolateName(template: string): string {
  return template.replace(/\{name\}/g, siteContent.recipient.name);
}

export function getRecipientName(): string {
  return siteContent.recipient.name;
}

export default siteContent;