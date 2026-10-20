# AGENTS.md — Leitura Fácil

## 1. Missão

Desenvolver e manter o aplicativo móvel **Leitura Fácil**, destinado à coleta, conferência e sincronização de leituras de medidores de água e gás em condomínios.

Priorizar confiabilidade dos dados, operação em campo, acessibilidade, desempenho, simplicidade da interface e rastreabilidade das alterações.

## 2. Qualidade e organização do código
- Aplique os princípios SOLID quando ajudarem a reduzir acoplamento e facilitar manutenção e testes.

- Prefira soluções simples, adequadas ao tamanho e à complexidade da tarefa.

- Mantenha componentes, funções e módulos com responsabilidades claras.

- Separe apresentação, regras de negócio e acesso a dados quando essas responsabilidades existirem.

- Evite duplicação relevante, abstrações prematuras e camadas sem necessidade concreta.

- Siga as especificações e os ADRs do projeto. Se houver conflito, sinalize antes de alterar uma decisão adotada.

- Valide as mudanças com verificações e testes proporcionais ao comportamento alterado.


## 3. Tecnologias e decisões

- **Aplicativo:** React Native, Expo, TypeScript (strict) e Expo Router.
- **Persistência local:** `expo-sqlite`, com migrações versionadas.
- **Estado global:** Zustand, apenas para sessão, preferências e estado compartilhado de UI; não usar como substituto do banco.
- **Formulários:** React Hook Form, Zod e `@hookform/resolvers`.
- **Datas:** `@react-native-community/datetimepicker`, encapsulado em `AppDateInput`.
- **Armazenamento de sessão sensível:** `expo-secure-store`.
- **Backend previsto:** AWS, com contratos de API documentados; não assumir serviços AWS específicos antes de uma decisão arquitetural aprovada.
- **Ícones:** manter consistência com Material Symbols definidos no Figma, usando biblioteca compatível com a versão do Expo.
- **Testes:** ferramentas compatíveis com a versão do Expo e com os requisitos da feature.

Usar `npx create-expo-app` para iniciar projetos e `npx expo install` para dependências com versões gerenciadas pelo Expo. Não utilizar o `expo-cli` global legado.

## 4. Fluxo Spec-Driven Development (SDD)

Antes de alterar uma funcionalidade:

1. Ler este `AGENTS.md`.
2. Localizar e ler a spec da funcionalidade em `specs/03-features/`.
3. Consultar regras de domínio, Design System, contratos de API e ADRs relevantes.
4. Verificar os componentes e serviços existentes antes de criar novos.
5. Identificar critérios de aceitação e testes necessários.
6. Implementar somente o escopo solicitado.
7. Executar verificações e relatar resultados e pendências.

**Não inventar regras de negócio, contratos de API ou comportamento de autenticação.** Se uma especificação estiver ausente, ambígua ou contraditória, registrar a dúvida e solicitar definição antes de implementar comportamento crítico.

Hierarquia de referência: requisitos explícitos da tarefa e specs aprovadas; ADRs e contratos aplicáveis; Design System; convenções deste documento. Em caso de conflito, sinalizar antes de decidir.

## 5. Estrutura do repositório

```text
app/                     # Rotas Expo Router
src/components/          # Componentes de UI reutilizáveis
src/theme/               # Tokens e estilos do Design System
src/forms/               # Schemas Zod e lógica de formulários
src/stores/              # Stores Zustand
src/database/            # SQLite e migrações
src/repositories/        # Acesso aos dados locais
src/services/            # Casos de uso e regras de aplicação
src/api/                 # Cliente HTTP e contratos de integração
src/sync/                # Fila e mecanismos de sincronização
src/hooks/               # Hooks reutilizáveis
src/types/               # Tipos e modelos
src/assets/              # Imagens e fontes
specs/                   # Documentação SDD
.agents/skills/          # Skills de implementação, se suportadas pelo agente
tests/                   # Testes
```

Não criar pastas vazias apenas para satisfazer a estrutura. Criá-las quando houver conteúdo real.

## 6. Design System e Figma

Utilizar os tokens documentados em `specs/02-design-system/`. Valores iniciais:

- `Primary/050`: `#EAF4FF`
- `Primary/500`: `#0D6EFD`
- `Primary/700`: `#064A7A`
- `Water/500`: `#1687F8`
- `Gas/500`: `#FF7A00`
- `Success/500`: `#16A05D`
- `Warning/500`: `#F59E0B`
- `Danger/500`: `#E53935`
- `Neutral/900`: `#102A43`
- `Neutral/600`: `#62748A`
- `Neutral/300`: `#D9E2EC`
- `Neutral/050`: `#F5F8FC`

Fonte principal: Inter. Espaçamentos-base: 8, 16, 24 e 32. Raios: 8, 12, 16 e 999. Inputs e botões: altura-base de 50 px.

- Não espalhar valores de cor e espaçamento diretamente pelas telas; centralizar tokens.
- Utilizar imagens do Figma como referência visual, não como substitutas de campos e botões funcionais.
- Respeitar Safe Area, teclado, escalabilidade de texto, acessibilidade e diferentes dimensões de tela.
- Priorizar Flexbox e Auto Layout equivalente; evitar posicionamento absoluto em formulários.
- Reutilizar `AppInput`, `AppButton`, `AppDateInput`, `AppCard`, `StatusBadge`, `ProgressBar` e demais componentes existentes.

## 7. Formulários e componentes

