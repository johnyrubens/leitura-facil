# AUTH-001 — Ajustes consolidados da tela de Login

## Objetivo

Aplicar **em uma única tarefa** os ajustes visuais solicitados para a tela de Login do aplicativo **Leitura Fácil**, preservando o comportamento já implementado.

## Contexto e instruções iniciais

1. Ler `AGENTS.md` e inspecionar a implementação atual da rota de Login (`app/login.tsx` ou o caminho efetivamente utilizado pelo Expo Router).
2. Reutilizar os componentes e tokens criados no `DS-001`.
3. Confirmar que o recurso `assets/images/login-leitura-facil.png` existe antes de utilizá-lo. Caso não exista, informar o problema; não inventar outro arquivo ou imagem.
4. Não recriar o projeto, não refazer a autenticação e não instalar dependências sem necessidade.

## Ajuste 1 — Cabeçalho com imagem local

- Utilizar **`assets/images/login-leitura-facil.png`** como imagem do cabeçalho da tela de Login.
- Carregar por importação estática ou `require()` com caminho relativo correto para o arquivo da tela; não utilizar caminho absoluto do Windows.
- Preservar a proporção da imagem e adaptar sua apresentação à largura do dispositivo, sem distorção ou recorte indevido. Usar, conforme a implementação, `Image`/`ImageBackground`, `resizeMode="contain"` e dimensões calculadas a partir da proporção real do recurso.
- Evitar duplicar logotipo, título ou outros textos já incorporados à imagem.
- Manter o formulário abaixo do cabeçalho, com layout responsivo e tratamento adequado de Safe Area e teclado.

## Ajuste 2 — Ícones à esquerda dos campos

- Exibir o ícone **`person`** à esquerda do campo **Usuário**.
- Exibir o ícone **`lock`** à esquerda do campo **Senha**.
- Seguir a família **Material Symbols Rounded** definida no Design System, utilizando `AppIcon` e a biblioteca de ícones efetivamente configurada no projeto.
- Preferir a propriedade já existente de `AppInput` para ícone à esquerda. Se não existir, adicionar uma propriedade opcional reutilizável (por exemplo, `leftIcon`), sem quebrar a API atual.
- Centralizar os ícones verticalmente, utilizando o token **Neutral/600** (`#62748A`).
- Preservar o ícone à direita para **mostrar/ocultar senha**, bem como foco, erro e estado desabilitado dos inputs.

## Ajuste 3 — Fundo contínuo e formulário sem card

- A área **abaixo do cabeçalho** deve ter **fundo branco uniforme (`#FFFFFF`)**, integrado visualmente ao fundo branco da parte inferior da imagem.
- Remover do **contêiner externo do formulário**: borda, sombra, elevação, contorno e cantos arredondados que produzam aparência de card.
- Evitar diferença de tonalidade, faixa, linha divisória ou espaço de cor contrastante na transição entre cabeçalho e formulário.
- Manter os espaçamentos internos necessários para boa leitura e toque.
- **Não remover** as bordas individuais dos campos `AppInput`, nem alterar a aparência normal do botão Entrar.
- Não modificar globalmente `AppCard` ou outros componentes do Design System para resolver um problema exclusivo desta tela.

## Preservar funcionalidades existentes

- Validação do formulário com React Hook Form e Zod.
- Autenticação mock e navegação após sucesso.
- Exibição de erros, loading e prevenção de múltiplos envios.
- Alternância de visibilidade da senha.
- Acessibilidade, Safe Area, rolagem e uso com teclado aberto.

## Fora do escopo

- AWS Cognito e autenticação real.
- Biometria e recuperação real de senha.
- Mudanças em regras de negócio, banco de dados ou sincronização.
- Redesenho de outras telas.

## Critérios de aceitação

1. A imagem `login-leitura-facil.png` é exibida como cabeçalho, sem distorção.
2. Os campos Usuário e Senha exibem, respectivamente, `person` e `lock` à esquerda.
3. O controle de mostrar/ocultar senha continua funcionando à direita.
4. A área inferior e a transição com o cabeçalho apresentam fundo branco contínuo.
5. O formulário não tem contorno, borda, sombra, elevação ou aparência de card.
6. As bordas individuais dos inputs e o estilo do botão Entrar permanecem intactos.
7. A tela funciona em diferentes tamanhos de dispositivo e com o teclado aberto.
8. Validação, login mock, erros e navegação permanecem funcionando.
9. Verificações de TypeScript e lint não apresentam erros introduzidos pelos ajustes.

## Entrega esperada do Codex

- Listar os arquivos alterados.
- Explicar brevemente como foram implementados o cabeçalho, os ícones e o fundo contínuo.
- Executar as verificações disponíveis de TypeScript e lint e relatar os resultados reais.
- Informar eventuais limitações visuais ou diferenças em relação ao Figma.

## Comando para executar no Codex

> Execute os ajustes consolidados descritos em `prompts/AUTH-001-ajustes-consolidados-login.md`, seguindo `AGENTS.md`. Preserve a lógica atual de Login, reutilize o Design System, valide TypeScript e lint e informe os arquivos modificados.
