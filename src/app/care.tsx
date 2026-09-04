import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/ui/empty-state';
import { ListRow } from '@/components/ui/list-row';
import { Screen, Section } from '@/components/ui/screen';
import { AppText } from '@/components/ui/text';
import { size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

/**
 * 진료 — 「무엇을 하려는가」를 먼저 묻고, 그 안에서 「이어서 / 새로」를 가른다.
 *
 * 초진·재진은 법이 만든 분기이지 환자의 말이 아니다. 그리고 재진 판정 기준은
 * 「이 앱에서 진료본 적 있는가」가 아니라 「그 의료기관에서 대면 진료받은 적
 * 있는가」다. 앱 이력만으로 판정할 수 없으므로 화면이 묻지 않는다.
 *
 * 비대면 진료 조건 안내는 여기 두지 않는다. 「지금 진료받고 싶어요」를 고른
 * 다음, 조건이 실제로 걸리는 자리에서 말한다.
 */
export default function CareScreen() {
  const colors = useColors();

  return (
    <Screen title="진료">
      {/* 대리 이용은 예외가 아니라 기본 경로다. 누구의 진료인지 항상 화면에 있다 */}
      <View style={[styles.subject, { borderColor: colors['border.divider'], backgroundColor: colors['bg.surface'] }]}>
        <AppText variant="caption" color="text.secondary">
          진료받으실 분
        </AppText>
        <AppText variant="bodyStrong">나</AppText>
      </View>

      <Section title="무엇을 하시겠어요?">
        <ListRow title="지금 물어보고 싶어요" detail="병원에 가기 애매할 때" icon="help-circle-outline" />
        <ListRow title="지금 진료받고 싶어요" detail="비대면 진료 신청" icon="videocam-outline" />
        <ListRow title="나중에 갈 병원을 잡고 싶어요" detail="예약" icon="calendar-outline" />
        <ListRow title="어느 과인지 모르겠어요" detail="증상 적어보기" icon="compass-outline" />
      </Section>

      <Section title="이어서 진료받기">
        <EmptyState
          title="진료받은 기록이 아직 없어요"
          guide="앱 밖에서 진료받은 병원도 등록해 둘 수 있어요."
          actionLabel="진료받은 병원 등록하기"
        />
      </Section>

      <Section title="별표한 의료진">
        <EmptyState title="별표한 의료진이 없어요" guide="Q 탭에서 별표를 누르면 여기에 모입니다." />
      </Section>

      <AppText variant="caption" color="state.danger">
        응급 상황이라고 느껴지면 119에 연락하세요.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  subject: {
    borderWidth: size.borderWidth,
    borderRadius: size.radius,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
    gap: 2,
  },
});
