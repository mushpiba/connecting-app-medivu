import { useColorScheme } from 'react-native';

import { ColorToken, palette } from './tokens';

/** 현재 배색에서 의미 토큰 하나를 읽는다 */
export function useColor(token: ColorToken): string {
  const scheme = useColorScheme();
  return palette[scheme === 'dark' ? 'dark' : 'light'][token];
}

/** 한 화면에서 여러 색을 쓸 때 */
export function useColors() {
  const scheme = useColorScheme();
  return palette[scheme === 'dark' ? 'dark' : 'light'];
}
