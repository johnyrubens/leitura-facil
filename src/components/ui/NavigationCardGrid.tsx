import { useState } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { spacing } from '@/theme';
import { NavigationCard, type NavigationCardProps } from './NavigationCard';

export interface NavigationCardGridItem extends NavigationCardProps {
  id: string;
}

export interface NavigationCardGridProps {
  items: NavigationCardGridItem[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function NavigationCardGrid({ items, style, testID }: NavigationCardGridProps) {
  const [contentWidth, setContentWidth] = useState<number>();
  const cellWidth =
    contentWidth === undefined ? undefined : Math.max(0, (contentWidth - spacing.md) / 2);
  const rows = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View
        onLayout={({ nativeEvent }) => setContentWidth(nativeEvent.layout.width)}
        style={styles.rows}
      >
        {rows.map((row) => (
          <View key={row[0].id} style={styles.row}>
            {row.map(({ id, style: cardStyle, ...cardProps }) => (
              <View
                key={id}
                style={[
                  styles.cell,
                  cellWidth !== undefined && { width: cellWidth, flexGrow: 0, flexBasis: 'auto' },
                ]}
              >
                <NavigationCard {...cardProps} style={[cardStyle, styles.card]} />
              </View>
            ))}
            {row.length === 1 && (
              <View
                style={[
                  styles.cell,
                  cellWidth !== undefined && { width: cellWidth, flexGrow: 0, flexBasis: 'auto' },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  rows: { gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'stretch', gap: spacing.md },
  cell: { flexGrow: 1, flexBasis: 0, minWidth: 0 },
  card: { flexGrow: 1, alignSelf: 'stretch' },
});
