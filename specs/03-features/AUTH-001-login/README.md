# AUTH-001 — Login simulado

Implementação do prompt `prompts/AUTH-001-login.md`, seguindo AGENTS.md e DS-001.
A imagem `assets/login-reference.png` foi inspecionada como referência visual.
Não existem contratos de autenticação real aprovados; nenhuma integração AWS foi feita.

## Demonstração

Executar `npm start` e abrir pelo Expo. Usuário: `demo`. Senha: `Leitura123!`.
As credenciais são públicas e fictícias; qualquer outra combinação falha após
500 ms, com mensagem genérica. O schema remove espaços externos do usuário,
mantém a senha intacta e valida obrigatoriedade. Não exige formato de e-mail.

O sucesso cria uma sessão mock somente em memória. A Home provisória oferece
Sair. Reiniciar o aplicativo encerra a sessão. Não são criados tokens, usuários
SQLite ou persistência de senha. Stack.Protected protege Home e Login e remove
rotas indisponíveis do histórico. A senha do formulário é limpa no sucesso.
Uma trava síncrona impede submissões simultâneas pelo botão e pelo teclado.

## Interface

Os componentes DS-001 são reutilizados. AppInput oferece a propriedade opcional
`leftIcon`, com nomes tipados de AppIcon e cor Neutral/600; os campos usam person
e lock, mantendo o controle de visibilidade da senha à direita.
Safe Area, ScrollView e KeyboardAvoidingView vêm de AppScreen; o conteúdo tem
largura limitada e Flexbox. Tokens e Inter são reutilizados.

Os ajustes de `prompts/AUTH-001-ajustes-consolidados-login.md` usam a imagem local
`assets/images/login-leitura-facil.png` por require relativo como cabeçalho,
sem duplicar os textos incorporados. A proporção real 1024/653 determina a altura
conforme a largura; resizeMode contain evita cortes e distorção.
O formulário usa View branco sem borda, sombra ou raio. AppScreen tem fundo branco
e padding externo zero nesta tela; o padding do formulário mantém os espaços de toque.
Não há gap entre cabeçalho e formulário. O PNG tem um tom levemente azulado na base,
que pode diferir do branco uniforme solicitado; o arquivo original foi preservado.
Labels ficam visíveis acima dos campos, conforme DS-001.
Recuperação, lembrar usuário e biometria aparecem desabilitados com aviso explícito.
A afirmação de proteção da referência foi substituída pela indicação de mock.

## Validação

Testes cobrem schema, campos vazios, senha, carregamento, sucesso/falha e fluxo
real de Stack.Protected, inclusive retorno ao Login após logout.
O teste de navegação simula apenas fontes carregadas e provider SQLite, sem testar
o banco. Inspeção em Android/iOS com teclado e texto ampliado permanece necessária.
AUTH-002 dependerá de decisão arquitetural e contratos aprovados.
