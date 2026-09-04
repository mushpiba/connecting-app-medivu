import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './text';

import { size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

type Props = {
  title: string;
  /** 보조 설명. 시각·상태처럼 사실만 적는다 */
  detail?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

/** 누를 수 있는 목록 행. 히트 영역은 아이콘 크기와 별개로 48 이상이다 */
export function ListRow({ title, detail, icon, onPress }: Props) {
  const colors = useColors();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          borderColor: colors['border.divider'],
          backgroundColor: pressed ? colors['bg.actionSubtle'] : colors['bg.raised'],
        },
      ]}>
      {icon ? (
        <Ionicons name={icon} size={size.iconMd} color={colors['text.link']} />
      ) : null}

      <View style={styles.body}>
        <AppText variant="bodyStrong">{title}</AppText>
        {detail ? (
          <AppText variant="caption" color="text.secondary">
            {detail}
          </AppText>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={size.iconSm} color={colors['text.secondary']} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: size.touchMin,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    borderRadius: size.radius,
    borderWidth: size.borderWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
  },
  body: {
    flex: 1,
    gap: 2,
  },
});
