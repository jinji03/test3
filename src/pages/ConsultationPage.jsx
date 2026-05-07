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

const loadingSteps = [
  { id: 'birthChart', text: '생년월일시를 바탕으로 명식을 세우고 있습니다...' },
  { id: 'fiveElements', text: '오행의 균형을 살피는 중입니다...' },
  { id: 'daewoon', text: '대운과 세운의 흐름을 확인하고 있습니다...' },
  { id: 'yearlyFortune', text: '재물, 연애, 직업운의 흐름을 정리하고 있습니다...' },
  { id: 'finalInterpretation', text: '상담사가 결과를 해석하고 있습니다...' },
];

const topicStatusText = {
  love: '인연의 흐름을 보는 중',
  money: '재물운을 살피는 중',
  career: '직업운을 정리하는 중',
  job: '직업운을 정리하는 중',
  business: '사업운을 분석하는 중',
  total: '오행 균형을 살피는 중',
  general: '오행 균형을 살피는 중',
};

const characterCounselStyles = {
  cheongyeon: '달빛처럼 천천히 감정의 결을 봅니다.',
  baekwoo: '명식의 큰 흐름을 따뜻하게 짚습니다.',
  hwashin: '망설임보다 결단의 시점을 먼저 봅니다.',
  jihyeok: '현실 조건과 선택 기준을 분리해 봅니다.',
  seonyul: '마음의 온도와 인연의 리듬을 함께 봅니다.',
};

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
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const chatEndRef = useRef(null);

  const activeQuestion = questions[questionIndex];

  const initialMessages = useMemo(
    () => [
      makeCharacterMessage('opening-voice', characterOpeningLines[character.id] || pickLine(character.id, 'opening', 0), 'smile'),
      makeCharacterMessage('topic-guide', '오늘은 어디가 제일 마음에 걸려요?', 'mystical'),
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
    setLoadingStepIndex(0);
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
      makeCharacterMessage(`question-${topic.id}-0`, getQuestionPrompt(character, firstQuestion || topicQuestions[topic.id][0]), getQuestionExpression(firstQuestion, 0, topic.id)),
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
      }).map((bubble, index) => makeCharacterMessage(`bridge-${question.id}-${index}`, bubble.text, normalizeExpression(bubble.state, index))),
    ];

    const nextQuestion = selectNextQuestion(selectedTopic.id, Object.values(nextAnswers));
    if (nextQuestion) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setQuestions((current) => [...current, nextQuestion]);
      nextMessages.push(makeCharacterMessage(`question-${selectedTopic.id}-${nextIndex}`, getQuestionPrompt(character, nextQuestion), getQuestionExpression(nextQuestion, nextIndex, selectedTopic.id)));
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
    setPhase('loading');
    setLoadingStepIndex(0);
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

    const generatedDialogues = generateResultDialogues(character.id, nextResult.finalCard.engineSummary).map((bubble, index) =>
      makeCharacterMessage(bubble.id, bubble.text, normalizeExpression(bubble.state, index)),
    );

    window.setTimeout(() => setLoadingStepIndex(1), 650);
    window.setTimeout(() => setLoadingStepIndex(2), 1350);
    window.setTimeout(() => setLoadingStepIndex(3), 2100);
    window.setTimeout(() => setLoadingStepIndex(4), 2850);
    window.setTimeout(() => {
      setResult(nextResult);
      setPhase('analysis');
      appendMessages([
        makeCharacterMessage('analysis-start', pickLine(character.id, 'analysis', 0), 'thinking', 'thinking'),
        ...generatedDialogues,
        makeCharacterMessage('final-empathy', pickLine(character.id, 'final', 1), 'empathy'),
        makeCharacterMessage('final-ready', '핵심은 짧게 정리했어요. 자세한 명리 분석은 카드에서 볼게요.', 'final', 'smile'),
      ]);
    }, 3600);
  };

  const visibleMessages = messages.slice(0, activeIndex + 1);
  const portraitState = phase === 'loading'
    ? 'mystical'
    : resolveCharacterState(messages[activeIndex], phase === 'analysis' ? 'thinking' : 'idle');
  const portraitPose = phase === 'loading'
    ? 'mystical'
    : resolveCharacterPose(messages[activeIndex], 'idle');
  const canShowTopicChoices = currentComplete && phase === 'topic' && activeIndex >= messages.length - 1;
  const canShowQuestionChoices = currentComplete && phase === 'questions' && activeQuestion && activeIndex >= messages.length - 1;
  const canShowProfile = currentComplete && phase === 'profile' && activeIndex >= messages.length - 1;
  const canShowFinal = currentComplete && result && phase === 'analysis' && activeIndex >= messages.length - 1;
  const chatState = getChatState({ phase, currentComplete, canShowFinal });
  const consultationStatus = getConsultationStatus(selectedTopic, phase, chatState);

  return (
    <ChatScene character={character}>
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
        <CharacterStage character={character} emotionState={portraitState} pose={portraitPose} chatState={chatState} />
        {phase === 'loading' ? (
          <FortuneLoadingScreen character={character} loadingStep={loadingSteps[loadingStepIndex]} stepIndex={loadingStepIndex} />
        ) : (
          <ConsultationPanel
            character={character}
            statusText={consultationStatus}
            chatState={chatState}
            isFast={isFast}
            isMuted={isMuted}
            onToggleFast={() => setIsFast((value) => !value)}
            onToggleMute={onToggleMute}
            onDialogueClick={handleDialogueClick}
            visibleMessages={visibleMessages}
            canShowTopicChoices={canShowTopicChoices}
            canShowQuestionChoices={canShowQuestionChoices}
            canShowProfile={canShowProfile}
            canShowFinal={canShowFinal}
            activeQuestion={activeQuestion}
            form={form}
            result={result}
            currentComplete={currentComplete}
            activeIndex={activeIndex}
            messagesLength={messages.length}
            onTopicSelect={selectTopic}
            onAnswerSelect={selectAnswer}
            onProfileSubmit={submitProfile}
            onFormUpdate={update}
            onMessageDone={handleMessageDone}
            onComplete={onComplete}
            chatEndRef={chatEndRef}
          />
        )}
      </section>
    </ChatScene>
  );
}

