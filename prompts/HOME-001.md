# HOME-001 — Tela Inicial | Leitura Fácil

## Objetivo
Implementar a tela inicial em `app/home.tsx`, utilizando React Native, Expo Router e TypeScript, os componentes reutilizáveis do DS-001 e a imagem de referência do painel Leitura Fácil — Água e Gás.

## Pré-requisitos
- BOOT-001, BASE-001 e DS-001 concluídos e validados (ou relatar precisamente o que falta antes de avançar).
- AUTH-001 com Login simulado, sessão e navegação protegida funcionando. Não depender de autenticação real para implementar esta interface demonstrativa.
- Ler `AGENTS.md`, `specs/03-features/DS-001.md`, as specs de COMP-001 e COMP-002 e a documentação em `specs/02-design-system/`.
- Inspecionar a Home provisória em `app/index.tsx`, `app/_layout.tsx`, o fluxo de Login e `src/stores/session.ts` antes de alterar a navegação.
- Consultar obrigatoriamente a referência visual [Painel Leitura Fácil — Água e Gás](../specs/03-features/AUTH-001-login/assets/Painel%20Leitura%20Fácil_%20Água%20e%20Gás.png).
- Localizar eventuais specs de HOME-001 e regras de domínio aprovadas. Na ausência delas, limitar a implementação aos dados demonstrativos e comportamentos descritos neste prompt; registrar dúvidas antes de implementar regras críticas.

## Escopo e ordem de execução
1. Inspecionar rotas, componentes, tokens, imagens, dependências e scripts disponíveis. Não recriar o projeto Expo.
2. Conferir as APIs reais de `AppScreen`, `AppText`, `AppButton`, `AppCard`, `AppIcon`, `NavigationCard` e `NavigationCardGrid`; reutilizar os componentes existentes.
3. Criar `app/home.tsx` e substituir a apresentação provisória da Home, preservando o fluxo de sessão, logout e acesso às telas de exemplos existentes. Manter `app/index.tsx` como entrada/redirecionamento coerente com o Expo Router, sem duplicar a tela.
4. Registrar a Home no grupo protegido existente e ajustar o destino após Login quando necessário. Não alterar o contrato da autenticação simulada nem criar outro store de sessão.
5. Implementar cabeçalho, resumo da competência, grade de atalhos, rotas do dia e navegação inferior conforme a referência e as adaptações responsivas abaixo.
6. Separar dados demonstrativos tipados da apresentação. Não consultar API, criar tabelas ou persistir informações fictícias como dados reais.
7. Verificar se `StatusBadge` e `ProgressBar` já existem. Se ainda ausentes, criar versões mínimas reutilizáveis, com props tipadas e acessibilidade, exportadas por `@/components/ui`, apenas para atender a esta tela.
8. Conectar ações somente a rotas existentes e pertinentes. Para destinos ainda não implementados, apresentar indisponibilidade de forma clara e acessível, sem criar telas vazias ou simular conclusão de operações.
9. Validar TypeScript, lint e testes disponíveis; informar resultados reais e limitações de inspeção visual.

## Interface e Design System
- Seguir a composição da imagem como modelo visual, usando Inter e tokens de `@/theme` para cores, espaçamentos, raios e tipografia.
- A moldura do telefone, relógio, ilha da câmera e indicadores do sistema pertencem ao mockup; não desenhá-los dentro do aplicativo.
- Usar componentes funcionais, sem transformar a imagem inteira em fundo ou substituir controles por recortes da referência.
- Priorizar Flexbox, Safe Area e rolagem. Evitar posicionamento absoluto na estrutura do conteúdo; permitir apenas em decoração que não prejudique leitura ou interação.
- Respeitar textos ampliados, telas estreitas, orientação e contraste. Adaptar a composição horizontal do resumo e das linhas de rota quando necessário, sem sobreposição ou truncamento de informações essenciais.
- Utilizar Material Symbols Rounded por meio de `AppIcon`, conferindo os nomes suportados. Não adicionar outra família de ícones.
- Reutilizar os tokens existentes. Cores decorativas ausentes, como o lilás da referência, devem ser aproximadas com tokens disponíveis; documentar diferenças visuais em vez de espalhar cores literais na tela.

