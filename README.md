# MD Nation — Matheus Dias

Landing page comercial em **Next.js 16, React 19 e TypeScript**, com direção de arte dark fitness, CSS responsivo, fontes locais Inter/Barlow Condensed e ícones Lucide. Sem banco de dados ou credenciais de backend.

## Executar

Requer Node.js 22 ou superior (ambiente validado com Node 24).

```bash
cd /workspace/mdnationpersonal
npm ci --cache /workspace/.npm-cache
npm run dev
```

Produção: `npm run build` e `npm run start`. O servidor usa a porta 3000. Para outra porta, `npm run start -- --port 3001`.

## Verificar

```bash
npm run lint
npm run typecheck
npm run build
# Com o servidor em execução em outra sessão:
npm run test:e2e
```

Os testes de navegador usam o Chromium do ambiente (`/usr/bin/chromium`). Em outra máquina, ajuste `executablePath` em `playwright.config.ts` ou remova essa opção e instale o navegador com `npx playwright install chromium`. A suíte cobre 320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440 e 1920 px, imagens, overflow, menu mobile, FAQ, questionário, consentimento, resumo, abertura, galeria, mockup e acessibilidade WCAG com axe.

## Estrutura

- `app/page.tsx`: entrada da página.
- `app/layout.tsx`: fontes locais, idioma, metadata e Open Graph condicional ao domínio.
- `app/globals.css`: sistema visual e estilos das demais seções.
- `app/hero.css`: Hero, faixa contínua, breakpoints próprios e movimento reduzido, sem overrides espalhados.
- `components/LandingPage.tsx`: composição da página, Navbar, CinematicIntro, AboutTrainer, Services, Method, Results, Testimonials, FAQ, FinalCTA e Footer.
- `components/Hero.tsx` e `BrandMarquee.tsx`: Hero com ordem natural no HTML e faixa com pausa acessível.
- `components/GoalsQuiz.tsx`, `Gallery.tsx` e `TrainingExperience.tsx`: interações preservadas, em chunks separados.
- `components/CinematicFilm.tsx`: manifesto expansivo, com foto estática e vídeo autorizado opcional.
- `components/Primitives.tsx`, `Modal.tsx`, `hooks/useCinematicMotion.ts`: elementos compartilhados, diálogos e movimento progressivo.
- `lib/accessibility.ts`: ciclo de foco por teclado nos diálogos.
- `lib/content.ts`: configuração central de cliente, links, serviços, método, perguntas, resultados, depoimentos e vídeos.
- `public/images/`: fotografias reais em `matheus/` e imagens conceituais de apoio.
- `tests/landing.spec.ts` e `tests/reform.spec.ts`: testes funcionais, acessibilidade, menu, teclado, persistência entre etapas e responsividade.

## Personalizar com dados confirmados

Copie `.env.example` para `.env.local` e informe `NEXT_PUBLIC_WHATSAPP_NUMBER` com país e DDD, somente dígitos, **após validar o contato comercial**. Não é segredo: será incluído no JavaScript público. As variáveis `NEXT_PUBLIC_*` são incorporadas no build; reinicie o desenvolvimento ou refaça o build após alterá-las.

Sem telefone válido, os botões abrem um diálogo identificado como prévia, permitem revisar/copiar a mensagem e oferecem o Instagram informado. Nenhum número fictício é utilizado. Com telefone configurado, os mesmos botões abrem o WhatsApp com mensagem codificada. O questionário inclui nome, objetivo, experiência, preferência e frequência apenas após consentimento; não envia respostas para um servidor nem solicita dados de saúde.

Defina `NEXT_PUBLIC_SITE_URL` com a URL HTTPS definitiva para habilitar URL canônica, imagem de Open Graph absoluta e indexação. Enquanto o domínio não estiver definido, a prévia usa `noindex, nofollow`.

Edite `lib/content.ts`:

- `client.trainerPhoto`: foto da academia na Hero (`/images/matheus/matheus-hero.webp`). `client.trainerAboutPhoto`: foto de jiu-jítsu no Sobre (`/images/matheus/matheus-sobre.webp`). Cada campo é independente; `null` preserva o fallback de equipamentos da respectiva seção.
- `client.trainerBio` e `client.professionalRegistration`: texto e registro efetivamente confirmados. Nenhum registro extraído da referência é publicado.
- `services`: confirme as modalidades, descrições e disponibilidade; remova as não oferecidas. Retire os rótulos demonstrativos dos componentes somente após essa validação.
- `results`: adicione `{name, before, after, description}` apenas com autorização. Ativa um comparador de imagens com controle nativo por mouse, toque e teclado.
- `testimonials`: adicione `{name, text}` autorizados. Ativa navegação anterior/próximo, sem estrelas ou avaliações inventadas.
- `videos`: adicione `{title, src, poster}` de vídeos autorizados. Ativa o modal com player nativo; prefira arquivos leves e legendas reais. Sem arquivos fornecidos, nenhum botão de vídeo fictício é exibido.
- `faqs`: substitua respostas condicionais por informações aprovadas.

