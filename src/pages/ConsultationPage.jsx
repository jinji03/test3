import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdSlot from '../components/AdSlot.jsx';
import ChatBubble from '../components/ChatBubble.jsx';
import CharacterPortrait from '../components/CharacterPortrait.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { purposeOptions } from '../data/characters.js';
import { buildFortuneResult, elementLabels } from '../utils/fortune.js';
import { playSound } from '../utils/sound.js';

const hours = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`);

export default function ConsultationPage({ character, onBack, onComplete }) {
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    birthTime: '12:00',
    birthTimeUnknown: false,
    gender: '여성',
    purpose: '연애운',
  });
  const [messages, setMessages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFocus, setSelectedFocus] = useState('');
  const [isFast, setIsFast] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState(null);
  const [showFinal, setShowFinal] = useState(false);
  const chatEndRef = useRef(null);

  const initialMessages = useMemo(
    () => [
      {
        id: 'entrance',
        text: `${character.name}이 상담실에 들어왔습니다. 오늘은 ${character.title}의 방식으로 당신의 흐름을 읽어볼게요.`,
        state: 'idle',
      },
      {
        id: 'hello',
        text: '반가워요. 사주는 답을 단정하는 도구라기보다 지금 마음과 행동의 습관을 이해하는 거울에 가깝습니다.',
        state: 'smile',
      },
      {
        id: 'question',
        text: character.question,
        state: 'mystical',
      },
    ],
    [character],
  );

  useEffect(() => {
    setMessages(initialMessages);
    setActiveIndex(0);
    setSelectedFocus('');
    setShowChoices(false);
    setShowForm(false);
    setResult(null);
    setShowFinal(false);
  }, [initialMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeIndex, messages.length, showForm, showFinal]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const advance = useCallback(() => {
    setActiveIndex((current) => Math.min(current + 1, messages.length - 1));
  }, [messages.length]);

  const currentMessage = messages[activeIndex];

  useEffect(() => {
    if (!currentMessage?.ad) return;
    const timer = window.setTimeout(advance, isFast ? 120 : 700);
    return () => window.clearTimeout(timer);
  }, [advance, currentMessage, isFast]);

  const handleMessageDone = useCallback(() => {
    if (activeIndex < messages.length - 1) {
      setActiveIndex((current) => Math.min(current + 1, messages.length - 1));
      return;
    }

    if (messages[activeIndex]?.id === 'question') setShowChoices(true);
    if (messages[activeIndex]?.id === 'focus-reply') setShowForm(true);
    if (messages[activeIndex]?.id === 'final-line') setShowFinal(true);
  }, [activeIndex, messages]);

  const handleChoice = (choice) => {
    setSelectedFocus(choice);
    setShowChoices(false);
    playSound('fan', isMuted);
    setMessages((current) => [
      ...current,
      { id: `choice-${choice}`, text: choice, from: 'user' },
      {
        id: 'focus-reply',
        text: `${choice} 쪽으로 마음이 향해 있군요. 이제 생년월일과 시간을 받아서 실제 행동 패턴으로 풀어볼게요.`,
        state: 'smile',
      },
    ]);
    setActiveIndex(messages.length);
  };

  const submit = (event) => {
    event.preventDefault();
    playSound('card', isMuted);
    const nextResult = buildFortuneResult({ ...form, consultationFocus: selectedFocus }, character.id);
    setResult(nextResult);
    setShowForm(false);
    setShowFinal(false);

    const analysisMessages = [
      { id: 'submitted', text: '입력 정보를 전부 전달했습니다.', from: 'user' },
      { id: 'analysis-start', text: '좋아요. 지금부터 분석을 시작합니다. 먼저 전체 흐름을 보고, 이어서 상담 목적에 맞게 좁혀볼게요.', state: 'thinking' },
      { id: 'ad-before-analysis', ad: true },
      { id: 'element-intro', text: nextResult.summary[0], state: 'mystical' },
      { id: 'trait-example', text: nextResult.summary[1], state: 'smile' },
      { id: 'purpose-one', text: nextResult.purposeReading[0], state: 'serious' },
      { id: 'purpose-two', text: nextResult.purposeReading[1] || nextResult.summary[2], state: 'action' },
      { id: 'ad-before-detail', ad: true },
      { id: 'advice', text: nextResult.finalCard.advice, state: 'smile' },
      { id: 'caution', text: nextResult.finalCard.caution, state: 'serious' },
      {
        id: 'final-line',
        text: `${nextResult.finalCard.name}님에게 지금 필요한 결론은 관계를 단정하기보다 행동을 작게 확인하는 것입니다. 마음이 움직인다면 한 번에 모든 답을 얻으려 하지 말고, 상대의 반응을 볼 수 있는 짧은 대화부터 시작해보세요.`,
        state: 'final',
      },
    ];

    setMessages((current) => [...current, ...analysisMessages]);
    setActiveIndex(messages.length);
  };

  const canChoose = showChoices && !selectedFocus && !showForm && !result;
  const visibleMessages = messages.slice(0, activeIndex + 1);
  const portraitState = messages[activeIndex]?.state || (showFinal ? 'final' : 'idle');

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
      <section className="space-y-4">
        <button type="button" onClick={onBack} className="text-sm text-white/66 hover:text-white">
          ← 운명가 다시 선택
        </button>
        <CharacterPortrait character={character} size="feature" state={portraitState} />
        <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5">
          <p className="text-[#e7c873]">{character.title}</p>
          <h1 className="font-serif text-4xl font-black text-white">{character.name}</h1>
          <p className="mt-3 leading-7 text-white/72">{character.mood}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {character.specialty.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/75">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[8px] border border-white/12 bg-[#17102e]/80 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div>
            <p className="text-sm text-[#e7c873]">{character.name}의 상담실</p>
            <h2 className="font-serif text-2xl font-bold text-white">대화형 사주 상담</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsFast((value) => !value)} className="button-ghost text-sm">
              {isFast ? '천천히 보기' : '빠르게 보기'}
            </button>
            <button type="button" onClick={() => setIsMuted((value) => !value)} className="button-ghost text-sm">
              {isMuted ? '소리 켜기' : '소리 끄기'}
            </button>
          </div>
        </div>

        <div className="chat-window space-y-4 px-4 py-5 sm:px-5">
          {visibleMessages.map((message, index) => (
            message.ad ? (
              <AdSlot key={message.id} label="광고 영역 (추후 연동)" />
            ) : (
              <ChatBubble
                key={message.id}
                character={character}
                text={message.text}
                from={message.from}
                state={message.state || 'idle'}
                instant={isFast || message.from === 'user' || index < activeIndex}
                muted={isMuted}
                onDone={index === activeIndex ? handleMessageDone : undefined}
              />
            )
          ))}

          {canChoose && (
            <div className="ml-0 flex flex-wrap gap-2 sm:ml-20">
              {character.choices.map((choice) => (
                <button key={choice} type="button" onClick={() => handleChoice(choice)} className="choice-button">
                  {choice}
                </button>
              ))}
            </div>
          )}

          {showForm && (
            <form onSubmit={submit} className="ml-0 space-y-5 rounded-[8px] border border-white/12 bg-black/20 p-4 sm:ml-20 sm:p-5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">상담 정보 입력</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">입력값은 브라우저 안에서만 사용되며, 기존 해시 기반 계산 로직으로 오행 비율을 산출합니다.</p>
              </div>

              <label className="block space-y-2">
                <span className="text-sm text-[#f8e7aa]">이름</span>
                <input required value={form.name} onChange={(event) => update('name', event.target.value)} className="field" placeholder="예: 서윤" />
              </label>

              <label className="block space-y-2">
                <span className="text-sm text-[#f8e7aa]">생년월일</span>
                <input required type="date" value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} className="field" />
              </label>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="block space-y-2">
              <span className="text-sm text-[#f8e7aa]">태어난 시간</span>
              <select disabled={form.birthTimeUnknown} value={form.birthTime} onChange={(event) => update('birthTime', event.target.value)} className="field disabled:opacity-45">
                {hours.map((hour) => (
                  <option key={hour}>{hour}</option>
                ))}
              </select>
            </label>
            <label className="flex h-12 items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.06] px-3 text-sm text-white/76">
              <input type="checkbox" checked={form.birthTimeUnknown} onChange={(event) => update('birthTimeUnknown', event.target.checked)} />
              기억나지 않음
            </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm text-[#f8e7aa]">성별</span>
                  <select value={form.gender} onChange={(event) => update('gender', event.target.value)} className="field">
                    <option>여성</option>
                    <option>남성</option>
                    <option>선택 안 함</option>
                  </select>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm text-[#f8e7aa]">상담 목적</span>
                  <select value={form.purpose} onChange={(event) => update('purpose', event.target.value)} className="field">
                    {purposeOptions.map((purpose) => (
                      <option key={purpose}>{purpose}</option>
                    ))}
                  </select>
                </label>
              </div>

              <AdSlot label="광고 영역 (추후 연동)" />

              <button type="submit" className="w-full rounded-[8px] bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#e7c873] px-5 py-4 font-bold text-white shadow-[0_0_28px_rgba(168,85,247,0.28)] transition hover:scale-[1.01]">
                분석 시작
              </button>
            </form>
          )}

          {showFinal && result && (
            <section className="final-card ml-0 rounded-[8px] border border-[#e7c873]/45 bg-[#0b0718]/92 p-5 shadow-[0_0_34px_rgba(231,200,115,0.16)] sm:ml-20">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#f8e7aa]">최종 결론 카드</p>
                  <h3 className="font-serif text-3xl font-black text-white">{result.finalCard.name}님의 {result.finalCard.topic}</h3>
                </div>
                <span className="rounded-[8px] bg-[#e7c873] px-3 py-2 text-sm font-bold text-[#25130a]">{result.finalCard.characterName}</span>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
                <p><strong className="text-white">성향 요약</strong><br />{result.finalCard.traitSummary}.</p>
                <p><strong className="text-white">행동 설명</strong><br />{result.finalCard.behavior}</p>
                <p><strong className="text-white">조언</strong><br />{result.finalCard.advice}</p>
                <p><strong className="text-white">주의점</strong><br />{result.finalCard.caution}</p>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="space-y-3">
                  {Object.entries(result.elements).map(([type, value]) => (
                    <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.finalCard.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-[#e7c873]/30 bg-[#e7c873]/12 px-3 py-1 text-sm text-[#ffe9a6]">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => onComplete(result)} className="mt-5 w-full rounded-[8px] bg-[#e7c873] px-5 py-4 font-bold text-[#25130a] transition hover:bg-[#f2d98d]">
                최종 결과 자세히 보기
              </button>
            </section>
          )}
          <div ref={chatEndRef} />
        </div>
      </section>
    </div>
  );
}
