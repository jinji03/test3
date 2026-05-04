import CharacterPortrait from './CharacterPortrait.jsx';

export default function ChatBubble({ character, children }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <CharacterPortrait character={character} size="small" />
      </div>
      <div className="max-w-3xl rounded-[8px] rounded-tl-none border border-white/12 bg-white/[0.08] p-4 text-sm leading-7 text-white/84 shadow-xl">
        {children}
      </div>
    </div>
  );
}
