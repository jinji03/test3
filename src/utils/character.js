export function resolveCharacterState(message, fallback = 'idle') {
  if (!message) return fallback;
  if (message.ad) return 'thinking';
  return message.state || fallback;
}

export function resolveCharacterPose(message, fallback = 'idle') {
  if (!message) return fallback;
  if (message.pose) return message.pose;
  if (message.ad) return 'thinking';
  const poseByState = {
    idle: 'idle',
    thinking: 'thinking',
    smile: 'smile',
    serious: 'serious',
    action: 'fan-close',
    mystical: 'fan-open',
    final: 'smile',
  };
  return poseByState[message.state] || fallback;
}
