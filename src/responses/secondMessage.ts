import { bold, fmt } from "@grammyjs/parse-mode";

const secondMessage = (name: string) => fmt`
👋🏻 ${name} , tô de voltaaaaa. Quero saber se deu tudo certo… Eu me preocupo com você… Mas antes de me dizer… 

💰${bold(
    "Veja o depoimento acima"
)}, o Pedrão já recebeu tudo aquilo que te falei que iria te entregar e ainda eu já fiz um depósito bem “gordo” na conta dele. O que você acha de ser o próximo? 

🥂Entre no grupo logo e muito em breve será você brindando comigo. ${bold(
    "Clique no botão abaixo para fazer o passo a passo!"
)}
`;

export default secondMessage;