O wordmark é tipográfico e provisório; substitua `Wordmark` pelo logotipo oficial quando fornecido. O mockup de celular é uma interface conceitual interativa e está explicitamente identificado; não representa app próprio ou integração disponível.

## Materiais e pendências

Os dois ZIPs recebidos contêm referências conceituais com rostos, interfaces e textos embutidos. Foram analisados como direção de arte, sem incorporá-los como página ou fotos reais. As imagens conceituais de apoio foram geradas por IA, retratam apenas objetos e estão identificadas como ilustrativas. Não representam um local de atendimento confirmado. As duas fotografias reais mais recentes estão descritas na seção abaixo.

As duas fotografias reais de Matheus foram fornecidas pelo cliente e integradas. Antes de publicação comercial: confirmar WhatsApp, domínio, logo, história/formação/registro profissional, modalidades, funcionamento da avaliação, ferramentas de acompanhamento, depoimentos, resultados e vídeos autorizados. Revisar a política de privacidade conforme as operações reais do responsável. Não há preços, certificações, métricas ou transformações inventadas.

A abertura dura cerca de 1,65 segundo, tem botão de pular, não toca áudio e não se repete na mesma sessão. Animações leves usam CSS, IntersectionObserver e um único ciclo de requestAnimationFrame para o scroll. Parallax e tilt são limitados ao desktop; a linha do método acompanha o progresso, o smartphone muda de perspectiva e o manifesto expande sem prender a rolagem. Não há bibliotecas de animação ou 3D pesadas. O modo de movimento reduzido desativa os efeitos. Os diálogos nativos oferecem Escape e contenção de foco.

A aplicação e o ambiente foram preparados localmente. Publicação do site, configuração de domínio e publicação do snapshot do ambiente são operações separadas.

## Reformulação — Built by Discipline

Hero com composição própria para mobile, imagens de cada seção sem repetição, serviços assimétricos no desktop e compactos no celular. Sem material real de alunos, Resultados apresenta conteúdo editorial sobre constância; Depoimentos permanece preparado e a apresentação pública utiliza uma faixa de conteúdo institucional.

Configure as imagens e a galeria em `media`, dentro de `lib/content.ts`. Para o manifesto expansivo, `media.featuredVideo` aceita `{src, captions?}` de arquivo autorizado. O player só abre por interação, começa sem som e mantém controles nativos. Enquanto o valor for `null`, a composição estática permanece completa, sem botão fictício de reprodução. Use legendas para vídeos com fala.

O menu mobile é um diálogo com bloqueio de scroll, Escape, retorno de foco ao botão e fechamento ao navegar ou ampliar para desktop. Todos os diálogos mantêm o foco no teclado. O questionário preserva escolhas e nome ao voltar; o resumo não compartilha dados sem ação explícita.

A auditoria e a comparação local estão documentadas em `docs/REFORMULATION.md`.

## Fotografias reais de Matheus Dias

A Hero utiliza a foto de braços cruzados na academia; Sobre utiliza a foto de quimono branco durante o jiu-jítsu. A galeria destaca as duas fotos, uma única vez cada, acompanhadas por um cenário conceitual secundário. Fotos reais e imagens de IA são identificadas separadamente nos textos e na ampliação.

Os PNGs enviados estão intactos em `assets/originals/matheus/`. O manifesto registra as dimensões e os hashes SHA-256. Os WebP de origem em `public/images/matheus/` foram codificados sem perdas, conservando exatamente os pixels dos PNGs, sem corte, retoque generativo, super-resolução ou ampliação. Não houve alteração de rosto, corpo, inscrição da camiseta ou ambiente. Next Image entrega versões responsivas comprimidas com qualidade 85; os originais arquivados não são carregados pela página.

O tratamento visual usa somente contraste, luminosidade e saturação moderados por CSS, mais gradientes sobrepostos. O desktop mantém a fotografia íntegra em uma área própria à direita. No mobile, a área fotográfica quadrada vem após o texto e os botões, evitando sobreposição com o rosto. A foto de jiu-jítsu mantém a proporção e o contexto, sem atribuir títulos, graduação ou conquistas.

A integração e sua validação estão descritas em `docs/PHOTOGRAPHY.md`.

## Correção da Hero desktop e mobile

O diagnóstico, a consolidação do CSS e os testes com carregamento atrasado estão em `docs/HERO_CORRECTION.md`. A versão mobile segue identificação, título, subtítulo, CTA, fotografia e continuidade, sem depender de `order` ou altura fixa. A faixa pode ser pausada e fica estática quando há preferência por movimento reduzido.
