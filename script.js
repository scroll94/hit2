const lessons = [
  {
    title: "Переменная: коробка для значения",
    brief: "Собери команду, которая кладет текстовый пакет в коробку name.",
    slots: ["Коробка", "Транспортер", "Пакет"],
    answer: ["name", "=", "\"Mira\""],
    tokens: [
      { id: "name", label: "name", note: "коробка", type: "variable" },
      { id: "=", label: "=", note: "транспортер", type: "operator" },
      { id: "\"Mira\"", label: "\"Mira\"", note: "пакет", type: "value" },
      { id: "print", label: "print", note: "проектор", type: "action" }
    ],
    hint: "Слева ставим коробку, в середину транспортер =, справа пакет со значением.",
    output: "В коробке name теперь лежит пакет: Mira"
  },
  {
    title: "print(): проектор для экрана",
    brief: "Собери команду, которая показывает содержимое коробки name.",
    slots: ["Проектор", "Левая скоба", "Коробка", "Правая скоба"],
    answer: ["print", "(", "name", ")"],
    tokens: [
      { id: "name", label: "name", note: "коробка", type: "variable" },
      { id: "print", label: "print", note: "проектор", type: "action" },
      { id: "(", label: "(", note: "левая рамка", type: "operator" },
      { id: ")", label: ")", note: "правая рамка", type: "operator" }
    ],
    prefix: "name = \"Mira\"",
    hint: "Проектор print берет то, что находится внутри скобок.",
    output: "Mira"
  },
  {
    title: "input(): микрофон для ответа",
    brief: "Собери команду, которая спрашивает имя и кладет ответ в коробку player.",
    slots: ["Коробка", "Транспортер", "Микрофон", "Вопрос"],
    answer: ["player", "=", "input", "\"Как тебя зовут?\""],
    tokens: [
      { id: "player", label: "player", note: "коробка", type: "variable" },
      { id: "=", label: "=", note: "транспортер", type: "operator" },
      { id: "input", label: "input", note: "микрофон", type: "action" },
      { id: "\"Как тебя зовут?\"", label: "\"Как тебя зовут?\"", note: "вопрос", type: "value" }
    ],
    hint: "input сначала задает вопрос, потом возвращает ответ пользователя.",
    customCode: "player = input(\"Как тебя зовут?\")",
    output: "Python спросил: Как тебя зовут?\nПользователь ответил: Alex\nВ коробке player теперь лежит: Alex"
  },
  {
    title: "if: ворота с условием",
    brief: "Собери условие, которое пропустит команду только если score больше 10.",
    slots: ["Ворота", "Коробка", "Сравнение", "Порог"],
    answer: ["if", "score", ">", "10"],
    tokens: [
      { id: "score", label: "score", note: "коробка", type: "variable" },
      { id: "if", label: "if", note: "ворота", type: "condition" },
      { id: ">", label: ">", note: "стрелка сравнения", type: "operator" },
      { id: "10", label: "10", note: "порог", type: "value" }
    ],
    prefix: "score = 14",
    suffix: "    print(\"Победа\")",
    hint: "Ворота if стоят в начале. После них идет условие: коробка, знак сравнения, число.",
    customCode: "score = 14\nif score > 10:\n    print(\"Победа\")",
    output: "score равен 14, это больше 10.\nВорота открылись: Победа"
  },
  {
    title: "for: повторяющийся мотор",
    brief: "Собери цикл, который три раза включает проектор.",
    slots: ["Мотор", "Счетчик", "Диапазон", "Количество"],
    answer: ["for", "i", "range", "3"],
    tokens: [
      { id: "for", label: "for", note: "мотор цикла", type: "condition" },
      { id: "i", label: "i", note: "счетчик", type: "variable" },
      { id: "range", label: "range", note: "регулятор", type: "action" },
      { id: "3", label: "3", note: "количество", type: "value" }
    ],
    hint: "for запускает повторение, i считает шаги, range(3) дает три оборота.",
    customCode: "for i in range(3):\n    print(\"шаг\", i)",
    output: "шаг 0\nшаг 1\nшаг 2"
  }
];

let currentLesson = 0;
const completed = new Set();
let draggedToken = null;

const levelList = document.querySelector("#levelList");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonBrief = document.querySelector("#lessonBrief");
const parts = document.querySelector("#parts");
const slots = document.querySelector("#slots");
const codePreview = document.querySelector("#codePreview code");
const output = document.querySelector("#output");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");

document.querySelector("#startButton").addEventListener("click", () => {
  document.querySelector(".app-shell").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#resetButton").addEventListener("click", () => {
  renderLesson(currentLesson);
});

document.querySelector("#runButton").addEventListener("click", runMachine);
document.querySelector("#hintButton").addEventListener("click", showHint);

function renderLevels() {
  levelList.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const button = document.createElement("button");
    button.className = "level-button";
    button.type = "button";
    button.textContent = `${index + 1}. ${lesson.title}`;
    if (index === currentLesson) button.classList.add("active");
    if (completed.has(index)) button.classList.add("done");
    button.addEventListener("click", () => {
      currentLesson = index;
      renderLesson(index);
    });
    levelList.append(button);
  });
}