- A tela ou o formulário controla os valores por React Hook Form.
- `AppInput` recebe `value`, `onChangeText`, `onBlur`, erros e configurações visuais.
- Tipos iniciais: `text`, `email`, `number` e `password`.
- Campos de senha iniciam ocultos e permitem alternar visibilidade de modo acessível.
- Datas devem usar `AppDateInput` e DateTimePicker nativo; evitar entrada livre de datas sem requisito explícito.
- Usar Zod para validação e mensagens claras para o usuário.
- Não criar `UserInput` ou `PasswordInput` quando `AppInput` atender ao caso.

## 8. Domínio e regras de negócio

Entidades centrais: `Condominium`, `Apartment`, `Meter`, `Reading` e `Competency`.

- Um apartamento pode ter medidores de água e gás.
- A leitura pertence a um medidor e a uma competência.
- `consumption = currentReading - previousReading`.
- A nova leitura inicia visualmente com o valor da leitura anterior, permitindo ajuste por gesto, botões e entrada numérica direta, conforme a spec.
- Estados de leitura: `PENDING`, `READ`, `REVIEW`, `VERIFIED`.
- Exibir `REVIEW` como **Revisar**, não como “Divergente”.
- Desvio de consumo é um motivo para revisão, não prova de erro.
- Regra inicial de desvio: comparar o consumo com a mediana dos últimos seis consumos válidos; sinalizar se o consumo atual for maior que o dobro da mediana **e** excedê-la em pelo menos 5 unidades de consumo, conforme regras específicas do medidor e da unidade. Leitura atual menor que anterior também requer revisão. Não bloquear gravação por desvio sem regra expressa.
- Competências percorrem `SCHEDULED → READING → REVIEW → WAITING_DELIVERY → DELIVERED`.
- Respeitar períodos de leitura, conferência e entrega; alterações posteriores à entrega exigem autorização e auditoria, conforme spec.

As regras detalhadas e exceções devem permanecer em `specs/01-domain/` e nas specs das features; não duplicar implementações em componentes de UI.

## 9. Exportação e entrega de leituras

Ao concluir a coleta e conferência de água e/ou gás, o sistema deve permitir gerar uma planilha Excel (.xlsx) contendo as leituras da competência.

A entrega à administração do residencial será realizada por e-mail, utilizando serviços AWS.

- Gerar planilhas com dados consistentes e validados.

- Não incluir leituras de outra competência ou condomínio.

- Separar a geração do arquivo do processo de envio.

- Registrar data, destinatários, arquivo, responsável e resultado da entrega.

- Permitir nova tentativa em caso de falha, evitando envios duplicados acidentais.

- Não considerar a competência entregue antes da confirmação do envio.

- Preservar histórico de entregas e versões dos arquivos.

- Impedir alteração silenciosa de leituras já entregues.

## 10. Persistência local e sincronização

- O SQLite é a fonte de persistência local de apartamentos, medidores, competências, leituras e pendências de sincronização.
- Toda alteração crítica deve usar transações quando necessário e preservar histórico/auditoria conforme a spec.
- Preparar identificadores estáveis e operações idempotentes para evitar duplicidade no backend.
- Uma leitura salva localmente não deve ser apresentada como sincronizada antes de confirmação da API.
- Tratar conectividade intermitente, retentativas e conflitos de sincronização por regras documentadas.
- Não apagar dados locais pendentes em falhas de rede ou logout sem requisito e confirmação apropriados.
- Não armazenar senhas em texto puro nem tokens em SQLite. Usar armazenamento seguro apropriado para tokens.

## 12. Integração AWS e segurança

- Consumir a API por uma camada `src/api/`, sem requisições HTTP diretamente nos componentes visuais.
- Contratos devem ser documentados em OpenAPI ou nas specs correspondentes.
- Não pressupor Cognito, API Gateway, Lambda ou RDS como já implantados; depender das ADRs e dos contratos aprovados.
- Não colocar segredos AWS, chaves privadas ou credenciais em `EXPO_PUBLIC_*` nem no bundle do aplicativo.
- Validar autenticação, expiração de sessão, autorização e tratamento de erros antes de habilitar integração real.
- Não registrar senhas, tokens ou dados sensíveis em logs.

## 12. Ordem de implementação

Executar incrementalmente, sem antecipar funcionalidades não solicitadas:

1. `BOOT-001`: criação do projeto e ferramentas.
2. `BASE-001`: tema, persistência, estado e infraestrutura mínima.
3. `DS-001`: componentes reutilizáveis.
4. `AUTH-001`: interface e validação do Login com autenticação simulada.
5. `AUTH-002`: autenticação real com a solução AWS aprovada.
6. `HOME-001`: dashboard.
7. `APT-001`: apartamentos.
8. `READ-001` e `READ-002`: leituras e desvio.
9. Competências, conferência e sincronização, conforme specs.

## 13. Critérios de conclusão

Uma tarefa só deve ser considerada concluída quando:

- O comportamento corresponde à spec e aos critérios de aceitação.
- Componentes e tokens existentes foram reutilizados quando apropriado.
- Tipos, validações e estados de erro foram tratados.
- Foram executados os testes pertinentes, a verificação TypeScript e o lint, quando disponíveis.
- Não há segredos ou credenciais no código.
- O agente apresenta os arquivos alterados, comandos executados, resultados e limitações.

Não afirmar que testes ou validações passaram sem executá-los. Não sobrescrever arquivos existentes ou executar operações destrutivas sem verificar o impacto.
