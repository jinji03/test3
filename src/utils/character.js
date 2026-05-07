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
    empathy: 'smile',
    serious: 'serious',
    shocked: 'action',
    action: 'action',
    mystical: 'mystical',
    'fan-open': 'mystical',
    'fan-close': 'serious',
    final: 'smile',
  };
  return poseByState[message.state] || fallback;
}
