function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodeBase64(value) {
  return JSON.parse(decodeURIComponent(escape(atob(value))));
}

export function compactResultData(result) {
  const card = result.finalCard || result;
  return {
    name: card.name,
    characterName: card.characterName || result.character?.name,
    characterId: result.character?.id,
    characterImage: result.character?.poses?.smile || result.character?.image,
    topic: card.topic,
    traitSummary: card.traitSummary,
    behavior: card.behavior,
    advice: card.advice,
    keywords: card.keywords || [],
  };
}

export function createShareLink(resultData) {
  const compact = compactResultData(resultData);
  const encoded = encodeBase64(compact);
  return `${window.location.origin}/share.html#result=${encoded}`;
}

export function generateShareText(resultData) {
  const data = compactResultData(resultData);
  return `운명상담소에서 ${data.characterName}에게 ${data.name}님의 ${data.topic} 상담을 받았어요.\n${data.traitSummary}\n키워드: ${(data.keywords || []).slice(0, 3).join(', ')}`;
}

export async function copyShareLink(resultData) {
  const url = createShareLink(resultData);
  await navigator.clipboard.writeText(url);
  return url;
}

export function parseSharedResult() {
  const source = window.location.hash || window.location.search;
  const raw = new URLSearchParams(source.replace(/^#/, '').replace(/^\?/, '')).get('result');
  if (!raw) return null;
  try {
    return decodeBase64(raw);
  } catch {
    return null;
  }
}

export async function shareToKakao(resultData) {
  const data = compactResultData(resultData);
  const url = createShareLink(resultData);
  const text = generateShareText(resultData);
  if (window.Kakao?.Share) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${data.characterName}의 ${data.topic} 상담 결과`,
        description: data.traitSummary,
        imageUrl: data.characterImage ? `${window.location.origin}${data.characterImage}` : `${window.location.origin}/characters/cheongyeon.png`,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [{ title: '나도 상담받기', link: { mobileWebUrl: url, webUrl: url } }],
    });
    return url;
  }
  if (navigator.share) {
    await navigator.share({ title: '운명상담소 상담 결과', text, url });
    return url;
  }
  await navigator.clipboard.writeText(`${text}\n${url}`);
  return url;
}

export function saveResultImage(resultData) {
  const data = compactResultData(resultData);
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#100b24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, '#24164d');
  gradient.addColorStop(0.55, '#120b28');
  gradient.addColorStop(1, '#221014');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.fillStyle = '#e7c873';
  ctx.font = '700 42px sans-serif';
  ctx.fillText('운명상담소', 84, 120);
  ctx.fillStyle = '#fff8e8';
  ctx.font = '800 58px sans-serif';
  wrapText(ctx, `${data.characterName}이 해석한 ${data.name}님의 ${data.topic}`, 84, 230, 880, 74);
  ctx.fillStyle = 'rgba(255,255,255,0.86)';
  ctx.font = '36px sans-serif';
  wrapText(ctx, data.traitSummary, 84, 430, 900, 54);
  wrapText(ctx, data.behavior, 84, 590, 900, 50);
  ctx.fillStyle = '#f8e7aa';
  ctx.font = '700 34px sans-serif';
  wrapText(ctx, data.advice, 84, 820, 900, 52);
  ctx.fillStyle = 'rgba(231,200,115,0.18)';
  ctx.fillRect(84, 1060, 912, 120);
  ctx.fillStyle = '#ffe9a6';
  ctx.font = '700 34px sans-serif';
  ctx.fillText((data.keywords || []).slice(0, 3).map((item) => `#${item}`).join('  '), 120, 1135);
  const link = document.createElement('a');
  link.download = `fortune-${data.name || 'result'}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || '').split(' ');
  let line = '';
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
