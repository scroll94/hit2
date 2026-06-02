const lessons = [
  {
    title: "Переменная: коробка и пакет",
    brief: "Собери присваивание: коробка получает пакет через транспортер =. Запасное гнездо можно оставить пустым.",
    slots: ["Коробка", "Транспортер", "Пакет", "Запас"],
    answer: ["name", "=", "\"Mira\"", ""],
    tokens: [
      part("name", "name", "коробка для значения", "variable"),
      part("=", "=", "транспортер присваивания", "operator"),
      part("\"Mira\"", "\"Mira\"", "текстовый пакет", "value"),
      part("print", "print", "лишний проектор", "action"),
      part("age", "age", "другая коробка", "variable")
    ],
    code: (t) => `${t[0]} ${t[1]} ${t[2]}`,
    hint: "Для переменной порядок такой: имя коробки, знак =, значение.",
    output: "Коробка name получила пакет: Mira"
  },
  {
    title: "print(): проектор результата",
    brief: "Собери проектор так, чтобы он вывел содержимое коробки name.",
    slots: ["Проектор", "Левая рамка", "Что показать", "Правая рамка"],
    answer: ["print", "(", "name", ")"],
    tokens: [
      part("print", "print", "проектор вывода", "action"),
      part("(", "(", "левая скобка", "operator"),
      part("name", "name", "коробка", "variable"),
      part(")", ")", "правая скобка", "operator"),
      part("\"name\"", "\"name\"", "текст, не коробка", "value")
    ],
    prefix: "name = \"Mira\"",
    code: (t) => `${t[0]}${t[1]}${t[2]}${t[3]}`,
    hint: "Без кавычек Python берет содержимое коробки name. В кавычках он напечатает само слово.",
    output: "Mira"
  },
  {
    title: "input(): микрофон и вопрос",
    brief: "Собери команду, которая спрашивает имя и кладет ответ в коробку player.",
    slots: ["Коробка", "Транспортер", "Микрофон", "Вопрос"],
    answer: ["player", "=", "input", "\"Как тебя зовут?\""],
    tokens: [
      part("player", "player", "коробка для ответа", "variable"),
      part("=", "=", "транспортер", "operator"),
      part("input", "input", "микрофон ввода", "action"),
      part("\"Как тебя зовут?\"", "\"Как тебя зовут?\"", "вопрос", "value"),
      part("print", "print", "лишний проектор", "action")
    ],
    code: (t) => `${t[0]} ${t[1]} ${t[2]}(${t[3]})`,
    hint: "input стоит справа от =, потому что его результат нужно положить в переменную.",
    output: "Python спросил: Как тебя зовут?\nПользователь ответил: Alex\nКоробка player получила: Alex"
  },
  {
    title: "if: ворота условия",
    brief: "Открой ворота только если score больше 10.",
    slots: ["Ворота", "Коробка", "Сравнение", "Порог"],
    answer: ["if", "score", ">", "10"],
    tokens: [
      part("if", "if", "ворота условия", "condition"),
      part("score", "score", "коробка с очками", "variable"),
      part(">", ">", "больше", "operator"),
      part("10", "10", "порог", "value"),
      part("<", "<", "лишний знак", "operator")
    ],
    prefix: "score = 14",
    suffix: "    print(\"Победа\")",
    code: (t) => `${t[0]} ${t[1]} ${t[2]} ${t[3]}:`,
    hint: "Ворота if стоят первыми, потом идет условие.",
    output: "score = 14, это больше 10.\nВорота открылись: Победа"
  },
  {
    title: "if / else: два выхода",
    brief: "Собери первую строку развилки: если температура меньше 0, покажем предупреждение.",
    slots: ["Ворота", "Коробка", "Сравнение", "Порог"],
    answer: ["if", "temp", "<", "0"],
    tokens: [
      part("if", "if", "первые ворота", "condition"),
      part("temp", "temp", "температура", "variable"),
      part("<", "<", "меньше", "operator"),
      part("0", "0", "порог", "value"),
      part("else", "else", "запасной выход", "condition")
    ],
    prefix: "temp = -5",
    suffix: "    print(\"Лед\")\nelse:\n    print(\"Тепло\")",
    code: (t) => `${t[0]} ${t[1]} ${t[2]} ${t[3]}:`,
    hint: "else не стоит в этой строке. Он включается ниже, если if не сработал.",
    output: "temp = -5.\nСработала ветка if: Лед"
  },
  {
    title: "for: мотор повторения",
    brief: "Собери цикл, который делает три оборота.",
    slots: ["Мотор", "Счетчик", "Регулятор", "Сколько"],
    answer: ["for", "i", "range", "3"],
    tokens: [
      part("for", "for", "мотор цикла", "condition"),
      part("i", "i", "счетчик", "variable"),
      part("range", "range", "регулятор оборотов", "action"),
      part("3", "3", "три оборота", "value"),
      part("while", "while", "другой мотор", "condition")
    ],
    suffix: "    print(\"шаг\", i)",
    code: (t) => `${t[0]} ${t[1]} in ${t[2]}(${t[3]}):`,
    hint: "for i in range(3) значит: счетчик i пройдет 0, 1, 2.",
    output: "шаг 0\nшаг 1\nшаг 2"
  },
  {
    title: "Список: склад по порядку",
    brief: "Собери список из трех предметов и положи его в коробку items.",
    slots: ["Коробка", "Транспортер", "Открыть склад", "Предметы"],
    answer: ["items", "=", "[", "\"key\", \"map\", \"coin\""],
    tokens: [
      part("items", "items", "коробка списка", "variable"),
      part("=", "=", "транспортер", "operator"),
      part("[", "[", "открыть список", "structure"),
      part("\"key\", \"map\", \"coin\"", "\"key\", \"map\", \"coin\"", "предметы", "value"),
      part("{", "{", "не тот склад", "structure")
    ],
    suffix: "]\nprint(items[1])",
    code: (t) => `${t[0]} ${t[1]} ${t[2]}${t[3]}]`,
    hint: "Список открывается квадратной скобкой [. Закрывающая скобка уже стоит в коде справа.",
    output: "items хранит: key, map, coin\nitems[1] показывает второй предмет: map"
  },
  {
    title: "Словарь: склад с ключами",
    brief: "Собери словарь, где по ключу hp лежит число 100.",
    slots: ["Коробка", "Транспортер", "Открыть словарь", "Ключ и значение"],
    answer: ["hero", "=", "{", "\"hp\": 100"],
    tokens: [
      part("hero", "hero", "коробка словаря", "variable"),
      part("=", "=", "транспортер", "operator"),
      part("{", "{", "открыть словарь", "structure"),
      part("\"hp\": 100", "\"hp\": 100", "ключ: значение", "value"),
      part("[", "[", "лишний список", "structure")
    ],
    suffix: "}\nprint(hero[\"hp\"])",
    code: (t) => `${t[0]} ${t[1]} ${t[2]}${t[3]}}`,
    hint: "У словаря фигурные скобки, а внутри пара: ключ и значение.",
    output: "hero[\"hp\"] показывает: 100"
  },
  {
    title: "def: чертеж своей команды",
    brief: "Собери заголовок функции, которая называется greet и принимает name.",
    slots: ["Чертеж", "Имя команды", "Параметр", "Запуск блока"],
    answer: ["def", "greet", "name", ":"],
    tokens: [
      part("def", "def", "чертеж функции", "structure"),
      part("greet", "greet", "имя команды", "action"),
      part("name", "name", "параметр", "variable"),
      part(":", ":", "запуск блока", "operator"),
      part("return", "return", "лишняя деталь", "action")
    ],
    suffix: "    print(\"Привет\", name)\n\ngreet(\"Mira\")",
    code: (t) => `${t[0]} ${t[1]}(${t[2]})${t[3]}`,
    hint: "Функция начинается с def, потом имя, потом параметры в скобках, потом двоеточие.",
    output: "Создана команда greet.\nЗапуск greet(\"Mira\") вывел: Привет Mira"
  },
  {
    title: "return: деталь, которая отдает результат",
    brief: "Собери строку функции, которая возвращает число x, умноженное на 2.",
    slots: ["Вернуть", "Число", "Действие", "Множитель"],
    answer: ["return", "x", "*", "2"],
    tokens: [
      part("return", "return", "вернуть результат", "action"),
      part("x", "x", "параметр", "variable"),
      part("*", "*", "умножить", "operator"),
      part("2", "2", "множитель", "value"),
      part("print", "print", "показывает, но не отдает", "action")
    ],
    prefix: "def double(x):",
    code: (t) => `    ${t[0]} ${t[1]} ${t[2]} ${t[3]}`,
    hint: "return не печатает на экран. Он отдает результат туда, где вызвали функцию.",
    output: "double(5) вернет 10.\nФункция не просто показала число, а отдала его программе."
  }
];

