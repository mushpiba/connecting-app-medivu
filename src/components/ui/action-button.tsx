import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './text';

import { press, size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

type Props = {
  /** 동사 + 목적어. 「확인」·「제출」·「완료」를 쓰지 않는다 */
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  /** 진행 중 문구. 라벨의 진행형으로 쓴다 — 「예약하기」→「예약하는 중」 */
  submittingLabel?: string;
  submitting?: boolean;
  /** 비활성일 때는 이유를 함께 준다. 이유 없는 비활성은 막는 이유를 숨기는 것이다 */
  disabledReason?: string;
};

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
  submitting = false,
  submittingLabel,
  disabledReason,
}: Props) {
  const colors = useColors();
  const disabled = Boolean(disabledReason) || submitting;
  const primary = variant === 'primary';

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: submitting }}
        accessibilityHint={disabledReason}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          {
            backgroundColor: primary ? colors['bg.action'] : colors['bg.actionSubtle'],
            borderColor: primary ? 'transparent' : colors['border.control'],
            opacity: disabledReason ? 0.55 : pressed ? press.opacity : 1,
            transform: [{ scale: pressed ? press.scale : 1 }],
          },
        ]}>
        {submitting ? <ActivityIndicator color={primary ? colors['text.onAction'] : colors['text.link']} /> : null}
        <AppText variant="label" color={primary ? 'text.onAction' : 'text.link'}>
          {submitting ? (submittingLabel ?? label) : label}
        </AppText>
      </Pressable>

      {disabledReason ? (
        <AppText variant="caption" color="text.secondary" style={styles.reason}>
          {disabledReason}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: size.touchPrimary,
    borderRadius: size.radius,
    borderWidth: size.borderWidth,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  reason: {
    marginTop: space.xs,
    paddingHorizontal: space.xs,
  },
});
