import CharacterCard from '../components/CharacterCard.jsx';

const services = [
  { name: '정통사주', caption: '오행과 기질' },
  { name: '신년운세', caption: '올해의 흐름' },
  { name: '연애운', caption: '마음과 타이밍' },
  { name: '궁합', caption: '관계의 온도' },
  { name: '금전운', caption: '돈의 방향' },
  { name: '직업운', caption: '일의 기회' },
];

export default function HomePage({ characters, lastResult, onSelect, onViewLast }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-5 sm:px-6 lg:px-8">
      <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between gap-4 border-b border-white/8 bg-[#100b24]/86 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e7c873]">Premium Webtoon Saju</p>
          <h1 className="font-serif text-2xl font-black text-white sm:text-3xl">운명각</h1>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(231,200,115,0.22),transparent_24%),linear-gradient(90deg,rgba(10,7,22,0.95)_0%,rgba(10,7,22,0.74)_48%,rgba(10,7,22,0.22)_100%)]" />
        <div className="absolute bottom-0 right-0 hidden h-full w-[62%] items-end justify-end gap-0 overflow-hidden opacity-80 md:flex">
          {characters.map((character, index) => (
            <img
              key={character.id}
              src={character.image}
              alt=""
              className="hero-character h-[82%] w-[24%] max-w-none object-cover object-top"
              style={{
                transform: `translateX(${index * -10}px) translateY(${index % 2 === 0 ? 18 : 0}px) rotate(${(index - 2) * 2}deg)`,
                zIndex: index === 2 ? 5 : index,
              }}
            />
          ))}
        </div>
        <div className="relative min-h-[560px] px-5 py-8 sm:px-8 lg:min-h-[620px] lg:px-10">
          <div className="flex h-full max-w-xl flex-col justify-end gap-5 pt-48 sm:pt-56 lg:pt-64">
            <span className="w-fit rounded-full border border-[#e7c873]/35 bg-black/28 px-3 py-1 text-xs font-semibold text-[#ffe7a3]">
              AI 웹툰형 사주 상담
            </span>
            <h2 className="font-serif text-4xl font-black leading-tight text-white sm:text-6xl">
              당신의 운명을 밝혀줄 다섯 명의 운명가
            </h2>
            <p className="text-base leading-8 text-white/76">
              생년월일과 태어난 시간을 바탕으로 오행 흐름을 읽고, 선택한 운명가가 상담하듯 성향과 가까운 흐름을 전합니다.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById('fortune-tellers')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full rounded-[8px] bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#e7c873] px-5 py-4 font-bold text-white shadow-[0_0_28px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] sm:w-fit"
            >
              무료 사주 시작하기
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {services.map((service) => (
          <div key={service.name} className="rounded-[8px] border border-white/10 bg-white/[0.07] p-4 shadow-lg">
            <p className="font-semibold text-white">{service.name}</p>
            <p className="mt-1 text-xs text-white/55">{service.caption}</p>
          </div>
        ))}
      </section>

      <section id="fortune-tellers" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-[#e7c873]">상담가 선택</p>
            <h2 className="font-serif text-3xl font-bold text-white">나와 맞는 운명가를 고르세요</h2>
          </div>
          <span className="hidden text-sm text-white/50 sm:inline">카드를 누르면 입력 화면으로 이동합니다</span>
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
