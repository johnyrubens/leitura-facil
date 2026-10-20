# COMP-002 — NavigationCardGrid

## Finalidade e referências

Organizar uma lista curta de opções em duas colunas iguais, reutilizando
[NavigationCard](COMP-001-NavigationCard.md). A grade não implementa navegação,
rolagem ou regras de domínio. Esta especificação registra a implementação e o
[prompt original](../../prompts/COMP-002-NavigationCardGrid.md), preservado em `prompts/`.

Referência principal de design solicitada: `specs/02-dsign-system/tokens.md`.
**O caminho não existe no repositório.** A referência disponível e consistente com
o código é [specs/02-design-system/tokens.md](../02-design-system/tokens.md).
Reutilizar seus tokens implementados em `@/theme`; seus valores não são duplicados
nesta especificação. Não criar imports para tokens inexistentes.

## Localização

- Implementação: [src/components/ui/NavigationCardGrid.tsx](../../src/components/ui/NavigationCardGrid.tsx).
- Exportações nomeadas: `NavigationCardGrid`, `NavigationCardGridProps` e
  `NavigationCardGridItem`, disponíveis em `@/components/ui`.
- Exemplo: [app/navigation-card-grid-examples.tsx](../../app/navigation-card-grid-examples.tsx).
- Testes: [navigation-card-grid.test.tsx](../../tests/navigation-card-grid.test.tsx)
  e [auth-navigation.test.tsx](../../tests/auth-navigation.test.tsx).

Usa View, StyleSheet, onLayout e estado local de largura. Não adiciona dependências
nem duplica a implementação de NavigationCard.

## API implementada

| NavigationCardGridProps | Tipo                     | Obrigatória / padrão | Comportamento                                      |
| ----------------------- | ------------------------ | -------------------- | -------------------------------------------------- |
| items                   | NavigationCardGridItem[] | Sim                  | Ordem de apresentação; pode ser vazia              |
| style                   | StyleProp<ViewStyle>     | Não                  | Estilo do contêiner externo, após o padding padrão |
| testID                  | string                   | Não                  | Identificador do contêiner externo                 |

