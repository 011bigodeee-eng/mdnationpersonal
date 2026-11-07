# Correção da Hero e da faixa MD Nation

## Diagnóstico

A fotografia aparecia antes do conteúdo no HTML, enquanto o CSS invertia a leitura no mobile. A Hero acumulava seletores e overrides em diferentes breakpoints, incluindo uma composição intermediária distinta em tablet. Isso tornava a ordem dependente da apresentação e dificultava garantir a mesma composição antes/depois do carregamento.

As animações existentes usavam transform/opacity, sem alterar a ordem do DOM. Portanto, não há evidência de uma animação que reordenasse os elementos. A origem exata de capturas de versões remotas diferentes não pôde ser confirmada; o domínio publicado permanece bloqueado pela política de rede deste ambiente.

## Correções

- `components/Hero.tsx`: conteúdo antes da foto na própria estrutura HTML; o desktop posiciona a foto à direita, enquanto o mobile segue o fluxo natural.
- `app/hero.css`: todos os estilos da Hero e da faixa concentrados, com remoção de 169 seletores anteriores de `globals.css`. Há uma composição de fluxo única até 850 px, sem `order` para inverter conteúdo ou altura fixa no mobile.
- Navbar mobile compacta; identificação, título com clamp, subtítulo, CTA, foto e continuidade nessa sequência. O método é apresentado como link secundário compacto ao lado do CTA.
- Redução dos espaços e da altura do conjunto no celular, mantendo o CTA com área de toque de 52 px e tipografia legível.
- Foto sem borda de cartão e com máscara suave nas extremidades; vinhetas e luminosidade moderadas integram o ambiente real ao preto. Os arquivos da fotografia, rosto, corpo e inscrições continuam intactos.
- Desktop preserva a tipografia monumental, fotografia à direita, navegação e identidade preta/vermelha/branca.
- Revelação da fotografia por opacidade e títulos com deslocamento curto. Não há animação de escala do bloco fotográfico no mobile nem alteração de sua ordem ou dimensões durante o carregamento.
- `components/BrandMarquee.tsx`: faixa contínua com duas cópias de largura idêntica; apenas a primeira é anunciada por leitores de tela. O movimento pode ser pausado e retomado por botão. Com movimento reduzido, a faixa fica estática e todos os textos continuam legíveis.

## Escopo preservado

Sobre, serviços, método, resultados/editorial, acompanhamento, questionário, galeria, FAQ, CTA final e rodapé continuam presentes. A mudança de estilos foi limitada à Hero/faixa e à altura da navbar mobile. Os testes existentes de interação e responsividade cobrem também todas as seções abaixo da primeira dobra.

## Validação

A suíte foi ampliada para 37 cenários. Inclui atraso proposital da imagem nas larguras 320, 360, 375, 390, 430 e 768 px, comparação geométrica antes/depois do carregamento, ordem do HTML, altura/posição do CTA, pausa da faixa e movimento reduzido. A observação de layout shifts durante abertura/carregamento no mobile deve permanecer abaixo de 0,01.

Os testes existentes cobrem também 414, 1024, 1280, 1440 e 1920 px, enquadramento da cabeça, ausência de sobreposição com texto/CTA, imagens, console, menus, foco, formulários, resumo, links, FAQ, galeria e acessibilidade automatizada.

Capturas novas: `/workspace/scratch/md-hero-corrected-320.png`, `md-hero-corrected-390.png`, `md-hero-corrected-768.png` e `md-hero-corrected-1440.png`. As capturas completas da página usam o prefixo `md-hero-fixed-`.

## Resultados executados

- `npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check`: aprovados.
- `npm run test:e2e`: 37 testes aprovados. Depois do último ajuste de legibilidade, 17 cenários afetados de Hero, foto, faixa e acessibilidade foram repetidos e aprovados.
- Leitura de layout shifts no Chromium, 390 × 844, com abertura e animações normais: CLS observado 0.
- Hero em 390 px: aproximadamente 838 px de altura; CTA termina em 401 px e a fotografia começa em 409 px. Em 320 px: aproximadamente 736 px de altura; CTA termina em 369 px e foto começa em 377 px.
- Desktop 1440 px mantém a Hero de 900 px, com fotografia à direita e tipografia monumental.
- Uma inspeção adicional de headings, parágrafos, botões, seleções, FAQ e navegação do rodapé em 320, 390, 768, 1024 e 1440 px não encontrou conteúdo ultrapassando a largura dos respectivos blocos.
- As fotografias e os originais arquivados não foram modificados.

## Separação integral entre título e fotografia

Após o relato de “EVOLUÇÃO” entrando na foto, a Hero passou a reservar uma coluna de texto cuja largura termina antes da área fotográfica. A fonte acompanha essa largura com unidades do container, preservando as três linhas completas. A fotografia mantém sua posição. A verificação anterior protegia somente o rosto; os novos testes exigem separação de toda a área da foto em 851, 1024, 1440 e 1920 px, incluindo os controles. Build, lint, tipos e os 42 testes passaram.
