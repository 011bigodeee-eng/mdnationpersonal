# Integração das fotografias reais — Matheus Dias

O pacote recebido contém duas fotografias identificadas pelo cliente: academia, com camiseta preta e braços cruzados; e prática de jiu-jítsu, com quimono branco.

## Preservação e otimização

| Origem                                | Dimensões | Destino principal               |
| ------------------------------------- | --------- | ------------------------------- |
| Captura de tela 2026-11-07 111557.png | 869 × 867 | Hero e destaque da galeria      |
| Captura de tela 2026-11-07 111430.png | 873 × 885 | Sobre e segunda foto da galeria |

Os originais foram copiados sem alterações para `assets/originals/matheus/`. O `manifest.json` registra seus hashes SHA-256 e as dimensões. Os WebP de origem foram codificados sem perdas. Uma comparação dos pixels RGBA decodificados confirmou igualdade integral com cada PNG.

Não houve retoque generativo, super-resolução, alteração corporal, modificação de rosto/expressão, remoção de pessoas, substituição do ambiente ou mudança das inscrições da roupa. Os arquivos não foram ampliados. Next Image fornece derivados responsivos com qualidade 85, enquanto os arquivos de origem continuam intactos.

A apresentação utiliza CSS com contraste 1,025, luminosidade 0,98 e saturação 0,95 nas seções principais. Gradientes e vinhetas são camadas de interface, sem pintar ou substituir o cenário original da fotografia.

## Composição

- Hero: fotografia da academia à direita no desktop, com encaixe proporcional. No mobile, uma área quase quadrada independente após título e CTA mantém a cabeça visível e evita texto sobre o rosto.
- Sobre: foto de jiu-jítsu com a proporção original, ambiente preservado e quadro editorial sobreposto apenas na borda inferior. O texto não atribui títulos, faixas, graduação, conquistas ou oferta de aulas de luta.
- Galeria: as duas fotos reais são protagonistas. Cada foto aparece uma vez na sua seção principal e uma vez na galeria. Uma imagem conceitual de equipamentos permanece como apoio secundário, identificada como IA.
- Ampliação: fotos reais têm descrição própria; a imagem conceitual mantém seu aviso. Os arquivos aparecem completos na visualização ampliada.
- Serviços, método, formulário, FAQ, CTA, introdução e contatos foram preservados. O rodapé reforça o nome do treinador. Open Graph usa a foto real quando há domínio de produção configurado.

## Validação

A suíte existente de navegação, questionário, teclado, animações e responsividade é mantida. Os novos cenários verificam os caminhos de cada foto, a projeção da área da cabeça dentro do enquadramento, ausência de interseção entre rosto e título/CTA, proporção da área mobile, carregamento e ampliação correta na galeria.

As coordenadas utilizadas nos testes são referências manuais de composição da fotografia fornecida; não há reconhecimento facial ou alteração da imagem. A inspeção visual em capturas complementa essas verificações geométricas.

Capturas da versão anterior: `/workspace/scratch/md-after-1440.png` e `md-after-390.png`. Capturas da integração: `/workspace/scratch/md-photos-1440.png` e `md-photos-390.png`, além das demais larguras.

## Resultado

- Build de produção, lint, TypeScript e verificação de whitespace aprovados.
- 29 cenários de navegador aprovados, incluindo todos os fluxos existentes e os novos testes de fotografia. Após o ajuste final das camadas de vinheta, 11 cenários de fotografia, galeria, movimento e acessibilidade foram repetidos e aprovados.
- As onze larguras da suíte anterior continuam cobertas; os novos testes de cabeça/rosto incluem 320, 360, 375, 390, 430, 768, 1440 e 1920 px.
- Nenhum erro de página foi detectado na suíte de responsividade; imagens carregadas e proporções verificadas.
- Conferência visual de Hero, Sobre e galeria em desktop e mobile realizada nas capturas locais.
- A derivação responsiva da Hero em 828 px, qualidade 85, respondeu HTTP 200 e 69.469 bytes. Os PNGs arquivados não são transferidos ao visitante.
- Originais e WebP de origem com igualdade integral de pixels RGBA, sem ampliação ou retoque generativo.

Permanecem pendentes WhatsApp comercial, logo definitivo, biografia/formação/registro profissional e confirmação das modalidades. A fotografia esportiva não foi utilizada para inferir graduações, títulos ou oferta de aulas de jiu-jítsu.
