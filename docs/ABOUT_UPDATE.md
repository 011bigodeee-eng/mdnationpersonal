# Atualização — Quem Sou Eu

A seção apresenta o texto aprovado pelo cliente e os três pilares: treinamento individualizado, performance esportiva e evolução com estratégia. A Hero, os contatos comerciais e a galeria existente foram preservados.

As duas fotografias do ZIP foram arquivadas sem alteração em `assets/originals/matheus/`, com hashes no manifesto. Os derivados WebP preservam dimensões e enquadramento (1170 × 1514 e 1200 × 1600), sem ampliação, retoque corporal ou edição generativa. A compressão é com perdas, qualidade 88; Next Image serve tamanhos responsivos. O tratamento de apresentação usa apenas contraste e saturação discretos em CSS.

O retrato esportivo é a imagem principal. O segundo registro aparece em um quadro complementar menor, com as duas pessoas e o cenário preservados. A foto com troféu não é usada para atribuir classificação, título ou certificação.

Estilos isolados em `app/trainer-story.css`; revelação por IntersectionObserver aproveita o mecanismo existente. O quadro secundário tem profundidade por sombra e inclinação discreta. Preferência por movimento reduzido remove transições e inclinação. No mobile, a composição vira uma coluna com imagens proporcionais.

Capturas de revisão: `/workspace/scratch/trainer-story-1440.png` e `/workspace/scratch/trainer-story-390.png`. Testes cobrem a nova apresentação, proporção e limites das imagens em 320, 390, 768 e 1440 px; a suíte existente cobre também os fluxos comerciais e outras resoluções.

Validação: lint, TypeScript, build e diff check aprovados. A suíte completa executou 50 cenários: 49 passaram e um detectou contraste insuficiente nos números dos pilares. Após a correção para o vermelho claro da paleta, a nova build passou e os cinco cenários afetados (acessibilidade e apresentação nas quatro larguras) foram repetidos com sucesso. Desktop e mobile conferidos visualmente. Não houve publicação na Vercel.
