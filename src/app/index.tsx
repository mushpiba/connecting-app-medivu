import { View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { EmptyState } from '@/components/ui/empty-state';
import { Screen, Section } from '@/components/ui/screen';
import { space } from '@/theme/tokens';

/**
 * 홈 — 핵심 과업 진입점이 맨 위, 그 아래가 내 진행 상태다.
 *
 * 사연 피드를 홈에 두지 않는다. 남의 글이 먼저 보이면 「내 것이 어디까지 갔나」가 밀린다.
 */
export default function HomeScreen() {
  return (
    <Screen title="홈">
      {/* 진입점을 스크롤 없이 보이는 자리에 둔다 */}
      <View style={{ gap: space.sm }}>
        <ActionButton label="증상 적어보기" />
        <ActionButton label="사연 둘러보기" variant="secondary" />
      </View>

      <Section title="진행 중">
        <EmptyState
          title="아직 진행 중인 것이 없어요"
          guide="증상을 적으면 여기에서 진행 상태를 볼 수 있어요."
        />
      </Section>

      <Section title="새로 온 답변">
        <EmptyState title="아직 온 답변이 없어요" guide="답변이 오면 여기와 알림으로 알려드려요." />
      </Section>
    </Screen>
  );
}
