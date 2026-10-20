import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet, View } from 'react-native';
import {
  NavigationCard,
  NavigationCardGrid,
  type NavigationCardGridItem,
} from '../src/components/ui';
import { spacing } from '../src/theme';

const makeItems = (count: number): NavigationCardGridItem[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Opção ${index}`,
    description: index === 1 ? 'Uma descrição longa que pode ocupar várias linhas.' : 'Resumo.',
    thumbnail: require('../assets/images/icon.png'),
    onPress: jest.fn(),
    testID: `card-${index}`,
  }));

test.each([0, 1, 2, 3, 5])(
  'organiza %i itens em linhas de duas células sem expandir o último',
  (count) => {
    const result = render(<NavigationCardGrid items={makeItems(count)} testID="grid" />);
    expect(screen.queryAllByRole('button')).toHaveLength(count);
    const root = result.UNSAFE_getAllByType(View).find((node) => node.props.testID === 'grid')!;
    const rows = root.findAllByType(View).filter((node) => {
      const style = StyleSheet.flatten(node.props.style);
      return style?.flexDirection === 'row' && style.alignItems === 'stretch';
    });
    expect(rows).toHaveLength(Math.ceil(count / 2));
    for (const row of rows) {
      const cells = row
        .findAllByType(View)
        .filter((node) => StyleSheet.flatten(node.props.style)?.flexBasis === 0);
      expect(cells).toHaveLength(2);
      expect(StyleSheet.flatten(row.props.style)).toMatchObject({
        alignItems: 'stretch',
        gap: spacing.md,
      });
    }
  },
);

test('recalcula largura pelo conteúdo interno e encaminha props e ações individuais', () => {
  const items = makeItems(3);
  items[1].disabled = true;
  items[2].showChevron = false;
  items[2].accessibilityLabel = 'Abrir terceiro';
  const result = render(<NavigationCardGrid items={items} testID="grid" />);
  const layoutView = result
    .UNSAFE_getAllByType(View)
    .find((node) => typeof node.props.onLayout === 'function' && !node.props.testID)!;

  for (const width of [640, 320]) {
    fireEvent(layoutView, 'layout', { nativeEvent: { layout: { width, height: 0, x: 0, y: 0 } } });
    const cells = result
      .UNSAFE_getAllByType(View)
      .filter((node) => StyleSheet.flatten(node.props.style)?.flexBasis === 'auto');
    expect(cells).toHaveLength(4);
    cells.forEach((cell) =>
      expect(StyleSheet.flatten(cell.props.style).width).toBe((width - spacing.md) / 2),
    );
  }

  fireEvent.press(screen.getByTestId('card-0'));
  expect(items[0].onPress).toHaveBeenCalledTimes(1);
  fireEvent.press(screen.getByTestId('card-1'));
  expect(items[1].onPress).not.toHaveBeenCalled();
  expect(screen.getByTestId('card-1')).toBeDisabled();
  fireEvent.press(screen.getByRole('button', { name: 'Abrir terceiro' }));
  expect(items[2].onPress).toHaveBeenCalledTimes(1);
  expect(screen.getAllByText('\ue5cc', { includeHiddenElements: true })).toHaveLength(2);
  const cards = result.UNSAFE_getAllByType(NavigationCard);
  cards.forEach((card) => expect(StyleSheet.flatten(card.props.style).flexGrow).toBe(1));
});

test('card estreito empilha conteúdo sem alterar dimensões da miniatura e volta ao layout horizontal', () => {
  const result = render(<NavigationCard {...makeItems(1)[0]} />);
  for (const [width, direction] of [
    [160, 'column'],
    [400, 'row'],
  ] as const) {
    fireEvent(screen.getByTestId('card-0'), 'layout', {
      nativeEvent: { layout: { width, height: 0, x: 0, y: 0 } },
    });
    const contents = result
      .UNSAFE_getAllByType(View)
      .find((node) => node.props.accessibilityElementsHidden)!;
    expect(StyleSheet.flatten(contents.props.style).flexDirection).toBe(direction);
  }
});
