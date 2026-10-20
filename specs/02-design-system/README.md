# Design System — Leitura Fácil

Base para novos componentes React Native. A fonte de verdade dos valores é
[`src/theme/`](../../src/theme/); consulte [tokens](tokens.md) e
[convenções de componentes](components.md). Não há ThemeProvider obrigatório.

## Inspeção e decisões

O projeto já possui tema tipado, `StyleSheet.create`, Inter e componentes em
`src/components/ui/`. Login e Home provisória reutilizam essa estrutura. Foram
consultados AGENTS.md, DS-001, AUTH-001, ADR-001, dependências, rotas, componentes,
estilos, fontes e os prompts do NavigationCard.

Expo 57, React Native 0.86, TypeScript strict, Expo Router e
react-native-safe-area-context sustentam a interface. Inter vem de
@expo-google-fonts/inter e é carregada com expo-font no layout raiz. AppIcon usa
Material Symbols Rounded local em todas as plataformas; essa decisão de DS-001
detalha a uniformização prevista na ADR-001. Não é necessário instalar biblioteca
de estilos, fontes ou ícones para utilizar esta base.

Preservamos a paleta azul, fundos claros, texto azul-escuro, espaçamentos 8/16/24/32,
raios 8/12/16/999 e controles com altura mínima 50 já implementados. O Login usa
fundo branco e formulário sem card; AppCard é branco, raio 16, sem sombra ou borda
automáticas. Não existe tema escuro implementado.

Foram acrescentados aliases semânticos, espessuras de borda, opacidades e estilos de
sombra ao mesmo tema, sem alterar telas ou os defaults dos componentes.

## Referência NavigationCard

`NavigationCard-React-Native.md` (arquivo externo aberto no IDE) e sua cópia no
repositório, [`prompts/COMP-001-NavigationCard.md`](../../prompts/COMP-001-NavigationCard.md),
foram consultados como referência, não como solicitação de implementação do card.
Os tokens existentes têm prioridade:

| Referência                                              | Decisão para novos componentes                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------- |
| Fundo branco, padding 16, raio 12, miniatura com raio 8 | `surface`, `spacing.md`, `radius.md`, `radius.sm`                    |
| Título 16/600, #111827                                  | `typography.headingM`, `textPrimary` (#102A43)                       |
| Descrição 13/400, #6B7280                               | `typography.bodyM` (14/400), `textSecondary` (#62748A)               |
| Chevron #9CA3AF                                         | `textSecondary` (#62748A)                                            |
| Borda #E5E7EB e hover #D1D5DB                           | `border` (#D9E2EC), `borderHover` (#62748A)                          |
| Hover #F9FAFB e pressed #F3F4F6                         | `surfaceHover` (#F5F8FC), `surfacePressed` (#EAF4FF)                 |
| Disabled 0.5, borda 1                                   | `opacity.disabled`, `borders.thin`                                   |
| Sombra discreta sem valores definidos                   | Novo `shadows.card`: offset 0/2, opacidade 0.08, raio 4, elevation 2 |

Dimensões específicas de imagem 56, chevron 20, altura mínima 88 e gaps 4/12 são
medidas locais do NavigationCard, não tokens globais. O componente e a tela de
exemplos estão documentados em [COMP-001](../03-features/COMP-001.md).

## Uso

```tsx
import { StyleSheet } from 'react-native';
import { AppCard, AppText } from '@/components/ui';
import { colors, spacing, radius, borders, shadows } from '@/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: borders.thin,
    borderColor: colors.border,
    ...shadows.card,
  },
});

export function Summary() {
  return (
    <AppCard style={styles.card}>
      <AppText variant="headingM" color="textPrimary">
        Resumo
      </AppText>
      <AppText color="textSecondary">Leituras da competência</AppText>
    </AppCard>
  );
}
```

O alias `@/` aponta para `src/`. As exportações individuais são as mesmas instâncias
usadas pelo objeto `theme`: `theme.spacing`, `theme.radii`, `theme.semanticColors`,
`theme.borders`, `theme.opacity` e `theme.shadows`. A paleta histórica continua em
`theme.colors.primary['500']`, por exemplo. `theme.typography` é um resumo legado;
use `typography` para estilos de texto completos.

Para evoluir, inspecione primeiro a spec da feature e os componentes existentes.
Adicione valores apenas em `src/theme/` e atualize a tabela correspondente nesta
documentação. Não replique a paleta nas telas. Valide com `npm run typecheck`,
`npm run lint` e `npm test -- --watch=false`; valide também em dispositivo quando
houver mudanças visuais ou de interação.
