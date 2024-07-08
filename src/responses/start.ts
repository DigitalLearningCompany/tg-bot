import { bold, fmt } from "@grammyjs/parse-mode";

const introMessage = (name: string) => fmt`
🏆 ${name}, PARABÉNS, você conseguiu! Leia com atenção: 

✅ ${bold("Você já está na fila de espera para a sua alavancagem privada")}, assim que chegar a sua vez, eu vou te chamar no privado, não será esse robô, EU mesmo te chamarei no privado aqui do Telegram, esse robô serve apenas para ir te avisando em que lugar da fila de espera você está. (É rápido) 

🚨Enquanto não chega a sua vez, entre no meu grupo VIP, eu faço 3 lives ao vivo de alavancagem por dia lá dentro e você pode usar essas lives para lucrar e aquecer a sua conta também. ${bold("(É obrigatório estar no grupo VIP)")}

💰 ${bold("Lembre-se:")} Quanto mais aquecida a sua conta estiver, maior será o seu lucro na alavancagem privada! 

⬇️ ${bold("Clique no botão abaixo para entrar no grupo VIP")} e leia a mensagem fixada do grupo. ${bold("(Na mensagem fixada tem uma aula ensinando a aquecer a conta)")}
`;

export default introMessage;
