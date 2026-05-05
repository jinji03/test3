const MAIN_BGM_PATH = '/bgm/main/bgm.mp3';
const CHARACTER_BGM_PATHS = {
  cheongyeon: '/bgm/characters/cheongyeon/bgm.mp3',
  baekwoo: '/bgm/characters/baekwoo/bgm.mp3',
  jihyeok: '/bgm/characters/jihyeok/bgm.mp3',
  seonyul: '/bgm/characters/seonyul/bgm.mp3',
  hwashin: '/bgm/characters/hwashin/bgm.mp3',
};

let mainBgm = null;
let activeCharacterVoice = null;
let globalMuted = false;

function createAudio(path, { loop = false, volume = 0.3 } = {}) {
  if (typeof window === 'undefined') return null;

  const audio = new Audio(path);
  audio.loop = loop;
  audio.preload = 'auto';
  audio.volume = globalMuted ? 0 : volume;
  return audio;
}

export function startMainBgm() {
  if (typeof window === 'undefined') return;

  if (!mainBgm) {
    mainBgm = createAudio(MAIN_BGM_PATH, { loop: true, volume: 0.18 });
  }

  if (!mainBgm) return;

  mainBgm.muted = globalMuted;
  mainBgm.volume = globalMuted ? 0 : 0.18;
  mainBgm.play().catch(() => {});
}

export function playCharacterVoice(characterId) {
  const path = CHARACTER_BGM_PATHS[characterId];
  if (!path || typeof window === 'undefined') return;

  activeCharacterVoice?.pause();
  activeCharacterVoice = createAudio(path, { loop: false, volume: 0.48 });
  if (!activeCharacterVoice) return;

  activeCharacterVoice.muted = globalMuted;
  activeCharacterVoice.addEventListener('ended', () => {
    activeCharacterVoice = null;
  }, { once: true });
  activeCharacterVoice.play().catch(() => {
    activeCharacterVoice = null;
  });
}

export function setGlobalAudioMuted(muted) {
  globalMuted = muted;

  if (mainBgm) {
    mainBgm.muted = muted;
    mainBgm.volume = muted ? 0 : 0.18;
  }

  if (activeCharacterVoice) {
    activeCharacterVoice.muted = muted;
    activeCharacterVoice.volume = muted ? 0 : 0.48;
  }
}
