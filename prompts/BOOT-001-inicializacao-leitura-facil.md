# BOOT-001 — Inicialização do Leitura Fácil

Você é um desenvolvedor sênior especializado em React Native, Expo, TypeScript e arquitetura de aplicativos offline-first.

## Objetivo

Criar a estrutura inicial do aplicativo **Leitura Fácil**, destinado à coleta de leituras de medidores de água e gás em condomínios.

O projeto será desenvolvido incrementalmente, utilizando **Spec-Driven Development (SDD)**.

## 1. Criar o projeto

- Sistema operacional: Windows.
- Diretório de trabalho: `C:\workspace`.
- Nome do projeto: `leitura-facil`.
- Caminho final: `C:\workspace\leitura-facil`.
- Utilizar `npx create-expo-app@latest`.
- Selecionar um template oficial compatível com TypeScript e Expo Router.
- Não utilizar o `expo-cli` global legado.
- Verificar se a pasta já existe antes de criar o projeto. Não sobrescrever arquivos existentes sem autorização.

## 2. Configurar a stack

Instalar e configurar as bibliotecas abaixo, verificando primeiro quais já existem no template.

### Infraestrutura

- Expo Router
- TypeScript
- `expo-sqlite`
- `expo-secure-store`
- `expo-network`

### Gerenciamento de estado

- `zustand`

### Formulários

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

### Datas

- `@react-native-community/datetimepicker`

### Interface

- Material Symbols, utilizando uma solução compatível com a versão instalada do Expo
- `expo-font`, se necessário
- `expo-linear-gradient`
- `react-native-safe-area-context`

### Qualidade

- ESLint
- Prettier
- Jest e ferramentas de teste compatíveis com Expo/React Native

Utilizar `npx expo install` para dependências que precisam respeitar a compatibilidade com o Expo SDK. Utilizar npm, salvo se o projeto existente já utilizar outro gerenciador. Não instalar bibliotecas redundantes.

## 3. Estrutura inicial

Organizar o código em:

```text
app/                 # Rotas do Expo Router
src/components/      # Componentes reutilizáveis
src/theme/           # Design System
src/stores/          # Zustand
src/database/        # SQLite e migrações
src/repositories/    # Persistência
src/services/        # Regras e serviços
src/api/             # Comunicação futura com AWS
src/forms/           # Schemas Zod
src/hooks/           # Hooks reutilizáveis
src/types/           # Tipos de domínio
src/assets/          # Imagens e fontes
tests/               # Testes
specs/               # Documentação SDD
```

## 4. Configuração inicial

- Habilitar TypeScript em modo `strict`.
- Configurar aliases de importação, preferencialmente `@/`.
- Configurar ESLint e Prettier.
- Preparar suporte a variáveis de ambiente públicas com prefixo `EXPO_PUBLIC_`.
- **Não** colocar credenciais, segredos AWS ou chaves privadas em variáveis públicas do aplicativo.
- Criar configuração de tema com os tokens do Leitura Fácil.
- Preparar a inicialização do SQLite e a estrutura de migrações, sem criar tabelas de negócio prematuramente.
- Preparar Zustand para estado de autenticação, sem implementar autenticação real.
- Preparar a camada de API, sem realizar chamadas para serviços AWS ainda.

### Tokens iniciais do Design System

```text
Primary/050 = #EAF4FF
Primary/500 = #0D6EFD
Primary/700 = #064A7A
Water/500 = #1687F8
Gas/500 = #FF7A00
Success/500 = #16A05D
Success/050 = #E9F8EF
Warning/500 = #F59E0B
Warning/050 = #FFF5DF
Danger/500 = #E53935
Danger/050 = #FDECEC
Neutral/900 = #102A43
Neutral/600 = #62748A
Neutral/300 = #D9E2EC
Neutral/050 = #F5F8FC
White = #FFFFFF
```

Fonte: Inter. Espaçamentos-base: 8, 16, 24 e 32 px. Raios: 8, 12 e 16 px.

## 5. SDD e instruções dos agentes

- Preservar o arquivo `AGENTS.md`, caso exista.
- Preparar a estrutura `specs/`.
- Não inventar regras de negócio que ainda não foram especificadas.
- Manter decisões técnicas documentadas em ADRs.

## 6. Escopo

Nesta tarefa, **NÃO implementar**:

- Tela de Login completa.
- Autenticação real.
- Integração AWS.
- Cadastro de apartamentos.
- Leituras.
- Competências.
- Sincronização de dados.

Criar apenas uma rota inicial simples para verificar que o aplicativo funciona.

## 7. Validação

Ao terminar:

1. Executar a verificação TypeScript.
2. Executar o lint.
3. Executar os testes configurados.
4. Verificar a resolução das dependências.
5. Informar os comandos para iniciar o Expo.
6. Listar os arquivos criados e modificados.
7. Relatar problemas ou verificações não executadas.

Não declarar sucesso em verificações que não tenham sido efetivamente executadas.

## Comandos de referência (PowerShell)

```powershell
cd C:\workspace
npx create-expo-app@latest leitura-facil
cd leitura-facil

npm install zustand react-hook-form zod @hookform/resolvers
npx expo install expo-sqlite expo-secure-store expo-network
npx expo install @react-native-community/datetimepicker
npx expo install expo-linear-gradient expo-font react-native-safe-area-context

npx expo start
```

> **Nota:** os comandos são uma referência. O agente deve verificar o template, o SDK instalado e as dependências existentes antes de executar instalações.
