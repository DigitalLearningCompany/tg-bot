import { bold, fmt } from "@grammyjs/parse-mode";

const tenthMessage = (name: string) => fmt`
🚨 ${name} ${bold(
    "ÚLTIMA CHANCE"
)}… Assista o vídeo acima, eu tenho um recado ${bold("DIRETAMENTE")} para você! 

🏆 Eu já te ${bold(
    "provei"
)} que sou o melhor, já te mostrei eu e meus queridos membros ${bold(
    "ganhando dinheiro ao vivo"
)}, e agora estou aqui para dizer que ou você muda de vida agora ou ${bold(
    "não muda NUNCA MAIS…"
)} 

🎁 ${bold("Vaga grátis")} no grupo VIP com 3 sessões ao vivo por dia

🎁 Código exclusivo para você ter qualquer depósito seu na corretora ${bold(
    "dobrado"
)}

🎁 Depósito feito por mim na ${bold(
    "sua conta"
)} da corretora (Não é sorteio, é garantido que vou fazer) 

⬇️ ${bold(
    "Clique no botão abaixo"
)} e faça o passo a passo agora! Essa é realmente a sua última chance e nas próximas mensagens que eu te enviar tudo isso estará sendo vendido por ${bold(
    "R$ 5.000,00."
)} Agora corre…
`;

export default tenthMessage;
