import { buildResultSteps, generateAdvice, generateSummary } from './fortuneEngine.js';

export function renderResultHeader(result) {
  return {
    characterName: result.character.name,
    characterTitle: result.character.title,
    characterImage: result.character.poses?.smile || result.character.image,
    userName: result.finalCard.name,
    topic: result.finalCard.topic,
    title: `${result.character.name}이 해석한 ${result.finalCard.name}님의 ${result.form.consultationTopic || result.finalCard.topic} 흐름`,
  };
}

export function renderResultSteps(result) {
  return buildResultSteps(result);
}

export function renderSummary(result) {
  return {
    headline: generateSummary(result),
    advice: generateAdvice(result),
    keywords: result.finalCard.keywords,
    topic: result.finalCard.topic,
    trait: result.finalCard.traitSummary,
    behavior: result.finalCard.behavior,
  };
}
