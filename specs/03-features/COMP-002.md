# COMP-002 — NavigationCardGrid

Implementação de `prompts/COMP-002-NavigationCardGrid.md`. O caminho obrigatório
`specs/02-dsign-system/tokens.md` não existe; utilizada a documentação real
`specs/02-design-system/tokens.md` e as exportações existentes em `@/theme`.

## API e comportamento

`NavigationCardGridItem` estende `NavigationCardProps` com `id: string` estável e
único. `NavigationCardGridProps` recebe `items: NavigationCardGridItem[]`, `style`
e `testID` opcionais. Exportações disponíveis em `@/components/ui`.

A grade usa Views com linhas de dois itens, na ordem de entrada, e espaçamento e
padding `spacing.md` (16). O onLayout mede o conteúdo interno, já descontando o
padding (inclusive overrides do consumidor). Cada célula mede
`(larguraInterna - spacing.md) / 2`. Uma célula vazia reserva a coluna direita na
última linha ímpar. Sem itens, não há cards nem linhas. O contêiner mantém padding.

Linhas usam alignItems stretch e os cards flexGrow 1 para preencher células com
a altura do maior conteúdo daquela linha, sem fixar altura ou compartilhar a
altura entre linhas. Antes da primeira medição, Flexbox distribui as duas células
igualmente. Mudanças do contêiner provocam nova medição, sem usar a largura da tela.

NavigationCard mantém a API e o layout horizontal em larguras a partir de 240.
Abaixo desse limite local, seu conteúdo é empilhado, preservando miniatura 56,
chevron 20, textos completos e fontes ampliadas. Essa adaptação evita sobreposição
nas células estreitas e também beneficia seu uso individual. O valor 240 é uma
decisão de layout local, não um token global. Nenhum token documentado precisou
ser inventado ou implementado. Os estilos de preenchimento da célula prevalecem
sobre flexGrow/alignSelf do style de cada item.

A grade não rola nem navega; callbacks, estados e props são encaminhados ao card.
Nenhuma dependência foi adicionada.

## Exemplo

Executar `npm start`, abrir no Expo e entrar com `demo` / `Leitura123!`.
Na Home, tocar **Exemplos de NavigationCardGrid**. A rota autenticada
`/navigation-card-grid-examples` mostra cinco itens: duas linhas completas e o
quinto à esquerda, incluindo descrição longa, disabled e showChevron false.
As ações atualizam uma mensagem local sem alterar dados de domínio.
**Reduzir contêiner** alterna 100%/85% da largura disponível, demonstrando que a
grade responde ao contêiner. A tela usa AppScreen scrollable.

## Validação

Critérios: listas com 0/1/2/3/5 itens, ordem, células de mesma largura, último item
sem expansão, gaps/padding por tokens, atualização de largura, altura igual por
linha, descrição longa, ações independentes, disabled e chevron opcional.

Os testes automatizados verificam estrutura Flexbox, cálculo para duas larguras,
encaminhamento de props/ações, layout compacto e acesso ao exemplo pela Home.
Jest não calcula geometria nativa: igualdade visual das alturas, fontes ampliadas,
imagens e sombras ainda precisam de inspeção Android/iOS e web em várias larguras.

Verificações executadas: `npm run typecheck`, `npm run lint`,
`npm test -- --watch=false` (8 suítes, 24 testes passaram), Prettier nos arquivos
alterados e `git diff --check`. O Expo foi iniciado offline para regenerar os tipos
de rotas. Não foi realizada inspeção visual em dispositivo ou navegador.
