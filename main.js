const namePools = {
  boy: [
    { name: "이준", meaning: "반듯하고 재능이 빛나는 느낌" },
    { name: "도윤", meaning: "부드럽고 신뢰감 있는 느낌" },
    { name: "서준", meaning: "차분하면서도 세련된 느낌" },
    { name: "하준", meaning: "맑고 안정적인 느낌" },
    { name: "유찬", meaning: "밝고 따뜻한 에너지가 느껴지는 이름" },
    { name: "지호", meaning: "지혜롭고 넓은 마음이 느껴지는 이름" },
    { name: "시우", meaning: "시원하고 단정한 울림" },
    { name: "은우", meaning: "부드럽고 깊이 있는 인상" },
    { name: "도현", meaning: "차분하고 믿음직한 느낌" },
    { name: "민준", meaning: "영민하고 반듯한 이미지" },
    { name: "태오", meaning: "크고 밝은 에너지가 느껴지는 이름" },
    { name: "준서", meaning: "단정하고 균형 잡힌 울림" },
  ],
  girl: [
    { name: "서아", meaning: "단아하고 깨끗한 느낌" },
    { name: "하윤", meaning: "부드럽고 사랑스러운 느낌" },
    { name: "지아", meaning: "지혜롭고 밝은 느낌" },
    { name: "아린", meaning: "고운 울림과 섬세한 인상" },
    { name: "유나", meaning: "경쾌하고 또렷한 느낌" },
    { name: "서윤", meaning: "맑고 우아한 이미지" },
    { name: "지유", meaning: "자유롭고 따뜻한 느낌" },
    { name: "하린", meaning: "부드럽고 세련된 울림" },
    { name: "리아", meaning: "밝고 국제적인 인상" },
    { name: "채원", meaning: "풍성하고 안정적인 느낌" },
    { name: "윤슬", meaning: "빛나는 물결 같은 고운 이름" },
    { name: "다은", meaning: "따뜻하고 은은한 이미지" },
  ],
  neutral: [
    { name: "로운", meaning: "여유롭고 좋은 기운이 느껴지는 이름" },
    { name: "이안", meaning: "간결하고 국제적인 느낌" },
    { name: "시온", meaning: "맑고 차분한 울림" },
    { name: "하루", meaning: "따뜻하고 기억하기 쉬운 이름" },
    { name: "주아", meaning: "부드럽고 밝은 인상" },
    { name: "라온", meaning: "즐겁고 긍정적인 느낌" },
    { name: "서온", meaning: "차분하고 따스한 울림" },
    { name: "유안", meaning: "부드럽고 안정적인 이름" },
    { name: "도하", meaning: "담백하고 현대적인 느낌" },
    { name: "지온", meaning: "밝고 온화한 인상" },
    { name: "해온", meaning: "따뜻한 빛이 떠오르는 이름" },
    { name: "이루", meaning: "간결하고 희망적인 느낌" },
  ],
};

const groupMeta = [
  {
    id: "boy",
    title: "남아 이름 5개",
    tone: "단정하고 밝은 인상",
  },
  {
    id: "girl",
    title: "여아 이름 5개",
    tone: "맑고 우아한 인상",
  },
  {
    id: "neutral",
    title: "중성 이름 5개",
    tone: "성별 구분 없이 자연스러운 인상",
  },
];

const themeToggle = document.querySelector("#theme-toggle");
const featuredName = document.querySelector("#featured-name");
const featuredMeaning = document.querySelector("#featured-meaning");
const shuffleBtn = document.querySelector("#shuffle-btn");
const rerollBtn = document.querySelector("#reroll-btn");
const filterButtons = document.querySelectorAll(".filter-button");
const nameGroupsEl = document.querySelector("#name-groups");
const savedNamesEl = document.querySelector("#saved-names");
const clearBtn = document.querySelector("#clear-btn");
const summary = document.querySelector("#summary");

let nameGroups = [];
let activeFilter = "all";
let savedNames = [];

const shuffle = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const buildNameGroups = () => groupMeta.map((group) => ({
  ...group,
  names: shuffle(namePools[group.id]).slice(0, 5),
}));

const allNames = () => nameGroups.flatMap((group) => group.names.map((item) => ({ ...item, group: group.title })));

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "라이트 모드" : "다크 모드";
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  localStorage.setItem("baby-name-theme", theme);
};

const renderFeatured = () => {
  const names = allNames();
  const pick = names[Math.floor(Math.random() * names.length)];
  featuredName.textContent = pick.name;
  featuredMeaning.textContent = pick.meaning;
};

const saveName = (name) => {
  if (!savedNames.includes(name)) {
    savedNames = [...savedNames, name];
    renderSaved();
  }
};

const renderSaved = () => {
  if (!savedNames.length) {
    savedNamesEl.className = "saved-names is-empty";
    savedNamesEl.textContent = "아직 저장한 이름이 없습니다.";
    return;
  }

  savedNamesEl.className = "saved-names";
  savedNamesEl.replaceChildren();

  savedNames.forEach((name) => {
    const chip = document.createElement("button");
    chip.className = "name-chip";
    chip.type = "button";
    chip.textContent = name;
    chip.setAttribute("aria-label", `${name} 후보 삭제`);
    chip.addEventListener("click", () => {
      savedNames = savedNames.filter((savedName) => savedName !== name);
      renderSaved();
    });
    savedNamesEl.append(chip);
  });
};

const renderGroups = () => {
  nameGroupsEl.replaceChildren();

  const visibleGroups = activeFilter === "all"
    ? nameGroups
    : nameGroups.filter((group) => group.id === activeFilter);

  visibleGroups.forEach((group) => {
    const section = document.createElement("article");
    const header = document.createElement("div");
    const title = document.createElement("h3");
    const tone = document.createElement("p");
    const list = document.createElement("div");

    section.className = `name-group name-group--${group.id}`;
    header.className = "name-group__header";
    title.textContent = group.title;
    tone.textContent = group.tone;
    list.className = "name-list";

    group.names.forEach((item) => {
      const card = document.createElement("button");
      const name = document.createElement("strong");
      const meaning = document.createElement("span");

      card.className = "name-card";
      card.type = "button";
      card.setAttribute("aria-label", `${item.name} 후보 저장`);
      name.textContent = item.name;
      meaning.textContent = item.meaning;

      card.addEventListener("click", () => saveName(item.name));
      card.append(name, meaning);
      list.append(card);
    });

    header.append(title, tone);
    section.append(header, list);
    nameGroupsEl.append(section);
  });

  summary.textContent = activeFilter === "all"
    ? "남아, 여아, 중성 이름을 5개씩 추천 중입니다."
    : `${visibleGroups[0].title}만 보고 있습니다.`;
};

const rerollGroups = () => {
  nameGroups = buildNameGroups();
  renderFeatured();
  renderGroups();
};

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderGroups();
  });
});

shuffleBtn.addEventListener("click", renderFeatured);
rerollBtn.addEventListener("click", rerollGroups);
clearBtn.addEventListener("click", () => {
  savedNames = [];
  renderSaved();
});

applyTheme(localStorage.getItem("baby-name-theme") || "light");
nameGroups = buildNameGroups();
renderFeatured();
renderGroups();
renderSaved();
