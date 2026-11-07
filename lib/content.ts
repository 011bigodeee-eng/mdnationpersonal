export const client = {
  brand: "MD Nation",
  name: "Matheus Dias",
  instagram: "https://www.instagram.com/theusdias_treinador/",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  message:
    "Olá, Matheus! Conheci seu trabalho pelo site da MD Nation e gostaria de saber mais sobre o acompanhamento personalizado.",
  // Substitua somente por fotos reais e autorizadas. null mantém a composição de equipamentos.
  trainerPhoto: null as string | null,
  trainerBio: null as string | null,
  professionalRegistration: null as string | null,
};
export function whatsappUrl(message = client.message) {
  const number = client.whatsapp.replace(/\D/g, "");
  return /^\d{10,15}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;
}
export const services = [
  {
    title: "Personal presencial",
    tag: "01 / LADO A LADO",
    description:
      "A possibilidade de ter orientação próxima, com atenção ao movimento e ao seu processo.",
    image: "/images/service-strength.webp",
    imageAlt: "Halter sobre piso de academia. Imagem conceitual.",
    icon: "dumbbell",
  },
  {
    title: "Consultoria online",
    tag: "02 / ONDE VOCÊ ESTIVER",
    description:
      "Orientação à distância para aproximar seu objetivo da sua rotina, onde você estiver.",
    image: "/images/service-online.webp",
    imageAlt: "Notebook em um ambiente de treinamento. Imagem conceitual.",
    icon: "monitor",
  },
  {
    title: "Planejamento personalizado",
    tag: "03 / SEU PRÓXIMO PASSO",
    description:
      "Uma proposta de planejamento que considera objetivos, experiência e rotina.",
    image: "/images/service-plan.webp",
    imageAlt: "Caderno e equipamentos de planejamento. Imagem conceitual.",
    icon: "clipboard",
  },
];
export const method = [
  {
    title: "Avaliação",
    description:
      "Entender seu momento, sua rotina e o que você quer conquistar.",
  },
  {
    title: "Planejamento",
    description: "Traçar um caminho de treinamento alinhado ao seu perfil.",
  },
  {
    title: "Execução",
    description: "Colocar o plano em movimento, com atenção ao processo.",
  },
  {
    title: "Evolução",
    description:
      "Acompanhar o progresso e ajustar a direção quando necessário.",
  },
];
// Conteúdo demonstrativo: substituir após validação do treinador.
export const faqs = [
  [
    "Como funciona o acompanhamento?",
    "O primeiro passo é conversar com Matheus sobre seu objetivo e sua rotina. A estrutura, a frequência e as condições do acompanhamento serão confirmadas diretamente com o profissional.",
  ],
  [
    "O treinamento é personalizado?",
    "Objetivos, rotina e experiência são pontos de partida para essa conversa. Matheus explica como o planejamento pode se aplicar ao seu caso.",
  ],
  [
    "Existe atendimento online?",
    "Converse com Matheus para consultar a disponibilidade de atendimento online e entender o formato.",
  ],
  [
    "Como posso começar?",
    "Preencha o questionário de objetivos e use o contato comercial quando estiver configurado. Você também pode conhecer o perfil @theusdias_treinador no Instagram.",
  ],
  [
    "Preciso ter experiência para começar?",
    "Informe seu nível de experiência na primeira conversa. O profissional poderá avaliar o formato adequado para você; este site não prescreve exercícios.",
  ],
  [
    "Como funciona a avaliação inicial?",
    "O formato e os critérios são explicados diretamente por Matheus. Aqui, você pode compartilhar seu objetivo sem enviar dados médicos.",
  ],
];
export const results: {
  name: string;
  before: string;
  after: string;
  description: string;
}[] = [];
export const testimonials: { name: string; text: string }[] = [];
export const videos: { title: string; src: string; poster: string }[] = [];

/** Assets editoriais exclusivos por seção; substituir somente por material autorizado. */
export const media = {
  hero: "/images/hero-editorial.webp",
  about: "/images/about-ropes.webp",
  evolution: "/images/evolution.webp",
  film: "/images/film-still.webp",
  cta: "/images/final-corridor.webp",
  featuredVideo: null as { src: string; captions?: string } | null,
  gallery: [
    {
      src: "/images/gallery-chalk.webp",
      title: "A PREPARAÇÃO",
      caption:
        "Bacia de magnésio em um cenário de treinamento. Imagem conceitual.",
    },
    {
      src: "/images/gallery-pulley.webp",
      title: "A PRECISÃO",
      caption: "Detalhe de polia e cabo de equipamento. Imagem conceitual.",
    },
    {
      src: "/images/gym.webp",
      title: "O AMBIENTE",
      caption: "Composição de academia e anilhas. Imagem conceitual.",
    },
  ],
};
