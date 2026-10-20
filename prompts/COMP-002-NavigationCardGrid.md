# Prompt — NavigationCardGrid em React Native

Crie um componente reutilizável em React Native com TypeScript chamado `NavigationCardGrid`, em `src/components/ui/NavigationCardGrid.tsx`.

O componente deve organizar os `NavigationCard` existentes em uma grade responsiva de duas colunas.

## 1. Referências obrigatórias

- Leia `specs/02-dsign-system/tokens.md` e utilize seus tokens nas definições de design.
- Inspecione a implementação de `NavigationCard` e reutilize suas props e padrões.
- Siga as convenções de estilos, tema e exportação do projeto.
- Não duplique o código do NavigationCard.

## 2. Organização da grade

- Utilize duas colunas de mesma largura.
- Cada linha deve conter no máximo dois NavigationCard.
- Preencha os itens da esquerda para a direita e de cima para baixo.
- Alinhe horizontalmente os cards de cada linha e verticalmente as colunas.
- Se houver uma quantidade ímpar de itens, mantenha o último card na coluna esquerda, com a mesma largura dos demais.
- Utilize os tokens documentados para espaçamento entre linhas, colunas e padding.
- Calcule as larguras a partir do espaço disponível no contêiner, considerando padding e espaçamento entre colunas.
- Não utilize largura fixa baseada na tela do dispositivo, pois o componente pode estar dentro de um contêiner menor.
- Recalcule o layout quando a largura do contêiner mudar.

## 3. Altura e conteúdo

- Os dois cards de uma mesma linha devem ter a mesma altura, determinada pelo maior conteúdo daquela linha.
- Linhas diferentes podem ter alturas diferentes.
- Preserve a quebra de linha dos textos e o dimensionamento de fonte do sistema.
- Não sobreponha, corte ou estique imagens e ícones.
- Se necessário, adapte minimamente o NavigationCard para ocupar toda a largura e altura disponíveis na célula, preservando seu uso individual.

## 4. API

Defina e exporte:

- `NavigationCardGridItem`: props compatíveis com NavigationCard, acrescidas de `id: string`.
- `NavigationCardGridProps`, com:
  - `items: NavigationCardGridItem[]`
  - `style?: StyleProp<ViewStyle>`
  - `testID?: string`

Cada item deve fornecer seus próprios textos, imagem, ação e estados. Utilize `id` como chave estável.

## 5. Implementação

- Utilize elementos nativos do React Native e Flexbox.
- Para uma lista curta de opções de navegação, prefira um contêiner View com linhas de até dois cards.
- Deixe a rolagem sob responsabilidade da tela consumidora, permitindo uso dentro de uma ScrollView.
- Não adicione navegação diretamente à grade; encaminhe o onPress de cada item.
- Não adicione dependências sem necessidade.

## 6. Exemplos e validação

Crie um exemplo com cinco itens para demonstrar duas linhas completas e um último card à esquerda.

Verifique:

- Listas vazias e listas com 1, 2, 3 e 5 itens.
- Duas colunas de larguras iguais.
- Espaçamento consistente.
- Descrições de tamanhos diferentes.
- Cards da mesma linha com alturas iguais.
- Alteração da largura do contêiner.
- Encaminhamento de onPress, disabled e showChevron.

Entregue a implementação funcional, o exemplo de uso e informe quais verificações foram executadas.
