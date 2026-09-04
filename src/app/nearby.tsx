import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/ui/empty-state';
import { Screen, Section } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { ColorToken, size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

/**
 * 주변 — 목록이 먼저고 지도는 나중이다.
 *
 * 국내 1위 비대면진료 앱조차 네이티브 지도 SDK를 싣지 않았다(해체본 확인).
 * 지도가 없으면 못 하는 일이 아니라, 지도가 있어야 더 나은 일이다.
 *
 * 1·2·3차의 뜻은 여기서 설명하지 않는다. 메뉴 탭에 그 항목이 있다.
 */
export default function NearbyScreen() {
  return (
    <Screen title="주변">
      <Section title="지금 진료 중">
        <EmptyState
          title="위치를 알려주시면 가까운 곳부터 보여드려요"
          guide="위치는 목록을 정렬하는 데에만 씁니다."
          actionLabel="내 위치로 찾기"
        />
      </Section>

      <Section title="의료기관 종류">
        <View style={styles.legend}>
          <LevelChip label="1차 · 의원" tone="state.success" />
          <LevelChip label="2차 · 병원" tone="state.pending" />
          <LevelChip label="3차 · 상급종합" tone="state.warning" />
        </View>
      </Section>
    </Screen>
  );
}

/** 등급은 색과 글자를 함께 쓴다. 색만으로 구분하면 색을 못 보는 사람에게 정보가 없다 */
function LevelChip({ label, tone }: { label: string; tone: ColorToken }) {
  const colors = useColors();

  return (
    <View style={[styles.chip, { borderColor: colors[tone] }]}>
      <View style={[styles.dot, { backgroundColor: colors[tone] }]} />
      <AppText variant="caption" color={tone}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    borderWidth: size.borderWidth,
    borderRadius: size.radiusLg,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
