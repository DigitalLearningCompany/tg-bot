import { bold, fmt } from "@grammyjs/parse-mode";

const fifthMessage = (name: string) => fmt`
💵 ${name} Como eu sempre digo, eu gosto de provar: ${bold(
    "R$ 25.000,00 acabou de cair na minha conta"
)}, resolvi sacar esse valor da corretora depois de uma sessão de alavancagem na VIP com os meus membros! 

🫡 Minha missão é servir as pessoas do bem, e eu quero te ${bold(
    "SERVIR"
)}. O que você acha de aproveitar a oportunidade ${bold(
    "100% GRATUITA"
)} que eu tô te dando de alavancar todos os dias ao vivo comigo? Testa ué… 

🚀 Sua vida financeira pode decolar em poucos dias, mas você precisa ter atitude. ${bold(
    "Clique no botão abaixo e faça o passo a passo!"
)}
`;

export default fifthMessage;
