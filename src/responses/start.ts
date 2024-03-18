import { bold, fmt } from "@grammyjs/parse-mode";

const introMessage = (name: string) => fmt`
🤑Fala ${name}, muito prazer! 

🚨${bold(
  "Como te disse no vídeo acima"
)}, eu vou te entregar tudo isso sem te cobrar nada: 

🎁 Vaga grátis no grupo VIP de ${bold(
  "ALAVANCAGEM DE BANCA SEM GALE"
)} com 3 sessões ao vivo por dia!  

🎁 Código exclusivo para você ter qualquer depósito seu na corretora ${bold(
  "DOBRADO"
)}! 

🎁 ${bold(
  "Depósito feito por mim na sua conta da corretora"
)} (Não é sorteio, é garantido que vou fazer, é só entrar no grupo agora!) 

🏆 Últimas vagas gratuitas para receber tudo isso, daqui 24 horas será cobrado R$ 5.000,00. ${bold(
  "Clique no botão abaixo e entre agora no grupo!"
)}
`;

export default introMessage;
