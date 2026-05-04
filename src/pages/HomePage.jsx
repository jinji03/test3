import CharacterCard from '../components/CharacterCard.jsx';

export default function HomePage({ characters, lastResult, onSelect, onViewLast }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e7c873]">Fate Atelier</p>
          <h1 className="font-serif text-3xl font-black text-white sm:text-4xl">운명각</h1>
        </div>
        {lastResult && (
          <button
            type="button"
            onClick={onViewLast}
            className="rounded-[8px] border border-[#e7c873]/40 bg-[#e7c873]/10 px-4 py-2 text-sm text-[#ffe9a6] transition hover:bg-[#e7c873]/18"
          >
            결과 다시 보기
          </button>
        )}
      </header>

      <section className="grid min-h-[54vh] items-end gap-8 py-6 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-sm text-[#cbbcff]">웹툰풍 운명 상담 MVP</p>
          <h2 className="max-w-3xl font-serif text-4xl font-black leading-tight text-white sm:text-6xl">
            당신의 운명을 밝혀줄 다섯 명의 운명가를 만나보세요.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-white/70">
            생년월일과 태어난 시간을 바탕으로 오행 흐름을 간단히 해석하고, 선택한 운명가의 성격과 말투에 맞춰 상담하듯 결과를 전합니다.
          </p>
        </div>
        <div className="rounded-[8px] border border-white/12 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
          <p className="text-sm text-[#e7c873]">오늘의 상담실</p>
          <p className="mt-3 text-2xl font-semibold text-white">몽환적인 점술관에 앉아, 지금 필요한 질문 하나를 고르세요.</p>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {characters.map((character) => (
              <span key={character.id} className="h-16 rounded-[8px] border border-white/10" style={{ background: `linear-gradient(135deg, ${character.aura}66, rgba(255,255,255,0.08))` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={onSelect} />
        ))}
      </section>
    </div>
  );
}