### Cabeçalho
- Fundo azul com a identidade “Leitura Fácil” e subtítulo “ÁGUA E GÁS”. A ilustração de condomínios é decorativa e pode ser omitida caso não exista um asset adequado.
- Saudação com o nome disponível na sessão. O texto “Olá, Carlos” da referência é ilustrativo; não substituir o usuário autenticado por um nome fixo.
- Exibir função e rota, como “Leiturista – Rota Norte”, somente como informação demonstrativa identificada enquanto não houver fonte aprovada.
- Incluir ações de notificações e perfil, com nomes acessíveis e área de toque adequada. O contador “2” é dado demonstrativo, sem consulta ou envio real de notificações.
- Preservar uma ação de logout acessível, reutilizando o fluxo existente, sem apagar dados locais pendentes.

### Competência atual e progresso
- Card claro com ícone de calendário, título “Competência atual”, competência `10/2026`, badge “Em leitura” e período `01/10/2026 a 05/10/2026` no cenário demonstrativo da referência.
- Na área de progresso, exibir “Progresso das leituras”, barra, `78%` e “390 de 500 unidades lidas”.
- Esses valores representam um cenário fixo de demonstração, não a competência vigente nem a data atual do dispositivo. Identificar o painel como demonstrativo.
- Calcular o percentual a partir de lidas/total, evitando valores independentes inconsistentes. Com total zero, apresentar `0%`, sem divisão por zero.
- A barra recebe valor numérico limitado a uma faixa válida e expõe semântica acessível de progresso; apresentar também números e texto, sem depender apenas de cor.
- O badge é visual e não altera o estado da competência. Não implementar transições de competência ou prazos nesta tarefa.

### Atalhos principais
- Utilizar `NavigationCardGrid` com seis itens, nesta ordem:
  1. **Ler Água** — “Registrar leitura de medidores de água”.
  2. **Ler Gás** — “Registrar leitura de medidores de gás”.
  3. **Apartamentos** — “Listar e localizar unidades”.
  4. **Status das Competências** — “Acompanhar progresso e prazos”.
  5. **Conferência** — “Revisar e corrigir leituras”.
  6. **Configurações** — “Sincronização, preferências e suporte”.
- Manter duas colunas de mesma largura, alturas iguais por linha, chevrons e adaptação compacta já implementada no `NavigationCard`. Evitar duplicar padding entre a tela e a grade.
- Inspecionar os assets `assets/images/agua.svg`, `gas.svg`, `apartamentos.svg`, `status-competencias.svg`, `conferencia.svg` e `configuracoes.svg` antes de reutilizar.
- Conferir compatibilidade: `NavigationCard` recebe `ImageSourcePropType` e usa `Image` nativo; não presumir que um `require` de SVG será renderizado. Preferir assets raster locais compatíveis, derivados dos SVGs se necessário, ou documentar um ajuste mínimo fundamentado ao componente. Não introduzir dependência sem necessidade.
- Água e gás devem manter identificação visual coerente com os tokens `water500` e `gas500`. Imagens decorativas não devem gerar anúncios acessíveis duplicados.

### Minhas rotas de hoje
- Card com título “Minhas rotas de hoje”, ícone de localização/rota e duas linhas demonstrativas:
  - “Rota 01 – Bloco A e B”: `85 de 100 unidades`, progresso `85%`.
  - “Rota 02 – Bloco C”: `60 de 100 unidades`, progresso `60%`.
- Cada linha apresenta nome, barra, percentual, contagem e chevron conforme a referência, com composição adaptada à largura disponível.
- O título “de hoje” faz parte do modelo visual; identificar os registros como demonstrativos, sem alegar que foram atribuídos ao usuário na data atual.
- As duas rotas são um recorte ilustrativo, não o total da competência. Não somar esse recorte para calcular o indicador geral.
- Ações do título e das linhas seguem a regra de destinos existentes ou indisponibilidade explícita.

### Navegação inferior
- Exibir “Início”, “Apartamentos” e “Competências”, com ícones e indicação visual e acessível de “Início” selecionado.
- Respeitar a Safe Area inferior e evitar que a barra cubra o conteúdo rolável.
- Inspecionar a estrutura de navegação existente antes de escolher a composição. Não criar um segundo sistema de navegação nem uma reorganização ampla de rotas apenas para reproduzir o desenho.
- Itens sem destino implementado devem comunicar indisponibilidade, sem anunciar uma navegação que não ocorre. Tocar em “Início” mantém a Home.

