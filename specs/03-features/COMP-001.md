# COMP-001 — NavigationCard

## Referência e escopo

Implementação do pedido de NavigationCard com base em
`prompts/COMP-001-NavigationCard.md`. O arquivo `NavigationCard-React-Native.md`
solicitado não estava na raiz. O caminho `specs/02-dsign-system/tokens.md` citado
pelo prompt também não existe; a referência utilizada é
`specs/02-design-system/tokens.md`, com implementações reais em `src/theme/`.
Não foram criados imports fictícios ou dependências novas.

## Critérios de aceitação

- Componente exportado de `@/components/ui`, independente de navegação, com props
  title, description, thumbnail, onPress, showChevron, disabled, style,
  accessibilityLabel e testID conforme o prompt.
- Miniatura 56, cover e raio 8; chevron 20 opcional; conteúdo central flexível,
  minWidth 0, textos sem truncamento e altura mínima 88.
- Pressable com prioridade disabled > pressed > hover > default. Foco de teclado
  indicado pela borda; estado disabled impede execução e é anunciado.
- Um único botão acessível anuncia título e descrição ou rótulo fornecido;
  descendentes visuais são decorativos para o leitor de tela.
- Tela de exemplos com Dashboard, Relatórios, Configurações sem chevron e um
  quarto card desabilitado. Ações distintas atualizam mensagem local, sem implementar
  funcionalidades de domínio. Imagens locais funcionam sem rede.

## Mapeamento visual

Mantidos os tokens existentes: headingM (16/Inter semibold), bodyM (14/Inter regular),
textPrimary (#102A43), textSecondary (#62748A), surface (#FFFFFF), border (#D9E2EC),
borderHover (#62748A), borderFocus (#0D6EFD), surfaceHover (#F5F8FC), surfacePressed
(#EAF4FF), surfaceDisabled (#F5F8FC), opacity.disabled (0.5), borders.thin (1),
spacing.md (16), radius.md (12), radius.sm (8) e shadows.card.
Esses valores prevalecem sobre as cores e descrição de 13 do exemplo do prompt.

Não há tokens globais de gaps 4/12, miniatura 56, chevron 20 ou altura mínima 88.
São medidas locais específicas do componente, conforme permitido pelo README do
Design System; não foi ampliada a escala global nem criado tema paralelo.

## Abrir os exemplos

Execute `npm start`, abra pelo Expo em dispositivo/emulador compatível e entre com
o usuário de demonstração `demo` e senha `Leitura123!`. Na Home, toque em
**Exemplos de NavigationCard**. A rota `/navigation-card-examples` permanece no
grupo autenticado existente. **Voltar para Home** retorna à tela inicial.
Para web, use `npm run web` e siga o mesmo fluxo.

## Validação

Testes devem cobrir atualização de conteúdo/imagem por props, onPress, disabled,
rótulos acessíveis, remoção do chevron, precedência de estados, foco e ações dos
exemplos. Executar typecheck, lint, Jest e formatação dos arquivos alterados.
Jest não valida geometria real nem aparência das sombras/fontes; testar em
Android/iOS com fonte ampliada e telas estreitas, e em web com ponteiro/teclado.

Verificações executadas nesta implementação: `npm run typecheck`, `npm run lint`,
`npm test -- --watch=false` (7 suítes, 17 testes passaram), Prettier nos arquivos
alterados e `git diff --check`. O Expo foi iniciado em modo offline para regenerar
os tipos de rotas. Não foi realizada inspeção visual em dispositivo ou navegador.