let currentLesson = 0;
let draggedToken = null;
let autoRunTimer = null;
const completed = new Set();

const levelList = document.querySelector("#levelList");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonBrief = document.querySelector("#lessonBrief");
const parts = document.querySelector("#parts");
const slots = document.querySelector("#slots");
const machineBoard = document.querySelector("#machineBoard");
const cableLayer = document.querySelector("#cableLayer");
const boardSparks = document.querySelector("#boardSparks");
const codePreview = document.querySelector("#codePreview code");
const output = document.querySelector("#output");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const slotCount = document.querySelector("#slotCount");
const machineStatus = document.querySelector("#machineStatus");
const machineLight = document.querySelector("#machineLight");
const guideToggle = document.querySelector("#guideToggle");
const autoRunToggle = document.querySelector("#autoRunToggle");
const strictToggle = document.querySelector("#strictToggle");
const assemblyMeter = document.querySelector("#assemblyMeter");
const tracePanel = document.querySelector("#tracePanel");
const traceSummary = document.querySelector("#traceSummary");

document.querySelector("#startButton").addEventListener("click", () => {
  document.querySelector(".app-shell").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#resetButton").addEventListener("click", () => renderLesson(currentLesson));
document.querySelector("#clearButton").addEventListener("click", () => renderLesson(currentLesson));
document.querySelector("#runButton").addEventListener("click", runMachine);
document.querySelector("#hintButton").addEventListener("click", showHint);

guideToggle.addEventListener("change", () => {
  document.body.classList.toggle("guides-off", !guideToggle.checked);
  updateBoardState();
});

autoRunToggle.addEventListener("change", updateBoardState);
strictToggle.addEventListener("change", () => {
  machineStatus.textContent = strictToggle.checked ? "Строгая посадка включена" : "Мягкая сборка включена";
});

window.addEventListener("resize", () => {
  markLineEnds();
  updateCables();
});

function part(id, label, note, type) {
  return { id, label, note, type, kind: getPartKind(id, type) };
}

function getPartKind(id, type) {
  if (id === "print") return "print";
  if (id === "input") return "input";
  if (id === "if" || id === "else") return "gate";
  if (id === "for" || id === "while" || id === "range") return "motor";
  if (id === "def") return "blueprint";
  if (id === "return") return "return";
  if (id === "[" || id === "{" || type === "structure") return "storage";
  if (type === "operator") return "operator";
  if (type === "value") return "package";
  if (type === "variable") return "crate";
  return "module";
}

function renderObject(token) {
  return `
    <div class="object object-${token.kind}">
      <span class="object-visual" aria-hidden="true">
        <span class="object-core">${token.label}</span>
      </span>
      <span class="object-copy">
        <strong>${token.label}</strong>
        <small>${token.note}</small>
      </span>
    </div>
  `;
}

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
  clearTimeout(autoRunTimer);
  const lesson = lessons[index];
  lessonTitle.textContent = lesson.title;
  lessonBrief.textContent = lesson.brief;
  output.textContent = "Поставь детали в гнезда и нажми \"Запустить\".";
  parts.innerHTML = "";
  slots.innerHTML = "";
  boardSparks.innerHTML = "";
  cableLayer.innerHTML = "";
  assemblyMeter.innerHTML = "";
  machineBoard.classList.remove("running", "connected", "ready", "success", "error", "miswired");
  machineStatus.textContent = "Ожидание сборки";
  machineLight.className = "status-light";

  shuffle([...lesson.tokens]).forEach((token) => parts.append(createPart(token)));

  lesson.slots.forEach((slotName, slotIndex) => {
    const slot = document.createElement("div");
    const expected = lesson.answer[slotIndex] || "";
    slot.className = expected ? "slot guide-target" : "slot optional";
    slot.dataset.index = String(slotIndex);
    slot.dataset.expected = expected;
    slot.innerHTML = renderEmptySlot(slotName, expected);
    slot.addEventListener("dragover", onDragOver);
    slot.addEventListener("dragleave", () => slot.classList.remove("over"));
    slot.addEventListener("drop", onDrop);
    slots.append(slot);
  });

  markLineEnds();
  renderLevels();
  updateCode();
  updateProgress();
  updateBoardState();
}

function renderEmptySlot(label, expected) {
  const target = expected ? `<small class="slot-target">нужна деталь: ${expected}</small>` : `<small class="slot-target">запасное гнездо</small>`;
  return `<span class="slot-role">${label}</span>${target}`;
}

function createPart(token) {
  const partButton = document.createElement("button");
  partButton.className = `part token-${token.type} kind-${token.kind}`;
  partButton.type = "button";
  partButton.draggable = true;
  partButton.dataset.id = token.id;
  partButton.dataset.label = token.label;
  partButton.dataset.note = token.note;
  partButton.dataset.type = token.type;
  partButton.dataset.kind = token.kind;
  partButton.innerHTML = renderObject(token);
  partButton.addEventListener("dragstart", () => {
    draggedToken = token;
    partButton.classList.add("dragging");
    highlightCompatibleSlots(token);
  });
  partButton.addEventListener("dragend", () => {
    draggedToken = null;
    partButton.classList.remove("dragging");
    clearSlotHighlights();
  });
  partButton.addEventListener("click", () => placeSuggestedSlot(token));
  return partButton;
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
  placeTokenInSlot(slot, draggedToken);
}

function placeSuggestedSlot(token) {
  const slotItems = [...document.querySelectorAll(".slot")];
  const exactSlot = slotItems.find((slot) => !slot.dataset.id && slot.dataset.expected === token.id);
  const emptySlot = slotItems.find((slot) => !slot.dataset.id);
  const targetSlot = exactSlot || emptySlot;
  if (targetSlot) placeTokenInSlot(targetSlot, token);
}

function placeTokenInSlot(slot, token) {
  if (strictToggle.checked && slot.dataset.expected && slot.dataset.expected !== token.id) {
    rejectToken(slot, token);
    return;
  }

  fillSlot(slot, token);
  removePart(token.id);
}

function fillSlot(slot, token) {
  if (slot.dataset.id) restorePartFromSlot(slot);
  clearRunState();
  slot.dataset.id = token.id;
  slot.dataset.label = token.label;
  slot.dataset.note = token.note;
  slot.dataset.type = token.type;
  slot.dataset.kind = token.kind;
  slot.className = `slot filled token-${token.type} kind-${token.kind}`;
  slot.innerHTML = `${renderObject(token)}<span class="mini-gear"></span><span class="contact-pin pin-left"></span><span class="contact-pin pin-right"></span>`;
  slot.addEventListener("click", () => restorePartFromSlot(slot), { once: true });
  output.textContent = `Деталь ${token.label} вставлена. Цепь пересчитана.`;
  markLineEnds();
  updateCode();
  updateBoardState();
}

function restorePartFromSlot(slot) {
  const token = {
    id: slot.dataset.id,
    label: slot.dataset.label,
    note: slot.dataset.note,
    type: slot.dataset.type,
    kind: slot.dataset.kind
  };
  if (!token.id) return;

  parts.append(createPart(token));
  clearRunState();
  resetSlot(slot);
  output.textContent = `Деталь ${token.label} снята с механизма.`;
  markLineEnds();
  updateCode();
  updateBoardState();
}

function clearRunState() {
  clearTimeout(autoRunTimer);
  machineBoard.classList.remove("running", "success", "error");
  boardSparks.innerHTML = "";
}

function resetSlot(slot) {
  const lesson = lessons[currentLesson];
  const index = Number(slot.dataset.index);
  const expected = lesson.answer[index] || "";
  slot.className = expected ? "slot guide-target" : "slot optional";
  slot.innerHTML = renderEmptySlot(lesson.slots[index], expected);
  delete slot.dataset.id;
  delete slot.dataset.label;
  delete slot.dataset.note;
  delete slot.dataset.type;
  delete slot.dataset.kind;
}

function removePart(id) {
  const partButton = [...parts.querySelectorAll(".part")].find((item) => item.dataset.id === id);
  if (partButton) partButton.remove();
}

function rejectToken(slot, token) {
  slot.classList.add("rejected");
  output.textContent = `Строгая посадка: деталь ${token.label} не подходит к этому гнезду.`;
  machineBoard.classList.add("error");
  machineLight.className = "status-light warning";
  machineStatus.textContent = "Деталь не вошла в гнездо";
  shakeBoard();
  window.setTimeout(() => slot.classList.remove("rejected"), 420);
}

function highlightCompatibleSlots(token) {
  document.querySelectorAll(".slot").forEach((slot) => {
    const expected = slot.dataset.expected;
    slot.classList.toggle("compatible", !slot.dataset.id && expected === token.id);
    slot.classList.toggle("incompatible", !slot.dataset.id && Boolean(expected) && expected !== token.id);
  });
}

function clearSlotHighlights() {
  document.querySelectorAll(".slot").forEach((slot) => {
    slot.classList.remove("compatible", "incompatible");
  });
}

function getCurrentTokens() {
  return [...document.querySelectorAll(".slot")].map((slot) => slot.dataset.id || "");
}

function evaluateAssembly() {
  const lesson = lessons[currentLesson];
  const tokens = getCurrentTokens();
  const required = lesson.answer.filter(Boolean).length;
  let correct = 0;
  let filled = 0;
  let wrong = 0;
  let missing = 0;

  document.querySelectorAll(".slot").forEach((slot, index) => {
    const expected = lesson.answer[index] || "";
    const actual = tokens[index] || "";
    const isOptional = !expected;
    slot.classList.remove("correct", "wrong", "empty-required", "empty-optional");

    if (actual) filled += 1;

    if (isOptional) {
      slot.classList.add(actual ? "correct" : "empty-optional");
      return;
    }

    if (!actual) {
      missing += 1;
      slot.classList.add("empty-required");
      return;
    }

    if (actual === expected) {
      correct += 1;
      slot.classList.add("correct");
    } else {
      wrong += 1;
      slot.classList.add("wrong");
    }
  });

  return {
    tokens,
    required,
    correct,
    filled,
    wrong,
    missing,
    isComplete: missing === 0,
    isCorrect: missing === 0 && wrong === 0 && correct === required
  };
}

function updateCode() {
  const lesson = lessons[currentLesson];
  const tokens = getCurrentTokens();
  const hasEmptyRequired = lesson.answer.some((id, index) => id && !tokens[index]);
  const line = hasEmptyRequired ? tokens.map((token) => token || "___").join(" ") : lesson.code(tokens);
  codePreview.textContent = [lesson.prefix, line, lesson.suffix].filter(Boolean).join("\n");
}

function updateBoardState() {
  const state = evaluateAssembly();
  const percent = state.required ? Math.round((state.correct / state.required) * 100) : 0;

  slotCount.textContent = `${state.filled} ${getDetailWord(state.filled)}`;
  machineBoard.classList.toggle("connected", state.filled >= 2);
  machineBoard.classList.toggle("ready", state.isCorrect);
  machineBoard.classList.toggle("miswired", state.wrong > 0);

  if (!machineBoard.classList.contains("success") && !machineBoard.classList.contains("error")) {
    if (state.wrong > 0) {
      machineStatus.textContent = `Цепь собрана на ${percent}%, есть ошибка`;
      machineLight.className = "status-light warning";
    } else if (state.isCorrect) {
      machineStatus.textContent = "Цепь готова к запуску";
      machineLight.className = "status-light success";
    } else if (state.filled > 0) {
      machineStatus.textContent = `Цепь собрана на ${percent}%`;
      machineLight.className = "status-light active";
    } else {
      machineStatus.textContent = "Ожидание сборки";
      machineLight.className = "status-light";
    }
  }

  updateMeter(state);
  updateTrace(state);
  updateCables();
  scheduleAutoRun(state);
}

function updateMeter(state) {
  const lesson = lessons[currentLesson];
  assemblyMeter.innerHTML = "";
  lesson.answer.forEach((expected, index) => {
    const cell = document.createElement("span");
    const actual = state.tokens[index] || "";
    const status = !expected ? "optional" : !actual ? "empty" : actual === expected ? "ok" : "bad";
    cell.className = `meter-cell meter-${status}`;
    cell.title = expected ? `${lesson.slots[index]}: ${expected}` : `${lesson.slots[index]}: запас`;
    assemblyMeter.append(cell);
  });
}

function updateTrace(state) {
  const lesson = lessons[currentLesson];
  tracePanel.innerHTML = "";
  traceSummary.textContent = state.isCorrect ? "цепь готова" : `${state.correct} из ${state.required} совпало`;

  lesson.answer.forEach((expected, index) => {
    const actual = state.tokens[index] || "";
    const item = document.createElement("div");
    const status = !expected ? "optional" : !actual ? "empty" : actual === expected ? "ok" : "bad";
    item.className = `trace-step trace-${status}`;
    item.innerHTML = `
      <strong>${lesson.slots[index]}</strong>
      <span>${actual || "пусто"}</span>
      <small>${expected ? `нужно: ${expected}` : "запасное гнездо"}</small>
    `;
    tracePanel.append(item);
  });
}

function scheduleAutoRun(state) {
  clearTimeout(autoRunTimer);
  if (!autoRunToggle.checked || !state.isCorrect || machineBoard.classList.contains("success")) return;
  autoRunTimer = window.setTimeout(runMachine, 650);
}

function runMachine() {
  clearTimeout(autoRunTimer);
  const lesson = lessons[currentLesson];
  const state = evaluateAssembly();

  if (state.missing > 0) {
    output.textContent = "Механизм еще не собран: есть важные пустые гнезда.";
    machineBoard.classList.remove("success", "ready");
    machineBoard.classList.add("error");
    machineStatus.textContent = "Не хватает деталей";
    machineLight.className = "status-light warning";
    shakeBoard();
    return;
  }

  if (state.wrong > 0) {
    output.textContent = "Детали вставлены, но цепь пошла не туда. Переставь ошибочные элементы и запусти снова.";
    machineBoard.classList.remove("success", "ready");
    machineBoard.classList.add("error", "miswired");
    machineStatus.textContent = "Сцепление неверное";
    machineLight.className = "status-light warning";
    shakeBoard();
    return;
  }

  completed.add(currentLesson);
  animateSuccess();
  output.textContent = lesson.output;
  if (currentLesson < lessons.length - 1) {
    output.textContent += "\n\nМеханизм ожил. Можно брать следующее задание.";
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

function markLineEnds() {
  const slotItems = [...document.querySelectorAll(".slot")];
  slotItems.forEach((slot, index) => {
    const next = slotItems[index + 1];
    slot.classList.toggle("line-end", !next || !slot.dataset.id || !next.dataset.id || isRowBreak(index));
  });
}

function isRowBreak(index) {
  if (window.matchMedia("(max-width: 680px)").matches) return true;
  if (window.matchMedia("(max-width: 1050px)").matches) return (index + 1) % 2 === 0;
  return (index + 1) % 4 === 0;
}

function updateCables() {
  const boardRect = machineBoard.getBoundingClientRect();
  const slotItems = [...document.querySelectorAll(".slot")];
  cableLayer.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  cableLayer.innerHTML = "";

  slotItems.forEach((slot, index) => {
    const next = slotItems[index + 1];
    if (!slot.dataset.id || !next || !next.dataset.id || isRowBreak(Number(slot.dataset.index))) return;

    const a = slot.getBoundingClientRect();
    const b = next.getBoundingClientRect();
    const x1 = a.right - boardRect.left - 8;
    const y1 = a.top - boardRect.top + a.height / 2;
    const x2 = b.left - boardRect.left + 8;
    const y2 = b.top - boardRect.top + b.height / 2;
    const bend = (x2 - x1) * 0.48;
    const pathData = `M ${x1} ${y1} C ${x1 + bend} ${y1 - 26}, ${x2 - bend} ${y2 + 26}, ${x2} ${y2}`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("class", slot.classList.contains("wrong") || next.classList.contains("wrong") ? "cable-path cable-wrong" : "cable-path");
    cableLayer.append(path);

    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pulse.setAttribute("d", pathData);
    pulse.setAttribute("class", "cable-pulse");
    cableLayer.append(pulse);
  });
}

function animateSuccess() {
  machineBoard.classList.remove("running", "error", "miswired");
  void machineBoard.offsetWidth;
  machineBoard.classList.add("running", "connected", "ready", "success");
  machineStatus.textContent = "Сигнал прошел по цепи";
  machineLight.className = "status-light success";
  createSparks(16);
  updateCables();
}

function shakeBoard() {
  machineBoard.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" }
    ],
    { duration: 260, easing: "ease-in-out" }
  );
}

function createSparks(count) {
  boardSparks.innerHTML = "";
  const boardRect = machineBoard.getBoundingClientRect();
  const filledSlots = [...document.querySelectorAll(".slot.filled")];
  filledSlots.slice(0, count).forEach((slot, index) => {
    const rect = slot.getBoundingClientRect();
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${rect.left - boardRect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top - boardRect.top + rect.height / 2}px`;
    spark.style.setProperty("--x", `${(index % 2 ? 70 : -70) + index * 4}px`);
    spark.style.setProperty("--y", `${index % 3 === 0 ? -70 : 60}px`);
    boardSparks.append(spark);
  });
}

function getDetailWord(count) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "деталей";
  if (last === 1) return "деталь";
  if (last >= 2 && last <= 4) return "детали";
  return "деталей";
}

function shuffle(items) {
  return items
    .map((item) => ({ item, weight: Math.random() }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ item }) => item);
}

renderLesson(currentLesson);
