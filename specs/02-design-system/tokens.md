# Tokens

Valores implementados em `src/theme/`, importados de `@/theme`. Cores são strings;
dimensões numéricas usam unidades de layout do React Native, sem sufixo `px`.
Os nomes abaixo correspondem às exportações reais.

## Cores de base

`colors.ts` contém `palette` (estrutura histórica de `theme.colors`) e `colors`
(chaves planas usadas por AppText, AppIcon, AppCard e AppScreen). `ColorToken` é
`keyof typeof colors`. A paleta não precisa ser duplicada para criar aliases.

| `colors.*` | `theme.colors.*` | Valor   | Finalidade                              |
| ---------- | ---------------- | ------- | --------------------------------------- |
| primary050 | primary['050']   | #EAF4FF | Superfície de ação secundária           |
| primary500 | primary['500']   | #0D6EFD | Ação principal e foco                   |
| primary700 | primary['700']   | #064A7A | Texto de ação secundária/outline        |
| water500   | water['500']     | #1687F8 | Identificação de água                   |
| gas500     | gas['500']       | #FF7A00 | Identificação de gás                    |
| success050 | success['050']   | #E9F8EF | Fundo de sucesso                        |
| success500 | success['500']   | #16A05D | Indicador de sucesso                    |
| warning050 | warning['050']   | #FFF5DF | Fundo de atenção                        |
| warning500 | warning['500']   | #F59E0B | Indicador de atenção/revisão            |
| danger050  | danger['050']    | #FDECEC | Fundo de erro                           |
| danger500  | danger['500']    | #E53935 | Erro e borda inválida                   |
| neutral050 | neutral['050']   | #F5F8FC | Fundo de tela                           |
| neutral300 | neutral['300']   | #D9E2EC | Borda padrão                            |
| neutral600 | neutral['600']   | #62748A | Texto secundário e ícones               |
| neutral900 | neutral['900']   | #102A43 | Texto principal                         |
| white      | white            | #FFFFFF | Superfície e texto sobre ação principal |

## Cores semânticas

Disponíveis em `colors` e `theme.semanticColors`, que também contém as chaves
planas históricas acima. Para novos estilos, prefira o nome que descreve a função.

| Token           | Valor   | Origem/finalidade                             |
| --------------- | ------- | --------------------------------------------- |
| background      | #F5F8FC | neutral050; fundo da tela                     |
| surface         | #FFFFFF | white; cartões e campos                       |
| textPrimary     | #102A43 | neutral900; conteúdo principal                |
| textSecondary   | #62748A | neutral600; descrições, placeholders e ícones |
| textOnPrimary   | #FFFFFF | white; texto sobre ação principal             |
| border          | #D9E2EC | neutral300; borda padrão                      |
| borderHover     | #62748A | neutral600; borda sob ponteiro                |
| borderFocus     | #0D6EFD | primary500; foco                              |
| actionPrimary   | #0D6EFD | primary500; ação principal                    |
| surfaceHover    | #F5F8FC | neutral050; superfície sob ponteiro           |
| surfacePressed  | #EAF4FF | primary050; superfície pressionada            |
| surfaceDisabled | #F5F8FC | neutral050; superfície indisponível           |
| success         | #16A05D | success500; sucesso                           |
| warning         | #F59E0B | warning500; atenção                           |
| danger          | #E53935 | danger500; erro                               |

Aliases de hover/pressed são uma convenção para novos componentes de superfície.
Não alteram o feedback por opacidade que AppButton já utiliza. Cor de estado não
garante contraste adequado em qualquer combinação: conferir texto/fundo e evitar
usar indicadores claros como texto pequeno em branco. Comunicar estados também
por texto, ícone ou semântica acessível.

## Tipografia

`fonts` e `typography` vêm de `typography.ts`. As famílias são carregadas em
`app/_layout.tsx` antes das rotas.

| `fonts.*` | Família registrada | Peso do arquivo |
| --------- | ------------------ | --------------- |
| regular   | Inter_400Regular   | 400             |
| medium    | Inter_500Medium    | 500             |
| semibold  | Inter_600SemiBold  | 600             |
| bold      | Inter_700Bold      | 700             |

