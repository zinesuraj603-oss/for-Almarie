// Procedural Web Audio API sound engine for Midnight Birthday Mystery
class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx ? this.ctx.currentTime : 0);
    } else if (!this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Mechanical clock tick
  public playTick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Tumbler dial click
  public playDialClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {}
  }

  // Deep midnight grandfather clock gong
  public playMidnightBell() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [110, 220, 330, 440, 587];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const duration = 3.5 - idx * 0.4;
        const amp = 0.2 / (idx + 1);

        gain.gain.setValueAtTime(amp, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      });
    } catch {}
  }

  // Magical mystery clue sound
  public playClueFound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

        const startTime = this.ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {}
  }

  // Metallic unlocking click
  public playUnlockSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Heavy latch release
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);

      // Subsequent chime
      setTimeout(() => this.playClueFound(), 150);
    } catch {}
  }

  // Grand Birthday Celebration Fanfare
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Happy Birthday opening motif: Sol Sol La Sol Do Si | Sol Sol La Sol Re Do
      const notes = [
        { f: 392.00, d: 0.35, t: 0.0 },  // G4
        { f: 392.00, d: 0.25, t: 0.38 }, // G4
        { f: 440.00, d: 0.55, t: 0.65 }, // A4
        { f: 392.00, d: 0.55, t: 1.25 }, // G4
        { f: 523.25, d: 0.55, t: 1.85 }, // C5
        { f: 493.88, d: 1.10, t: 2.45 }, // B4
        { f: 392.00, d: 0.35, t: 3.65 }, // G4
        { f: 392.00, d: 0.25, t: 4.03 }, // G4
        { f: 440.00, d: 0.55, t: 4.30 }, // A4
        { f: 392.00, d: 0.55, t: 4.90 }, // G4
        { f: 587.33, d: 0.55, t: 5.50 }, // D5
        { f: 523.25, d: 1.40, t: 6.10 }, // C5
      ];

      notes.forEach(({ f, d, t }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + t);

        const start = this.ctx.currentTime + t;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, start + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + d + 0.05);
      });
    } catch {}
  }

  // Atmospheric drone
  public toggleAmbient() {
    if (this.isAmbientPlaying) {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      this.isAmbientPlaying = false;
      return false;
    } else {
      this.initContext();
      if (!this.ctx) return false;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(98.00, this.ctx.currentTime); // G2

      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0.001 : 0.035, this.ctx.currentTime + 2);

      osc1.connect(this.ambientGain);
      osc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      this.isAmbientPlaying = true;
      return true;
    }
  }
}

export const sounds = new SoundEngine();
