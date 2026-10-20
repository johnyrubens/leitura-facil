# AUTH-001 — Tela de Login | Leitura Fácil

## Objetivo
Implementar a tela de Login em React Native, Expo Router e TypeScript, usando os componentes reutilizáveis já criados na tarefa DS-001 e a referência visual do Figma.

## Pré-requisitos
- BOOT-001 concluído.
- DS-001 concluído e validado (ou relatar precisamente o que falta antes de avançar).
- Ler `AGENTS.md` e inspecionar o projeto existente.
- Consultar `specs/03-features/AUTH-001-login/assets/login-reference.png`, caso o arquivo exista.

## Escopo e ordem de execução
1. Inspecionar rotas, componentes, tokens, dependências e scripts disponíveis. Não recriar o projeto Expo.
2. Identificar as APIs reais de `AppScreen`, `AppText`, `AppInput`, `AppButton`, `AppCheckbox`, `AppCard` e `AppIcon`; reutilizá-las. Se houver lacuna, propor ajuste mínimo ao componente existente, sem duplicá-lo.
3. Implementar a tela de Login responsiva, usando Flexbox, Safe Area e rolagem/ajuste para teclado.
4. Implementar schema Zod e formulário React Hook Form, conectando campos por `Controller` ou padrão já adotado no projeto.
5. Criar serviço de autenticação mock separado da UI, com sucesso e falha determinísticos e credenciais de teste documentadas; não usar credenciais reais nem registrar senhas em logs.
6. Integrar o estado de sessão ao Zustand se já estiver disponível, sem persistir senha. Configurar navegação protegida coerente com Expo Router e uma Home provisória, somente se necessária.
7. Disponibilizar logout para testar o fluxo de retorno ao Login.
8. Validar TypeScript, lint e testes disponíveis; informar resultados reais.

## Interface e Design System
- Seguir prioritariamente a referência exportada do Figma, quando disponível.
- Identidade visual: Leitura Fácil — Água e Gás.
- Fonte Inter; tokens centralizados de cores, espaçamento, tipografia e raios.
- Campos de usuário e senha, botão Entrar, feedback de erro e carregamento.
- Senha oculta por padrão, com botão acessível para alternar visibilidade.
- `Lembrar-me`, `Esqueci minha senha` e biometria: se aparecerem no Figma, não apresentar como funcionais sem implementação; desabilitar ou informar indisponibilidade, conforme padrão do projeto.
- Evitar `position: 'absolute'` na estrutura do formulário; permitir apenas em decoração.
- Não usar uma imagem inteira como substituta dos componentes interativos.
- Respeitar área segura, telas menores e teclado aberto.

## Regras do formulário
- Usuário obrigatório, com espaços externos removidos.
- Senha obrigatória; não remover caracteres da senha automaticamente.
- Exibir erros de validação associados aos campos.
- Evitar submissões duplicadas enquanto a autenticação estiver em andamento.
- Credenciais inválidas devem produzir mensagem clara, sem revelar detalhes sensíveis.
- Login mock bem-sucedido leva à Home provisória ou existente; logout retorna ao Login.

## Organização sugerida (adaptar à estrutura real)
- `app/login.tsx` — tela/rota, conforme convenção do Expo Router instalada.
- `src/forms/loginSchema.ts` — schema Zod e tipos.
- `src/services/auth/mockAuthService.ts` — autenticação simulada.
- `src/stores/authStore.ts` — estado de sessão, se necessário.
- Testes próximos aos arquivos ou na estrutura de testes já adotada.

## Critérios de aceitação
1. Tela abre no Expo sem erro.
2. Componentes do DS-001 são reutilizados; não há implementações duplicadas.
3. Layout respeita Figma, tokens e acessibilidade básica.
4. Usuário e senha podem ser digitados.
5. Alternância de visibilidade da senha funciona.
6. Campos vazios mostram erros de validação.
7. Estado de carregamento impede múltiplos envios.
8. Login mock falha e tem sucesso em cenários documentados.
9. Login bem-sucedido navega para Home; logout retorna ao Login.
10. Teclado não impede acesso ao botão Entrar.
11. TypeScript, lint e testes disponíveis são executados e seus resultados relatados.

## Fora do escopo
- AWS Cognito e autenticação real (AUTH-002).
- Biometria e recuperação real de senha.
- Sincronização de leituras, banco de dados de usuários e regras de competência.
- Criação de um novo Design System.

## Entrega esperada do agente
- Resumo das alterações e lista de arquivos criados/modificados.
- Credenciais de demonstração e procedimento de teste, se aplicável.
- Resultado efetivo dos comandos de validação.
- Divergências visuais em relação ao Figma e pendências.
- Não declarar sucesso em verificações que não foram executadas.
