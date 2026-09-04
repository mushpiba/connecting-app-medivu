/**
 * 의미 토큰 — 이 파일이 정본이다.
 *
 * 화면 코드는 이 파일의 **이름**만 쓴다. 숫자를 직접 넣지 않는다.
 * 근거: design-research/Claude/COMPONENT_AND_STATE_GUIDE.md §2 (2층 토큰 구조)
 *
 * 아래 수치는 **팀 설계값**이지 표준 요구가 아니다. 표준 최소값과 다르며,
 * 근거와 예외는 design-research/Claude/DESIGN_RULES.md를 본다.
 */

import { Platform } from 'react-native';

/**
 * 타이포그래피 — 본문 기본 17.
 * lineHeight는 항상 함께 정의한다. Android에서 sp 단위로 확대돼야 하기 때문이다.
 * Light/Thin 굵기를 만들지 않는다.
 */
export const type = {
  display: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '700' },
  headline: { fontSize: 19, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 17, lineHeight: 26, fontWeight: '400' },
  bodyStrong: { fontSize: 17, lineHeight: 26, fontWeight: '600' },
  label: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  legal: { fontSize: 13, lineHeight: 20, fontWeight: '400' },
} as const;

export type TypeToken = keyof typeof type;

/**
 * 색 — 라이트·다크를 각각 정의한다.
 * 상태 색은 단독으로 의미를 전달하지 않는다. 반드시 아이콘·라벨과 함께 쓴다.
 */
const light = {
  'bg.canvas': '#FFFFFF',
  'bg.surface': '#F4F6F6',
  'bg.raised': '#FFFFFF',
  'bg.action': '#0F5C57',
  'bg.actionSubtle': '#E3EFEE',
  'text.primary': '#111817',
  'text.secondary': '#4A5654',
  'text.onAction': '#FFFFFF',
  'text.link': '#0F5C57',
  'border.control': '#8A9694',
  'border.divider': '#DCE3E2',
  'state.success': '#1B6E3C',
  'state.warning': '#8A5300',
  'state.danger': '#A32020',
  'state.pending': '#3F5A88',
  focus: '#0F5C57',
} as const;

const dark: Record<keyof typeof light, string> = {
  'bg.canvas': '#0D1211',
  'bg.surface': '#161D1C',
  'bg.raised': '#1D2625',
  'bg.action': '#5FD4C6',
  'bg.actionSubtle': '#1E2E2C',
  'text.primary': '#F2F5F4',
  'text.secondary': '#B4BFBD',
  'text.onAction': '#06201D',
  'text.link': '#5FD4C6',
  'border.control': '#7C8987',
  'border.divider': '#2C3634',
  'state.success': '#6FD08C',
  'state.warning': '#E0A44A',
  'state.danger': '#F08585',
  'state.pending': '#9BB4E0',
  focus: '#5FD4C6',
};

export const palette = { light, dark };
export type ColorToken = keyof typeof light;

/** 간격·크기 — iOS pt / Android dp / Web px 동일 수치 */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const size = {
  /** 모든 인터랙티브 요소의 히트 영역 최소값. 아이콘 시각 크기와 별개다 */
  touchMin: 48,
  touchPrimary: 56,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  radius: 12,
  radiusLg: 20,
  borderWidth: 1,
  focusWidth: 2,
} as const;

/**
 * 모션 — 지속 시간은 기준 기기에서 맞춘 뒤 여기에 기록한다.
 * 아직 기준 기기를 정하지 않았다. 아래 값은 **임시**다.
 *
 * press는 모션 축소 설정에서도 유지한다. 장식이 아니라 입력 확인 신호다.
 */
export const motion = {
  press: { duration: 80, keepOnReduce: true },
  transition: { duration: 220, reduceTo: 'fade' },
  reveal: { duration: 180, reduceTo: 'fade' },
  emphasis: { duration: 300, reduceTo: 'none' },
} as const;

/** 눌림 반응의 시각 값. 리플이 아니라 scale로 — iOS에서 리플은 이질적이다 */
export const press = {
  scale: 0.98,
  opacity: 0.92,
} as const;

export const fontFamily = Platform.select({
  ios: 'system-ui',
  android: 'normal',
  default: 'system-ui',
});
