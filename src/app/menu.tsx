import { ListRow } from '@/components/ui/list-row';
import { Screen, Section } from '@/components/ui/screen';

/**
 * 메뉴 — 절차 지식만 둔다.
 *
 * 증상 지식은 쓰지 않는다. 「이 증상은 무슨 병인가」로 넘어가는 순간
 * 진단이 되고, 진단은 이 앱이 하지 않는 일이다.
 */
export default function MenuScreen() {
  return (
    <Screen title="메뉴">
      <Section title="알아두면 좋은 것">
        <ListRow title="급여와 비급여는 무엇이 다른가요" icon="cash-outline" />
        <ListRow title="1차·2차·3차 의료기관은 어떻게 다른가요" icon="business-outline" />
        <ListRow title="비대면 진료는 언제 받을 수 있나요" icon="videocam-outline" />
        <ListRow title="진료과를 모를 때는 어떻게 하나요" icon="compass-outline" />
      </Section>

      <Section title="정부 제도와 지원">
        <ListRow title="본인부담상한제" icon="shield-checkmark-outline" />
        <ListRow title="재난적 의료비 지원" icon="medkit-outline" />
        <ListRow title="지역별 응급의료 안내" icon="call-outline" />
      </Section>

      <Section title="내 정보">
        <ListRow title="알림 받기" icon="notifications-outline" />
        <ListRow title="글자 크기와 화면" icon="text-outline" />
        <ListRow title="도움말" icon="help-buoy-outline" />
        <ListRow title="이 앱이 하는 일과 하지 않는 일" icon="information-circle-outline" />
      </Section>
    </Screen>
  );
}
