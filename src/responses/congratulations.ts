import { bold, fmt } from "@grammyjs/parse-mode";

const congrats = (name: string) => fmt`
🥂 ${bold(
  "PARABÉNS"
)} ${name}, pode comemorar porque agora você finalmente vai poder começar a ganhar dinheiro. ${bold(
  "Vamos brindar!"
)}

✅ Aguarde pois o suporte assim que tiver disponível vai validar o seu passo a passo e ${bold(
  "se você tiver feito tudo certo"
)} o suporte irá te enviar o acesso ao grupo VIP de alavancagens. ${bold(
  "Te vejo lá dentro!"
)}
`;

export default congrats;
