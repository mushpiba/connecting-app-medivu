import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './text';

import { space } from '@/theme/tokens';
import { useColors } from '@/theme/use-theme';

type Props = {
  title: string;
  children: ReactNode;
};

/**
 * 화면 제목 아래에 설명 줄을 두지 않는다. 섹션 제목과 진입점 라벨이
 * 이미 말하고 있으면 그 설명은 같은 말을 두 번 하는 것이다.
 */
export function Screen({ title, children }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors['bg.canvas'] }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.lg, paddingBottom: space.xxl },
      ]}>
      <AppText variant="display">{title}</AppText>
      {children}
    </ScrollView>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="headline">{title}</AppText>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: space.lg,
    gap: space.xl,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    gap: space.md,
  },
  sectionBody: {
    gap: space.sm,
  },
});
