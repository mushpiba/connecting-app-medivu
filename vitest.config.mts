import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * 도메인 로직 전용 테스트 러너다.
 *
 * React Native 컴포넌트는 여기서 돌리지 않는다. RN 트랜스폼을 붙이지 않았고,
 * 붙일 이유도 아직 없다 — 화면은 웹 미리보기로 눈으로 본다.
 * 그래서 include를 `.test.ts`로 좁혔다. `.test.tsx`는 잡히지 않는다.
 *
 * 테스트 대상은 순수 함수다: 증상 판정, 문의 횟수 상한, 상태 전이 규칙 같은 것.
 */
export default defineConfig({
  resolve: {
    alias: {
      // tsconfig.json의 paths와 같은 것을 가리킨다. 어긋나면 import가 갈린다
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // MediVU-community에서 옮겨오는 테스트가 describe/it/expect를 import 없이 쓴다
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // 아직 테스트가 하나도 없다. 02 세션이 triage.test.ts를 옮겨오면 지운다
    passWithNoTests: true,
  },
});
