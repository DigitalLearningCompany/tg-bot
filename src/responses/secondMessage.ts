import { bold, fmt } from "@grammyjs/parse-mode";

const secondMessage = (name: string, position: int) => fmt`
📲 ${name}, ${bold("sua posição na fila de espera: ")}${position} 

⚠️ ${bold("Atenção:")} Continue aquecendo a sua conta sozinho e também participando das lives ao vivo do grupo VIP, quanto mais aquecida estiver sua conta, maior será a multiplicação do seu dinheiro na sua alavancagem privada. (Caso sua conta não esteja aquecida, você voltará para o final da fila)
`;

export default secondMessage;
