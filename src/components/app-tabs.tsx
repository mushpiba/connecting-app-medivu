import { Ionicons } from '@expo/vector-icons';
import { TabList, TabSlot, TabTrigger, TabTriggerSlotProps, Tabs } from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './ui/text';

import { press, size, space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

/**
 * 하단 탭 다섯. 구상1의 「홈 · 진료 · Q · 주변 · 메뉴」다.
 *
 * 탭 이름은 사용자의 말로 둔다. 「초진/재진」 같은 법률 용어는
 * 탭에도 첫 화면에도 쓰지 않는다 — 그건 시스템이 이력으로 판정할 몫이다.
 */
const TABS = [
  { name: 'home', href: '/', label: '홈', icon: 'home-outline', active: 'home' },
  { name: 'care', href: '/care', label: '진료', icon: 'medkit-outline', active: 'medkit' },
  { name: 'qna', href: '/qna', label: 'Q', icon: 'chatbubbles-outline', active: 'chatbubbles' },
  { name: 'nearby', href: '/nearby', label: '주변', icon: 'location-outline', active: 'location' },
  { name: 'menu', href: '/menu', label: '메뉴', icon: 'menu-outline', active: 'menu' },
] as const;

export default function AppTabs() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      {/* 화면이 남은 높이를 다 쓰게 한다. 안 그러면 웹에서 탭 바가 아래로 밀린다 */}
      <TabSlot style={styles.slot} />
      <TabList asChild>
        {/* Slot의 자식에는 배열 스타일을 넘길 수 없다 — 평탄화해서 넘긴다 */}
        <View
          style={StyleSheet.flatten([
            styles.bar,
            {
              backgroundColor: colors['bg.raised'],
              borderTopColor: colors['border.divider'],
              paddingBottom: insets.bottom,
            },
          ])}>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon} activeIcon={tab.active}>
                {tab.label}
              </TabButton>
            </TabTrigger>
          ))}
        </View>
      </TabList>
    </Tabs>
  );
}

type ButtonProps = TabTriggerSlotProps & {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

function TabButton({ children, isFocused, icon, activeIcon, ...rest }: ButtonProps) {
  const colors = useColors();
  // 선택된 탭은 색과 아이콘 모양이 함께 바뀐다. 색만 바꾸면 색을 못 보는 사람에게 표시가 없다.
  const tint = isFocused ? colors['text.link'] : colors['text.secondary'];

  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => StyleSheet.flatten([styles.tab, { opacity: pressed ? press.opacity : 1 }])}>
      <Ionicons name={isFocused ? activeIcon : icon} size={size.iconMd} color={tint} />
      {/* 활성 탭에서 굵기를 바꾸지 않는다 — 글자 폭이 변해 탭이 덜컹인다 */}
      <AppText variant="legal" style={{ color: tint }}>
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
  },
  bar: {
    flexDirection: 'row',
    borderTopWidth: size.borderWidth,
    paddingTop: space.sm,
  },
  tab: {
    flex: 1,
    minHeight: size.touchMin,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingBottom: space.xs,
  },
});
