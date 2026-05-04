import { useState } from 'react';
import AdSlot from '../components/AdSlot.jsx';
import CharacterPortrait from '../components/CharacterPortrait.jsx';
import { purposeOptions } from '../data/characters.js';
import { buildFortuneResult } from '../utils/fortune.js';

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

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onComplete(buildFortuneResult(form, character.id));
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <section className="space-y-4">
        <button type="button" onClick={onBack} className="text-sm text-white/66 hover:text-white">
          ← 운명가 다시 선택
        </button>
        <CharacterPortrait character={character} />
        <div className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5">
          <p className="text-[#e7c873]">{character.title}</p>
          <h1 className="font-serif text-4xl font-black text-white">{character.name}</h1>
          <p className="mt-3 leading-7 text-white/72">{character.mood}</p>
        </div>
      </section>

      <section className="rounded-[8px] border border-white/12 bg-[#17102e]/80 p-5 shadow-2xl backdrop-blur">
        <h2 className="font-serif text-3xl font-bold text-white">상담 정보 입력</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">입력값은 브라우저 안에서만 사용되며, MVP에서는 해시 기반 더미 사주 계산에 활용됩니다.</p>

        <form onSubmit={submit} className="mt-6 space-y-5">
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

          <AdSlot label="결과 보기 전 광고 영역" />

          <button type="submit" className="w-full rounded-[8px] bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#e7c873] px-5 py-4 font-bold text-white shadow-[0_0_28px_rgba(168,85,247,0.28)] transition hover:scale-[1.01]">
            {character.name}에게 사주 상담 받기
          </button>
        </form>
      </section>
    </div>
  );
}
