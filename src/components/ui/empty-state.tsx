import { StyleSheet, View } from 'react-native';

import { ActionButton } from './action-button';
import { AppText } from './text';

import { size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

type Props = {
  /** 왜 비어 있는가. 「데이터가 없습니다」를 쓰지 않는다 */
  title: string;
  /** 무엇을 하면 되는가 */
  guide: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** 빈 상태는 설명 · 다음 행동 안내 · 행동 버튼 세 요소를 모두 갖는다 */
export function EmptyState({ title, guide, actionLabel, onAction }: Props) {
  const colors = useColors();

  return (
    <View style={[styles.box, { borderColor: colors['border.divider'], backgroundColor: colors['bg.surface'] }]}>
      <AppText variant="bodyStrong">{title}</AppText>
      <AppText variant="caption" color="text.secondary">
        {guide}
      </AppText>
      {actionLabel ? (
        <View style={styles.action}>
          <ActionButton label={actionLabel} variant="secondary" onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: size.radius,
    borderWidth: size.borderWidth,
    padding: space.lg,
    gap: space.xs,
  },
  action: {
    marginTop: space.md,
  },
});
