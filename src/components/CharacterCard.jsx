import CharacterPortrait from './CharacterPortrait.jsx';

export default function CharacterCard({ character, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(character.id)}
      className="group grid w-full grid-cols-[96px_1fr] gap-3 overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.07] p-3 text-left shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#e7c873]/70 hover:bg-white/[0.11] hover:shadow-[0_0_34px_rgba(231,200,115,0.18)] focus:outline-none focus:ring-2 focus:ring-[#e7c873] sm:grid-cols-1 sm:p-0"
    >
      <CharacterPortrait character={character} />
      <div className="space-y-3 self-center sm:p-4">
        <div>
          <p className="text-sm text-[#e7c873]">{character.title}</p>
          <h3 className="font-serif text-2xl font-bold text-white">{character.name}</h3>
        </div>
        <p className="text-sm leading-6 text-white/72 sm:min-h-24">{character.mood}</p>
        <div className="flex flex-wrap gap-1.5">
          {character.specialty.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80">
              {item}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
