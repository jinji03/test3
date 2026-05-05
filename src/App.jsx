import { useEffect, useMemo, useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import ConsultationPage from './pages/ConsultationPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import { characters } from './data/data.js';
import { setGlobalAudioMuted, startMainBgm } from './utils/bgm.js';
import { loadLastResult, saveResult } from './utils/storage.js';

const initialSaved = () => loadLastResult();

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [result, setResult] = useState(initialSaved);
  const [isMuted, setIsMuted] = useState(false);

  const selectedCharacter = useMemo(
    () => characters.find((character) => character.id === selectedId) || null,
    [selectedId],
  );

  const handleSelectCharacter = (id) => {
    startMainBgm();
    setSelectedId(id);
    setScreen('consult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (nextResult) => {
    const saved = saveResult(nextResult);
    setResult(saved);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayWithCharacter = (id) => {
    startMainBgm();
    setSelectedId(id);
    setScreen('consult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleFirstGesture = () => startMainBgm();

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  useEffect(() => {
    setGlobalAudioMuted(isMuted);
  }, [isMuted]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#100b24] text-[#fff8e8]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(159,114,255,0.22),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(218,171,81,0.18),transparent_28%),linear-gradient(180deg,#171033_0%,#0b0818_55%,#140916_100%)]" />
      {screen === 'home' && (
        <HomePage
          characters={characters}
          lastResult={result}
          onSelect={handleSelectCharacter}
          onViewLast={() => setScreen('result')}
        />
      )}
      {screen === 'consult' && selectedCharacter && (
        <ConsultationPage
          character={selectedCharacter}
          onBack={() => setScreen('home')}
          onComplete={handleComplete}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((value) => !value)}
        />
      )}
      {screen === 'result' && result && (
        <ResultPage
          result={result}
          characters={characters}
          onHome={() => setScreen('home')}
          onRetry={() => handleReplayWithCharacter(result.character.id)}
          onOtherCharacter={handleReplayWithCharacter}
        />
      )}
    </main>
  );
}