## Regras dos dados e das ações
- Manter dados demonstrativos em módulo separado e tipado, distinguindo-os visualmente dos dados reais de sessão.
- Não usar Zustand como banco de competências, leituras ou rotas; usar o store existente apenas para a sessão e estado compartilhado de UI quando necessário.
- Não inventar contratos de API, autorização por perfil, regras de contagem de água/gás, seleção de condomínio ou competência vigente.
- Não apresentar dados fictícios como leituras sincronizadas, conferidas ou entregues. Não executar sincronização, exportação ou envio de e-mail.
- Se houver integração de dados já aprovada, respeitar seus contratos e estados de carregamento, vazio e erro; não introduzir integração real apenas para esta tela.
- Cobrir ausência de competência e lista vazia de rotas com mensagens claras, sem mostrar números fictícios como fallback silencioso.
- Preservar a proteção da Home: usuário sem sessão não acessa o painel; logout retorna ao Login e impede retorno ao conteúdo protegido.

## Organização sugerida (adaptar à estrutura real)
- `app/home.tsx` — tela inicial protegida.
- `app/index.tsx` — entrada/redirecionamento para a Home, preservando a proteção de sessão.
- `app/_layout.tsx` — registro da rota protegida, se necessário.
- `src/components/home/` — seções da Home, apenas quando a extração trouxer responsabilidade clara.
- `src/components/ui/StatusBadge.tsx` e `ProgressBar.tsx` — se necessários e ainda inexistentes; sem regras de domínio.
- `src/services/home/homeDemoData.ts` — dados demonstrativos tipados, sem acesso remoto ou persistência.
- Testes na estrutura existente em `tests/`, cobrindo apresentação, cálculos e navegação alterada.
- Não criar pastas vazias, formulários, schemas Zod ou novas camadas sem necessidade concreta.

## Critérios de aceitação
1. `app/home.tsx` abre no Expo após o Login simulado e permanece protegida contra acesso sem sessão.
2. A composição contém cabeçalho, competência/progresso, seis atalhos, rotas do dia e navegação inferior conforme a imagem, com adaptações documentadas.
3. Componentes e tokens existentes são reutilizados, inclusive `NavigationCard` e `NavigationCardGrid`, sem duplicação de implementações.
4. A saudação usa a sessão existente; os indicadores e rotas fictícios são identificados como demonstração.
5. Percentuais correspondem às contagens; total zero não gera erro e valores da barra permanecem na faixa válida.
6. Ausência de competência e de rotas produz estados vazios compreensíveis.
7. Os seis atalhos preservam ordem, textos e ações independentes; destinos ausentes comunicam indisponibilidade de forma acessível.
8. Notificações, perfil, rotas e navegação inferior não aparentam funcionalidades reais sem implementação correspondente.
9. Logout e acesso aos exemplos existentes continuam disponíveis; não há regressão no Login e na proteção de rotas.
10. Textos ampliados e contêineres estreitos não provocam sobreposição; todo conteúdo é alcançável por rolagem e a barra inferior respeita a Safe Area.
11. Botões têm nomes acessíveis; progresso e seleção são anunciados; imagens decorativas não duplicam a leitura e estados não dependem apenas de cor.
12. Testes pertinentes cobrem dados demonstrativos, percentuais, total zero, estados vazios, ações e proteção/navegação alterada. Não afirmar que Jest certifica geometria nativa.
13. Executar `npm run typecheck`, `npm run lint` e `npm test -- --watch=false`, além da verificação de formatação dos arquivos alterados e `git diff --check`; relatar os resultados reais.
14. Comparar visualmente com a referência e verificar Safe Area, textos ampliados e leitor de tela em dispositivo/emulador disponível; registrar precisamente o que não foi possível validar.

## Fora do escopo
- Autenticação real e novos serviços AWS.
- Backend, contratos de API, sincronização e novas tabelas de domínio.
- Cadastro de apartamentos, coleta e edição de leituras, cálculo de desvios e conferência real.
- Transições de competência, entrega, exportação Excel e envio de e-mail.
- Atribuição real de rotas, notificações, perfil e configurações completas.
- Criação de um novo Design System ou reformulação ampla da navegação.

## Entrega esperada do agente
- Resumo das alterações e lista de arquivos criados/modificados.
- Explicação da integração de `app/home.tsx` ao fluxo existente, incluindo Login, entrada e logout.
- Identificação dos dados demonstrativos, destinos disponíveis e ações ainda indisponíveis.
- Bibliotecas adicionadas, se houver, com justificativa; decisões sobre imagens e componentes reutilizados.
- Procedimento para abrir a Home e conferir o cenário demonstrativo.
- Resultado efetivo dos comandos de validação e testes executados.
- Divergências visuais em relação à referência, dúvidas de domínio e pendências de validação em dispositivo.
- Não declarar sucesso em verificações que não foram executadas.
