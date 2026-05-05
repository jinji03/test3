export function buildAnswerSummary(answers) {
  return Object.values(answers)
    .filter(Boolean)
    .map((answer) => answer.selectedChoice || answer.label || answer)
    .join(' / ');
}

export function makeUserMessage(id, text) {
  return { id, text, from: 'user' };
}

export function makeCharacterMessage(id, text, state = 'idle', pose) {
  return { id, text, state, pose };
}
