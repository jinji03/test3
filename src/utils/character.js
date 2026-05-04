export function resolveCharacterState(message, fallback = 'idle') {
  if (!message) return fallback;
  if (message.ad) return 'thinking';
  return message.state || fallback;
}
