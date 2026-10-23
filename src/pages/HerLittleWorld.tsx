import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Camera,
  Sparkles,
  ArrowRight,
  Stars,
  Flower2,
  Moon,
} from 'lucide-react';
import StarField from '../components/StarField';
import PageSong from '../components/PageSong';

interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  note: string;
  rotation: string;
}

interface HerLittleWorldProps {
  onComplete: () => void;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo1',
    src: '/images/photo1.jpg',
    caption: 'A moment I will always treasure.',
    note: 'A little memory',
    rotation: '-rotate-2',
  },
  {
    id: 'photo2',
    src: '/images/photo2.jpg',
    caption: 'That beautiful smile.',
    note: 'A little happiness',
    rotation: '-rotate-2',
  },
  {
    id: 'photo3',
    src: '/images/photo3.jpg',
    caption: 'Always bringing the light.',
    note: 'A little sunshine',
    rotation: 'rotate-0',
  },
  {
    id: 'photo4',
    src: '/images/photo4.jpg',
    caption: 'Just being perfectly you.',
    note: 'Simply you',
    rotation: 'rotate-2',
  },
];

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  left: `${((i * 37 + 9) % 92) + 4}%`,
  delay: i * 0.75,
  duration: 8 + (i % 5) * 1.5,
  size: 12 + (i % 4) * 4,
}));

