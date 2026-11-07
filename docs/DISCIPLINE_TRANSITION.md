# Disciplina em movimento

A faixa animada anterior foi substituída por uma seção editorial entre Hero e Sobre, preservando a Hero, o retrato real, navegação, questionário, serviços, FAQ, galeria e contato comercial.

## Implementação

- `components/DisciplineTransition.tsx`: heading DISCIPLINA, contorno legível, preenchimento vermelho sobreposto e frase “A EVOLUÇÃO É CONSTRUÍDA TODOS OS DIAS.”. A cópia visual de preenchimento é oculta dos leitores de tela para anunciar o título uma única vez.
- `app/discipline.css`: fundo #08090B, tipografia condensada com clamp e unidades do container, linha de 1 px e composição compacta no celular. A cor vermelha é #E50914.
- `useCinematicMotion`: reutiliza o requestAnimationFrame e os listeners passivos de scroll existentes. A posição do bloco determina o recorte horizontal do preenchimento e a escala da linha. Não há biblioteca nova, loop automático, sticky, pin ou bloqueio de rolagem.
- O preenchimento inicia quando a seção alcança 76% da altura do viewport. O percurso de revelação equivale a 50% do viewport no desktop e 27% no celular, reduzindo o movimento necessário no mobile.
- Com `prefers-reduced-motion`, palavra e linha ficam preenchidas de forma estática. Sem JavaScript, contorno e legenda continuam visíveis.
- A junção com Sobre usa o mesmo fundo e espaçamento reduzido, sem uma borda ou corte entre as seções.

## Remoção

`BrandMarquee.tsx` foi removido. Também foram removidos o estado de pausa, o botão, as cópias repetidas, os símbolos e os 26 seletores da faixa, incluindo os keyframes `brand-tape`. Os nomes da marca e textos próprios da Hero permanecem na Hero, conforme o escopo de preservação solicitado.

## Verificação

Os novos testes verificam ausência do marquee e seus controles, ordem Hero → transição → Sobre, progresso real em 0%, 50% e 100%, texto sem corte, largura sem overflow, altura compacta no mobile, movimento reduzido e fallback sem JavaScript.

Capturas em `/workspace/scratch/md-discipline-half-{largura}.png` e `md-discipline-full-{largura}.png`, para 320, 390, 768 e 1440 px, mostram estados de rolagem reais do componente. A suíte anterior de enquadramento, responsividade e funcionalidades permanece ativa.

Validação concluída: lint, TypeScript e build de produção passaram; a suíte Playwright terminou com 46 testes aprovados. As capturas de desktop (1440 px) e mobile (390 px) foram revisadas visualmente, com texto inteiro, preenchimento e linha sincronizados e espaçamento compacto.