`NavigationCardGridItem extends NavigationCardProps` acrescenta `id: string`
obrigatório. Cada item fornece título, descrição, imagem e callback; também aceita
disabled, showChevron, style, accessibilityLabel e testID do card. Consulte a
[tabela completa de props](COMP-001-NavigationCard.md#props-implementadas).

`id` deve ser único e estável; a implementação o usa como chave do item e usa o id
do primeiro item como chave da linha. Não há validação de IDs duplicados.
Os demais campos são encaminhados ao card. O style do item é seguido por
`flexGrow: 1` e `alignSelf: 'stretch'` da grade, que prevalecem nesses atributos;
demais overrides continuam sob responsabilidade do consumidor.

## Layout implementado

- Itens são agrupados em Views de até dois cards, da esquerda para a direita e de
  cima para baixo. Não há virtualização, ScrollView ou FlatList internos.
- Padding externo, gap entre linhas e gap entre colunas usam `spacing.md`.
- O onLayout da View interna mede a largura após o padding do contêiner, incluindo
  alterações via style. A largura da célula é
  `Math.max(0, (larguraInterna - spacing.md) / 2)`.
- Antes da primeira medição, células usam flexGrow e flexBasis para dividir o espaço
  igualmente. Após medir, recebem largura calculada, flexGrow 0 e flexBasis auto.
  Mudanças de largura atualizam o estado e o cálculo, sem consultar a tela do aparelho.
- Uma célula vazia à direita mantém a largura do último card em listas ímpares.
  A lista vazia não renderiza linhas nem cards, mas mantém o padding externo.
- Linhas usam alignItems stretch; cards usam flexGrow para preencher a altura da
  célula. O maior conteúdo determina a altura da linha; linhas distintas não
  compartilham altura. Não há altura fixa ou medição manual de altura.
- NavigationCard alterna seu conteúdo para coluna em células estreitas conforme
  seu próprio onLayout; imagens e ícones não são redimensionados pela grade.

O consumidor deve disponibilizar largura útil aos cards e não impor alturas ou
larguras incompatíveis via style de item. A fórmula protege contra larguras
negativas, mas não garante conteúdo legível em contêineres arbitrariamente pequenos.

## Estados, tokens e acessibilidade

A grade não possui estado global de hover, foco, pressed, disabled ou loading.
Os estados de interação e o nome acessível são individuais e vêm do NavigationCard.
O único estado interno da grade é a largura medida.

O token diretamente importado é `spacing.md`, para padding e ambos os gaps.
Cores, tipografia, bordas, raios, sombras e opacidade são reutilizados pelo card;
consulte [os tokens do NavigationCard](COMP-001-NavigationCard.md#estados-acessibilidade-e-tokens-implementados).
A grade não agrupa todos os itens em um único elemento acessível; cada card
continua sendo um botão com rótulo e estado próprios.

## Exemplo de uso

```tsx
import { AppScreen, NavigationCardGrid, type NavigationCardGridItem } from '@/components/ui';

export function Menu({ onSelect }: { onSelect: (id: string) => void }) {
  const items: NavigationCardGridItem[] = [
    { id: 'dashboard', title: 'Dashboard', description: 'Resumo das leituras.' },
    { id: 'reports', title: 'Relatórios', description: 'Consulte os resultados da competência.' },
    { id: 'settings', title: 'Configurações', description: 'Preferências de uso.' },
    { id: 'delivery', title: 'Entrega', description: 'Opção indisponível.' },
    { id: 'help', title: 'Ajuda', description: 'Orientações para a coleta.' },
  ].map((item) => ({
    ...item,
    thumbnail: require('../assets/images/tabIcons/home.png'),
    onPress: () => onSelect(item.id),
    disabled: item.id === 'delivery',
    showChevron: item.id !== 'settings',
  }));

  return (
    <AppScreen scrollable>
      <NavigationCardGrid items={items} />
    </AppScreen>
  );
}
```

O require relativo acima considera um consumidor diretamente em `src/`; ajustar
conforme a localização real. Para abrir o exemplo implementado, executar
`npm start`, entrar com `demo` / `Leitura123!` e tocar
**Exemplos de NavigationCardGrid** na Home. Rota autenticada:
`/navigation-card-grid-examples`.

A tela possui cinco itens, descrição longa, um desabilitado e um sem chevron;
callbacks atualizam mensagens locais. **Reduzir contêiner** alterna a largura
entre a disponível e uma fração dela; **Usar largura disponível** restaura o espaço.
A rolagem é fornecida por AppScreen na tela, não pela grade.

## Situação e pendências

**Implementado:** interfaces, exportações, reutilização do card, duas colunas,
ordem, reserva da célula vazia, cálculo por contêiner, atualização de largura,
estrutura Flexbox para alturas iguais e exemplo de cinco itens acessível pela Home.

**Coberto pelos testes existentes:** listas com 0, 1, 2, 3 e 5 itens; estrutura de
linhas/células, largura calculada para dois tamanhos, callback, disabled,
showChevron, rótulo acessível, layout compacto do card e navegação até o exemplo.
As asserções de estilo não equivalem à medição da geometria renderizada.

**Pendente de validação manual:** igualdade efetiva das alturas por linha,
alinhamento entre colunas, fontes ampliadas, descrições longas e imagens em
Android/iOS e web, além de leitor de tela e teclado. Não foi feita inspeção visual
nativa. Acessibilidade e tokens de interação são herdados do card e mantêm as
pendências de validação descritas em COMP-001.

**Pendência documental:** resolver o caminho inexistente `02-dsign-system`.
Não há token documentado necessário sem implementação entre os efetivamente usados.
