# Treinamento na Prática

Seção inserida após Quem Sou Eu, em `components/TrainingPractice.tsx`, com estilos isolados em `app/training-practice.css`.

As quatro imagens enviadas foram examinadas individualmente. A cena de jiu-jítsu em ação recebe maior destaque por mostrar o movimento e o contexto completo. O retrato fechado complementa a cena; a montagem original permanece íntegra como registro pessoal, sem promessas de transformação ou resultados atribuídos. O retrato horizontal no tatame encerra a composição.

Originais intactos e hashes SHA-256 estão em `assets/originals/practice/`. Os WebP mantêm as dimensões e proporções originais, sem retoque, ampliação ou remoção das marcas do fotógrafo. A compressão usa qualidade 85; Next Image fornece derivados responsivos com carregamento lazy. Os quatro WebP somam aproximadamente 337 KiB.

Desktop: grade assimétrica com imagem principal vertical e três imagens complementares em escalas diferentes. Mobile: sequência vertical de largura ampla, respeitando as proporções naturais. Nenhuma imagem é forçada a preencher uma caixa com corte. Contraste e saturação recebem ajustes discretos por CSS; o hover amplia apenas 1,2% e funciona somente em dispositivos com hover. A revelação usa o IntersectionObserver existente; movimento reduzido desativa efeitos.

Capturas revisadas: `/workspace/scratch/practice-390.png`, `/workspace/scratch/practice-768.png` e `/workspace/scratch/practice-1440.png`. Os testes da seção verificam posição no documento, carregamento, proporção das quatro imagens, destaque principal e ausência de overflow em 320, 390, 768 e 1440 px.

Validação concluída: lint, TypeScript, build de produção e `git diff --check` aprovados. Os 54 testes de navegador passaram, incluindo acessibilidade, WhatsApp, questionário, menu, animações e responsividade. Alterações ainda locais, sem publicação.
