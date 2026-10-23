export function playTeddySound(type: 'hug' | 'treat' | 'sparkle') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'hug') {
      // Gentle warm double heartbeat
      [0, 0.22].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + offset + 0.15);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + offset);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + offset + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + offset + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.22);
      });
      setTimeout(() => void ctx.close(), 800);
    } else if (type === 'treat') {
      // Cheerful chime
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.28);
      });
      setTimeout(() => void ctx.close(), 800);
    } else {
      // Shimmer
      [784, 988, 1175, 1319].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
      setTimeout(() => void ctx.close(), 900);
    }
  } catch {
    // Graceful fallback
  }
}
