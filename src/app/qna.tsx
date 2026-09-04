import { StyleSheet, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { Screen, Section } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

/**
 * Q — 사연을 쓰고 의사가 답한다.
 *
 * 의사 목록 화면을 만들지 않는다. 의사는 **답변에 붙어서만** 등장하고,
 * 목록이 되는 것은 사용자가 별표한 것뿐이다. 정렬은 최신순 하나로 고정하고
 * 그 사실을 화면에 적는다 — 정렬이 선택을 유도하면 대가를 받지 않아도 문제가 된다.
 */
export default function QnaScreen() {
  return (
    <Screen title="Q">
      <ActionButton label="사연 쓰기" />

      <Section title="최근 사연">
        {/* 정렬 기준 공개는 덜어낼 수 없다 — 대가를 안 받아도 정렬이 선택을 유도하면 걸린다 */}
        <AppText variant="caption" color="text.secondary">
          작성 시각순입니다. 대가는 순서에 영향을 주지 않습니다.
        </AppText>
        <AnswerCard />
      </Section>
    </Screen>
  );
}

/** 답변 카드 — 프로필에 들어가는 것은 성명·진료과·면허 종류까지다 */
function AnswerCard() {
  const colors = useColors();

  return (
    <View style={[styles.card, { borderColor: colors['border.divider'], backgroundColor: colors['bg.raised'] }]}>
      <View style={[styles.tag, { backgroundColor: colors['bg.actionSubtle'] }]}>
        <AppText variant="legal" color="text.link">
          작성 예시
        </AppText>
      </View>

      <AppText variant="bodyStrong">한 달째 아침에만 손가락이 뻣뻣해요</AppText>
      <AppText variant="caption" color="text.secondary">
        2026년 9월 3일(목) · 답변 1
      </AppText>

      <View style={[styles.divider, { backgroundColor: colors['border.divider'] }]} />

      <AppText variant="caption" color="text.secondary">
        김○○ · 내과 · 의사(전문의)
      </AppText>
      <AppText variant="body">
        아침에 뻣뻣한 느낌이 얼마나 오래 가는지, 양손인지 한 손인지 적어주시면 어느 과에서 볼지 좁힐 수
        있어요. 진료 때 그대로 가져가셔도 됩니다.
      </AppText>

      {/* 좁은 화면에서 두 버튼을 나란히 두면 라벨이 두 줄로 접힌다. 세로로 쌓는다 */}
      <View style={styles.actions}>
        <ActionButton label="이 선생님께 문의하기" />
        <ActionButton label="별표해 두기" variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: size.borderWidth,
    borderRadius: size.radius,
    padding: space.lg,
    gap: space.sm,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: size.radius,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
  },
  divider: {
    height: size.borderWidth,
    marginVertical: space.sm,
  },
  actions: {
    gap: space.sm,
    marginTop: space.sm,
  },
});