function renderLesson(index) {
  const lesson = lessons[index];
  lessonTitle.textContent = lesson.title;
  lessonBrief.textContent = lesson.brief;
  output.textContent = "Собери механизм и нажми \"Запустить\".";
  parts.innerHTML = "";
  slots.innerHTML = "";

  shuffle([...lesson.tokens]).forEach((token) => {
    parts.append(createPart(token));
  });

  lesson.slots.forEach((slotName, slotIndex) => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = String(slotIndex);
    slot.innerHTML = `<span>${slotName}</span><small>пусто</small>`;
    slot.addEventListener("dragover", onDragOver);
    slot.addEventListener("dragleave", () => slot.classList.remove("over"));
    slot.addEventListener("drop", onDrop);
    slots.append(slot);
  });

  renderLevels();
  updateCode();
  updateProgress();
}

function createPart(token) {
  const part = document.createElement("button");
  part.className = `part token-${token.type}`;
  part.type = "button";
  part.draggable = true;
  part.dataset.id = token.id;
  part.dataset.label = token.label;
  part.dataset.note = token.note;
  part.dataset.type = token.type;
  part.innerHTML = `<strong>${token.label}</strong><small>${token.note}</small>`;
  part.addEventListener("dragstart", () => {
    draggedToken = token;
    part.classList.add("dragging");
  });
  part.addEventListener("dragend", () => {
    draggedToken = null;
    part.classList.remove("dragging");
  });
  part.addEventListener("click", () => placeInFirstEmptySlot(token, part));
  return part;
}

function onDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add("over");
}

function onDrop(event) {
  event.preventDefault();
  const slot = event.currentTarget;
  slot.classList.remove("over");
  if (!draggedToken) return;
  fillSlot(slot, draggedToken);
  removePart(draggedToken.id);
}

function placeInFirstEmptySlot(token) {
  const emptySlot = [...document.querySelectorAll(".slot")].find((slot) => !slot.dataset.id);
  if (!emptySlot) return;
  fillSlot(emptySlot, token);
  removePart(token.id);
}

function fillSlot(slot, token) {
  if (slot.dataset.id) {
    restorePartFromSlot(slot);
  }
  slot.dataset.id = token.id;
  slot.dataset.label = token.label;
  slot.dataset.note = token.note;
  slot.dataset.type = token.type;
  slot.className = `slot filled token-${token.type}`;
  slot.innerHTML = `<strong>${token.label}</strong><small>${token.note}</small>`;
  slot.addEventListener("click", () => restorePartFromSlot(slot), { once: true });
  updateCode();
}

function restorePartFromSlot(slot) {
  const token = {
    id: slot.dataset.id,
    label: slot.dataset.label,
    note: slot.dataset.note,
    type: slot.dataset.type
  };
  if (!token.id) return;
  parts.append(createPart(token));
  slot.className = "slot";
  slot.innerHTML = `<span>${lessons[currentLesson].slots[Number(slot.dataset.index)]}</span><small>пусто</small>`;
  delete slot.dataset.id;
  delete slot.dataset.label;
  delete slot.dataset.note;
  delete slot.dataset.type;
  updateCode();
}

function removePart(id) {
  const part = [...parts.querySelectorAll(".part")].find((item) => item.dataset.id === id);
  if (part) part.remove();
}

function getCurrentTokens() {
  return [...document.querySelectorAll(".slot")].map((slot) => slot.dataset.id || "");
}

function updateCode() {
  const lesson = lessons[currentLesson];
  const tokens = getCurrentTokens();
  const hasEmpty = tokens.some((token) => !token);
  let line = hasEmpty ? tokens.map((token) => token || "___").join(" ") : buildCode(lesson, tokens);
  if (lesson.customCode && !hasEmpty) line = lesson.customCode;
  codePreview.textContent = [lesson.prefix, line, lesson.suffix].filter(Boolean).join("\n");
}

function buildCode(lesson, tokens) {
  if (lesson.title.includes("print")) return `${tokens[0]}${tokens[1]}${tokens[2]}${tokens[3]}`;
  if (lesson.title.includes("input")) return `${tokens[0]} ${tokens[1]} ${tokens[2]}(${tokens[3]})`;
  if (lesson.title.includes("if")) return `${tokens.join(" ")}:`;
  if (lesson.title.includes("for")) return `${tokens[0]} ${tokens[1]} in ${tokens[2]}(${tokens[3]}):`;
  return tokens.join(" ");
}

function runMachine() {
  const lesson = lessons[currentLesson];
  const tokens = getCurrentTokens();
  if (tokens.some((token) => !token)) {
    output.textContent = "Еще есть пустые гнезда. Дособери механизм.";
    return;
  }
  const isCorrect = tokens.every((token, index) => token === lesson.answer[index]);
  if (!isCorrect) {
    output.textContent = "Механизм дернулся, но команда не сработала. Проверь порядок деталей.";
    return;
  }
  completed.add(currentLesson);
  output.textContent = lesson.output;
  if (currentLesson < lessons.length - 1) {
    output.textContent += "\n\nУровень собран. Можно перейти к следующему механизму.";
  }
  renderLevels();
  updateProgress();
}

function showHint() {
  output.textContent = `Подсказка: ${lessons[currentLesson].hint}`;
}

function updateProgress() {
  progressText.textContent = `${completed.size} из ${lessons.length}`;
  progressFill.style.width = `${(completed.size / lessons.length) * 100}%`;
}

function shuffle(items) {
  return items
    .map((item) => ({ item, weight: Math.random() }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ item }) => item);
}

renderLesson(currentLesson);
