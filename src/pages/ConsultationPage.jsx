import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdSlot from '../components/AdSlot.jsx';
import ChatBubble from '../components/ChatBubble.jsx';
import CharacterPortrait from '../components/CharacterPortrait.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { consultationTopics, getTonePrompt, pickLine, topicQuestions } from '../data/dialogue.js';
import { buildAnswerSummary, makeCharacterMessage, makeUserMessage } from '../utils/chat.js';
import { resolveCharacterState } from '../utils/character.js';
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
    purpose: '',
  });
  const [messages, setMessages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState('topic');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFast, setIsFast] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [result, setResult] = useState(null);
  const chatEndRef = useRef(null);

  const questions = selectedTopic ? topicQuestions[selectedTopic.id] || [] : [];
  const activeQuestion = questions[questionIndex];

  const initialMessages = useMemo(
    () => [
      makeCharacterMessage('opening-0', `${character.name}이 운명상담소 조명을 켰습니다.`, 'idle'),
      makeCharacterMessage('opening-1', pickLine(character.id, 'opening', 0), 'smile'),
      makeCharacterMessage('topic-guide', '오늘은 먼저 상담 주제를 고를게요. 지금 가장 알고 싶은 쪽을 선택해주세요.', 'mystical'),
    ],
    [character],
  );

  useEffect(() => {
    setMessages(initialMessages);
    setActiveIndex(0);
    setPhase('topic');
    setSelectedTopic(null);
    setQuestionIndex(0);
    setAnswers({});
    setResult(null);
  }, [initialMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeIndex, messages.length, phase, result]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const appendMessages = useCallback((nextMessages) => {
    setMessages((current) => {
      const next = [...current, ...nextMessages];
      setActiveIndex(current.length);
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    setActiveIndex((current) => Math.min(current + 1, messages.length - 1));
  }, [messages.length]);

  const currentMessage = messages[activeIndex];

  useEffect(() => {
    if (!currentMessage?.ad) return;
    const timer = window.setTimeout(advance, isFast ? 120 : 650);
    return () => window.clearTimeout(timer);
  }, [advance, currentMessage, isFast]);

  const handleMessageDone = useCallback(() => {
    if (activeIndex < messages.length - 1) {
      setActiveIndex((current) => Math.min(current + 1, messages.length - 1));
    }
  }, [activeIndex, messages.length]);

  const selectTopic = (topic) => {
    playSound('fan', isMuted);
    setSelectedTopic(topic);
    update('purpose', topic.purpose);
    setPhase('questions');
    setQuestionIndex(0);
    appendMessages([
      makeUserMessage(`topic-${topic.id}`, topic.label),
      makeCharacterMessage(`topic-reaction-${topic.id}`, `${topic.label} 상담이군요. ${topic.accent}을 중심으로 몇 가지를 물어볼게요.`, 'smile'),
      makeCharacterMessage(`question-${topic.id}-0`, getTonePrompt(character, topicQuestions[topic.id][0]), 'mystical'),
    ]);
  };

  const selectAnswer = (choice) => {
    playSound('fan', isMuted);
    const question = questions[questionIndex];
    const nextAnswers = { ...answers, [question.id]: choice };
    const nextIndex = questionIndex + 1;
    setAnswers(nextAnswers);

    const nextMessages = [
      makeUserMessage(`answer-${question.id}`, choice),
      makeCharacterMessage(`reaction-${question.id}`, pickLine(character.id, 'reactions', questionIndex), questionIndex === questions.length - 1 ? 'thinking' : 'smile'),
    ];

    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      nextMessages.push(makeCharacterMessage(`question-${selectedTopic.id}-${nextIndex}`, getTonePrompt(character, questions[nextIndex]), nextIndex % 2 === 0 ? 'mystical' : 'serious'));
      appendMessages(nextMessages);
      return;
    }

    setPhase('profile');
    nextMessages.push(makeCharacterMessage('profile-guide', '이제 사주 계산에 필요한 기본 정보를 받을게요. 방금 답변은 상담 데이터로 함께 반영됩니다.', 'thinking'));
    nextMessages.push({ id: 'mid-ad', ad: true });
    appendMessages(nextMessages);
  };

  const submitProfile = (event) => {
    event.preventDefault();
    playSound('card', isMuted);
    const nextResult = buildFortuneResult(
      {
        ...form,
        purpose: selectedTopic.purpose,
        consultationTopic: selectedTopic.label,
        consultationAnswers: answers,
        consultationSummary: buildAnswerSummary(answers),
      },
      character.id,
    );

    setResult(nextResult);
    setPhase('analysis');

    appendMessages([
      makeUserMessage('profile-submitted', '상담 정보를 전달했습니다.'),
      makeCharacterMessage('analysis-start', pickLine(character.id, 'analysis', 0), 'thinking'),
      { id: 'analysis-ad', ad: true },
      makeCharacterMessage('analysis-trait', nextResult.finalCard.traitSummary, 'mystical'),
      makeCharacterMessage('analysis-behavior', nextResult.finalCard.behavior, 'smile'),
      makeCharacterMessage('analysis-advantage', nextResult.finalCard.strength, 'action'),
      makeCharacterMessage('analysis-caution', nextResult.finalCard.caution, 'serious'),
      makeCharacterMessage('analysis-flow', nextResult.finalCard.futureFlow, 'mystical'),
      makeCharacterMessage('final-empathy', pickLine(character.id, 'final', 1), 'smile'),
      makeCharacterMessage('final-ready', '종합 사주 결과를 카드로 정리했습니다. 아래에서 핵심만 끊어서 확인할 수 있어요.', 'final'),
    ]);
  };

  const visibleMessages = messages.slice(0, activeIndex + 1);
  const portraitState = resolveCharacterState(messages[activeIndex], phase === 'analysis' ? 'thinking' : 'idle');
  const canShowTopicChoices = phase === 'topic' && activeIndex >= messages.length - 1;
  const canShowQuestionChoices = phase === 'questions' && activeQuestion && activeIndex >= messages.length - 1;
  const canShowProfile = phase === 'profile' && activeIndex >= messages.length - 1;
  const canShowFinal = result && phase === 'analysis' && activeIndex >= messages.length - 1;

  return (
    <div className="consultation-shell mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <header className="z-20 flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="button-ghost text-sm">
          상담가 다시 선택
        </button>
        <div className="text-right">
          <p className="text-xs text-[#e7c873]">운명상담소</p>
          <p className="text-sm text-white/60">{selectedTopic ? `${selectedTopic.label} 상담 진행 중` : '상담 주제 선택 전'}</p>
        </div>
      </header>

      <section className="consultation-stage relative mt-4 flex min-h-[calc(100vh-112px)] flex-1 flex-col overflow-hidden rounded-[8px] border border-white/12 bg-[#130d2b] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(231,200,115,0.2),transparent_20%),radial-gradient(circle_at_20%_28%,rgba(125,211,252,0.15),transparent_26%),linear-gradient(180deg,rgba(29,18,64,0.92)_0%,rgba(9,6,22,0.96)_58%,rgba(7,5,15,0.98)_100%)]" />
        <div className="relative z-10 grid flex-1 grid-rows-[1fr_auto]">
          <div className="character-stage flex min-h-[430px] items-end justify-center px-4 pt-4">
            <div className="w-full max-w-[520px]">
              <CharacterPortrait character={character} size="novel" state={portraitState} />
            </div>
            <div className="absolute left-4 top-4 max-w-xs rounded-[8px] border border-white/10 bg-black/24 p-4 backdrop-blur">
              <p className="text-sm text-[#e7c873]">{character.title}</p>
              <h1 className="font-serif text-3xl font-black text-white">{character.name}</h1>
              <p className="mt-2 text-sm leading-6 text-white/68">{character.mood}</p>
            </div>
          </div>

          <div className="dialogue-dock relative z-20 border-t border-white/10 bg-[#090614]/82 p-4 backdrop-blur-xl sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm text-[#e7c873]">대화 기록</p>
                <p className="text-xs text-white/48">선택한 답변은 최종 분석에 반영됩니다</p>
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

            <div className="bottom-chat-window space-y-4">
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

              {canShowTopicChoices && (
                <div className="choice-grid">
                  {consultationTopics.map((topic) => (
                    <button key={topic.id} type="button" onClick={() => selectTopic(topic)} className="choice-card">
                      <span className="block text-base font-bold text-white">{topic.label}</span>
                      <span className="mt-1 block text-sm text-white/58">{topic.accent}</span>
                    </button>
                  ))}
                </div>
              )}

              {canShowQuestionChoices && (
                <div className="choice-grid">
                  {activeQuestion.choices.map((choice) => (
                    <button key={choice} type="button" onClick={() => selectAnswer(choice)} className="choice-card">
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {canShowProfile && (
                <form onSubmit={submitProfile} className="profile-form grid gap-4 rounded-[8px] border border-white/12 bg-white/[0.06] p-4 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm text-[#f8e7aa]">이름</span>
                    <input required value={form.name} onChange={(event) => update('name', event.target.value)} className="field" placeholder="예: 서윤" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-[#f8e7aa]">생년월일</span>
                    <input required type="date" value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} className="field" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-[#f8e7aa]">태어난 시간</span>
                    <select disabled={form.birthTimeUnknown} value={form.birthTime} onChange={(event) => update('birthTime', event.target.value)} className="field disabled:opacity-45">
                      {hours.map((hour) => (
                        <option key={hour}>{hour}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-[#f8e7aa]">성별</span>
                    <select value={form.gender} onChange={(event) => update('gender', event.target.value)} className="field">
                      <option>여성</option>
                      <option>남성</option>
                      <option>선택 안 함</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-black/18 px-3 py-3 text-sm text-white/76 sm:col-span-2">
                    <input type="checkbox" checked={form.birthTimeUnknown} onChange={(event) => update('birthTimeUnknown', event.target.checked)} />
                    태어난 시간이 기억나지 않아요
                  </label>
                  <button type="submit" className="rounded-[8px] bg-[#e7c873] px-5 py-4 font-bold text-[#25130a] transition hover:bg-[#f2d98d] sm:col-span-2">
                    분석 시작
                  </button>
                </form>
              )}

              {canShowFinal && (
                <section className="final-card rounded-[8px] border border-[#e7c873]/45 bg-[#0b0718]/92 p-5 shadow-[0_0_34px_rgba(231,200,115,0.16)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#f8e7aa]">종합 사주 결과</p>
                      <h2 className="font-serif text-3xl font-black text-white">{result.finalCard.name}님의 {result.finalCard.topic}</h2>
                    </div>
                    <span className="rounded-[8px] bg-[#e7c873] px-3 py-2 text-sm font-bold text-[#25130a]">{character.name}</span>
                  </div>
                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-3">
                      {Object.entries(result.elements).map(([type, value]) => (
                        <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
                      ))}
                    </div>
                    <div className="space-y-3 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
                      <p><strong className="text-white">핵심 성향</strong><br />{result.finalCard.traitSummary}</p>
                      <p><strong className="text-white">행동 패턴</strong><br />{result.finalCard.behavior}</p>
                      <p><strong className="text-white">장점</strong><br />{result.finalCard.strength}</p>
                      <p><strong className="text-white">주의점</strong><br />{result.finalCard.caution}</p>
                      <p><strong className="text-white">미래 흐름</strong><br />{result.finalCard.futureFlow}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {result.finalCard.keywords.map((keyword) => (
                      <span key={keyword} className="rounded-full border border-[#e7c873]/30 bg-[#e7c873]/12 px-3 py-1 text-sm text-[#ffe9a6]">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <button type="button" onClick={() => onComplete(result)} className="mt-5 w-full rounded-[8px] bg-gradient-to-r from-[#7c3aed] to-[#e7c873] px-5 py-4 font-bold text-white">
                    결과 상세 화면으로 이동
                  </button>
                </section>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