export function HerLittleWorld({ onComplete }: HerLittleWorldProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [loadedPhotos, setLoadedPhotos] = useState<string[]>([]);
  const [failedPhotos, setFailedPhotos] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();

  const featuredPhoto = GALLERY_PHOTOS[0];
  const scrapbookPhotos = GALLERY_PHOTOS.slice(1);

  const closeViewer = useCallback(() => setSelectedPhoto(null), []);

  const showNext = useCallback(() => {
    setSelectedPhoto((current) =>
      current === null ? null : (current + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedPhoto((current) =>
      current === null
        ? null
        : (current - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (selectedPhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrevious();
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedPhoto, closeViewer, showNext, showPrevious]);

  const markLoaded = (id: string) => {
    setLoadedPhotos((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const markFailed = (id: string) => {
    setFailedPhotos((current) =>
      current.includes(id) ? current : [...current, id]
    );
    console.error(`Could not load gallery image: ${id}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#FFF0F5] text-[#713B50] selection:bg-pink-200/60 select-none">
      {/* Dreamy pink & lavender background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_5%,rgba(255,182,193,0.65),transparent_52%),radial-gradient(ellipse_at_8%_60%,rgba(244,143,177,0.28),transparent_38%),radial-gradient(ellipse_at_95%_85%,rgba(196,181,253,0.35),transparent_42%),linear-gradient(180deg,#FFF0F5_0%,#FFE4EC_55%,#FCE7F3_100%)]" />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 25, -15, 0],
                  y: [0, -20, 15, 0],
                  opacity: [0.35, 0.65, 0.35],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-40 top-[12%] h-[420px] w-[420px] rounded-full bg-pink-300/35 blur-[120px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -25, 15, 0],
                  scale: [1, 1.12, 0.95, 1],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-40 top-[45%] h-[480px] w-[480px] rounded-full bg-purple-300/30 blur-[130px]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(#D98AA8_0.7px,transparent_0.9px)] [background-size:43px_43px] opacity-[0.18]" />

        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute bottom-[-35px] text-pink-400/40 pointer-events-none"
            style={{ left: heart.left }}
            animate={
              reduceMotion
                ? { opacity: 0.25 }
                : {
                    y: [0, -920],
                    x: [0, index % 2 === 0 ? 22 : -22, 0],
                    opacity: [0, 0.55, 0.35, 0],
                    rotate: [0, index % 2 === 0 ? 18 : -18, 0],
                  }
            }
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart
              size={heart.size}
              strokeWidth={1.3}
              fill={index % 3 === 0 ? 'currentColor' : 'none'}
            />
          </motion.div>
        ))}
      </div>

      <StarField />

      {/* Gallery song */}
      <PageSong src="/songs/lover.mp3" title="Lover" />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        {/* SECTION 1: Personal introduction */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-2xl text-center sm:mb-14"
        >
          <motion.div
            animate={reduceMotion ? {} : { y: [0, -5, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-pink-300/70 bg-white/70 shadow-[0_0_35px_rgba(236,72,153,0.18)]"
          >
            <div className="absolute inset-1.5 rounded-full border border-pink-200/70" />
            <Heart className="h-6 w-6 fill-pink-400 text-rose-500 animate-pulse" />
            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-amber-400" />
          </motion.div>

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-pink-400/60" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A64D70] sm:text-xs">
              A little universe, just for you
            </p>
            <span className="h-px w-7 bg-pink-400/60" />
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium leading-tight tracking-wide text-[#78344F] drop-shadow-[0_2px_15px_rgba(236,72,153,0.12)]">
            A Place Made
            <span className="mt-1 block bg-gradient-to-r from-[#E75480] via-[#B87AE8] to-[#FB7185] bg-clip-text text-transparent">
              for You
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg font-serif text-sm italic leading-relaxed text-[#92566D] sm:text-base">
            “A tiny corner of the world filled with moments, smiles, and all
            the little things that make you special.”
          </p>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs tracking-wide text-[#A85C79] font-medium">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            Made with a little love
            <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-500" />
          </p>
        </motion.header>

        {/* SECTION 2: Featured memory Card */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-16 w-full max-w-3xl sm:mb-20"
        >
          <div className="mb-3 flex items-center gap-2 pl-2 text-[#A64D70]">
            <Camera className="h-3.5 w-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
              One to keep close
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSelectedPhoto(0)}
            aria-label="Open featured memory"
            className="group relative block w-full cursor-pointer rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-pink-300/80 via-purple-200/50 to-rose-300/70 opacity-80 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[22px] border border-pink-200/80 bg-white/85 p-2 shadow-[0_20px_60px_rgba(190,70,120,0.15)] sm:p-2.5">
              <div className="relative h-[280px] sm:h-[380px] overflow-hidden rounded-[18px] bg-pink-100">
                {!loadedPhotos.includes(featuredPhoto.id) &&
                  !failedPhotos.includes(featuredPhoto.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="h-7 w-7 animate-pulse text-pink-400/70" />
                    </div>
                  )}

                {failedPhotos.includes(featuredPhoto.id) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#92566D]">
                    <Camera className="h-7 w-7" />
                    <span className="text-xs">Photo could not be loaded</span>
                  </div>
                ) : (
                  <img
                    src={featuredPhoto.src}
                    alt={featuredPhoto.caption}
                    onLoad={() => markLoaded(featuredPhoto.id)}
                    onError={() => markFailed(featuredPhoto.id)}
                    className={`h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03] ${
                      loadedPhotos.includes(featuredPhoto.id)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#361325]/85 via-[#361325]/20 to-transparent" />

                {/* Tag pill */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/50 bg-[#8F4267]/60 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[10px]">
                  <Stars className="h-3.5 w-3.5 text-pink-200" />
                  A special memory
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="font-serif text-lg italic leading-snug text-white drop-shadow-md sm:text-2xl">
                    “{featuredPhoto.caption}”
                  </p>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-pink-100/90 transition-colors group-hover:text-white font-medium">
                    <Camera className="h-3 w-3" />
                    Tap to see this memory closer
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </motion.section>

        {/* SECTION 3: The Scrapbook Title */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/70 bg-white/70 shadow-sm">
            <Flower2 className="h-5 w-5 text-pink-500" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A64D70]">
            Little pieces of happiness
          </p>

          <h2 className="mt-2 font-cinzel text-3xl font-medium tracking-wide text-[#78344F] sm:text-4xl">
            The Scrapbook
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#92566D] font-medium">
            Every picture holds a little feeling.
          </p>
        </motion.section>

        {/* SECTION 4: Polaroid 3-Card Grid */}
        <section className="mb-16 grid w-full max-w-4xl grid-cols-1 items-center justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {scrapbookPhotos.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={
                reduceMotion ? {} : { y: -8, rotate: 0, scale: 1.03 }
              }
              onClick={() => setSelectedPhoto(index + 1)}
              aria-label={`Open photo: ${photo.caption}`}
              className={`group relative w-full max-w-[270px] rounded-sm border border-pink-100 bg-[#FFFDFB] p-2.5 pb-6 text-left shadow-[0_18px_45px_rgba(190,70,120,0.16)] transition-all duration-300 hover:shadow-[0_22px_55px_rgba(215,100,150,0.26)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${photo.rotation}`}
            >
              {/* Cute Washi Tape on top */}
              <div className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-2deg] border-x border-white/70 bg-pink-300/80 shadow-sm backdrop-blur-[2px]" />

              <div className="relative aspect-[4/5] overflow-hidden bg-pink-50">
                {!loadedPhotos.includes(photo.id) &&
                  !failedPhotos.includes(photo.id) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="h-6 w-6 animate-pulse text-pink-400/60" />
                    </div>
                  )}

                {failedPhotos.includes(photo.id) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center text-[#92566D]">
                    <Camera className="h-5 w-5" />
                    <span className="text-xs">Photo unavailable</span>
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    onLoad={() => markLoaded(photo.id)}
                    onError={() => markFailed(photo.id)}
                    className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                      loadedPhotos.includes(photo.id)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-rose-900/10 via-transparent to-white/20" />
              </div>

              {/* Polaroid Caption Footer */}
              <div className="px-1 pt-4 text-center">
                <p className="font-serif text-sm italic leading-snug text-[#65364B] sm:text-base font-medium">
                  {photo.caption}
                </p>

                <div className="mt-2.5 flex items-center justify-center gap-2">
                  <span className="h-px w-3 bg-[#D9A5B8]" />
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A16E82]">
                    {photo.note}
                  </p>
                  <span className="h-px w-3 bg-[#D9A5B8]" />
                </div>
              </div>

              <Heart className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 fill-pink-200/70 text-pink-400/80" />
            </motion.button>
          ))}
        </section>

        {/* SECTION 5: Closing Quote & Letter CTA */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-8 flex w-full max-w-xl flex-col items-center text-center"
        >
          <div className="mb-6 flex items-center gap-3 text-pink-400/70">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/80" />
            <Heart className="h-4 w-4 fill-pink-400/50" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-400/80" />
          </div>

          <Moon className="mb-4 h-6 w-6 text-[#C06A8A]" />

          <p className="max-w-md font-serif text-lg italic leading-relaxed text-[#78344F] sm:text-xl">
            Some memories are photographs.
            <span className="mt-1 block text-[#C04F7C]">
              Others become little pieces of our hearts.
            </span>
          </p>

          <p className="mt-3.5 text-xs sm:text-sm text-[#92566D] font-medium">
            And this little place? It was made especially for you, Marie.
          </p>

          <motion.button
            type="button"
            onClick={onComplete}
            whileHover={reduceMotion ? {} : { scale: 1.04 }}
            whileTap={reduceMotion ? {} : { scale: 0.97 }}
            className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-pink-300/80 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_8px_30px_rgba(236,72,153,0.25)] transition-all hover:shadow-[0_10px_35px_rgba(236,72,153,0.4)] focus:outline-none"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-700 group-hover:translate-x-full" />
            <Heart className="relative h-4 w-4 fill-white text-white" />
            <span className="relative">Read Your Letter</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.section>
      </main>

      {/* Lightbox / Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            key="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF0F5]/95 p-4 backdrop-blur-xl sm:p-6"
            onClick={closeViewer}
          >
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={closeViewer}
              className="absolute right-4 top-4 z-30 rounded-full border border-pink-300/70 bg-white/90 p-2.5 text-[#8E4263] shadow-sm transition hover:bg-pink-100 sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-pink-200 bg-white/90 p-2.5 text-[#8E4263] shadow-sm transition hover:bg-pink-100 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={selectedPhoto}
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.94, y: 10 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative max-h-[64vh] overflow-hidden rounded-2xl border border-pink-200 bg-white/95 p-2 shadow-[0_0_50px_rgba(236,72,153,0.18)]">
                {failedPhotos.includes(GALLERY_PHOTOS[selectedPhoto].id) ? (
                  <div className="flex h-[40vh] w-[60vw] max-w-md flex-col items-center justify-center gap-2 text-[#92566D]">
                    <Camera className="h-7 w-7" />
                    <p className="text-xs">Sorry, this photo could not be loaded.</p>
                  </div>
                ) : (
                  <img
                    src={GALLERY_PHOTOS[selectedPhoto].src}
                    alt={GALLERY_PHOTOS[selectedPhoto].caption}
                    className="max-h-[60vh] max-w-full rounded-xl object-contain"
                  />
                )}
              </div>

              <p className="mt-4 max-w-xl text-center font-serif text-base italic leading-relaxed text-[#78344F] sm:text-xl">
                “{GALLERY_PHOTOS[selectedPhoto].caption}”
              </p>

              <p className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#A64D70]">
                <Sparkles className="h-3 w-3" />
                {selectedPhoto + 1} / {GALLERY_PHOTOS.length}
                <Sparkles className="h-3 w-3" />
              </p>
            </motion.div>

            <button
              type="button"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full border border-pink-200 bg-white/90 p-2.5 text-[#8E4263] shadow-sm transition hover:bg-pink-100 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HerLittleWorld;