import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdSlot from '../components/AdSlot.jsx';
import ChatBubble from '../components/ChatBubble.jsx';
import CharacterPortrait from '../components/CharacterPortrait.jsx';
import ElementGauge from '../components/ElementGauge.jsx';
import { consultationTopics, getTonePrompt, pickLine, topicQuestions } from '../data/dialogue.js';
import { getChoicePattern, selectNextQuestion } from '../data/questionDB600.js';
import { buildAnswerSummary, makeCharacterMessage } from '../utils/chat.js';
import { resolveCharacterPose, resolveCharacterState } from '../utils/character.js';
import { buildFortuneResult, elementLabels } from '../utils/fortune.js';
import { generateBridgeDialogue, generateResultDialogues } from '../utils/dialogueEngine.js';
import { playCharacterVoice, startMainBgm } from '../utils/bgm.js';
import { playSound } from '../utils/sound.js';

const hours = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`);

const characterOpeningLines = {
  cheongyeon: `음… 잠시만요.
지금 흐름을 보고 있어요.
이건 그냥 우연이 아니에요.
조금 느껴지는 게 있어요.`,
  baekwoo: `괜찮아요.
지금까지 충분히 잘 해왔어요.
조금 힘들었죠?
천천히 괜찮아질 거예요.`,
  jihyeok: `흠.
패턴이 보이네요.
이건 꽤 명확합니다.
이 선택은 중요합니다.`,
  seonyul: `아…
그 마음, 아직 남아있네요.
쉽게 잊히지 않을 감정이에요.
조금 아프네요.`,
  hwashin: `하.
