import { useState, useEffect, useRef, useCallback } from "react";

// ─── SVG Exercise Illustrations (stick-figure style) ───
const S = {
  bench: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="8" y="38" width="48" height="3" rx="1.5" stroke="#444"/><circle cx="32" cy="28" r="3"/><line x1="32" y1="31" x2="32" y2="44"/><line x1="32" y1="34" x2="20" y2="26"/><line x1="32" y1="34" x2="44" y2="26"/><line x1="16" y1="26" x2="48" y2="26" stroke-width="2.5"/><circle cx="14" cy="26" r="3" fill="#ff3d00" opacity=".4"/><circle cx="50" cy="26" r="3" fill="#ff3d00" opacity=".4"/><line x1="32" y1="44" x2="26" y2="52"/><line x1="32" y1="44" x2="38" y2="52"/></svg>`,
  incBench: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="16" y1="46" x2="36" y2="30" stroke="#444" stroke-width="3"/><circle cx="30" cy="26" r="3"/><line x1="30" y1="29" x2="28" y2="42"/><line x1="29" y1="33" x2="18" y2="22"/><line x1="29" y1="33" x2="42" y2="22"/><line x1="14" y1="22" x2="46" y2="22" stroke-width="2.5"/><circle cx="12" cy="22" r="3" fill="#ff3d00" opacity=".4"/><circle cx="48" cy="22" r="3" fill="#ff3d00" opacity=".4"/><line x1="28" y1="42" x2="24" y2="52"/><line x1="28" y1="42" x2="34" y2="52"/></svg>`,
  fly: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="20" r="3"/><line x1="32" y1="23" x2="32" y2="40"/><path d="M32 28C22 20 14 24 14 30" stroke-width="2"/><path d="M32 28C42 20 50 24 50 30" stroke-width="2"/><circle cx="14" cy="30" r="2.5" fill="#ff3d00" opacity=".4"/><circle cx="50" cy="30" r="2.5" fill="#ff3d00" opacity=".4"/><line x1="32" y1="40" x2="26" y2="50"/><line x1="32" y1="40" x2="38" y2="50"/></svg>`,
  dips: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="12" y1="20" x2="12" y2="50" stroke="#444" stroke-width="2"/><line x1="52" y1="20" x2="52" y2="50" stroke="#444" stroke-width="2"/><circle cx="32" cy="22" r="3"/><line x1="32" y1="25" x2="32" y2="42"/><line x1="32" y1="30" x2="12" y2="28"/><line x1="32" y1="30" x2="52" y2="28"/><line x1="32" y1="42" x2="26" y2="52"/><line x1="32" y1="42" x2="38" y2="52"/></svg>`,
  pushup: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="14" cy="24" r="3"/><line x1="17" y1="26" x2="34" y2="32"/><line x1="34" y1="32" x2="52" y2="32"/><line x1="20" y1="28" x2="16" y2="40"/><line x1="16" y1="40" x2="16" y2="44" stroke="#444"/><line x1="52" y1="32" x2="52" y2="44" stroke="#444"/></svg>`,
  pullup: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="8" y1="10" x2="56" y2="10" stroke="#444" stroke-width="2.5"/><circle cx="32" cy="18" r="3"/><line x1="32" y1="21" x2="32" y2="40"/><line x1="32" y1="24" x2="22" y2="12"/><line x1="32" y1="24" x2="42" y2="12"/><line x1="32" y1="40" x2="26" y2="52"/><line x1="32" y1="40" x2="38" y2="52"/></svg>`,
  row: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="22" cy="20" r="3"/><line x1="22" y1="23" x2="30" y2="38"/><line x1="30" y1="38" x2="22" y2="52"/><line x1="30" y1="38" x2="38" y2="52"/><line x1="24" y1="28" x2="38" y2="22"/><line x1="38" y1="22" x2="44" y2="30"/><circle cx="44" cy="32" r="2.5" fill="#ff3d00" opacity=".4"/></svg>`,
  deadlift: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="14" r="3"/><line x1="32" y1="17" x2="32" y2="36"/><line x1="32" y1="36" x2="24" y2="52"/><line x1="32" y1="36" x2="40" y2="52"/><line x1="32" y1="22" x2="18" y2="36"/><line x1="32" y1="22" x2="46" y2="36"/><line x1="14" y1="36" x2="50" y2="36" stroke-width="2.5"/><circle cx="12" cy="36" r="3" fill="#ff3d00" opacity=".4"/><circle cx="52" cy="36" r="3" fill="#ff3d00" opacity=".4"/></svg>`,
  latpull: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="10" y1="8" x2="54" y2="8" stroke="#444" stroke-width="2"/><circle cx="32" cy="22" r="3"/><line x1="32" y1="25" x2="32" y2="42"/><line x1="32" y1="28" x2="18" y2="14"/><line x1="32" y1="28" x2="46" y2="14"/><line x1="32" y1="42" x2="26" y2="50"/><line x1="32" y1="42" x2="38" y2="50"/></svg>`,
  ohp: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="18" r="3"/><line x1="32" y1="21" x2="32" y2="40"/><line x1="32" y1="26" x2="20" y2="12"/><line x1="32" y1="26" x2="44" y2="12"/><line x1="16" y1="12" x2="48" y2="12" stroke-width="2.5"/><circle cx="14" cy="12" r="3" fill="#ff3d00" opacity=".4"/><circle cx="50" cy="12" r="3" fill="#ff3d00" opacity=".4"/><line x1="32" y1="40" x2="26" y2="52"/><line x1="32" y1="40" x2="38" y2="52"/></svg>`,
  latRaise: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="16" r="3"/><line x1="32" y1="19" x2="32" y2="40"/><line x1="32" y1="26" x2="14" y2="26" stroke-width="2"/><line x1="32" y1="26" x2="50" y2="26" stroke-width="2"/><circle cx="12" cy="26" r="2.5" fill="#ff3d00" opacity=".4"/><circle cx="52" cy="26" r="2.5" fill="#ff3d00" opacity=".4"/><line x1="32" y1="40" x2="26" y2="52"/><line x1="32" y1="40" x2="38" y2="52"/></svg>`,
  frontRaise: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="18" r="3"/><line x1="32" y1="21" x2="32" y2="42"/><line x1="32" y1="28" x2="24" y2="14" stroke-width="2"/><line x1="32" y1="28" x2="40" y2="38"/><circle cx="23" cy="12" r="2.5" fill="#ff3d00" opacity=".4"/><circle cx="41" cy="40" r="2" fill="#ff3d00" opacity=".3"/><line x1="32" y1="42" x2="26" y2="52"/><line x1="32" y1="42" x2="38" y2="52"/></svg>`,
  facePull: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="48" y="10" width="4" height="40" rx="2" stroke="#444"/><circle cx="28" cy="22" r="3"/><line x1="28" y1="25" x2="28" y2="42"/><line x1="28" y1="30" x2="48" y2="20"/><line x1="28" y1="30" x2="48" y2="26"/><line x1="28" y1="42" x2="22" y2="52"/><line x1="28" y1="42" x2="34" y2="52"/></svg>`,
  squat: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="12" r="3"/><line x1="32" y1="15" x2="32" y2="32"/><line x1="32" y1="32" x2="22" y2="46"/><line x1="22" y1="46" x2="20" y2="52"/><line x1="32" y1="32" x2="42" y2="46"/><line x1="42" y1="46" x2="44" y2="52"/><line x1="32" y1="20" x2="22" y2="16"/><line x1="32" y1="20" x2="42" y2="16"/><line x1="18" y1="14" x2="46" y2="14" stroke-width="2.5"/><circle cx="16" cy="14" r="3" fill="#ff3d00" opacity=".4"/><circle cx="48" cy="14" r="3" fill="#ff3d00" opacity=".4"/></svg>`,
  legPress: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="10" y1="48" x2="40" y2="48" stroke="#444" stroke-width="2"/><line x1="40" y1="48" x2="54" y2="20" stroke="#444" stroke-width="2"/><circle cx="24" cy="36" r="3"/><line x1="24" y1="39" x2="24" y2="48"/><line x1="24" y1="42" x2="38" y2="34"/><line x1="38" y1="34" x2="46" y2="26"/></svg>`,
  lunge: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="30" cy="12" r="3"/><line x1="30" y1="15" x2="30" y2="34"/><line x1="30" y1="34" x2="18" y2="46"/><line x1="18" y1="46" x2="16" y2="52"/><line x1="30" y1="34" x2="44" y2="40"/><line x1="44" y1="40" x2="48" y2="52"/><line x1="30" y1="22" x2="24" y2="30"/><line x1="30" y1="22" x2="36" y2="30"/></svg>`,
  legCurl: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="10" y="28" width="40" height="4" rx="2" stroke="#444"/><circle cx="18" cy="24" r="3"/><line x1="18" y1="27" x2="44" y2="27"/><line x1="44" y1="27" x2="50" y2="18" stroke-width="2"/><line x1="44" y1="27" x2="50" y2="36"/></svg>`,
  legExt: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="10" y="24" width="8" height="24" rx="2" stroke="#444"/><circle cx="24" cy="24" r="3"/><line x1="24" y1="27" x2="24" y2="38"/><line x1="24" y1="38" x2="14" y2="44"/><line x1="24" y1="38" x2="44" y2="30" stroke-width="2"/><circle cx="46" cy="30" r="2" fill="#ff3d00" opacity=".4"/></svg>`,
  calfRaise: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="10" r="3"/><line x1="32" y1="13" x2="32" y2="34"/><line x1="32" y1="34" x2="32" y2="46"/><line x1="30" y1="46" x2="30" y2="52"/><line x1="34" y1="46" x2="34" y2="52"/><rect x="24" y="50" width="16" height="4" rx="2" stroke="#444"/></svg>`,
  curl: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="14" r="3"/><line x1="32" y1="17" x2="32" y2="40"/><line x1="32" y1="24" x2="24" y2="34"/><line x1="24" y1="34" x2="22" y2="22" stroke-width="2"/><line x1="32" y1="24" x2="40" y2="34"/><line x1="40" y1="34" x2="42" y2="22" stroke-width="2"/><circle cx="21" cy="20" r="2.5" fill="#ff3d00" opacity=".4"/><circle cx="43" cy="20" r="2.5" fill="#ff3d00" opacity=".4"/><line x1="32" y1="40" x2="26" y2="52"/><line x1="32" y1="40" x2="38" y2="52"/></svg>`,
  tricepPush: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="28" y="6" width="8" height="4" rx="2" stroke="#444"/><line x1="32" y1="10" x2="32" y2="20" stroke="#444"/><circle cx="32" cy="24" r="3"/><line x1="32" y1="27" x2="32" y2="42"/><line x1="32" y1="32" x2="24" y2="42"/><line x1="24" y1="42" x2="24" y2="50" stroke-width="2"/><line x1="32" y1="32" x2="40" y2="42"/><line x1="40" y1="42" x2="40" y2="50" stroke-width="2"/><line x1="32" y1="42" x2="26" y2="52"/><line x1="32" y1="42" x2="38" y2="52"/></svg>`,
  skullCrush: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><rect x="8" y="36" width="48" height="3" rx="1.5" stroke="#444"/><circle cx="32" cy="28" r="3"/><line x1="32" y1="31" x2="32" y2="38"/><line x1="32" y1="33" x2="26" y2="24"/><line x1="26" y1="24" x2="30" y2="16" stroke-width="2"/><line x1="32" y1="33" x2="38" y2="24"/><line x1="38" y1="24" x2="34" y2="16" stroke-width="2"/></svg>`,
  crunch: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="20" r="3"/><path d="M32 23Q32 36 38 44" stroke-width="2"/><line x1="38" y1="44" x2="44" y2="52"/><line x1="38" y1="44" x2="32" y2="52"/><line x1="32" y1="28" x2="26" y2="22"/><line x1="32" y1="28" x2="38" y2="22"/></svg>`,
  plank: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="14" cy="30" r="3"/><line x1="17" y1="31" x2="50" y2="31" stroke-width="2"/><line x1="17" y1="33" x2="17" y2="44" stroke="#444"/><line x1="50" y1="31" x2="50" y2="44" stroke="#444"/></svg>`,
  legRaise: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><line x1="8" y1="10" x2="8" y2="54" stroke="#444" stroke-width="2.5"/><circle cx="14" cy="16" r="3"/><line x1="14" y1="19" x2="14" y2="34"/><line x1="14" y1="24" x2="10" y2="16"/><line x1="14" y1="24" x2="18" y2="16"/><line x1="14" y1="34" x2="30" y2="28" stroke-width="2"/><line x1="30" y1="28" x2="40" y2="24" stroke-width="2"/></svg>`,
  cleanPress: `<svg viewBox="0 0 64 64" fill="none" stroke="#ff3d00" stroke-width="1.8" stroke-linecap="round"><circle cx="32" cy="12" r="3"/><line x1="32" y1="15" x2="32" y2="38"/><line x1="32" y1="22" x2="20" y2="10"/><line x1="32" y1="22" x2="44" y2="10"/><line x1="16" y1="10" x2="48" y2="10" stroke-width="2.5"/><circle cx="14" cy="10" r="3" fill="#ff3d00" opacity=".4"/><circle cx="50" cy="10" r="3" fill="#ff3d00" opacity=".4"/><line x1="32" y1="38" x2="24" y2="48"/><line x1="24" y1="48" x2="22" y2="54"/><line x1="32" y1="38" x2="40" y2="48"/><line x1="40" y1="48" x2="42" y2="54"/></svg>`,
};

// ─── Exercise Database ───
const EXERCISES = [
  {id:"bench_press",name:"Жим лёжа",cat:"Грудь",muscle:"Грудные · Трицепс",svg:S.bench},
  {id:"incline_bench",name:"Жим на наклонной",cat:"Грудь",muscle:"Верх груди · Плечи",svg:S.incBench},
  {id:"db_bench",name:"Жим гантелей лёжа",cat:"Грудь",muscle:"Грудные · Трицепс",svg:S.bench},
  {id:"fly_db",name:"Разводка гантелей",cat:"Грудь",muscle:"Грудные",svg:S.fly},
  {id:"cable_fly",name:"Сведение в кроссовере",cat:"Грудь",muscle:"Грудные",svg:S.fly},
  {id:"dips",name:"Отжимания на брусьях",cat:"Грудь",muscle:"Грудные · Трицепс",svg:S.dips},
  {id:"pushups",name:"Отжимания от пола",cat:"Грудь",muscle:"Грудные · Трицепс",svg:S.pushup},
  {id:"chest_press",name:"Жим в тренажёре",cat:"Грудь",muscle:"Грудные",svg:S.bench},
  {id:"pullups",name:"Подтягивания",cat:"Спина",muscle:"Широчайшие · Бицепс",svg:S.pullup},
  {id:"chinups",name:"Подтягивания обр. хватом",cat:"Спина",muscle:"Широчайшие · Бицепс",svg:S.pullup},
  {id:"bent_row",name:"Тяга штанги в наклоне",cat:"Спина",muscle:"Широчайшие · Ромбовидные",svg:S.row},
  {id:"db_row",name:"Тяга гантели в наклоне",cat:"Спина",muscle:"Широчайшие",svg:S.row},
  {id:"deadlift",name:"Становая тяга",cat:"Спина",muscle:"Спина · Ноги · Кор",svg:S.deadlift},
  {id:"lat_pulldown",name:"Тяга верхнего блока",cat:"Спина",muscle:"Широчайшие",svg:S.latpull},
  {id:"seated_row",name:"Тяга нижнего блока",cat:"Спина",muscle:"Широчайшие · Ромбовидные",svg:S.row},
  {id:"t_bar_row",name:"Тяга Т-грифа",cat:"Спина",muscle:"Широчайшие · Трапеция",svg:S.row},
  {id:"ohp",name:"Жим штанги стоя",cat:"Плечи",muscle:"Дельты · Трицепс",svg:S.ohp},
  {id:"db_press",name:"Жим гантелей сидя",cat:"Плечи",muscle:"Дельты · Трицепс",svg:S.ohp},
  {id:"lat_raise",name:"Махи в стороны",cat:"Плечи",muscle:"Средняя дельта",svg:S.latRaise},
  {id:"front_raise",name:"Подъём перед собой",cat:"Плечи",muscle:"Передняя дельта",svg:S.frontRaise},
  {id:"face_pull",name:"Тяга к лицу",cat:"Плечи",muscle:"Задняя дельта · Ротаторы",svg:S.facePull},
  {id:"rear_delt",name:"Разведение в наклоне",cat:"Плечи",muscle:"Задняя дельта",svg:S.fly},
  {id:"shrugs",name:"Шраги",cat:"Плечи",muscle:"Трапеция",svg:S.latRaise},
  {id:"squat",name:"Приседания со штангой",cat:"Ноги",muscle:"Квадрицепс · Ягодицы",svg:S.squat},
  {id:"front_squat",name:"Фронтальные приседания",cat:"Ноги",muscle:"Квадрицепс",svg:S.squat},
  {id:"leg_press",name:"Жим ногами",cat:"Ноги",muscle:"Квадрицепс · Ягодицы",svg:S.legPress},
  {id:"lunges",name:"Выпады",cat:"Ноги",muscle:"Квадрицепс · Ягодицы",svg:S.lunge},
  {id:"bulgarian",name:"Болгарские выпады",cat:"Ноги",muscle:"Квадрицепс · Ягодицы",svg:S.lunge},
  {id:"rdl",name:"Румынская тяга",cat:"Ноги",muscle:"Бицепс бедра · Ягодицы",svg:S.deadlift},
  {id:"leg_curl",name:"Сгибание ног",cat:"Ноги",muscle:"Бицепс бедра",svg:S.legCurl},
  {id:"leg_ext",name:"Разгибание ног",cat:"Ноги",muscle:"Квадрицепс",svg:S.legExt},
  {id:"calf_raise",name:"Подъём на носки",cat:"Ноги",muscle:"Икроножные",svg:S.calfRaise},
  {id:"hack_squat",name:"Гакк-приседания",cat:"Ноги",muscle:"Квадрицепс",svg:S.squat},
  {id:"barbell_curl",name:"Подъём штанги на бицепс",cat:"Руки",muscle:"Бицепс",svg:S.curl},
  {id:"db_curl",name:"Подъём гантелей",cat:"Руки",muscle:"Бицепс",svg:S.curl},
  {id:"hammer_curl",name:"Молотковые сгибания",cat:"Руки",muscle:"Бицепс · Брахиалис",svg:S.curl},
  {id:"preacher_curl",name:"Сгибания Скотта",cat:"Руки",muscle:"Бицепс",svg:S.curl},
  {id:"tricep_pushdown",name:"Разгибание на блоке",cat:"Руки",muscle:"Трицепс",svg:S.tricepPush},
  {id:"skull_crusher",name:"Французский жим",cat:"Руки",muscle:"Трицепс",svg:S.skullCrush},
  {id:"overhead_tri",name:"Разгибание за головой",cat:"Руки",muscle:"Трицепс",svg:S.tricepPush},
  {id:"close_grip",name:"Жим узким хватом",cat:"Руки",muscle:"Трицепс · Грудные",svg:S.bench},
  {id:"crunch",name:"Скручивания",cat:"Пресс",muscle:"Прямая м. живота",svg:S.crunch},
  {id:"plank",name:"Планка",cat:"Пресс",muscle:"Кор",svg:S.plank},
  {id:"leg_raise_abs",name:"Подъём ног в висе",cat:"Пресс",muscle:"Нижний пресс",svg:S.legRaise},
  {id:"cable_crunch",name:"Скручивания на блоке",cat:"Пресс",muscle:"Прямая м. живота",svg:S.crunch},
  {id:"russian_twist",name:"Русский твист",cat:"Пресс",muscle:"Косые мышцы",svg:S.crunch},
  {id:"ab_wheel",name:"Ролик для пресса",cat:"Пресс",muscle:"Кор",svg:S.plank},
  {id:"clean_press",name:"Взятие + жим",cat:"Комплексные",muscle:"Всё тело",svg:S.cleanPress},
  {id:"thruster",name:"Трастер",cat:"Комплексные",muscle:"Ноги · Плечи",svg:S.cleanPress},
  {id:"farmers_walk",name:"Прогулка фермера",cat:"Комплексные",muscle:"Хват · Кор · Трапеция",svg:S.deadlift},
];

const CATS = ["Все","Грудь","Спина","Плечи","Ноги","Руки","Пресс","Комплексные"];
const TEMPLATES = [
  {name:"ГРУДЬ + ТРИЦЕПС",exs:["bench_press","incline_bench","fly_db","dips","tricep_pushdown","skull_crusher"]},
  {name:"СПИНА + БИЦЕПС",exs:["pullups","bent_row","lat_pulldown","seated_row","barbell_curl","hammer_curl"]},
  {name:"НОГИ",exs:["squat","leg_press","lunges","rdl","leg_curl","leg_ext","calf_raise"]},
  {name:"ПЛЕЧИ + ПРЕСС",exs:["ohp","lat_raise","front_raise","face_pull","crunch","plank","leg_raise_abs"]},
  {name:"ВЕРХ ТЕЛА",exs:["bench_press","bent_row","ohp","pullups","db_curl","tricep_pushdown"]},
  {name:"НИЗ ТЕЛА",exs:["squat","rdl","bulgarian","leg_press","leg_curl","calf_raise"]},
  {name:"PUSH",exs:["bench_press","incline_bench","ohp","lat_raise","tricep_pushdown","dips"]},
  {name:"PULL",exs:["pullups","bent_row","lat_pulldown","face_pull","barbell_curl","hammer_curl"]},
  {name:"ФУЛБОДИ",exs:["squat","bench_press","bent_row","ohp","barbell_curl","plank"]},
];

const LS = (k,v) => { if(v !== undefined) { localStorage.setItem(k,JSON.stringify(v)); return v; } try { return JSON.parse(localStorage.getItem(k)); } catch { return null; }};
const exById = id => EXERCISES.find(e=>e.id===id);
const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const fmtShort = iso => { if(!iso) return ""; const d=new Date(iso); return d.toLocaleDateString("ru-RU",{day:"numeric",month:"short"})};
const CIRC = 2*Math.PI*90;

const Svg = ({html,size=52}) => <div style={{width:size,height:size}} dangerouslySetInnerHTML={{__html:html}}/>;

// ─── Icons ───
const IcoHome = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>;
const IcoGrid = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const IcoCal = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const IcoUser = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>;
const IcoBack = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const IcoCheck = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8l3 3 7-7"/></svg>;
const IcoPlus = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 1v12M1 7h12"/></svg>;
const IcoTrash = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5h10M12 5v8a1 1 0 01-1 1H5a1 1 0 01-1-1V5m2 0V3.5A.5.5 0 016.5 3h3a.5.5 0 01.5.5V5"/></svg>;
const IcoTimer = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const IcoX = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IcoSearch = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const IcoChevL = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>;
const IcoChevR = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;

// ─── Main App ───
export default function App() {
  const [screen, setScreen] = useState("home");
  const [workouts, setWorkouts] = useState(()=>LS("iron_w")||[]);
  const [history, setHistory] = useState(()=>LS("iron_h")||[]);
  const [profile, setProfile] = useState(()=>LS("iron_p")||{name:"АТЛЕТ",weight:"",height:"",age:"",rest:90,joined:new Date().toISOString()});
  const [sess, setSess] = useState(null);
  const [sessStart, setSessStart] = useState(null);
  const [sessElapsed, setSessElapsed] = useState(0);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [newTab, setNewTab] = useState(0);
  const [newName, setNewName] = useState("");
  const [libCat, setLibCat] = useState("Все");
  const [libQ, setLibQ] = useState("");
  const [pickCat, setPickCat] = useState("Все");
  const [pickQ, setPickQ] = useState("");
  const [tDur, setTDur] = useState(profile.rest||90);
  const [tRem, setTRem] = useState(profile.rest||90);
  const [tRun, setTRun] = useState(false);
  const [pillVis, setPillVis] = useState(false);
  const [calY, setCalY] = useState(new Date().getFullYear());
  const [calM, setCalM] = useState(new Date().getMonth());
  const [calSel, setCalSel] = useState(null);
  const tRunRef = useRef(false);
  const tRemRef = useRef(tRem);
  const tDurRef = useRef(tDur);
  const tIntRef = useRef(null);

  useEffect(()=>{tRunRef.current=tRun},[tRun]);
  useEffect(()=>{tRemRef.current=tRem},[tRem]);
  useEffect(()=>{tDurRef.current=tDur},[tDur]);

  // Session clock
  useEffect(()=>{
    if(!sessStart) return;
    const iv=setInterval(()=>setSessElapsed(Math.floor((Date.now()-sessStart)/1000)),1000);
    return ()=>clearInterval(iv);
  },[sessStart]);

  // Save
  useEffect(()=>{LS("iron_w",workouts)},[workouts]);
  useEffect(()=>{LS("iron_h",history)},[history]);
  useEffect(()=>{LS("iron_p",profile)},[profile]);

  // Timer tick
  const startTimer = useCallback(()=>{
    setTRun(true);
    clearInterval(tIntRef.current);
    tIntRef.current=setInterval(()=>{
      const nr = Math.max(0, tRemRef.current - 0.1);
      tRemRef.current = nr;
      setTRem(nr);
      if(nr<=0){
        clearInterval(tIntRef.current);
        setTRun(false);
        setPillVis(false);
        if(navigator.vibrate) navigator.vibrate([200,100,200,100,200]);
        try{const c=new(window.AudioContext||window.webkitAudioContext)();[0,.15,.3].forEach(d=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;o.type="sine";g.gain.setValueAtTime(.3,c.currentTime+d);g.gain.exponentialRampToValueAtTime(.01,c.currentTime+d+.12);o.start(c.currentTime+d);o.stop(c.currentTime+d+.12)})}catch(e){}
      }
    },100);
  },[]);

  const pauseTimer = useCallback(()=>{setTRun(false);clearInterval(tIntRef.current)},[]);
  const resetTimer = useCallback(()=>{clearInterval(tIntRef.current);setTRun(false);setTRem(tDurRef.current)},[]);
  const closeTimerOv = ()=>{setShowTimer(false);if(tRunRef.current)setPillVis(true)};
  const openTimerOv = ()=>{setShowTimer(true);setPillVis(false)};

  const autoStartRest = useCallback(()=>{
    const d=tDurRef.current;
    tRemRef.current=d;setTRem(d);setShowTimer(true);setPillVis(false);
    setTRun(true);
    clearInterval(tIntRef.current);
    tIntRef.current=setInterval(()=>{
      const nr=Math.max(0,tRemRef.current-0.1);tRemRef.current=nr;setTRem(nr);
      if(nr<=0){clearInterval(tIntRef.current);setTRun(false);setPillVis(false);if(navigator.vibrate)navigator.vibrate([200,100,200,100,200]);try{const c=new(window.AudioContext||window.webkitAudioContext)();[0,.15,.3].forEach(d=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;o.type="sine";g.gain.setValueAtTime(.3,c.currentTime+d);g.gain.exponentialRampToValueAtTime(.01,c.currentTime+d+.12);o.start(c.currentTime+d);o.stop(c.currentTime+d+.12)})}catch(e){}}
    },100);
  },[]);

  // --- Actions ---
  const startSess = (idx) => {
    const w=workouts[idx];
    const exs=w.exercises.length?JSON.parse(JSON.stringify(w.exercises)):[{id:null,name:"",sets:[{w:"",r:"",done:false}]}];
    setSess({wi:idx,exercises:exs});setSessStart(Date.now());setSessElapsed(0);setScreen("session");
  };
  const useTpl = (t) => {
    const exs=t.exs.map(id=>{const e=exById(id);return e?{id:e.id,name:e.name,sets:[{w:"",r:"",done:false},{w:"",r:"",done:false},{w:"",r:"",done:false}]}:null}).filter(Boolean);
    const nw=[...workouts,{name:t.name,exercises:exs,lastUsed:null}];setWorkouts(nw);setShowNewModal(false);
    setSess({wi:nw.length-1,exercises:JSON.parse(JSON.stringify(exs))});setSessStart(Date.now());setSessElapsed(0);setScreen("session");
  };
  const createWk = () => {
    if(!newName.trim())return;
    const nw=[...workouts,{name:newName.trim(),exercises:[],lastUsed:null}];setWorkouts(nw);setNewName("");setShowNewModal(false);
    startSess(nw.length-1);
  };
  const finishSess = () => {
    if(!sess)return;
    const exs=sess.exercises.filter(e=>e.name&&e.sets.some(s=>s.done));
    if(exs.length){
      const totalSets=exs.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
      const totalVolume=exs.reduce((a,e)=>a+e.sets.filter(s=>s.done).reduce((b,s)=>b+(parseFloat(s.w)||0)*(parseInt(s.r)||0),0),0);
      setHistory(h=>[{name:workouts[sess.wi].name,date:new Date().toISOString(),duration:sessElapsed,exercises:exs,totalSets,totalVolume},...h]);
      setWorkouts(wk=>{const n=[...wk];n[sess.wi]={...n[sess.wi],exercises:sess.exercises.filter(e=>e.name),lastUsed:new Date().toISOString()};return n});
    }
    endSess();
  };
  const endSess = ()=>{clearInterval(tIntRef.current);setTRun(false);setPillVis(false);setShowTimer(false);setSess(null);setSessStart(null);setScreen("home")};
  const pickEx = (id)=>{
    const e=exById(id);if(!e||!sess)return;
    setSess(s=>({...s,exercises:[...s.exercises,{id:e.id,name:e.name,sets:[{w:"",r:"",done:false},{w:"",r:"",done:false},{w:"",r:"",done:false}]}]}));
  };
  const updateSet=(ei,si,key,val)=>setSess(s=>{const n={...s,exercises:s.exercises.map((e,i)=>i===ei?{...e,sets:e.sets.map((st,j)=>j===si?{...st,[key]:val}:st)}:e)};return n});
  const toggleDone=(ei,si)=>{setSess(s=>{const n={...s,exercises:s.exercises.map((e,i)=>i===ei?{...e,sets:e.sets.map((st,j)=>j===si?{...st,done:!st.done}:st)}:e)};return n});if(!sess.exercises[ei].sets[si].done){if(navigator.vibrate)navigator.vibrate(50);autoStartRest()}};
  const addSet=(ei)=>setSess(s=>{const last=s.exercises[ei].sets[s.exercises[ei].sets.length-1]||{w:"",r:""};return{...s,exercises:s.exercises.map((e,i)=>i===ei?{...e,sets:[...e.sets,{w:last.w,r:last.r,done:false}]}:e)}});
  const delEx=(ei)=>setSess(s=>({...s,exercises:s.exercises.filter((_,i)=>i!==ei)}));

  // Calendar helpers
  const MONTHS=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  const calDates=new Set();history.forEach(h=>{const d=new Date(h.date);if(d.getFullYear()===calY&&d.getMonth()===calM)calDates.add(d.getDate())});
  const firstDay=(()=>{let d=new Date(calY,calM,1).getDay();return d===0?6:d-1})();
  const daysInMonth=new Date(calY,calM+1,0).getDate();
  const today=new Date();

  // Streak
  const calcStreak=()=>{if(!history.length)return 0;const days=new Set();history.forEach(h=>{const d=new Date(h.date);days.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`)});let s=0;for(let i=0;i<365;i++){const d=new Date();d.setDate(d.getDate()-i);if(days.has(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`))s++;else if(i>0)break}return s};
  const totalVol=history.reduce((a,h)=>a+(h.totalVolume||0),0);
  const weekWks=history.filter(h=>(Date.now()-new Date(h.date).getTime())<7*864e5).length;

  // Timer progress
  const tProg = tDur>0?tRem/tDur:1;
  const tOff = CIRC*(1-tProg);
  const tCol = tRem<=5&&tRun?"#ff1744":tRem<=15&&tRun?"#ffd600":"#ff3d00";
  const tDisp = `${Math.floor(tRem/60)}:${String(Math.floor(tRem%60)).padStart(2,"0")}`;

  // Filter exercises
  const filterEx=(q,cat)=>EXERCISES.filter(e=>(cat==="Все"||e.cat===cat)&&(!q||e.name.toLowerCase().includes(q.toLowerCase())||e.muscle.toLowerCase().includes(q.toLowerCase())));

  // ─── Styles ───
  const css = {
    app:{background:"#0a0a0a",color:"#f0f0f0",minHeight:"100vh",fontFamily:"'JetBrains Mono',monospace",WebkitFontSmoothing:"antialiased",position:"relative"},
    hdr:{padding:"20px 20px 12px",position:"sticky",top:0,zIndex:10,background:"linear-gradient(#0a0a0a 70%,transparent)",backdropFilter:"blur(16px)"},
    h1:{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,letterSpacing:5,color:"#ff3d00",lineHeight:1,margin:0},
    sub:{fontSize:9,color:"#666",letterSpacing:3,textTransform:"uppercase",marginTop:3},
    cnt:{padding:"0 16px"},
    bnav:{position:"fixed",bottom:0,left:0,right:0,background:"#111",borderTop:"1px solid #252525",display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom,0px)"},
    nb:(a)=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 0 7px",background:"none",border:"none",color:a?"#ff3d00":"#444",fontSize:8,letterSpacing:1.2,textTransform:"uppercase",cursor:"pointer"}),
    card:{background:"#161616",border:"1px solid #252525",borderRadius:14,padding:16,marginBottom:10,position:"relative",overflow:"hidden",cursor:"pointer",borderLeft:"3px solid #ff3d00"},
    cardH:{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2,margin:0},
    meta:{fontSize:10,color:"#666",marginTop:5,display:"flex",gap:14},
    statRow:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16},
    statBox:{background:"#161616",border:"1px solid #252525",borderRadius:14,padding:14,textAlign:"center"},
    statVal:{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:1,color:"#ff3d00"},
    statLbl:{fontSize:8,color:"#666",letterSpacing:1.5,textTransform:"uppercase",marginTop:4},
    btnAdd:{width:"100%",padding:14,background:"#161616",border:"2px dashed #252525",borderRadius:14,color:"#666",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:3,cursor:"pointer"},
    pill:{position:"fixed",bottom:"calc(72px + env(safe-area-inset-bottom,0px) + 10px)",left:"50%",transform:"translateX(-50%)",background:"#ff3d00",color:"#fff",padding:"8px 20px",borderRadius:50,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,zIndex:90,cursor:"pointer",boxShadow:"0 4px 25px rgba(255,61,0,.25)",border:"none"},
    fab:{position:"fixed",bottom:"calc(72px + env(safe-area-inset-bottom,0px) + 12px)",right:14,width:52,height:52,borderRadius:"50%",background:"#161616",border:"2px solid #ff3d00",color:"#ff3d00",display:"flex",alignItems:"center",justifyContent:"center",zIndex:80,cursor:"pointer",boxShadow:"0 4px 18px rgba(255,61,0,.25)"},
    modal:{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"},
    msheet:{background:"#111",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:500,padding:"20px 20px calc(20px + env(safe-area-inset-bottom,0px))",maxHeight:"85vh",overflowY:"auto"},
    mH2:{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,marginBottom:16,margin:"0 0 16px"},
    mIn:{width:"100%",padding:"12px 14px",background:"#1e1e1e",border:"1px solid #252525",borderRadius:12,color:"#f0f0f0",fontSize:14,outline:"none",marginBottom:10,boxSizing:"border-box",fontFamily:"'JetBrains Mono',monospace"},
    tabs:{display:"flex",gap:0,marginBottom:16,border:"1px solid #252525",borderRadius:10,overflow:"hidden"},
    tab:(a)=>({flex:1,padding:10,background:a?"#ff3d00":"none",border:"none",color:a?"#fff":"#444",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer"}),
    cpill:(a)=>({padding:"8px 16px",borderRadius:50,border:`1px solid ${a?"#ff3d00":"#252525"}`,background:a?"rgba(255,61,0,.08)":"#161616",color:a?"#ff3d00":"#666",fontSize:11,letterSpacing:1,whiteSpace:"nowrap",flexShrink:0,cursor:"pointer"}),
    exCard:{background:"#161616",border:"1px solid #252525",borderRadius:14,padding:12,marginBottom:10,display:"flex",gap:14,alignItems:"center",cursor:"pointer"},
    exThumb:{width:64,height:64,borderRadius:10,background:"#1e1e1e",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"},
    exThumbSm:{width:40,height:40,borderRadius:8,background:"#1e1e1e",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"},
    setIn:{background:"#1e1e1e",border:"1px solid #252525",borderRadius:10,color:"#f0f0f0",fontFamily:"'JetBrains Mono',monospace",fontSize:14,padding:"9px 10px",textAlign:"center",outline:"none",width:"100%",WebkitAppearance:"none",boxSizing:"border-box"},
    setOk:(d)=>({width:32,height:32,borderRadius:"50%",border:`2px solid ${d?"#00e676":"#252525"}`,background:d?"#00e676":"none",display:"flex",alignItems:"center",justifyContent:"center",color:d?"#0a0a0a":"#444",cursor:"pointer",boxShadow:d?"0 0 16px rgba(0,230,118,.25)":"none"}),
    timerOv:{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",backdropFilter:"blur(30px)",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},
    trc:(pri)=>({width:pri?64:50,height:pri?64:50,borderRadius:"50%",border:`2px solid ${pri?"#ff3d00":"#252525"}`,background:pri?"#ff3d00":"#161616",color:pri?"#fff":"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:pri?"0 0 25px rgba(255,61,0,.25)":"none"}),
    trp:(a)=>({padding:"8px 16px",borderRadius:50,border:`1px solid ${a?"#ff3d00":"#252525"}`,background:a?"rgba(255,61,0,.08)":"#161616",color:a?"#ff3d00":"#666",fontSize:12,cursor:"pointer",boxShadow:a?"0 0 12px rgba(255,61,0,.25)":"none"}),
    calD:(isT,hasW,isSel,isOther)=>({aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,fontSize:13,color:isSel?"#fff":hasW?"#ff3d00":isOther?"rgba(255,255,255,.15)":isT?"#f0f0f0":"#666",background:isSel?"#ff3d00":isT?"#1e1e1e":"none",fontWeight:hasW||isT?"700":"400",cursor:isOther?"default":"pointer",position:"relative",flexDirection:"column"}),
    avatar:{width:80,height:80,borderRadius:"50%",background:"#1e1e1e",border:"3px solid #ff3d00",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"#ff3d00"},
    streak:{background:"linear-gradient(135deg,rgba(255,61,0,.12),rgba(255,110,64,.06))",border:"1px solid rgba(255,61,0,.2)",borderRadius:14,padding:20,textAlign:"center",marginBottom:20},
    pfRow:{background:"#161616",border:"1px solid #252525",borderRadius:14,padding:"14px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"},
    pfIn:{background:"none",border:"none",color:"#f0f0f0",fontFamily:"'JetBrains Mono',monospace",fontSize:14,textAlign:"right",outline:"none",width:100},
  };

  // ─── SCREENS ───
  const HomeScreen = () => (
    <div>
      <div style={css.hdr}><h1 style={css.h1}>IRON</h1><div style={css.sub}>Трекер тренировок</div></div>
      <div style={css.cnt}>
        <div style={css.statRow}>
          <div style={css.statBox}><div style={css.statVal}>{history.length}</div><div style={css.statLbl}>Всего</div></div>
          <div style={css.statBox}><div style={css.statVal}>{weekWks}</div><div style={css.statLbl}>На неделе</div></div>
          <div style={css.statBox}><div style={css.statVal}>{totalVol>1000?(totalVol/1000).toFixed(1)+"т":Math.round(totalVol)+"кг"}</div><div style={css.statLbl}>Объём</div></div>
        </div>
        {workouts.length===0&&<div style={{textAlign:"center",padding:"40px 20px",color:"#444"}}><p style={{fontSize:11,letterSpacing:1,lineHeight:1.8}}>Создайте первую тренировку<br/>или выберите готовый шаблон</p></div>}
        {workouts.map((w,i)=><div key={i} style={css.card} onClick={()=>startSess(i)}><h3 style={css.cardH}>{w.name}</h3><div style={css.meta}><span>{w.exercises.length} упр.</span>{w.lastUsed&&<span>{fmtShort(w.lastUsed)}</span>}</div></div>)}
        <button style={css.btnAdd} onClick={()=>{setShowNewModal(true);setNewTab(0);setNewName("")}}>+ НОВАЯ ТРЕНИРОВКА</button>
      </div>
    </div>
  );

  const LibScreen = () => {
    const list=filterEx(libQ,libCat);
    return (<div>
      <div style={css.hdr}><h1 style={css.h1}>УПРАЖНЕНИЯ</h1><div style={css.sub}>Библиотека · {EXERCISES.length} упражнений</div></div>
      <div style={css.cnt}>
        <div style={{position:"relative",marginBottom:12}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#444"}}><IcoSearch/></div>
          <input style={{...css.mIn,paddingLeft:38,marginBottom:0}} placeholder="Поиск упражнений..." value={libQ} onChange={e=>setLibQ(e.target.value)}/>
        </div>
        <div style={{display:"flex",gap:8,padding:"4px 0 16px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          {CATS.map(c=><button key={c} style={css.cpill(c===libCat)} onClick={()=>setLibCat(c)}>{c.toUpperCase()}</button>)}
        </div>
        {list.map(e=><div key={e.id} style={css.exCard}><div style={css.exThumb}><Svg html={e.svg}/></div><div style={{flex:1,minWidth:0}}><h4 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:1.5,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.name}</h4><div style={{fontSize:10,color:"#ff3d00",letterSpacing:1,marginTop:2}}>{e.muscle}</div></div></div>)}
        {list.length===0&&<div style={{textAlign:"center",padding:40,color:"#444",fontSize:11}}>Ничего не найдено</div>}
      </div>
    </div>);
  };

  const CalScreen = () => {
    const mWks=history.filter(h=>{const d=new Date(h.date);return d.getFullYear()===calY&&d.getMonth()===calM});
    const selWks=calSel?history.filter(h=>{const d=new Date(h.date);return d.getFullYear()===calY&&d.getMonth()===calM&&d.getDate()===calSel}):[];
    const dip=new Date(calY,calM,0).getDate();
    return (<div>
      <div style={css.hdr}><h1 style={css.h1}>КАЛЕНДАРЬ</h1><div style={css.sub}>Расписание тренировок</div></div>
      <div style={css.cnt}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <button style={{background:"none",border:"none",color:"#666",padding:8,cursor:"pointer"}} onClick={()=>{let m=calM-1,y=calY;if(m<0){m=11;y--}setCalM(m);setCalY(y);setCalSel(null)}}><IcoChevL/></button>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:2,margin:0}}>{MONTHS[calM]} {calY}</h2>
          <button style={{background:"none",border:"none",color:"#666",padding:8,cursor:"pointer"}} onClick={()=>{let m=calM+1,y=calY;if(m>11){m=0;y++}setCalM(m);setCalY(y);setCalSel(null)}}><IcoChevR/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,textAlign:"center",marginBottom:20}}>
          {["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map(d=><div key={d} style={{fontSize:9,color:"#444",letterSpacing:1,padding:"8px 0"}}>{d}</div>)}
          {Array.from({length:firstDay},(_,i)=><div key={"p"+i} style={css.calD(false,false,false,true)}>{dip-firstDay+1+i}</div>)}
          {Array.from({length:daysInMonth},(_,i)=>{
            const d=i+1;const isT=d===today.getDate()&&calM===today.getMonth()&&calY===today.getFullYear();const hasW=calDates.has(d);const isSel=calSel===d;
            return <div key={d} style={css.calD(isT,hasW,isSel,false)} onClick={()=>setCalSel(d===calSel?null:d)}>{d}{hasW&&!isSel&&<div style={{width:4,height:4,borderRadius:"50%",background:"#ff3d00",position:"absolute",bottom:3}}/>}</div>;
          })}
        </div>
        {calSel&&selWks.length>0&&selWks.map((h,i)=><div key={i} style={{...css.card,cursor:"default",borderLeft:"3px solid #00e676"}}><h3 style={css.cardH}>{h.name}</h3><div style={css.meta}><span>{h.totalSets} сетов</span><span>{Math.round(h.totalVolume||0)} кг</span><span>{Math.floor((h.duration||0)/60)} мин</span></div></div>)}
        {calSel&&selWks.length===0&&<div style={{textAlign:"center",padding:20,color:"#444",fontSize:11}}>Нет тренировок {calSel} числа</div>}
        <div style={{marginTop:8,...css.statRow}}>
          <div style={css.statBox}><div style={css.statVal}>{mWks.length}</div><div style={css.statLbl}>Тренировок</div></div>
          <div style={css.statBox}><div style={css.statVal}>{mWks.reduce((a,h)=>a+(h.totalSets||0),0)}</div><div style={css.statLbl}>Сетов</div></div>
          <div style={css.statBox}><div style={css.statVal}>{(()=>{const v=mWks.reduce((a,h)=>a+(h.totalVolume||0),0);return v>1000?(v/1000).toFixed(1)+"т":Math.round(v)+"кг"})()}</div><div style={css.statLbl}>Объём</div></div>
        </div>
      </div>
    </div>);
  };

  const ProfScreen = () => (<div>
    <div style={css.hdr}><h1 style={css.h1}>ПРОФИЛЬ</h1><div style={css.sub}>Личный кабинет</div></div>
    <div style={css.cnt}>
      <div style={css.avatar}>{(profile.name||"A")[0].toUpperCase()}</div>
      <div style={{textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:3}}>{profile.name}</div>
      <div style={{textAlign:"center",fontSize:10,color:"#666",letterSpacing:1.5,marginTop:4}}>Участник с {fmtShort(profile.joined)}</div>
      <div style={{...css.streak,marginTop:20}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"#ff3d00",lineHeight:1}}>{calcStreak()}</div><div style={{fontSize:10,color:"#666",letterSpacing:2,textTransform:"uppercase",marginTop:4}}>🔥 дней подряд</div></div>
      <div style={css.statRow}>
        <div style={css.statBox}><div style={css.statVal}>{history.length}</div><div style={css.statLbl}>Тренировок</div></div>
        <div style={css.statBox}><div style={css.statVal}>{Math.round(history.reduce((a,h)=>a+(h.duration||0),0)/3600)}ч</div><div style={css.statLbl}>Время</div></div>
        <div style={css.statBox}><div style={css.statVal}>{totalVol>1000?(totalVol/1000).toFixed(1)+"т":Math.round(totalVol)+"кг"}</div><div style={css.statLbl}>Тоннаж</div></div>
      </div>
      <div style={{marginTop:24}}><h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:"#666",marginBottom:10}}>ПАРАМЕТРЫ</h3>
        {[["Имя","name","text"],["Вес (кг)","weight","number"],["Рост (см)","height","number"],["Возраст","age","number"],["Таймер отдыха (сек)","rest","number"]].map(([l,k,t])=>
          <div key={k} style={css.pfRow}><label style={{fontSize:12,color:"#aaa"}}>{l}</label><input type={t} style={css.pfIn} value={profile[k]||""} placeholder="—" onChange={e=>{const v=e.target.value;setProfile(p=>({...p,[k]:t==="number"?v:v}));if(k==="rest"){const n=parseInt(e.target.value)||90;setTDur(n);tDurRef.current=n;setTRem(n);tRemRef.current=n}}}/></div>
        )}
      </div>
      <div style={{marginTop:24}}><h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:"#666",marginBottom:10}}>ДАННЫЕ</h3>
        <div style={{...css.pfRow,cursor:"pointer"}} onClick={()=>{const d=JSON.stringify({workouts,history,profile},null,2);const b=new Blob([d],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="iron_backup.json";a.click()}}><label style={{fontSize:12,color:"#aaa"}}>Экспорт данных</label><span style={{color:"#ff3d00",fontSize:12}}>→</span></div>
        <div style={{...css.pfRow,cursor:"pointer"}} onClick={()=>{if(window.confirm("Удалить ВСЕ данные?")){setWorkouts([]);setHistory([]);setProfile({name:"АТЛЕТ",weight:"",height:"",age:"",rest:90,joined:new Date().toISOString()})}}}><label style={{fontSize:12,color:"#ff1744"}}>Сбросить всё</label><span style={{color:"#ff1744",fontSize:12}}>✕</span></div>
      </div>
    </div>
  </div>);

  const SessScreen = () => {
    if(!sess) return null;
    return (<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",position:"sticky",top:0,zIndex:10,background:"linear-gradient(#0a0a0a 70%,transparent)"}}>
        <button style={{background:"none",border:"none",color:"#666",padding:8,cursor:"pointer"}} onClick={()=>{if(window.confirm("Выйти? Прогресс не будет сохранён."))endSess()}}><IcoBack/></button>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3}}>{workouts[sess.wi]?.name}</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#ff3d00"}}>{fmtTime(sessElapsed)}</div>
      </div>
      <div style={css.cnt}>
        {sess.exercises.map((ex,ei)=>{
          const edb=exById(ex.id);
          return <div key={ei} style={{background:"#161616",border:"1px solid #252525",borderRadius:14,marginBottom:10,overflow:"hidden"}}>
            <div style={{padding:"12px 14px",display:"flex",gap:10,alignItems:"center",borderBottom:"1px solid #252525"}}>
              {edb&&<div style={css.exThumbSm}><Svg html={edb.svg} size={32}/></div>}
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:1.5,flex:1}}>{ex.name||"Упражнение"}</div>
              <button style={{background:"none",border:"none",color:"#444",padding:4,cursor:"pointer"}} onClick={()=>delEx(ei)}><IcoTrash/></button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"36px 1fr 1fr 44px",gap:6,padding:"6px 14px 2px",fontSize:8,color:"#444",letterSpacing:1.5,textTransform:"uppercase"}}><span>СЕТ</span><span>ВЕС</span><span>ПОВТ</span><span></span></div>
            {ex.sets.map((s,si)=><div key={si} style={{display:"grid",gridTemplateColumns:"36px 1fr 1fr 44px",gap:6,padding:"8px 14px",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,.02)"}}>
              <span style={{fontSize:11,color:"#666",fontWeight:600}}>{si+1}</span>
              <input type="number" inputMode="decimal" style={css.setIn} value={s.w} placeholder="—" onChange={e=>updateSet(ei,si,"w",e.target.value)}/>
              <input type="number" inputMode="numeric" style={css.setIn} value={s.r} placeholder="—" onChange={e=>updateSet(ei,si,"r",e.target.value)}/>
              <button style={css.setOk(s.done)} onClick={()=>toggleDone(ei,si)}><IcoCheck/></button>
            </div>)}
            <button style={{width:"100%",padding:9,background:"none",border:"none",borderTop:"1px solid #252525",color:"#444",fontSize:10,letterSpacing:1,cursor:"pointer"}} onClick={()=>addSet(ei)}>+ Добавить сет</button>
          </div>;
        })}
        <button style={{...css.btnAdd,marginBottom:10}} onClick={()=>{setShowPickerModal(true);setPickCat("Все");setPickQ("")}}>+ ДОБАВИТЬ УПРАЖНЕНИЕ</button>
        <button style={{width:"100%",padding:15,background:"#ff3d00",border:"none",borderRadius:14,color:"#fff",fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:4,boxShadow:"0 4px 25px rgba(255,61,0,.25)",cursor:"pointer",marginBottom:16}} onClick={finishSess}>ЗАВЕРШИТЬ</button>
      </div>
      <button style={css.fab} onClick={openTimerOv}><IcoTimer/></button>
    </div>);
  };

  return (
    <div style={css.app}>
      {/* Screens */}
      {screen==="home"&&<HomeScreen/>}
      {screen==="lib"&&<LibScreen/>}
      {screen==="cal"&&<CalScreen/>}
      {screen==="prof"&&<ProfScreen/>}
      {screen==="session"&&<SessScreen/>}

      {/* Bottom Nav */}
      {screen!=="session"&&<div style={css.bnav}>
        {[["home","ГЛАВНАЯ",IcoHome],["lib","КАТАЛОГ",IcoGrid],["cal","КАЛЕНДАРЬ",IcoCal],["prof","ПРОФИЛЬ",IcoUser]].map(([s,l,Ico])=>
          <button key={s} style={css.nb(screen===s)} onClick={()=>setScreen(s)}><Ico/>{l}</button>
        )}
      </div>}

      {/* Timer Pill */}
      {pillVis&&<button style={css.pill} onClick={openTimerOv}>{tDisp} ОТДЫХ</button>}

      {/* Timer Overlay */}
      {showTimer&&<div style={css.timerOv}>
        <button style={{position:"absolute",top:16,right:16,width:40,height:40,background:"none",border:"none",color:"#666",cursor:"pointer"}} onClick={closeTimerOv}><IcoX/></button>
        <div style={{position:"relative",width:260,height:260}}>
          <svg style={{width:"100%",height:"100%",transform:"rotate(-90deg)"}} viewBox="0 0 200 200"><circle fill="none" stroke="#1e1e1e" strokeWidth="5" cx="100" cy="100" r="90"/><circle fill="none" stroke={tCol} strokeWidth="5" strokeLinecap="round" cx="100" cy="100" r="90" strokeDasharray={CIRC} strokeDashoffset={tOff} style={{transition:"stroke-dashoffset .1s linear"}}/></svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:72,letterSpacing:3,lineHeight:1}}>{tDisp}</div>
            <div style={{fontSize:9,color:"#666",letterSpacing:3,textTransform:"uppercase",marginTop:6}}>ОТДЫХ</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginTop:36,flexWrap:"wrap",justifyContent:"center"}}>
          {[30,60,90,120,180].map(s=><button key={s} style={css.trp(tDur===s)} onClick={()=>{setTDur(s);tDurRef.current=s;setTRem(s);tRemRef.current=s;setTRun(false);clearInterval(tIntRef.current)}}>{`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}</button>)}
        </div>
        <div style={{display:"flex",gap:14,marginTop:28}}>
          <button style={css.trc(false)} onClick={()=>{clearInterval(tIntRef.current);setTRun(false);setTRem(tDurRef.current);tRemRef.current=tDurRef.current}}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6"/><path d="M3.51 15A9 9 0 1 0 3 9"/></svg>
          </button>
          <button style={css.trc(true)} onClick={()=>tRun?pauseTimer():startTimer()}>
            {tRun?<svg width="22" height="22" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>:<svg width="22" height="22" fill="currentColor"><polygon points="8,5 20,12 8,19"/></svg>}
          </button>
          <button style={css.trc(false)} onClick={()=>{const n=tRemRef.current+15;tRemRef.current=n;setTRem(n)}}>
            <span style={{fontSize:12,fontWeight:700}}>+15</span>
          </button>
        </div>
      </div>}

      {/* New Workout Modal */}
      {showNewModal&&<div style={css.modal} onClick={e=>{if(e.target===e.currentTarget)setShowNewModal(false)}}>
        <div style={css.msheet}>
          <h2 style={css.mH2}>НОВАЯ ТРЕНИРОВКА</h2>
          <div style={css.tabs}><button style={css.tab(newTab===0)} onClick={()=>setNewTab(0)}>ПУСТАЯ</button><button style={css.tab(newTab===1)} onClick={()=>setNewTab(1)}>ШАБЛОНЫ</button></div>
          {newTab===0&&<div>
            <input style={css.mIn} placeholder="Название (Грудь + Трицепс)" value={newName} onChange={e=>setNewName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")createWk()}} autoFocus/>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button style={{flex:1,padding:13,borderRadius:12,border:"none",background:"#1e1e1e",color:"#666",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer"}} onClick={()=>setShowNewModal(false)}>ОТМЕНА</button>
              <button style={{flex:1,padding:13,borderRadius:12,border:"none",background:"#ff3d00",color:"#fff",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer"}} onClick={createWk}>НАЧАТЬ</button>
            </div>
          </div>}
          {newTab===1&&<div style={{maxHeight:"50vh",overflowY:"auto"}}>
            {TEMPLATES.map((t,i)=><div key={i} style={{background:"#1e1e1e",border:"1px solid #252525",borderRadius:12,padding:14,marginBottom:8,cursor:"pointer"}} onClick={()=>{useTpl(t);setShowNewModal(false)}}>
              <h4 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:1.5,margin:0}}>{t.name}</h4>
              <div style={{fontSize:10,color:"#666",marginTop:4,lineHeight:1.5}}>{t.exs.map(id=>exById(id)?.name).filter(Boolean).join(", ")}</div>
            </div>)}
          </div>}
        </div>
      </div>}

      {/* Exercise Picker Modal */}
      {showPickerModal&&<div style={css.modal} onClick={e=>{if(e.target===e.currentTarget)setShowPickerModal(false)}}>
        <div style={css.msheet}>
          <h2 style={css.mH2}>ДОБАВИТЬ УПРАЖНЕНИЕ</h2>
          <div style={{position:"relative",marginBottom:12}}>
            <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#444"}}><IcoSearch/></div>
            <input style={{...css.mIn,paddingLeft:38,marginBottom:0}} placeholder="Поиск..." value={pickQ} onChange={e=>setPickQ(e.target.value)} autoFocus/>
          </div>
          <div style={{display:"flex",gap:8,padding:"4px 0 12px",overflowX:"auto"}}>
            {CATS.map(c=><button key={c} style={css.cpill(c===pickCat)} onClick={()=>setPickCat(c)}>{c.toUpperCase()}</button>)}
          </div>
          <div style={{maxHeight:"40vh",overflowY:"auto"}}>
            {filterEx(pickQ,pickCat).map(e=>{
              const added=sess?.exercises.some(x=>x.id===e.id);
              return <div key={e.id} style={css.exCard} onClick={()=>{pickEx(e.id)}}>
                <div style={css.exThumb}><Svg html={e.svg}/></div>
                <div style={{flex:1,minWidth:0}}><h4 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:1.5,margin:0}}>{e.name}</h4><div style={{fontSize:10,color:"#ff3d00",letterSpacing:1,marginTop:2}}>{e.muscle}</div></div>
                <div style={{width:32,height:32,borderRadius:"50%",border:`1.5px solid ${added?"#00e676":"#252525"}`,background:added?"rgba(0,230,118,.1)":"none",color:added?"#00e676":"#666",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{added?<IcoCheck/>:<IcoPlus/>}</div>
              </div>;
            })}
          </div>
          <button style={{width:"100%",padding:13,borderRadius:12,border:"none",background:"#1e1e1e",color:"#666",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer",marginTop:12}} onClick={()=>setShowPickerModal(false)}>ЗАКРЫТЬ</button>
        </div>
      </div>}
    </div>
  );
}