| `typography.*` | fontSize | Família (`fonts.*`) | Finalidade                               |
| -------------- | -------- | ------------------- | ---------------------------------------- |
| headingXL      | 24       | bold                | Título de tela                           |
| headingL       | 20       | bold                | Seção principal                          |
| headingM       | 16       | semibold            | Título de card                           |
| bodyL          | 16       | regular             | Corpo padrão de AppText e campos         |
| bodyM          | 14       | regular             | Descrição compacta                       |
| labelM         | 14       | medium              | Rótulos de campos                        |
| caption        | 12       | regular             | Texto auxiliar                           |
| readingNumber  | 32       | bold                | Leitura; fontVariant: ['tabular-nums']   |
| kpiNumber      | 28       | bold                | Indicador; fontVariant: ['tabular-nums'] |
| button         | 16       | semibold            | Rótulo de botão                          |

Os estilos satisfazem `Record<string, TextStyle>`; `TypographyVariant` é a união
das chaves. O peso é selecionado pela família específica, sem combinar um
`fontWeight` que provoque síntese ou seleção incorreta de fonte no Android/iOS.
Se um estilo futuro exigir fontWeight, usar valores aceitos por TextStyle, como
`'400'` e `'600'`. Não há lineHeight ou letterSpacing global definido; preservar
as métricas da fonte e a ampliação pelo sistema, sem alturas fixas para textos.

`theme.typography` mantém regular/medium/semibold/bold e os tamanhos legados
`title: 24`, `body: 16`. Não contém as variantes completas.

## Espaçamentos, raios e controles

| Token               | Valor | Finalidade                                         |
| ------------------- | ----- | -------------------------------------------------- |
| spacing.sm          | 8     | Gap compacto, padding vertical de controles        |
| spacing.md          | 16    | Padding de card/campo e gap padrão                 |
| spacing.lg          | 24    | Padding de tela/formulário e ícone padrão          |
| spacing.xl          | 32    | Separação ampla de seções                          |
| radius.sm           | 8     | Miniaturas e checkbox                              |
| radius.md           | 12    | Campos e botões                                    |
| radius.lg           | 16    | AppCard padrão                                     |
| radius.pill         | 999   | Formato cápsula                                    |
| theme.controlHeight | 50    | Altura mínima de campos, botões e alvos auxiliares |

`spacing` também está em `theme.spacing`; `radius` em `theme.radii`. Usar
`minHeight` em controles para acomodar texto ampliado. Zero para reset de layout,
`flex: 1`, proporções de imagens e dimensões específicas não são espaçamentos globais.

## Bordas e interação

Implementadas em `effects.ts`, exportadas individualmente e no objeto `theme`.

| Token            | Valor | Finalidade                                  |
| ---------------- | ----- | ------------------------------------------- |
| borders.none     | 0     | Sem contorno                                |
| borders.thin     | 1     | Contorno padrão; combinar com colors.border |
| opacity.disabled | 0.5   | Elemento indisponível; também bloquear ação |
| opacity.pressed  | 0.8   | Feedback por opacidade, como no botão atual |

## Sombras

`shadows` satisfaz `Record<string, ViewStyle>`. Aplicar por spread em um estilo,
por exemplo `{ ...shadows.card }`; não é string CSS.

| Propriedade   | shadows.none            | shadows.card            |
| ------------- | ----------------------- | ----------------------- |
| shadowColor   | #102A43                 | #102A43                 |
| shadowOffset  | { width: 0, height: 0 } | { width: 0, height: 2 } |
| shadowOpacity | 0                       | 0.08                    |
| shadowRadius  | 0                       | 4                       |
| elevation     | 0                       | 2                       |

`none` remove elevação/sombra ao sobrescrever um estilo. `card` é a nova opção
discreta sugerida pela referência NavigationCard; não é aplicada automaticamente
ao AppCard. iOS usa shadowColor/Offset/Opacity/Radius; Android usa elevation
(shadowColor pode variar por versão). A aparência não é idêntica entre plataformas
e ainda requer inspeção nativa. Evitar `overflow: 'hidden'` no contêiner da sombra;
recortar miniaturas em uma View interna. Não há token de sombra web específico.
