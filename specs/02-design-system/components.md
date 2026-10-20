# Componentes reutilizáveis

Implementar em `src/components/ui/`, um arquivo PascalCase por componente, com
interface de props exportada e exportação nomeada no `index.ts`. Importar de
`@/components/ui` e usar tokens de `@/theme`. Usar React Native e StyleSheet.create;
aceitar `StyleProp<ViewStyle>`/`StyleProp<TextStyle>` ou props nativas apropriadas.
Aplicar o estilo do consumidor após os defaults, preservando invariantes funcionais.

Componentes de UI não fazem HTTP, acesso SQLite, autenticação ou decisões de
domínio. Recebem dados e callbacks; a tela decide navegação e os serviços tratam
regras. Não adicionar biblioteca de estilo ou duplicar componentes para cada campo.

## Inventário implementado

| Componente  | Convenção e defaults atuais                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| AppText     | variant bodyL, color neutral900; aceita variantes, ColorToken, align e TextProps                                            |
| AppButton   | label, variant primary/secondary/outline, loading e PressableProps; altura mínima 50, raio 12                               |
| AppInput    | label visível, value/onChangeText/onBlur controlados; type text/email/number/password; error, disabled e leftIcon opcionais |
| AppCheckbox | checked e onChange controlados; label; área com altura mínima 50 e caixa visual 24                                          |
| AppCard     | View não interativa; padding md (16), background white, rounded lg (16); sem borda/sombra automática                        |
| AppScreen   | Safe Area em todas as bordas; fundo neutral050, padding lg (24), gap md (16); scrollable false, avoidKeyboard true          |
| AppIcon     | Material Symbols Rounded local; name tipado, tamanho padrão 24, color neutral600; decorativo sem accessibilityLabel         |

`NavigationCard` está implementado: botão de navegação com miniatura, título,
descrição, chevron opcional e estados default/hover/pressed/disabled/foco. Reutiliza
os tokens semânticos; consulte [COMP-001](../03-features/COMP-001.md).

`NavigationCardGrid` organiza esses cards em duas colunas, com padding e gaps md,
altura igual por linha e último item ímpar à esquerda. Não contém rolagem ou
navegação. NavigationCard empilha seu conteúdo abaixo de 240 de largura para
acomodar células estreitas; consulte [COMP-002](../03-features/COMP-002.md).

`AppDateInput`, `StatusBadge` e `ProgressBar` não estão
implementados. Criá-los somente na feature que os solicitar. Datas devem usar
AppDateInput com DateTimePicker nativo quando essa implementação for necessária.

## Estados atuais

| Componente              | Comportamento implementado                                                                                                                                                                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AppButton               | Primary azul com texto branco; secondary azul claro com texto primary700; outline branco com borda azul e texto primary700. Pressed: opacidade 0.8. Disabled ou loading: opacidade 0.5 e ação bloqueada. Loading mantém label, mostra ActivityIndicator e anuncia busy |
| AppInput                | Default: fundo branco, borda neutral300. Preenchido: neutral600. Foco: primary500. Erro prevalece sobre foco: danger500 e mensagem. Disabled ou editable=false: fundo neutral050, opacidade 0.5 e edição bloqueada; erro pode continuar visível                        |
| AppCheckbox             | Marcado: fundo/borda primary500 e check branco; desmarcado: borda neutral600. Disabled: opacidade 0.5 e ação bloqueada. O pai confirma a mudança de checked                                                                                                            |
| AppCard/AppText/AppIcon | Sem estado interativo próprio                                                                                                                                                                                                                                          |
| AppScreen               | Gerencia rolagem e teclado; não gerencia loading/erro da feature                                                                                                                                                                                                       |

AppInput configura teclado, não converte nem valida número. Senha começa oculta e
oferece botão Mostrar/Ocultar senha. RHF/Zod ficam no formulário; integrar via
Controller, sem acoplar AppInput a uma biblioteca de formulário.

## Convenções para novos componentes interativos

- Usar Pressable e props disabled/loading quando fizerem sentido. Bloquear callback
  além de alterar a aparência; anunciar disabled e busy em accessibilityState.
- Para cards de ação, usar surface/border no default; surfaceHover/borderHover
  quando houver suporte a ponteiro; surfacePressed ao pressionar. Prioridade:
  disabled, pressed, hover, default. Esses estados ainda não foram adicionados aos
  componentes existentes.
- Manter indicação de foco para teclado, independente do hover. Em campos, reutilizar
  borderFocus e preservar indicação de erro. Verificar suporte de foco na plataforma.
- Loading não deve remover o rótulo nem permitir submissões repetidas. Erros devem
  ter mensagem compreensível e permitir recuperação conforme a spec da feature.
- Listas e telas tratam vazio, carregamento e falha explicitamente quando aplicável;
  não confundir ausência de dados com erro. Não colocar regras de sincronização na UI.

## Layout e acessibilidade

- Preferir Flexbox, gaps e padding da escala. Conteúdo central flexível usa flex: 1
  e minWidth: 0; textos podem quebrar linha. Evitar alturas fixas e posicionamento
  absoluto em formulários. Miniaturas podem ter dimensão fixa e flexShrink: 0.
- Usar AppScreen para Safe Area, rolagem e teclado. Ajustes de edges e
  keyboardVerticalOffset dependem da tela; testar campos com teclado aberto.
- Preservar ampliação de texto do sistema. AppIcon desativa a ampliação apenas do
  glifo decorativo; não copiar essa opção para texto de conteúdo.
- Dar role e nome acessível às ações. Usar accessibilityState checked em checkbox,
  disabled em indisponíveis e busy em carregamento. Títulos de seção podem usar
  accessibilityRole="header". Erros usam alert e live region quando suportado.
- Labels de campos devem ser visíveis; placeholder não substitui label. AppInput
  inclui o erro no accessibilityHint e mostra mensagem acessível. Senhas mantêm
  valor ao alternar visibilidade e o botão tem nome que descreve a próxima ação.
- Alvos de toque novos devem ter ao menos 50 de altura e largura útil equivalente;
  ampliar a área de ícones pequenos sem ampliar obrigatoriamente o desenho.
- Não comunicar estado só pela cor. Conferir contraste e legibilidade da combinação
  real, inclusive estado desabilitado. REVIEW é exibido como **Revisar**.
- Ícones/miniaturas decorativos não devem gerar leituras duplicadas. Um card acionável
  deve anunciar título e descrição juntos, aceitar accessibilityLabel e receber onPress
  da tela, sem depender do Expo Router internamente.

## Validação proporcional

Executar typecheck e lint. Para mudanças de comportamento, exercitar callbacks,
bloqueio de ações, estados acessíveis e controle de valores com testes pertinentes.
Os testes existentes em `tests/design-system.test.tsx` cobrem senha, foco/erro,
loading/disabled, checkbox controlado e renderização dos contêineres.

Testes Jest não certificam aparência nativa. Validar em Android/iOS as fontes,
sombras, leitor de tela, teclado, textos longos/ampliados e diferentes larguras;
em web, verificar também ponteiro e foco. Esta preparação de documentação e tokens
não inclui essa inspeção visual nem refatoração das telas.
