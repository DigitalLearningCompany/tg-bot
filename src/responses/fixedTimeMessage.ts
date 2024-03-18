import { bold, fmt } from "@grammyjs/parse-mode";

const fixedTimeMessage = fmt`
🔊 ${bold("ESTOU AO VIVO NA LIVE!")}

🎁 Vou ${bold(
    "DEPOSITAR"
)} na conta de quem participar e estiver comigo agora ao vivo na live… 

⬇️ ${bold("Clique no botão abaixo para participar da live agora!")}
`;

export default fixedTimeMessage;
