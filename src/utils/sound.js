const soundFiles = {
  fan: 'fan_open.mp3',
  card: 'card_snap.mp3',
  typing: 'typing_soft.mp3',
};

function fallbackTone(type) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const frequency = {
    fan: 220,
    card: 520,
    typing: 680,
  }[type] || 360;

  oscillator.type = type === 'typing' ? 'sine' : 'triangle';
  oscillator.frequency.value = frequency;
  gain.gain.value = type === 'typing' ? 0.008 : 0.018;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + (type === 'typing' ? 0.025 : 0.08));
}

export function playSound(type, muted = false) {
  if (muted || typeof window === 'undefined') return;

  const file = soundFiles[type];
  if (!file) return;

  const audio = new Audio(`/sounds/${file}`);
  audio.volume = type === 'typing' ? 0.035 : 0.08;
  audio.play().catch(() => fallbackTone(type));
}
