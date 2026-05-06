import CharacterCard from '../components/CharacterCard.jsx';

export default function HomePage({ characters, lastResult, onSelect, onViewLast }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-5 sm:px-6 lg:px-8">
      <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between gap-4 border-b border-white/8 bg-[#100b24]/86 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e7c873]">Interactive Fate Counseling</p>
          <h1 className="font-serif text-2xl font-black text-white sm:text-3xl">운명상담소</h1>
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

      <section className="relative overflow-hidden rounded-[8px] border border-white/12 bg-[#191039] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_14%,rgba(231,200,115,0.18),transparent_22%),radial-gradient(circle_at_72%_20%,rgba(125,211,252,0.12),transparent_28%),linear-gradient(180deg,rgba(10,7,22,0.72)_0%,rgba(10,7,22,0.94)_100%)]" />
        <div className="hero-character-stage">
          {characters.map((character, index) => (
            <img
              key={character.id}
              src={character.image}
              alt=""
              className="hero-character"
              style={{
                transform: `translateX(${index * -10}px) translateY(${index % 2 === 0 ? 18 : 0}px) rotate(${(index - 2) * 2}deg)`,
                zIndex: index === 2 ? 5 : index,
              }}
            />
          ))}
        </div>
        <div className="relative min-h-[620px] px-5 py-8 sm:px-8 md:min-h-[560px] lg:min-h-[620px] lg:px-10">
          <div className="flex h-full max-w-xl flex-col justify-end gap-5 pt-72 sm:pt-80 md:pt-56 lg:pt-64">
            <span className="w-fit rounded-full border border-[#e7c873]/35 bg-black/28 px-3 py-1 text-xs font-semibold text-[#ffe7a3]">
              캐릭터 상담형 사주 웹앱
            </span>
            <h2 className="font-serif text-4xl font-black leading-tight text-white sm:text-6xl">
              당신의 이야기를 들려주세요
            </h2>
            <p className="text-base leading-8 text-white/76">
              연애, 재물, 직업, 사업, 종합 운세까지. 선택한 상담가가 질문을 건네고, 당신의 답을 바탕으로 사주 흐름과 행동 패턴을 함께 읽습니다.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById('fortune-tellers')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full rounded-[8px] bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#e7c873] px-5 py-4 font-bold text-white shadow-[0_0_28px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] sm:w-fit"
            >
              상담가 선택하기
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {[
          { name: '대화형 상담', caption: '말풍선과 선택지로 진행' },
          { name: '짧은 반응', caption: '답변마다 상담가가 반응' },
          { name: '상담 마무리', caption: '긴 리포트보다 짧은 정리' },
        ].map((service) => (
          <div key={service.name} className="rounded-[8px] border border-white/10 bg-white/[0.07] p-4 shadow-lg">
            <p className="font-semibold text-white">{service.name}</p>
            <p className="mt-1 text-sm leading-6 text-white/58">{service.caption}</p>
          </div>
        ))}
      </section>

      <section id="fortune-tellers" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-[#e7c873]">상담가 선택</p>
            <h2 className="font-serif text-3xl font-bold text-white">오늘 내 이야기를 들어줄 사람</h2>
          </div>
          <span className="hidden text-sm text-white/50 sm:inline">카드를 누르면 상담이 시작됩니다</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={onSelect} />
        ))}
        </div>
      </section>
    </div>
  );
}
