// @ts-check
const expoConfig = require('eslint-config-expo/flat');

/**
 * ESLint — Expo 기본 위에 이 프로젝트의 디자인 규칙 중 **기계로 잡히는 것만** 얹는다.
 *
 * 여기 있는 규칙은 전부 CLAUDE.md의 한 줄과 짝이 맞는다. 짝이 없는 규칙은 넣지 않았다.
 * 잡히지 않는 것(문장 40자, 상태 어휘, 대비비, 확대 레이아웃)은 사람이 본다 — CLAUDE.md §11.3.
 *
 * 규칙을 끄려면 왜 껐는지 주석에 남긴다. 조용히 끄면 관문이 아니라 장식이 된다.
 */

/**
 * 문구 금지어 — CLAUDE.md §6.1
 *
 * `곧`과 `앗`은 뺐다. 한 글자짜리라 멀쩡한 말(곧바로, 앗아가다)을 잡는다.
 * 이 둘은 사람이 본다.
 */
const BANNED_PHRASES = [
  { pattern: '죄송합니다|죄송하지만', hint: '사과 대신 무엇을 하면 되는지 쓴다' },
  { pattern: '유효하지 않은|잘못된 값|잘못 입력하셨습니다', hint: '무엇이 어떻게 틀렸는지 쓴다' },
  { pattern: '필수 항목입니다', hint: '「전화번호를 입력해 주세요」처럼 무엇이 필요한지 쓴다' },
  { pattern: '오류가 발생했습니다', hint: '원인과 다음 행동을 쓴다' },
  { pattern: '간편하게|스마트하게|쉽고 빠르게', hint: '마케팅 수식은 지운다' },
  { pattern: '잠시만 기다려 주세요', hint: '「예약 내역을 불러오는 중」처럼 무엇을 기다리는지 쓴다' },
  { pattern: '잠시 후', hint: '절대 시각을 쓴다' },
  { pattern: '하셔야 합니다|해야만 ', hint: '압박하지 않는다. 「~해 주세요」로 쓴다' },
];

/** 문자열은 세 자리에 나타난다: 'x' · <Text>x</Text> · `x` */
const TEXT_NODES = ['Literal[value=/%s/]', 'JSXText[value=/%s/]', 'TemplateElement[value.raw=/%s/]'];

const bannedPhraseRules = BANNED_PHRASES.flatMap(({ pattern, hint }) =>
  TEXT_NODES.map((node) => ({
    selector: node.replace('%s', pattern),
    message: `금지어: ${pattern.split('|')[0]} — ${hint}. CLAUDE.md §6.1`,
  }))
);

const designRules = [
  {
    // CLAUDE.md §6.2 — 버튼 라벨은 동사 + 목적어
    selector: 'JSXAttribute[name.name=/^(label|title|submittingLabel|actionLabel)$/] > Literal[value=/^(확인|제출|완료|OK|계속)$/]',
    message: '무맥락 버튼 라벨이다. 동사 + 목적어로 쓴다 — 「예약 확정하기」. CLAUDE.md §6.2',
  },
  {
    // CLAUDE.md §9 — OS 글자 크기를 그대로 따른다
    selector: 'JSXAttribute[name.name="allowFontScaling"] Literal[value=false]',
    message: 'OS 글자 크기를 끄지 않는다. 확대에서 기능이 사라지면 출시 게이트 G2다. CLAUDE.md §9',
  },
  {
    // CLAUDE.md §5.1 — 색은 토큰 이름으로만
    selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
    message: '색을 직접 쓰지 않는다. src/theme/tokens.ts의 이름을 쓴다. CLAUDE.md §5.1',
  },
  {
    // CLAUDE.md §5.2 — 글자 크기는 type 토큰으로만. 직접 쓰면 확대 대응이 갈린다
    selector: 'Property[key.name=/^(fontSize|lineHeight)$/][value.type="Literal"]',
    message: '글자 크기를 직접 쓰지 않는다. tokens.ts의 type 토큰을 쓴다. CLAUDE.md §5.2',
  },
  {
    // CLAUDE.md §9 — 모든 인터랙티브 요소에 이름·역할
    // {...rest}로 위에서 넘겨받는 경우는 여기서 판정할 수 없어 뺀다
    selector:
      'JSXOpeningElement[name.name=/^(Pressable|TouchableOpacity|TouchableHighlight|TouchableWithoutFeedback)$/]:not(:has(JSXAttribute[name.name="accessibilityRole"])):not(:has(JSXSpreadAttribute))',
    message: '누르는 요소에 accessibilityRole이 없다. 화면 읽기에서 무엇인지 알 수 없다. CLAUDE.md §9',
  },
];

module.exports = [
  // expoConfig는 그 자체가 배열이다. 펼치지 않으면 중첩 배열이 되어 ESLint가 죽는다
  ...expoConfig,

  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*', 'expo-env.d.ts', 'scripts/*'],
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', ...bannedPhraseRules, ...designRules],
    },
  },

  {
    // 토큰 정본은 숫자와 색을 쓰라고 있는 파일이다. 여기서까지 막으면 정의할 곳이 없다
    files: ['src/theme/tokens.ts'],
    rules: { 'no-restricted-syntax': 'off' },
  },

  {
    // 00-공통.md — 화면이 직접 fetch하지 않는다. 나중에 서버로 갈아끼울 수 있어야 한다
    files: ['src/app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: '화면이 직접 fetch하지 않는다. src/data/의 모듈을 거친다. prompts/00-공통.md' },
      ],
    },
  },
];
