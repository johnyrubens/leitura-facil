# DS-001 — Design System e componentes reutilizáveis

## Objetivo

Implementar a fundação visual do aplicativo **Leitura Fácil** antes do desenvolvimento da tela de Login, utilizando React Native, Expo e TypeScript.

## Pré-condições

- O projeto Expo já foi inicializado pela tarefa `BOOT-001`.
- O arquivo `AGENTS.md` é a referência permanente de arquitetura e padrões.
- Esta tarefa **não** deve implementar a tela de Login nem autenticação.

## Instruções para o agente

1. Ler `AGENTS.md` e inspecionar a estrutura, as dependências e os componentes existentes.
2. Não recriar o projeto Expo e não sobrescrever arquivos funcionais sem necessidade.
3. Reutilizar bibliotecas já instaladas e instalar novas dependências apenas quando necessário, usando versões compatíveis com o SDK Expo atual.
4. Implementar os tokens em `src/theme/` e os componentes em `src/components/ui/`, adaptando caminhos caso a estrutura existente já estabeleça outra convenção.
5. Manter componentes independentes de regras de negócio, navegação e autenticação.
6. Não implementar `AUTH-001` nesta tarefa.

## Tokens de design

### Cores

| Token | Hexadecimal |
|---|---|
| `Primary/050` | `#EAF4FF` |
| `Primary/500` | `#0D6EFD` |
| `Primary/700` | `#064A7A` |
| `Water/500` | `#1687F8` |
| `Gas/500` | `#FF7A00` |
| `Success/500` | `#16A05D` |
| `Success/050` | `#E9F8EF` |
| `Warning/500` | `#F59E0B` |
| `Warning/050` | `#FFF5DF` |
| `Danger/500` | `#E53935` |
| `Danger/050` | `#FDECEC` |
| `Neutral/900` | `#102A43` |
| `Neutral/600` | `#62748A` |
| `Neutral/300` | `#D9E2EC` |
| `Neutral/050` | `#F5F8FC` |
| `White` | `#FFFFFF` |

### Tipografia

Fonte **Inter**, respeitando o carregamento adequado pelo Expo.

| Variante | Tamanho | Peso |
|---|---:|---:|
| Heading XL | 24 | 700 |
| Heading L | 20 | 700 |
| Heading M | 16 | 600 |
| Body L | 16 | 400 |
| Body M | 14 | 400 |
| Label M | 14 | 500 |
| Caption | 12 | 400 |
| Reading number | 32 | 700 |
| KPI number | 28 | 700 |
| Button | 16 | 600 |

Preferir algarismos tabulares para leituras e indicadores numéricos quando houver suporte.

### Espaçamento, raios e dimensões

- Espaçamentos base: `8`, `16`, `24`, `32`.
- Raios: `SM = 8`, `MD = 12`, `LG = 16`, `Full = 999`.
- Altura padrão de campos e botões: `50`.
- Card padrão: raio `16`, padding `16`.
- Centralizar os valores em tokens tipados; evitar valores visuais duplicados e dispersos.

## Componentes obrigatórios

### `AppText`

- Suportar variantes tipográficas por propriedades tipadas.
- Permitir cor e alinhamento sem comprometer os tokens.
- Ser acessível e reutilizável em qualquer tela.

### `AppInput`

- Suportar `label`, `placeholder`, `value`, `onChangeText`, `error`, `disabled` e propriedades nativas relevantes.
- Suportar texto, e-mail, números e senha.
- Quando configurado como senha, iniciar com o texto oculto e permitir alternar visibilidade por botão acessível.
- Estados visuais: padrão, foco, preenchido, erro e desabilitado.
- Altura do campo: `50`; raio: `12`; borda neutra; padding horizontal apropriado.
- Não acoplar a `react-hook-form`: o formulário usará `Controller` na camada de tela.

### `AppButton`

- Variantes `primary`, `secondary` e `outline`.
- Suportar `loading`, `disabled`, `onPress` e rótulo acessível.
- Bloquear acionamentos repetidos enquanto `loading` estiver ativo.
- Altura padrão `50` e raio `12`.

### `AppCheckbox`

- Componente controlado (`checked` e `onChange`).
- Suportar label, desabilitado e acessibilidade.
- Não implementar regras específicas de “Lembrar-me” no componente.

### `AppCard`

- Contêiner visual reutilizável com padding, fundo e raio configuráveis por tokens.
- Aceitar conteúdo arbitrário por `children`.

### `AppIcon`

- Padronizar ícones na família **Material Symbols Rounded** conforme referência do Figma.
- Verificar qual biblioteca ou estratégia é compatível com o SDK Expo instalado; não presumir APIs ou pacotes inexistentes.
- Documentar a correspondência entre nomes de ícones do Figma e a implementação.

### `AppScreen`

- Aplicar Safe Area por meio de `react-native-safe-area-context`.
- Oferecer fundo configurável e opção de conteúdo rolável.
- Utilizar `View`, `ScrollView` e Flexbox; evitar posições absolutas para estrutura de formulários.
- Permitir tratamento adequado de telas menores e teclado, quando aplicável.

## Estrutura esperada

```text
src/
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   └── index.ts
└── components/
    └── ui/
        ├── AppText.tsx
        ├── AppInput.tsx
        ├── AppButton.tsx
        ├── AppCheckbox.tsx
        ├── AppCard.tsx
        ├── AppIcon.tsx
        └── AppScreen.tsx
```

Se o projeto já possuir estrutura equivalente, reutilizar e justificar quaisquer adaptações.

## Qualidade e critérios de aceitação

1. Todos os componentes podem ser importados e utilizados independentemente da tela de Login.
2. Tokens de cor, tipografia, espaçamento e raio são centralizados e tipados.
3. `AppInput` suporta entrada de texto e senha com alternância de visibilidade.
4. `AppInput` exibe erros e estados de foco e desabilitado.
5. `AppButton` suporta estados de carregamento e desabilitado.
6. `AppCheckbox` funciona como componente controlado.
7. Os componentes utilizam propriedades de acessibilidade apropriadas.
8. A implementação respeita TypeScript estrito e a estrutura Expo existente.
9. Executar os scripts de TypeScript, lint e testes disponíveis; não declarar aprovação de verificações não executadas.
10. Nenhuma tela de autenticação ou integração AWS é implementada nesta tarefa.

## Entrega esperada

Ao concluir, informar:

- Arquivos criados ou modificados.
- Bibliotecas adicionadas e justificativas.
- Decisões técnicas relevantes, especialmente sobre ícones e fonte Inter.
- Comandos de validação executados e seus resultados reais.
- Limitações, pendências e orientações para a próxima tarefa `AUTH-001`.
