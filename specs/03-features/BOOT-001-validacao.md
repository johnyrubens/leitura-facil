# BOOT-001 — Validação

Executado em 2026-10-13, em `C:\workspace\leitura-facil`.

## Ambiente e criação

- Node.js `v24.21.0`; npm `11.19.0`.
- Inventário inicial: `AGENTS.md`, `prompts/BOOT-001-inicializacao-leitura-facil.md` e diretórios vazios `app`, `src`, `specs`.
- `npx --yes create-expo-app@latest . --template default --no-install` gerou o projeto diretamente na pasta existente.
- O gerador recusou inicialmente os documentos na raiz. Após backup, a execução usou restauração obrigatória e comparação de hashes.
- SHA-256 de `AGENTS.md`: `BF795AD617B982F5100B7C690CC11CB98A71B2FFE1CF75F8259C72B98339F983`.
- SHA-256 do prompt: `E1DF275C058AC7F04D92A8683D91407A020D80C6CEBA968080587CF2B6D76AC0`.
- Expo `57.0.28`, Expo Router `57.0.26`, React Native `0.86.3`, React `19.2.3`, TypeScript `6.0.3`.

## Instalações

```powershell
npm install
npx expo install expo-sqlite expo-secure-store expo-network @react-native-community/datetimepicker expo-linear-gradient @expo-google-fonts/inter zustand react-hook-form zod @hookform/resolvers
npx expo install --dev jest jest-expo @types/jest @testing-library/react-native eslint eslint-config-expo prettier eslint-config-prettier
npx expo install --dev @testing-library/react-native@^13.3.3 react-test-renderer@19.2.3
```

A biblioteca de testes foi ajustada para a série 13 porque a série 14 trazia um renderer cujo peer exigia React 19.3. O renderer final corresponde ao React instalado. Dependências de demonstração redundantes foram removidas; versões finais ficam em `package-lock.json`.

## Resultados finais

| Comando                                             | Resultado                                                      |
| --------------------------------------------------- | -------------------------------------------------------------- |
| `npm run typecheck`                                 | Passou, strict incluindo testes                                |
| `npm run lint`                                      | Passou sem erros ou avisos                                     |
| `npm test`                                          | 3 suítes, 5 testes passaram                                    |
| `npm run format:check`                              | Passou                                                         |
| `npm ls --all`                                      | Passou, sem peers inválidos                                    |
| `npx expo install --check`                          | Dependências atualizadas e compatíveis                         |
| `npx --yes expo-doctor`                             | 21/21 checks passaram                                          |
| `npx expo export --platform android --platform web` | Passou; bundle Hermes Android e rotas estáticas web em `dist/` |
| `npm audit --json`                                  | 66 avisos: 16 moderados e 50 altos; nenhum crítico             |

A primeira exportação Android foi bloqueada por `spawn EPERM` no sandbox; a repetição com permissão executou Hermes. A primeira exportação web revelou import de SQLite/WASM; providers separados por plataforma corrigiram a resolução.

## Arquivos criados e modificados

- Raiz: `package.json`, `package-lock.json`, `app.json`, `tsconfig.json`, `.gitignore`, `.env.example`, `.prettierrc.json`, `.prettierignore`, `eslint.config.js`, `jest.config.js`, `README.md`, `LICENSE` (template).
- Rotas: `app/_layout.tsx`, `app/index.tsx`.
- Tema: `src/theme/tokens.ts`.
- SQLite: `src/database/initialize.ts`, `migrations.ts`, `provider.tsx`, `provider.web.tsx`.
- Sessão: `src/stores/session.ts`.
- API: `src/api/config.ts`.
- Testes: `tests/api-config.test.ts`, `bootstrap-screen.test.tsx`, `migrations.test.ts`.
- Specs: `specs/00-adrs/ADR-001-bootstrap.md`, `specs/03-features/BOOT-001.md`, este relatório.
- Assets: imagens e ícone iOS originais do template em `assets/`.
- Exemplos gerados em `src/app`, componentes, hooks, constantes, CSS e script de reset foram removidos.
- `AGENTS.md` e `prompts/` preservados byte a byte. A diferença de `AGENTS.md` em Git decorre do commit automático do template, anterior à restauração do original.
- `node_modules/`, `.expo/` e `dist/` são artefatos locais ignorados.

## Limitações e pendências

Não foi executado o aplicativo em dispositivo/emulador, nem validada a execução SQLite nativa real. Os testes do executor de migrações usam mocks. Não foi exportado iOS. Web é prévia de interface sem persistência. Os assets de marca ainda são os do template.

Os avisos de auditoria envolvem dependências da stack e ferramentas. As correções sugeridas para dependências diretas incluem trocas incompatíveis de SDK/React/Jest, inclusive downgrade de Expo; não foi executado `npm audit fix --force`. A auditoria precisa de revisão antes de distribuição em produção.

Material Symbols está preparado por `expo-symbols` em Android/web, com SF Symbols em iOS. A uniformidade visual conforme Figma requer definição em DS-001.

Referências oficiais: [template Expo](https://docs.expo.dev/more/create-expo/), [testes Jest no Expo](https://docs.expo.dev/develop/unit-testing/), [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/).
