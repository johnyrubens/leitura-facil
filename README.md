# Leitura Fácil - versão beta

Aplicativo móvel destinado à coleta, conferência e sincronização de leituras de medidores de água e gás em condomínios.
Priorizar confiabilidade dos dados, operação em campo, acessibilidade, desempenho, simplicidade da interface e rastreabilidade das alterações.
Aplicação assistida por IA codex SSD

## Prototipos Telas

<p align="center">
  <img src="./specs/03-features/AUTH-001-login/assets/login-reference.png" alt="Tela de login" width="180">
  &nbsp;&nbsp;&nbsp;
  <img src="./specs/03-features/AUTH-001-login/assets/Painel%20Leitura%20Fácil_%20Água%20e%20Gás.png" alt="Painel de água e gás" width="180">
  &nbsp;&nbsp;&nbsp;
  <img src="./specs/03-features/AUTH-001-login/assets/Painel%20de%20Competência%20em%20Leitura.png" alt="Painel de competência" width="180">
  &nbsp;&nbsp;&nbsp;
  <img src="./specs/03-features/AUTH-001-login/assets/Listagem%20apartamentos.png" alt="Listagem de apartamentos" width="180">
  &nbsp;&nbsp;&nbsp;
  <img src="./specs/03-features/AUTH-001-login/assets/Apontamento%20dos%20consumos.png" alt="Apontamento dos consumos" width="180">
</p>

## Tecnologias

- React Native — desenvolvimento do aplicativo móvel.
- Expo — ferramentas para desenvolvimento e distribuição do aplicativo.
- SQLite — armazenamento local de dados.
- AWS — serviços de infraestrutura em nuvem.

## Desenvolvimento assistido por IA

- Codex — apoio à implementação, revisão e manutenção do código.

## SDD - Contexto e prompts

O arquivo `AGENTS.md` reúne o contexto geral do aplicativo e as instruções que orientam o Codex durante o desenvolvimento.

A pasta `prompt/` contém arquivos Markdown (`.md`) com instruções específicas para implementar funcionalidades e executar tarefas do projeto.

## Executar

### Requisitos

- Node.js 24 LTS
- npm

### Instalação

Após clonar o repositório, acesse a pasta do projeto e instale as dependências:

```powershell
cd leitura-facil
npm ci
```

### Iniciar o aplicativo

Inicie o ambiente de desenvolvimento:

```powershell
npm start
```

Para executar no Android:

```powershell
npm run android
```

Para executar no navegador:

```powershell
npm run web
```

## Estrutura

- `app/`: layout Expo Router e rota de verificação.
- `src/theme/`: tokens e Inter.
- `src/database/`: SQLite e migrações versionadas, sem tabelas de negócio.
- `src/stores/`: sessão não configurada, sem tokens ou autenticação.
- `src/api/`: configuração pública opcional, sem HTTP.
- `assets/`: imagens provisórias do template oficial.
- `tests/`: configuração API e proteção de versão do banco.
- `specs/`: registro BOOT-001 e ADR.
- `prompts/` e `AGENTS.md`: documentos originais preservados.

Pastas das próximas funcionalidades serão criadas quando houver conteúdo real.

## Configuração pública

Copie `.env.example` para `.env.local` se necessário. `EXPO_PUBLIC_API_URL` pode ficar vazia; não há integração de rede habilitada. Valores `EXPO_PUBLIC_*` entram no aplicativo: nunca incluir credenciais, senhas ou tokens.

Material Symbols está disponível por `expo-symbols` do SDK em Android/web; iOS usa SF Symbols. O mapeamento uniforme baseado no Figma fica para DS-001 antes da criação dos componentes de ícones.

Não foram implementadas telas de Login/Home, autenticação, AWS ou regras de negócio.
