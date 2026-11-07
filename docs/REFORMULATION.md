# Reformulação MD Nation — Built by Discipline

A base Next.js/React/TypeScript e as funcionalidades do commit `a9c4129` foram preservadas. Não houve substituição de stack nem inclusão de biblioteca de animação.

## Auditoria da versão anterior

| Área                   | Observação                                                                               | Tratamento                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Hero                   | Mesmo cenário repetido em serviços, galeria e CTA; composição mobile derivada do desktop | Nova foto, hierarquia, layout mobile e revelação de marca                                                             |
| Sobre                  | Fotografia de equipamento e avisos competiam com a apresentação                          | Composição editorial sobreposta, princípios e nota de prévia concentrada                                              |
| Serviços               | Três cards iguais e altos no mobile                                                      | Ritmo assimétrico no desktop, cards compactos em duas áreas no mobile, CTA preservado                                 |
| Método                 | Linha estática e sequência sem acompanhamento do scroll                                  | Linha progressiva, indicadores ativos e jornada vertical sem travar rolagem                                           |
| Resultados/depoimentos | Grandes espaços reservados sem materiais reais                                           | Conteúdo útil sobre constância e faixa institucional; comparador e depoimentos continuam disponíveis por configuração |
| Acompanhamento         | Mockup com texto pequeno e transformação fixa                                            | Melhor legibilidade, acabamento e perspectiva ligada ao scroll; conceito identificado                                 |
| Vídeo                  | Sem seção expansiva                                                                      | Manifesto com fallback estático e integração opcional de vídeo autorizado                                             |
| Questionário           | Respostas preservadas; altura variável e validação pouco explícita                       | Progresso acessível, altura estável, feedback de nome, foco e navegação por teclado                                   |
| Menu mobile            | Sem bloqueio do fundo e contenção de foco explícita                                      | Diálogo, scroll bloqueado, Escape, retorno de foco e adaptação ao resize                                              |
| Código                 | Componentes concentrados e animação de parallax isolada                                  | Componentes compartilhados, chunks de interações e sistema de movimento único                                         |
| Performance            | Fontes locais e WebP já funcionavam                                                      | Preservados; preload/prioridade da Hero, imagens abaixo da dobra sob demanda e nenhum vídeo baixado sem interação     |

O acesso a `https://mdnationpersonal.vercel.app/` foi tentado por HTTP e navegador e bloqueado pela política de rede (403 / ERR_TUNNEL_CONNECTION_FAILED). As capturas de antes foram feitas na versão local correspondente ao commit publicado, antes da alteração de arquivos. Não se afirma uma inspeção visual do deploy remoto.

## Credibilidade e configuração

Todas as imagens de pessoas reais continuam pendentes. As imagens geradas representam equipamentos e ambientes, não o treinador, alunos ou local de atendimento. O wordmark segue provisório. Não foram criados resultados físicos, certificações, depoimentos, números, preços ou telefone comercial.

`lib/content.ts` concentra dados e mídia. As modalidades são demonstrativas até confirmação. WhatsApp vazio abre o diálogo com resumo copiável e alternativa de Instagram; quando configurado, gera a mensagem personalizada. O botão flutuante só aparece com contato válido.

Resultados autorizados ativam o comparador; depoimentos autorizados ativam a navegação; vídeos autorizados ativam os players. Sem esses materiais, a experiência pública permanece preenchida com conteúdo editorial e fotografias conceituais.

## Verificação

A suíte cobre as onze larguras solicitadas, menu, FAQ, abertura, galeria, mockup, questionário completo, consentimento, resumo, retorno às perguntas, teclado, estabilidade de altura, contraste/acessibilidade automatizada, progresso de animação e ausência de imagens repetidas. `npm run lint`, `npm run typecheck`, `npm run build` e `npm run test:e2e` são os comandos de referência.

Capturas locais de comparação: `/workspace/scratch/md-before-1440.png`, `md-before-390.png`, `md-after-1440.png` e `md-after-390.png`. Os testes geram também as demais larguras e o menu mobile. Medição Lighthouse local armazenada em `/workspace/scratch/md-reform-lighthouse-final.json`; valores de laboratório não garantem a mesma pontuação no deploy.

A prévia preserva `noindex` enquanto o domínio de produção não estiver configurado. Essa decisão reduz o score de SEO da prévia e não deve ser removida apenas para aumentar a pontuação.

## Resultado final local

- Lint, TypeScript, build de produção e verificação de whitespace: aprovados.
- 20 cenários de navegador aprovados: a suíte inicial de 19, mais o cenário de abertura automática e fallback sem JavaScript. Os três cenários de abertura/movimento foram repetidos após os refinamentos finais.
- Lighthouse mobile, execução isolada: desempenho 89, acessibilidade 100, boas práticas 100, SEO 63. CLS 0; LCP 3.7 s; bloqueio total 60 ms.
- O LCP de laboratório ainda pode melhorar; a abertura e a revelação da Hero fazem parte desta medição. A duração da abertura é contada desde o HTML inicial, evitando somar o tempo da hidratação ao prazo de 1,65 segundo.
- O score de SEO é afetado pelo noindex intencional da prévia. Não houve desativação de verificações para aumentar pontuações.
- Pendências comerciais: fotos e vídeos reais autorizados, WhatsApp, logo oficial, biografia e registro profissional, confirmação dos serviços e eventual material de resultados/depoimentos.
- A implantação remota não pôde ser verificada por causa da política de rede do ambiente.
