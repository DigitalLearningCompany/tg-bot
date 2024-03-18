import { bold, fmt } from "@grammyjs/parse-mode";

const fourthMessage = (name: string) => fmt`
⏰ ${name} O tempo tá passando e as vagas estão acabando… Não seja bobo, ${bold(
    "tempo é dinheiro!"
)} 

🏡 ${bold(
    "Veja o depoimento acima"
)}, a casa da mãe do nosso membro Rafael está sendo mobiliada por ele mesmo, e olha que ele só tem 19 anos de idade… Sua mãe não merece um conforto melhor? Isso quem tem que saber é você… 

💰A próxima família a ter a casa sendo mobiliada será a sua… ${bold(
    "Clique no botão abaixo e faça o passo a passo por eles!"
)}
`;

export default fourthMessage;
