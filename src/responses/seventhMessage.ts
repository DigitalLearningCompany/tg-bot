import { bold, fmt } from "@grammyjs/parse-mode";

const seventhMessage = (name: string) => fmt`
💵 ${name} Mais de ${bold(
  "R$ 7.000,00"
)} foi o que o meu membro Lucas ganhou na última sessão de alavancagem de banca que fizemos. ${bold(
  "Detalhe: Ele começou com 68 🤣"
)}

🤹🏻 Os meus membros da VIP adoram me chamar de mágico, mas eu não sou mágico, ${bold(
  "eu sou apenas o 01 do mercado financeiro!"
)}

🚦O sinal ainda tá verde, e as vagas ${bold(
  "GRATUITAS"
)} serão encerradas em poucas horas… ${bold(
  "Clique no botão abaixo e siga o passo a passo!"
)}
`;

export default seventhMessage;
