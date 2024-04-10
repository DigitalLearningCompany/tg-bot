import { bold, fmt } from "@grammyjs/parse-mode";

const introMessage = (name: string) => fmt`
👋🏻 ${name}, muito prazer… 

🚨${bold(
  "Como te disse no vídeo acima"
)}, você só precisa seguir um simples passo a passo para ganhar tudo isso: 

🎁 Vaga grátis no grupo VIP de ${bold(
  "ALAVANCAGEM DE BANCA SEM GALE"
)} com 6 sessões ao vivo por dia comigo + ${bold(
  "AULA"
)} minha te ensinando tudo sobre o mercado!  

🎁 ${bold(
  "Depósito feito por mim na sua conta da corretora"
)} (Não é sorteio, é garantido que vou fazer, é só seguir o passo a passo e pronto!)

⬇️ Últimas vagas/horas para você receber tudo isso. ${bold("Clique no botão abaixo")}, entre no grupo, e siga o passo a passo AGORA!
`;

export default introMessage;
