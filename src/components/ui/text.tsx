import { Text as RNText, TextProps } from 'react-native';

import { ColorToken, TypeToken, fontFamily, type } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

type Props = TextProps & {
  variant?: TypeToken;
  color?: ColorToken;
};

/**
 * 모든 글자는 이것을 쓴다. 크기·색을 화면에서 직접 정하지 않는다.
 *
 * allowFontScaling을 끄지 않는다 — OS 글자 크기 설정을 무시하면
 * 접근성 요구를 어긴다. 큰 제목에만 상한을 둔다.
 */
export function AppText({ variant = 'body', color = 'text.primary', style, ...rest }: Props) {
  const colors = useColors();
  const capped = variant === 'display' || variant === 'title' || variant === 'headline';

  return (
    <RNText
      maxFontSizeMultiplier={capped ? 1.6 : undefined}
      style={[{ fontFamily, color: colors[color] }, type[variant], style]}
      {...rest}
    />
  );
}
