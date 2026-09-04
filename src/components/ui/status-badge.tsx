import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from './text';

import { ColorToken, size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

export type Status = 'queued' | 'submitting' | 'accepted' | 'confirmed' | 'failed';

/** 색만으로 상태를 말하지 않는다. 아이콘 · 글자 · 색 셋이 항상 함께 간다 */
const spec: Record<Status, { label: string; icon: keyof typeof Ionicons.glyphMap; color: ColorToken }> = {
  queued: { label: '보내는 중(대기)', icon: 'time-outline', color: 'state.pending' },
  submitting: { label: '보내는 중', icon: 'arrow-up-circle-outline', color: 'state.pending' },
  accepted: { label: '접수됨', icon: 'checkmark-circle-outline', color: 'state.success' },
  confirmed: { label: '확정', icon: 'checkmark-done-circle-outline', color: 'state.success' },
  failed: { label: '전송 실패', icon: 'alert-circle-outline', color: 'state.danger' },
};

type Props = {
  status: Status;
  /** 접수·확정은 시각이 반드시 붙는다. 실패는 원인이 붙는다 */
  detail?: string;
};

export function StatusBadge({ status, detail }: Props) {
  const colors = useColors();
  const { label, icon, color } = spec[status];

  return (
    <View style={styles.row} accessibilityRole="text">
      <Ionicons name={icon} size={size.iconSm} color={colors[color]} />
      <AppText variant="caption" color={color}>
        {label}
      </AppText>
      {detail ? (
        <AppText variant="caption" color="text.secondary">
          · {detail}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
});
