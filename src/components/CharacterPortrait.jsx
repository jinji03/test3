export default function CharacterPortrait({ character, size = 'large' }) {
  const isSmall = size === 'small';
  if (character.image) {
    return (
      <div
        className={`${isSmall ? 'h-16 w-16' : 'h-52 w-full'} relative overflow-hidden rounded-[8px] border border-white/15 bg-[#120b25] shadow-2xl`}
        style={{ boxShadow: `0 0 32px ${character.aura}44` }}
      >
        <img
          src={character.image}
          alt={`${character.name} 캐릭터 이미지`}
          className="absolute top-0 h-full w-[500%] max-w-none object-fill"
          style={{ left: `-${(character.imagePanel || 0) * 100}%` }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-white/5" />
        {!isSmall && (
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="font-serif text-2xl font-bold text-white drop-shadow">{character.name}</span>
            <span className="h-10 w-10 rounded-full border border-white/30" style={{ backgroundColor: `${character.aura}55` }} />
          </div>
        )}
      </div>
    );
  }

  const eyeShape = {
    calm: 'rounded-full h-2 w-8',
    soft: 'rounded-full h-2 w-7 rotate-3',
    sharp: 'h-1.5 w-9 -skew-x-12',
    dreamy: 'rounded-full h-3 w-8',
    bold: 'h-2 w-9 skew-x-12',
  }[character.eye];

  const faceShape = {
    oval: 'rounded-[48%]',
    round: 'rounded-[42%]',
    angular: 'rounded-[34%]',
    heart: 'rounded-t-[48%] rounded-b-[40%]',
    diamond: 'rounded-t-[38%] rounded-b-[46%]',
  }[character.face];

  return (
    <div
      className={`${isSmall ? 'h-16 w-16' : 'h-52 w-full'} relative overflow-hidden rounded-[8px] border border-white/15 bg-gradient-to-br ${character.hair} shadow-2xl`}
      style={{ boxShadow: `0 0 32px ${character.aura}44` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.38),transparent_18%),linear-gradient(180deg,transparent,rgba(0,0,0,0.38))]" />
      <div className={`absolute left-1/2 ${isSmall ? 'top-5 h-12 w-11' : 'top-14 h-32 w-28'} -translate-x-1/2 ${faceShape} bg-[#ffe0c8] shadow-[inset_0_-14px_24px_rgba(151,78,82,0.18)]`} />
      <div className={`absolute left-1/2 ${isSmall ? 'top-3 h-8 w-14' : 'top-8 h-24 w-36'} -translate-x-1/2 rounded-t-full bg-gradient-to-br ${character.hair}`} />
      <div className={`absolute left-1/2 ${isSmall ? 'top-7 w-10' : 'top-[94px] w-20'} flex -translate-x-1/2 justify-between`}>
        <span className={`${eyeShape} bg-[#2b1732] shadow-[0_0_8px_rgba(255,255,255,0.45)]`} />
        <span className={`${eyeShape} bg-[#2b1732] shadow-[0_0_8px_rgba(255,255,255,0.45)]`} />
      </div>
      {character.id === 'jihyeok' && (
        <div className="absolute left-1/2 top-[88px] hidden w-24 -translate-x-1/2 items-center justify-between sm:flex">
          <span className="h-7 w-9 rounded-full border border-white/70" />
          <span className="h-px w-5 bg-white/70" />
          <span className="h-7 w-9 rounded-full border border-white/70" />
        </div>
      )}
      <div className={`absolute left-1/2 ${isSmall ? 'top-11 h-1 w-4' : 'top-36 h-1.5 w-8'} -translate-x-1/2 rounded-full bg-rose-400/80`} />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      {!isSmall && (
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="font-serif text-2xl font-bold text-white drop-shadow">{character.name}</span>
          <span className="h-10 w-10 rounded-full border border-white/30" style={{ backgroundColor: `${character.aura}55` }} />
        </div>
      )}
    </div>
  );
}
