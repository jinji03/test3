import CharacterPortrait from './CharacterPortrait.jsx';

export default function CharacterCard({ character, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(character.id)}
      className="group w-full overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.07] text-left shadow-xl backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#e7c873]/70 hover:bg-white/[0.11] hover:shadow-[0_0_34px_rgba(231,200,115,0.18)] focus:outline-none focus:ring-2 focus:ring-[#e7c873]"
    >
      <CharacterPortrait character={character} />
      <div className="space-y-3 p-4">
        <div>
          <p className="text-sm text-[#e7c873]">{character.title}</p>
          <h3 className="font-serif text-2xl font-bold text-white">{character.name}</h3>
        </div>
        <p className="min-h-12 text-sm leading-6 text-white/72">{character.mood}</p>
        <div className="flex flex-wrap gap-2">
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
