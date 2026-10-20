# ADR-001 — Bootstrap Expo

Data: 2026-10-13. Status: adotada para BOOT-001.

O template oficial `default` de `create-expo-app@latest` foi gerado diretamente na raiz existente. Documentos preexistentes foram restaurados com validação de hashes. O gerador criou automaticamente Git e um commit do template antes da restauração; esse commit não representa os documentos originais.

Mantemos Expo SDK 57, React Native 0.86, Expo Router e TypeScript strict. Dependências gerenciadas são resolvidas por `expo install`; versões exatas estão no lockfile npm. Rotas residem em `app/`, e `@/` aponta para `src/`. Exemplos do template foram removidos.

Tokens e Inter ficam centralizados. `expo-symbols` fornece Material Symbols em Android/web e SF Symbols em iOS; uma solução uniforme baseada no Figma deve ser definida em DS-001.

SQLite usa `SQLiteProvider` no ambiente nativo, WAL, chaves estrangeiras e `PRAGMA user_version` em transação exclusiva. Migrações começam vazias; bancos com versão futura são recusados. Nenhuma tabela de domínio foi definida. No web a rota é demonstrativa, sem banco.

Zustand contém apenas o estado `unconfigured`. A camada API valida configuração pública opcional; não há autenticação, endpoints ou serviços AWS definidos.

ESLint usa a configuração oficial Expo, Prettier usa configuração independente e Jest usa `jest-expo`. Testes verificam configuração desabilitada e proteção de versão do banco; SQLite real exige validação em dispositivo.