이건 고민할 문제 아니야.
결정해야 돼.
지금이 기회야.`,
};

export default function ConsultationPage({ character, onBack, onComplete, isMuted, onToggleMute }) {
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
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [resultContext, setResultContext] = useState({});
  const [isFast, setIsFast] = useState(false);
  const [result, setResult] = useState(null);
  const [currentComplete, setCurrentComplete] = useState(false);
  const chatEndRef = useRef(null);

  const activeQuestion = questions[questionIndex];

  const initialMessages = useMemo(
    () => [
      makeCharacterMessage('opening-voice', characterOpeningLines[character.id] || pickLine(character.id, 'opening', 0), 'smile', 'smile'),
      makeCharacterMessage('topic-guide', '오늘은 어디가 제일 마음에 걸려요?', 'mystical', 'fan-open'),
    ],
    [character],
  );

  useEffect(() => {
    setMessages(initialMessages);
    setActiveIndex(0);
    setPhase('topic');
    setSelectedTopic(null);
    setQuestionIndex(0);
    setQuestions([]);
    setAnswers({});
    setResultContext({});
    setResult(null);
    setCurrentComplete(false);
  }, [initialMessages]);

  useEffect(() => {
    startMainBgm();
    playCharacterVoice(character.id);
  }, [character.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeIndex, messages.length, phase, result]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const appendMessages = useCallback((nextMessages) => {
    setMessages((current) => {
      const next = [...current, ...nextMessages];
      setActiveIndex(current.length);
      setCurrentComplete(false);
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    setActiveIndex((current) => {
      const next = Math.min(current + 1, messages.length - 1);
      if (next !== current) setCurrentComplete(false);
      return next;
    });
  }, [messages.length]);

  const currentMessage = messages[activeIndex];

  useEffect(() => {
    if (currentMessage?.ad) setCurrentComplete(true);
  }, [currentMessage]);

  const handleMessageDone = useCallback(() => {
    setCurrentComplete(true);
  }, []);

  const handleDialogueClick = () => {
    if (!currentComplete) return;
    if (phase === 'topic' && activeIndex >= messages.length - 1) return;
    if (phase === 'questions' && activeQuestion && activeIndex >= messages.length - 1) return;
    if (phase === 'profile' && activeIndex >= messages.length - 1) return;
    if (phase === 'analysis' && result && activeIndex >= messages.length - 1) return;
    advance();
  };

  const selectTopic = (topic) => {
    playSound('fan', isMuted);
    setSelectedTopic(topic);
    update('purpose', topic.purpose);
    setPhase('questions');
    setQuestionIndex(0);
    const firstQuestion = selectNextQuestion(topic.id, []) || topicQuestions[topic.id][0];
    setQuestions(firstQuestion ? [firstQuestion] : []);
    appendMessages([
      makeCharacterMessage(`topic-reaction-${topic.id}`, `${topic.label} 쪽이군요. 천천히 들어볼게요.`, 'smile', 'smile'),
      makeCharacterMessage(`question-${topic.id}-0`, getQuestionPrompt(character, firstQuestion || topicQuestions[topic.id][0]), 'mystical', 'fan-open'),
    ]);
  };

  const selectAnswer = (choice) => {
    playSound('fan', isMuted);
    const question = questions[questionIndex];
    const selectedChoice = typeof choice === 'string' ? { label: choice, value: choice, traits: [] } : choice;
    const mergedContext = {
      ...resultContext,
      topic: selectedTopic.id,
      ...(selectedChoice.context || {}),
    };
    const nextAnswers = {
      ...answers,
      [question.id]: {
        questionId: question.id,
        stage: question.stage,
        questionText: question.text || getQuestionPrompt(character, question),
        selectedChoice: selectedChoice.label,
        value: selectedChoice.value,
        traits: selectedChoice.traits || [],
        context: selectedChoice.context || {},
        choicePattern: getChoicePattern(question),
        tags: question.tags || [],
      },
    };
    setAnswers(nextAnswers);
    setResultContext(mergedContext);

    const nextMessages = [
      ...generateBridgeDialogue({
        topic: selectedTopic.id,
        resultContext: mergedContext,
        previousAnswers: Object.values(nextAnswers),
        characterId: character.id,
      }).map((bubble, index) => makeCharacterMessage(`bridge-${question.id}-${index}`, bubble.text, bubble.state, bubble.state)),
    ];

    const nextQuestion = selectNextQuestion(selectedTopic.id, Object.values(nextAnswers));
    if (nextQuestion) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setQuestions((current) => [...current, nextQuestion]);
      nextMessages.push(makeCharacterMessage(`question-${selectedTopic.id}-${nextIndex}`, getQuestionPrompt(character, nextQuestion), nextIndex % 2 === 0 ? 'mystical' : 'serious', nextIndex % 2 === 0 ? 'fan-open' : 'serious'));
      appendMessages(nextMessages);
      return;
    }

    setPhase('profile');
    nextMessages.push(makeCharacterMessage('profile-guide', '좋아요. 이제 마지막으로 기본 정보만 받을게요.', 'thinking', 'thinking'));
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
        resultContext,
      },
      character.id,
    );

    setResult(nextResult);
    setPhase('analysis');

    const generatedDialogues = generateResultDialogues(character.id, nextResult.finalCard.engineSummary).map((bubble) =>
      makeCharacterMessage(bubble.id, bubble.text, bubble.state, bubble.state),
    );

    appendMessages([
      makeCharacterMessage('analysis-start', pickLine(character.id, 'analysis', 0), 'thinking', 'thinking'),
      { id: 'analysis-ad', ad: true },
      ...generatedDialogues,
      makeCharacterMessage('final-empathy', pickLine(character.id, 'final', 1), 'smile', 'smile'),
      makeCharacterMessage('final-ready', '마지막 이야기는 카드로 짧게 남겨둘게요.', 'final', 'smile'),
    ]);
  };

  const visibleMessages = messages.slice(0, activeIndex + 1);
  const portraitState = resolveCharacterState(messages[activeIndex], phase === 'analysis' ? 'thinking' : 'idle');
  const portraitPose = resolveCharacterPose(messages[activeIndex], 'idle');
  const canShowTopicChoices = currentComplete && phase === 'topic' && activeIndex >= messages.length - 1;
  const canShowQuestionChoices = currentComplete && phase === 'questions' && activeQuestion && activeIndex >= messages.length - 1;
  const canShowProfile = currentComplete && phase === 'profile' && activeIndex >= messages.length - 1;
  const canShowFinal = currentComplete && result && phase === 'analysis' && activeIndex >= messages.length - 1;

  return (
    <div className="consultation-shell mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <header className="z-20 flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="button-ghost text-sm mobile-compact-button">
          상담가 다시 선택
        </button>
        <div className="text-right">
          <p className="text-xs text-[#e7c873]">운명상담소</p>
          <p className="text-sm text-white/60">{selectedTopic ? `${selectedTopic.label} 상담 진행 중` : '상담 주제 선택 전'}</p>
        </div>
      </header>

      <section className="consultation-stage relative mt-4 flex min-h-[calc(100vh-112px)] flex-1 flex-col overflow-hidden rounded-[8px] border border-white/12 bg-[#130d2b] shadow-2xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${character.background})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,12,0.08)_0%,rgba(5,4,12,0.16)_48%,rgba(5,4,12,0.62)_100%)]" />
        <div className="relative z-10 grid flex-1 grid-rows-[1fr_auto]">
          <div className="character-stage flex min-h-[430px] items-end justify-center px-4 pt-4">
            <div className="w-full max-w-[520px]">
              <CharacterPortrait character={character} size="novel" state={portraitState} pose={portraitPose} />
            </div>
            <div className="character-name-chip absolute left-4 top-4 rounded-[8px] border border-white/10 bg-black/28 px-3 py-2 backdrop-blur">
              <h1 className="font-serif text-lg font-black text-white">{character.name}</h1>
            </div>
          </div>

          <div className="dialogue-dock relative z-20 border-t border-white/10 bg-[#090614]/82 p-4 backdrop-blur-xl sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm text-[#e7c873]">대화 기록</p>
                <p className="text-xs text-white/48">짧게 답해도 괜찮아요</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsFast((value) => !value)} className="button-ghost text-sm mobile-compact-button">
                  {isFast ? '천천히 보기' : '빠르게 보기'}
                </button>
                <button type="button" onClick={onToggleMute} className="button-ghost text-sm mobile-compact-button">
                  {isMuted ? '소리 켜기' : '소리 끄기'}
                </button>
              </div>
            </div>

            <div className="bottom-chat-window space-y-4" onClick={handleDialogueClick} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') handleDialogueClick(); }}>
              {visibleMessages.slice(-1).map((message, index) => (
                message.ad ? (
                  <AdSlot key={message.id} label="광고 영역 (추후 연동)" />
                ) : (
                  <ChatBubble
                    key={message.id}
                    character={character}
                    text={message.text}
                    from={message.from}
                    state={message.state || 'idle'}
                    showAvatar={false}
                    instant={isFast || message.from === 'user'}
                    muted={isMuted}
                    onDone={handleMessageDone}
                  />
                )
              ))}
              {currentComplete && !canShowTopicChoices && !canShowQuestionChoices && !canShowProfile && !canShowFinal && activeIndex < messages.length - 1 && (
                <span className="dialogue-next-hint">대화창을 클릭해 계속</span>
              )}

              {canShowTopicChoices && (
                <div className="choice-grid" onClick={(event) => event.stopPropagation()}>
                  {consultationTopics.map((topic) => (
                    <button key={topic.id} type="button" onClick={() => selectTopic(topic)} className="choice-card">
                      <span className="block text-base font-bold text-white">{topic.label}</span>
                      <span className="mt-1 block text-sm text-white/58">{topic.accent}</span>
                    </button>
                  ))}
                </div>
              )}

              {canShowQuestionChoices && (
                <div className="choice-grid" onClick={(event) => event.stopPropagation()}>
                  {activeQuestion.choices.map((choice) => (
                    <button key={choice.value || choice} type="button" onClick={() => selectAnswer(choice)} className="choice-card">
                      {choice.label || choice}
                    </button>
                  ))}
                </div>
              )}

              {canShowProfile && (
                <form onSubmit={submitProfile} onClick={(event) => event.stopPropagation()} className="profile-form grid gap-4 rounded-[8px] border border-white/12 bg-white/[0.06] p-4 sm:grid-cols-2">
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
                    상담 이어가기
                  </button>
                </form>
              )}

              {canShowFinal && (
                <section onClick={(event) => event.stopPropagation()} className="final-card rounded-[8px] border border-[#e7c873]/45 bg-[#0b0718]/92 p-5 shadow-[0_0_34px_rgba(231,200,115,0.16)]">
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
                      <p><strong className="text-white">지금 마음</strong><br />{result.finalCard.traitSummary}</p>
                      <p><strong className="text-white">상담에서 보인 것</strong><br />{result.finalCard.choiceReading}</p>
                      <p><strong className="text-white">자주 하던 선택</strong><br />{result.finalCard.behavior}</p>
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

function getQuestionPrompt(character, question) {
  if (question?.prompt) return getTonePrompt(character, question);
  return question.text;
}