function getQuestionPrompt(character, question) {
  if (question?.prompt) return getTonePrompt(character, question);
  return question.text;
}

function ChatScene({ character, children }) {
  return (
    <div className={`consultation-shell character-theme-${character.id} mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
}

function CharacterStage({ character, emotionState, pose, chatState }) {
  return (
    <>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${character.background})` }} />
      <div className={`consultation-atmosphere atmosphere-${emotionState} atmosphere-${chatState}`} />
      <div className="saju-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="relative z-10 grid flex-1 grid-rows-[1fr_auto]">
        <div className="character-stage flex min-h-[430px] items-end justify-center px-4 pt-4">
          <div className="w-full max-w-[520px]">
            <CharacterPortrait character={character} size="novel" state={emotionState} pose={pose} />
          </div>
          <div className="character-name-chip absolute left-4 top-4 rounded-[8px] border border-white/10 bg-black/28 px-3 py-2 backdrop-blur">
            <h1 className="font-serif text-lg font-black text-white">{character.name}</h1>
            <p className="mt-0.5 text-[0.68rem] text-white/56">{character.title}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function ConsultationPanel({
  character,
  statusText,
  chatState,
  isFast,
  isMuted,
  onToggleFast,
  onToggleMute,
  onDialogueClick,
  visibleMessages,
  canShowTopicChoices,
  canShowQuestionChoices,
  canShowProfile,
  canShowFinal,
  activeQuestion,
  form,
  result,
  currentComplete,
  activeIndex,
  messagesLength,
  onTopicSelect,
  onAnswerSelect,
  onProfileSubmit,
  onFormUpdate,
  onMessageDone,
  onComplete,
  chatEndRef,
}) {
  return (
    <div className={`consultation-panel dialogue-dock panel-${chatState}`}>
      <PanelHeader
        character={character}
        statusText={statusText}
        isFast={isFast}
        isMuted={isMuted}
        onToggleFast={onToggleFast}
        onToggleMute={onToggleMute}
      />

      <div className="bottom-chat-window" onClick={onDialogueClick} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onDialogueClick(); }}>
        {chatState === 'analyzing' && <AnalysisStatus text="명식 분석 중..." />}

        {visibleMessages.slice(-1).map((message) => (
          message.ad ? (
            <AdSlot key={message.id} label="광고 영역 (추후 연동)" />
          ) : (
            <MessageText
              key={message.id}
              character={character}
              message={message}
              isFast={isFast}
              isMuted={isMuted}
              onDone={onMessageDone}
            />
          )
        ))}

        {currentComplete && !canShowTopicChoices && !canShowQuestionChoices && !canShowProfile && !canShowFinal && activeIndex < messagesLength - 1 && (
          <span className="dialogue-next-hint">계속 듣기</span>
        )}

        {canShowTopicChoices && (
          <SuggestionChips
            items={consultationTopics.slice(0, 5)}
            getKey={(topic) => topic.id}
            render={(topic) => (
              <>
                <span>{topic.label}</span>
                <small>{topic.accent}</small>
              </>
            )}
            onSelect={onTopicSelect}
          />
        )}

        {canShowQuestionChoices && (
          <SuggestionChips
            items={activeQuestion.choices}
            getKey={(choice) => choice.value || choice}
            render={(choice) => <span>{choice.label || choice}</span>}
            onSelect={onAnswerSelect}
          />
        )}

        {canShowProfile && (
          <ProfileForm form={form} onUpdate={onFormUpdate} onSubmit={onProfileSubmit} />
        )}

        {canShowFinal && result && (
          <ResultSummaryCard result={result} character={character} onComplete={onComplete} />
        )}

        <InputBar disabled placeholder={getInputPlaceholder(chatState)} />
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

function PanelHeader({ character, statusText, isFast, isMuted, onToggleFast, onToggleMute }) {
  return (
    <div className="consultation-panel-header">
      <div>
        <p>{character.name} · {statusText}</p>
        <span>{characterCounselStyles[character.id] || '사주의 흐름을 조용히 살핍니다.'}</span>
      </div>
      <div className="panel-mini-actions">
        <button type="button" onClick={onToggleFast}>{isFast ? '느리게' : '빠르게'}</button>
        <button type="button" onClick={onToggleMute}>{isMuted ? '소리' : '무음'}</button>
      </div>
    </div>
  );
}

function MessageText({ character, message, isFast, isMuted, onDone }) {
  return (
    <div className="message-text">
      <ChatBubble
        character={character}
        text={message.text}
        from={message.from}
        state={message.state || 'idle'}
        showAvatar={false}
        instant={isFast || message.from === 'user'}
        muted={isMuted}
        onDone={onDone}
      />
    </div>
  );
}

function SuggestionChips({ items, getKey, render, onSelect }) {
  return (
    <div className="suggestion-chips choice-grid" onClick={(event) => event.stopPropagation()}>
      {items.map((item) => (
        <button key={getKey(item)} type="button" onClick={() => onSelect(item)} className="choice-card">
          {render(item)}
        </button>
      ))}
    </div>
  );
}

function InputBar({ placeholder, disabled = false }) {
  return (
    <div className="input-bar" onClick={(event) => event.stopPropagation()}>
      <input disabled={disabled} placeholder={placeholder} />
      <button type="button" disabled={disabled}>전송</button>
    </div>
  );
}

function AnalysisStatus({ text }) {
  return (
    <div className="analysis-status">
      <span />
      <p>{text}</p>
    </div>
  );
}

function ProfileForm({ form, onUpdate, onSubmit }) {
  return (
    <form onSubmit={onSubmit} onClick={(event) => event.stopPropagation()} className="profile-form grid gap-4 rounded-[8px] border border-white/12 bg-white/[0.06] p-4 sm:grid-cols-2">
      <label className="block space-y-2">
        <span className="text-sm text-[#f8e7aa]">이름</span>
        <input required value={form.name} onChange={(event) => onUpdate('name', event.target.value)} className="field" placeholder="예: 서윤" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-[#f8e7aa]">생년월일</span>
        <input required type="date" value={form.birthDate} onChange={(event) => onUpdate('birthDate', event.target.value)} className="field" />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-[#f8e7aa]">태어난 시간</span>
        <select disabled={form.birthTimeUnknown} value={form.birthTime} onChange={(event) => onUpdate('birthTime', event.target.value)} className="field disabled:opacity-45">
          {hours.map((hour) => (
            <option key={hour}>{hour}</option>
          ))}
        </select>
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-[#f8e7aa]">성별</span>
        <select value={form.gender} onChange={(event) => onUpdate('gender', event.target.value)} className="field">
          <option>여성</option>
          <option>남성</option>
          <option>선택 안 함</option>
        </select>
      </label>
      <label className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-black/18 px-3 py-3 text-sm text-white/76 sm:col-span-2">
        <input type="checkbox" checked={form.birthTimeUnknown} onChange={(event) => onUpdate('birthTimeUnknown', event.target.checked)} />
        태어난 시간이 기억나지 않아요
      </label>
      <button type="submit" className="rounded-[8px] bg-[#e7c873] px-5 py-4 font-bold text-[#25130a] transition hover:bg-[#f2d98d] sm:col-span-2">
        명식 해석 시작
      </button>
    </form>
  );
}

function ResultSummaryCard({ result, character, onComplete }) {
  return (
    <section onClick={(event) => event.stopPropagation()} className="final-card result-preview-card">
      <p>해석이 정리됐습니다.</p>
      <h2>{result.finalCard.name}님의 {result.finalCard.topic}</h2>
      <div className="mt-3 grid gap-2">
        {Object.entries(result.elements).slice(0, 3).map(([type, value]) => (
          <ElementGauge key={type} type={type} label={elementLabels[type]} value={value} />
        ))}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/72">{result.finalCard.traitSummary}</p>
      <button type="button" onClick={() => onComplete(result)}>
        자세히 보기
      </button>
      <span>{character.name}의 명리 분석</span>
    </section>
  );
}

function FortuneLoadingScreen({ character, loadingStep, stepIndex }) {
  return (
    <div className="fortune-loading-screen">
      <div className="fortune-loading-center">
        <MysticalLoadingOrb stepIndex={stepIndex} />
        <LoadingStepText character={character} text={loadingStep.text} />
        <LoadingProgress stepIndex={stepIndex} />
      </div>
      <AdBannerArea />
    </div>
  );
}

function MysticalLoadingOrb({ stepIndex }) {
  return (
    <div className="mystical-loading-orb" data-step={stepIndex}>
      <div className="orb-ring ring-one" />
      <div className="orb-ring ring-two" />
      <div className="orb-core">
        <span>木</span>
        <span>火</span>
        <span>土</span>
        <span>金</span>
        <span>水</span>
      </div>
    </div>
  );
}

function LoadingStepText({ character, text }) {
  return (
    <div className="loading-step-text">
      <p>{character.name}이 명식을 읽고 있습니다</p>
      <h2>{text}</h2>
    </div>
  );
}

function LoadingProgress({ stepIndex }) {
  return (
    <div className="loading-progress">
      <span style={{ width: `${((stepIndex + 1) / loadingSteps.length) * 100}%` }} />
    </div>
  );
}

function AdBannerArea() {
  return (
    <div className="ad-banner-area">
      <span>AD</span>
    </div>
  );
}

function normalizeExpression(state, index = 0) {
  const expressionMap = {
    idle: 'idle',
    thinking: 'thinking',
    smile: 'smile',
    serious: 'serious',
    mystical: 'mystical',
    action: 'shocked',
    'fan-open': 'mystical',
    'fan-close': 'serious',
    final: 'smile',
  };
  return expressionMap[state] || (index % 3 === 0 ? 'thinking' : index % 3 === 1 ? 'serious' : 'smile');
}

function getQuestionExpression(question, index = 0, topicId = 'general') {
  const stage = question?.stage || '';
  const tags = question?.tags || [];
  const marker = [stage, topicId, ...tags].join(' ');

  if (/emotion|pressure|stress|concern|risk|weak|inner|distance|signal/.test(marker)) return 'serious';
  if (/goal|desired|outcome|yearly|direction|saving|growth/.test(marker)) return 'smile';
  if (/status|focus|current|style|behavior|stage/.test(marker)) return 'thinking';
  return index % 2 === 0 ? 'mystical' : 'thinking';
}

function getChatState({ phase, currentComplete, canShowFinal }) {
  if (phase === 'loading') return 'analyzing';
  if (canShowFinal) return 'result';
  if (phase === 'profile') return 'listening';
  if (!currentComplete) return 'speaking';
  return phase === 'analysis' ? 'analyzing' : 'idle';
}

function getConsultationStatus(selectedTopic, phase, chatState) {
  if (phase === 'loading') return '명식 분석 중';
  if (chatState === 'result') return '결과를 정리하는 중';
  if (chatState === 'speaking') return '답을 전하는 중';
  if (chatState === 'listening') return '기본 정보를 듣는 중';
  const key = selectedTopic?.id || 'general';
  return topicStatusText[key] || '사주의 흐름을 보는 중';
}

function getInputPlaceholder(chatState) {
  if (chatState === 'analyzing') return '명식을 살펴보고 있습니다';
  if (chatState === 'result') return '상세 결과 카드에서 이어서 확인하세요';
  if (chatState === 'listening') return '생년월일시를 입력해 주세요';
  return '궁금한 운세를 물어보세요';
}
