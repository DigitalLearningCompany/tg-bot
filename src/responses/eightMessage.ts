import { bold, fmt } from "@grammyjs/parse-mode";

const eightMessage = (name: string) => fmt`
👀 ${name} Veja com seus próprios olhos ${bold(
    "como funciona uma sessão ao vivo de alavancagem dentro da VIP…"
)} Será que vale a pena lucrar dessa forma sem pagar 1 real? Você sabe que sim! 

💰Mais de ${bold(
    "R$ 50.000,00"
)} dentro da minha corretora e mais milhares de reais dentro da corretora dos meus queridos membros… 

🎁 Eu ainda quero te entregar tudo que te prometi ${bold(
    "DE GRAÇA"
)}, mas confesso que o tempo tá acabando. ${bold(
    "Clique no botão abaixo e siga o passo a passo!"
)}
`;

export default eightMessage;
