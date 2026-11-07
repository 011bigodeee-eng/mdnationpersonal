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
      "Uma proposta de atenção individual durante o treino, com orientação próxima em cada etapa.",
    image: "/images/strength.webp",
    icon: "dumbbell",
  },
  {
    title: "Consultoria online",
    tag: "02 / ONDE VOCÊ ESTIVER",
    description:
      "Uma possibilidade de organizar sua rotina de treinamento com orientação à distância.",
    image: "/images/detail.webp",
    icon: "monitor",
  },
  {
    title: "Planejamento personalizado",
    tag: "03 / SEU PRÓXIMO PASSO",
    description:
      "Uma proposta de planejamento que considera objetivos, experiência e rotina.",
    image: "/images/gym.webp",
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
    "A proposta apresentada nesta prévia é de atenção individual. Matheus poderá explicar como a avaliação e o planejamento se aplicam ao seu caso antes da contratação.",
  ],
  [
    "Existe atendimento online?",
    "As modalidades desta página são demonstrativas. Consulte Matheus para confirmar se há atendimento online e conhecer as condições disponíveis.",
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
    "Os critérios, o formato e a disponibilidade da avaliação devem ser confirmados com Matheus. Não é necessário enviar informações médicas neste site.",
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
