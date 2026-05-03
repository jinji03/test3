const lottoNumbers = document.querySelector("#lotto-numbers");
const setsEl = document.querySelector("#sets");
const generateBtn = document.querySelector("#generate-btn");
const clearLocksBtn = document.querySelector("#clear-locks-btn");
const copyBtn = document.querySelector("#copy-btn");
const setCount = document.querySelector("#set-count");
const includeBonus = document.querySelector("#include-bonus");
const summary = document.querySelector("#summary");
const drawLabel = document.querySelector("#draw-label");

let currentSets = [];
let lockedNumbers = new Set();

const getBallClass = (number) => {
  if (number <= 10) return "ball--yellow";
  if (number <= 20) return "ball--blue";
  if (number <= 30) return "ball--red";
  if (number <= 40) return "ball--gray";
  return "ball--green";
};

const shuffle = (items) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const generateSet = () => {
  const locked = [...lockedNumbers].slice(0, 6).sort((a, b) => a - b);
  const pool = Array.from({ length: 45 }, (_, index) => index + 1).filter((number) => !lockedNumbers.has(number));
  const picks = shuffle(pool).slice(0, 6 - locked.length);
  const numbers = [...locked, ...picks].sort((a, b) => a - b);
  const bonus = includeBonus.checked ? shuffle(pool.filter((number) => !numbers.includes(number)))[0] : null;

  return { numbers, bonus };
};

const formatSet = ({ numbers, bonus }) => {
  const base = numbers.join(", ");
  return bonus ? `${base} + 보너스 ${bonus}` : base;
};

const createBall = (number, options = {}) => {
  const { bonus = false, lockable = false } = options;
  const item = document.createElement("li");
  const ball = document.createElement(lockable ? "button" : "span");

  ball.className = `ball ${getBallClass(number)}${bonus ? " ball--bonus" : ""}`;
  ball.textContent = number;

  if (lockable) {
    ball.type = "button";
    ball.setAttribute("aria-label", `${number}번 ${lockedNumbers.has(number) ? "고정 해제" : "고정"}`);
    ball.setAttribute("aria-pressed", String(lockedNumbers.has(number)));
    ball.addEventListener("click", () => {
      if (lockedNumbers.has(number)) {
        lockedNumbers.delete(number);
      } else if (lockedNumbers.size < 6) {
        lockedNumbers.add(number);
      }
      render();
    });
  }

  item.append(ball);
  return item;
};

const renderFeatured = () => {
  lottoNumbers.replaceChildren();
  const featured = currentSets[0];

  if (!featured) return;

  featured.numbers.forEach((number) => {
    lottoNumbers.append(createBall(number));
  });

  drawLabel.textContent = includeBonus.checked && featured.bonus
    ? `오늘의 추천 조합 + 보너스 ${featured.bonus}`
    : "오늘의 추천 조합";
};

const renderSets = () => {
  setsEl.replaceChildren();

  currentSets.forEach((set, index) => {
    const row = document.createElement("article");
    const rowIndex = document.createElement("span");
    const numbers = document.createElement("ol");
    const copySet = document.createElement("button");

    row.className = "set";
    rowIndex.className = "set__index";
    rowIndex.textContent = index + 1;
    numbers.className = "set__numbers";
    copySet.className = "copy-set";
    copySet.type = "button";
    copySet.textContent = "복사";
    copySet.addEventListener("click", () => copyText(formatSet(set), copySet));

    set.numbers.forEach((number) => {
      numbers.append(createBall(number, { lockable: true }));
    });

    if (set.bonus) {
      numbers.append(createBall(set.bonus, { bonus: true }));
    }

    row.append(rowIndex, numbers, copySet);
    setsEl.append(row);
  });
};

const render = () => {
  renderFeatured();
  renderSets();
  const lockedText = lockedNumbers.size ? `고정 번호 ${[...lockedNumbers].sort((a, b) => a - b).join(", ")}` : "고정 번호 없음";
  summary.textContent = `${currentSets.length}개 조합 추천 완료. ${lockedText}`;
};

const draw = () => {
  const count = Number(setCount.value);
  currentSets = Array.from({ length: count }, generateSet);
  render();
};

const copyText = async (text, button) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = "완료";
    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1000);
  } catch {
    window.prompt("번호를 복사하세요.", text);
  }
};

generateBtn.addEventListener("click", draw);
setCount.addEventListener("change", draw);
includeBonus.addEventListener("change", draw);
clearLocksBtn.addEventListener("click", () => {
  lockedNumbers = new Set();
  render();
});
copyBtn.addEventListener("click", () => {
  if (currentSets[0]) {
    copyText(formatSet(currentSets[0]), copyBtn);
  }
});

draw();
