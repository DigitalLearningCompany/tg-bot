import { bold, fmt } from "@grammyjs/parse-mode";

const thirdMessage = (name) => fmt`
✅ ${name}, Mais uma sessão ao vivo dentro da VIP ${bold(
    "positiva"
)}, e mais uma ${bold("banca alavancada")}!

💰${bold("Resultado")}: 8x0 - DE R$ 60,00 PARA R$ 6.653,45💰

👀 ${bold(
    "No vídeo acima"
)} eu te mostrei, aqui eu não te escondo nada. E eu ainda sigo te esperando pra fazer o mesmo com o ${bold(
    "SEU DINHEIRO"
)}!

⬇️ ${bold(
    "Clique no botão abaixo para fazer o passo a passo!"
)} Seu futuro vai te agradecer!
`;

export default thirdMessage;
