import AdSlot from '../components/AdSlot.jsx';
import ChatBubble from '../components/ChatBubble.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { elementLabels } from '../utils/fortune.js';

export default function ResultPage({ result, characters, onHome, onRetry, onOtherCharacter }) {
  const { character, form, elements, summary, purposeReading, disclaimer } = result;

  const share = async () => {
    const text = `운명각에서 ${character.name}에게 ${form.purpose} 상담을 봤어요. 가장 강한 기운은 ${result.ranked[0].label}입니다.`;
    if (navigator.share) {
      await navigator.share({ title: '운명각 사주 상담 결과', text });
      return;
    }
    await navigator.clipboard.writeText(text);
    alert('공유 문구를 클립보드에 복사했습니다.');
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-[#e7c873]">{character.name}의 상담 결과</p>
          <h1 className="font-serif text-3xl font-black text-white sm:text-4xl">{form.purpose} 흐름 해석</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onHome} className="button-ghost">처음으로</button>
          <button type="button" onClick={onRetry} className="button-ghost">결과 다시 보기</button>
          <button type="button" onClick={share} className="button-gold">공유하기</button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5">
            <h2 className="font-serif text-2xl font-bold text-white">입력 정보 요약</h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <dt className="text-white/52">이름</dt>
              <dd className="text-right text-white">{form.name}</dd>
              <dt className="text-white/52">생년월일</dt>
              <dd className="text-right text-white">{form.birthDate}</dd>
              <dt className="text-white/52">태어난 시간</dt>
              <dd className="text-right text-white">{form.birthTimeUnknown ? '기억나지 않음' : form.birthTime}</dd>
              <dt className="text-white/52">성별</dt>
              <dd className="text-right text-white">{form.gender}</dd>
              <dt className="text-white/52">상담 목적</dt>
              <dd className="text-right text-white">{form.purpose}</dd>
            </dl>
          </div>

          <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5">
            <h2 className="font-serif text-2xl font-bold text-white">오행 분석</h2>
            <div className="mt-4 space-y-3">
              {Object.entries(elements).map(([type, value]) => (
                <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
              ))}
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          <ChatBubble character={character}>
            <p className="font-semibold text-[#f8e7aa]">오행 기반 성향 해석</p>
            <div className="mt-3 space-y-3">
              {summary.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ChatBubble>

          <ChatBubble character={character}>
            <p className="font-semibold text-[#f8e7aa]">{form.purpose} 상담</p>
            <div className="mt-3 space-y-3">
              {purposeReading.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ChatBubble>

          <AdSlot label="추가 상세 운세 보기 전 광고 영역" />

          <div className="rounded-[8px] border border-[#e7c873]/35 bg-[#e7c873]/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#f8e7aa]">프리미엄 상세 운세</p>
                <h2 className="text-xl font-bold text-white">월별 흐름, 궁합 심화, 직업/금전 리포트</h2>
              </div>
              <button type="button" className="button-gold">상세 운세 열기</button>
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
            {disclaimer}
          </div>
        </section>
      </section>

      <section className="rounded-[8px] border border-white/12 bg-white/[0.06] p-5">
        <h2 className="font-serif text-2xl font-bold text-white">다른 운명가에게 다시 보기</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {characters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOtherCharacter(item.id)}
              className="rounded-[8px] border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/78 transition hover:border-[#e7c873]/60 hover:text-white"
            >
              {item.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
