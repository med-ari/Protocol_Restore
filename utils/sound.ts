
// Cyberpunk Sound Synthesizer using Web Audio API
// No external assets required.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Initialize on first user interaction
  }

  private getContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuteState() {
    return this.isMuted;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  public playClick() {
    this.playTone(1200, 'sine', 0.05, 0, 0.05);
  }

  public playHover() {
    this.playTone(800, 'square', 0.01, 0, 0.005);
  }

  public playSuccess() {
    this.playTone(440, 'sine', 0.1, 0, 0.1); // A4
    this.playTone(554, 'sine', 0.1, 0.1, 0.1); // C#5
    this.playTone(659, 'sine', 0.2, 0.2, 0.1); // E5
  }

  public playError() {
    this.playTone(150, 'sawtooth', 0.2, 0, 0.1);
    this.playTone(100, 'sawtooth', 0.2, 0.1, 0.1);
  }

  public playMessage() {
    this.playTone(800, 'square', 0.05, 0, 0.02);
    this.playTone(1200, 'square', 0.05, 0.05, 0.02);
  }
  
  public playAmbientStart() {
    // Just a startup swoosh
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }
  
  // Ambient loop removed as requested
  public playAmbientLoop() {
    // No-op
  }
}

export const soundManager = new SoundManager();