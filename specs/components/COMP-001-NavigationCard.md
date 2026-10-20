# COMP-001 — NavigationCard

## Finalidade e referências

Botão reutilizável de navegação com miniatura, título, descrição e chevron opcional.
A tela fornece `onPress`; o componente não conhece rotas, autenticação ou domínio.
Esta especificação registra o código atual e o compara ao
[prompt original](../../prompts/COMP-001-NavigationCard.md), preservado em `prompts/`.

Referência principal de design solicitada:
`specs/02-dsign-system/tokens.md`. **Esse caminho não existe no repositório.**
A documentação disponível é [specs/02-design-system/tokens.md](../02-design-system/tokens.md),
correspondente aos tokens efetivamente importados de `@/theme`. Os tokens têm
precedência sobre os valores visuais ilustrativos do prompt. Seus valores não são
repetidos aqui; não há imports ou tokens fictícios.

## Localização e dependências

- Implementação: [src/components/ui/NavigationCard.tsx](../../src/components/ui/NavigationCard.tsx).
- Exportação nomeada e interface: `@/components/ui`.
- Exemplo: [app/navigation-card-examples.tsx](../../app/navigation-card-examples.tsx).
- Testes: [navigation-card.test.tsx](../../tests/navigation-card.test.tsx),
  [navigation-card-grid.test.tsx](../../tests/navigation-card-grid.test.tsx) e
  [auth-navigation.test.tsx](../../tests/auth-navigation.test.tsx).

Usa Pressable, Image, View e StyleSheet do React Native, AppText e AppIcon existentes.
Inter e Material Symbols Rounded são carregados pelo layout raiz. Nenhuma
dependência adicional é necessária.

## Props implementadas

`NavigationCardProps` é uma interface exportada.

| Prop               | Tipo                 | Obrigatória / padrão             | Comportamento                              |
| ------------------ | -------------------- | -------------------------------- | ------------------------------------------ |
| title              | string               | Sim                              | Título do card                             |
| description        | string               | Sim                              | Descrição com quebra de linha              |
| thumbnail          | ImageSourcePropType  | Sim                              | Imagem local ou remota                     |
| onPress            | () => void           | Sim                              | Executado somente quando habilitado        |
| showChevron        | boolean              | Não / true                       | Remove o chevron e seu espaço quando false |
| disabled           | boolean              | Não / false                      | Bloqueia ação e anuncia indisponibilidade  |
| style              | StyleProp<ViewStyle> | Não                              | Aplicado após estilos base e de estado     |
| accessibilityLabel | string               | Não / `${title}. ${description}` | Nome do único botão acessível              |
| testID             | string               | Não                              | Identificador do Pressable                 |

Não são encaminhadas props arbitrárias de Pressable. Não há API de loading.
O consumidor pode sobrescrever estilos visuais, inclusive feedback de estados;
isso não remove o bloqueio funcional de `disabled`.

## Layout implementado

O card ocupa a largura disponibilizada pelo pai (`alignSelf: 'stretch'`), tem altura
mínima e cresce com o conteúdo, sem altura fixa ou posicionamento absoluto.
No layout horizontal, imagem e chevron não encolhem, o conteúdo central usa
`flex: 1` e `minWidth: 0`, e os elementos são centralizados verticalmente.
Os textos não têm limite de linhas; mantêm a escala de fonte do sistema.

Medidas locais específicas do componente, ainda sem tokens globais:

| Medida                       | Implementação                 |
| ---------------------------- | ----------------------------- |
| Miniatura                    | 56 × 56; resizeMode cover     |
| Chevron                      | size 20 e largura 20          |
| Altura mínima                | 88                            |
| Gap entre áreas              | 12                            |
| Gap entre título e descrição | 4                             |
| Limite de layout compacto    | Largura do card menor que 240 |

`onLayout` alterna para coluna abaixo desse limite: alinhamento à esquerda,
texto estendido à largura e `flex: 0`. Miniatura e chevron preservam dimensões.
Essa adaptação foi acrescentada para [COMP-002](COMP-002-NavigationCardGrid.md);
é uma diferença intencional em relação à organização sempre horizontal descrita
no prompt original. A partir do limite, o card volta ao layout horizontal.

## Estados, acessibilidade e tokens implementados

| Uso / estado        | Tokens e comportamento                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Default             | colors.surface e colors.border                                                            |
| Hover               | colors.surfaceHover e colors.borderHover, via eventos de ponteiro                         |
| Pressed             | colors.surfacePressed; não conserva a borda de hover                                      |
| Disabled            | colors.surfaceDisabled, opacity.disabled; Pressable disabled e guarda no callback         |
| Foco                | colors.borderFocus; indicação independente, aplicada após hover/pressed quando habilitado |
| Título              | typography.headingM via AppText; colors.textPrimary                                       |
| Descrição           | typography.bodyM via AppText; colors.textSecondary                                        |
| Chevron             | colors.textSecondary via AppIcon                                                          |
| Padding e contornos | spacing.md, borders.thin, radius.md; radius.sm na miniatura                               |
| Elevação            | shadows.card                                                                              |

Prioridade de superfície: disabled > pressed > hover > default. A borda de foco
prevalece quando habilitado. Nenhum valor de cor ou peso de fonte é duplicado no
componente; a família específica de Inter vem da variante de AppText.

O Pressable é acessível com role button e `accessibilityState.disabled`. O conteúdo
visual interno fica oculto da árvore de acessibilidade para evitar anúncios
duplicados; o rótulo pertence ao botão. A imagem e o chevron são decorativos.

## Exemplo de uso

```tsx
import { NavigationCard } from '@/components/ui';

export function DashboardOption({ onOpen }: { onOpen: () => void }) {
  return (
    <NavigationCard
      title="Dashboard"
      description="Acompanhe as leituras da competência."
      thumbnail={require('../assets/images/tabIcons/home.png')}
      onPress={onOpen}
    />
  );
}
```

O caminho de imagem acima considera um arquivo consumidor diretamente em `src/`;
ajuste o require relativo à localização real. Para testar a tela existente, execute
`npm start`, entre com `demo` / `Leitura123!` e toque **Exemplos de NavigationCard**
na Home. Rota autenticada: `/navigation-card-examples`. Há Dashboard, Relatórios
com descrição longa, Configurações sem chevron e um quarto card desabilitado;
ações distintas atualizam mensagem local.

## Situação e pendências

**Implementado:** API, callbacks, estilos por tokens, layout adaptativo, estados,
semântica acessível e tela de exemplos. Testes existentes exercitam mudanças de
texto/imagem, callback, bloqueio, rótulo customizado, chevron opcional, precedência
de estados, foco e mudança para layout compacto.

**Pendente de validação manual:** sombras e fontes em Android/iOS, TalkBack e
VoiceOver, navegação por teclado/ponteiro na web e geometria real com texto ampliado,
descrições longas e contêineres estreitos. Testes Jest não certificam esses aspectos.
Larguras arbitrariamente pequenas não têm fallback adicional além do empilhamento;
miniatura e padding continuam fixos. Imagens remotas não têm placeholder ou
tratamento de falha próprio, comportamento não solicitado pelo prompt.

**Pendência documental:** resolver o caminho inexistente `02-dsign-system`.
Não há token documentado necessário sem implementação entre os efetivamente usados.
