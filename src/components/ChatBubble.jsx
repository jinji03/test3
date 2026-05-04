import { useEffect, useMemo, useState } from 'react';
import CharacterPortrait from './CharacterPortrait.jsx';
import { playSound } from '../utils/sound.js';

function TypewriterText({ text, instant, muted, onDone }) {
  const [index, setIndex] = useState(instant ? text.length : 0);
  const segments = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    if (instant) {
      setIndex(segments.length);
      onDone?.();
      return undefined;
    }

    setIndex(0);
    return undefined;
  }, [instant, segments.length, onDone]);

  useEffect(() => {
    if (instant) return undefined;

    if (index >= segments.length) {
      if (index >= segments.length) onDone?.();
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => current + 1);
      if (index % 7 === 0) playSound('typing', muted);
    }, 22);

    return () => window.clearTimeout(timer);
  }, [index, instant, muted, onDone, segments.length]);

  return <span>{segments.slice(0, index).join('')}</span>;
}

export default function ChatBubble({ character, children, text, instant = false, muted = true, onDone, state = 'idle', from = 'character', showAvatar = true }) {
  const isUser = from === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && showAvatar && (
        <div className="shrink-0">
          <CharacterPortrait character={character} size="small" state={state} />
        </div>
      )}
      <div className={`chat-bubble max-w-3xl rounded-[8px] border p-4 text-sm leading-7 shadow-xl sm:text-base sm:leading-8 ${isUser ? 'rounded-tr-none border-[#e7c873]/35 bg-[#e7c873]/14 text-[#fff8dc]' : 'rounded-tl-none border-white/12 bg-white/[0.08] text-white/86'}`}>
        {text ? <TypewriterText text={text} instant={instant} muted={muted} onDone={onDone} /> : children}
      </div>
    </div>
  );
}
