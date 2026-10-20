# Prompt — NavigationCard em React Native

Crie um componente reutilizável em React Native com TypeScript chamado **NavigationCard**, no estilo Card.

O componente representa um botão de navegação para outra tela de um aplicativo. Entregue o código funcional do componente e uma tela com exemplos de uso.

## Requisitos do projeto

- Antes de implementar, leia `specs/02-dsign-system/tokens.md`, referência principal para todas as definições de design, e inspecione os componentes existentes em `src/components/ui/`.
- Crie o componente em `src/components/ui/NavigationCard.tsx`.
- Utilize os tokens documentados em `specs/02-dsign-system/tokens.md` para cores, tipografia, espaçamentos, bordas, raios, sombras e estados de interação. Localize e reutilize as implementações desses tokens no código, seguindo o padrão de importação e de tema do projeto.
- Os tokens documentados nessa referência prevalecem sobre todos os valores visuais de exemplo deste prompt, inclusive os estados de interação. Quando houver diferenças, utilize os tokens correspondentes e informe o mapeamento adotado na entrega.
- Não duplique tokens nem crie um tema paralelo. Se algum token documentado não estiver implementado, informe a lacuna sem inventar imports, nomes ou exportações. Se algum valor necessário não tiver token correspondente documentado, siga a convenção do projeto e informe a lacuna.
- Preserve a organização e a forma de exportação dos componentes de UI do projeto.

## 1. Estrutura visual

Organize três áreas horizontalmente:

### Área esquerda — Imagem

- Dimensões: 56 × 56 unidades de layout do React Native.
- Cantos arredondados: 8.
- Utilize `Image` com `resizeMode="cover"`.
- Receba a imagem pela prop `thumbnail`, tipada como `ImageSourcePropType`, aceitando imagens locais e remotas.
- Mantenha as dimensões fixas, sem encolher.

### Área central — Conteúdo

- Título: tamanho 16, peso `"600"` e cor `#111827`.
- Descrição: tamanho 13, peso `"400"` e cor `#6B7280`.
- Espaçamento vertical entre título e descrição: 4.
- Utilize `flex: 1` e `minWidth: 0` no contêiner central.
- Permita que a descrição quebre linha e aumente a altura do card, sem sobrepor a imagem ou o ícone.
- Receba título e descrição por props.

### Área direita — Ícone

- Chevron Right com dimensões 20 × 20.
- Cor `#9CA3AF`.
- Alinhamento vertical centralizado e dimensões fixas.
- Exibição controlada pela prop `showChevron`.
- Reutilize a biblioteca de ícones do projeto. Se não houver uma, informe a dependência necessária e como instalá-la.

## 2. Estilo Card

- Fundo: `#FFFFFF`.
- Borda: espessura 1 e cor `#E5E7EB`.
- `borderRadius: 12`.
- Padding interno: 16.
- Espaçamento horizontal entre as áreas visíveis: 12.
- `minHeight: 88`.
- Largura adaptada ao contêiner pai.
- Altura automática conforme o conteúdo.
- Sombra discreta e compatível com iOS e Android, seguindo o padrão do projeto.

## 3. Layout responsivo

Utilize Flexbox do React Native:

- `flexDirection: "row"`.
- `alignItems: "center"`.
- Imagem e chevron com dimensões fixas.
- Conteúdo central flexível.
- Evite altura fixa e posicionamento absoluto.
- Quando o chevron estiver oculto, libere seu espaço para o conteúdo.
- Preserve o layout com descrições longas e tamanhos de fonte ampliados.

## 4. Estados de interação

Use `Pressable` para implementar:

- **Default:** fundo `#FFFFFF` e borda `#E5E7EB`.
- **Hover:** fundo `#F9FAFB` e borda `#D1D5DB`, nas plataformas com suporte a ponteiro.
- **Pressed:** fundo `#F3F4F6`.
- **Disabled:** opacidade 0.5 e bloqueio de `onPress`.

Prioridade dos estados: Disabled, Pressed, Hover e Default.

## 5. Props

Defina e exporte a interface `NavigationCardProps` com:

- `title: string`
- `description: string`
- `thumbnail: ImageSourcePropType`
- `onPress: () => void`
- `showChevron?: boolean`, padrão `true`
- `disabled?: boolean`, padrão `false`
- `style?: StyleProp<ViewStyle>`
- `accessibilityLabel?: string`
- `testID?: string`

Mantenha o componente independente da biblioteca de navegação. A tela consumidora deve fornecer a ação de navegação por `onPress`.

## 6. Acessibilidade

- Configure `accessibilityRole="button"`.
- Informe o estado desabilitado por `accessibilityState`.
- Utilize `accessibilityLabel` quando fornecido; caso contrário, componha o rótulo a partir do título e da descrição.
- Trate a miniatura e o chevron como decorativos para evitar leituras duplicadas.
- Permita o redimensionamento de texto conforme as preferências de acessibilidade do sistema.

## 7. Organização e exemplos

- Crie `src/components/ui/NavigationCard.tsx`, seguindo a solução de estilos e tema existente no projeto. Utilize `StyleSheet.create` quando compatível com esse padrão.
- Crie uma tela de exemplo com três cards: Dashboard, Relatórios e Configurações.
- Cada exemplo deve ter título, descrição, miniatura e ação próprios.
- Demonstre também um card desabilitado e um card sem chevron.
- Reutilize convenções, dependências e design system existentes no projeto.
- Não utilize elementos HTML, CSS de navegador ou bibliotecas exclusivas de React web.
- Não crie artefatos no Figma.

## 8. Validação e entrega

Verifique:

- Tipagem TypeScript.
- Alteração de título, descrição e imagem por props.
- Execução de `onPress` e seu bloqueio quando desabilitado.
- Aparência dos estados de interação.
- Adaptação a diferentes larguras e descrições longas.
- Funcionamento sem chevron.
- Compatibilidade dos estilos com iOS e Android.

Entregue o componente completo, a tela de exemplos e as instruções necessárias para executar. Informe quais verificações foram realmente realizadas e qualquer limitação encontrada.
