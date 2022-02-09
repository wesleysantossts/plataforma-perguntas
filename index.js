const express = require("express"), app = express(); 
// const bodyParser = require("body-parser"); - DEPRECATED
const connection = require("./database");
// Para criar o model no BD, basta apenas importar o model aqui que ele já é criado automaticamente.
const Pergunta = require("./database/Model/Pergunta");
const Resposta = require("./database/Model/Resposta");

//- Database
// authenticate - testando a conexão do database
connection.authenticate()
  .then(()=>{console.log("Conexão feita com o BD.")})
  .catch((error)=>{console.log("Erro na conexão com o bd.", error)})

//- Middlewares
// Usado para habilitar o EJS para ser renderizado pelo Node. Depois disso, basta criar uma pasta chamada "views" e colocar arquivos com a extensão ".ejs" para funcionar.
app.set("view engine", "ejs");
// app.use(express.static("pasta de arquivos estaticos"))Usado para fazer o express aceitar arquivos estáticos (css, imagens, javascript de front).
app.use(express.static("public"));
// body-parser - usado para fazer o Node ler dados do front.
// app.use(bodyParser.urlencoded({extended: false})) - DEPRECIADO
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json()) - DEPRECIADO
app.use(express.json());

//- Rotas

app.get("/", (req, res)=>{
  //> CRUD - READ - .findAll({raw: true, order:[["id", "DESC"]]})
  Pergunta.findAll({
    raw: true, // raw: true - mostrar só os dados "crus", sem informações adicionais
    order:[["id", "DESC"]] // Ordenação da busca: 1º parametro - campo que será ordenado; 2º parametro - ordem = "ASC" = crescente || "DESC" = decrescente
  })
    .then((perguntas)=>{
      console.log(perguntas);

      // Para usar os dados das perguntas no HTML, basta passar como segundo paramentro da função render, entre chaves, o parametro do "then". 
      res.render("home", {perguntas})
    })
});

// app.get("/:nome/:lang", (req, res)=>{
//   // res.render("pasta/arquivo") - usado para renderizar (desenhar na tela) o EJS com o Node. Obs.: o "render" busca automaticamente a pasta "views" para fazer a renderização, pastas dentro dela (para chegar no arquivo) deve-se passar o caminho com o nome da pasta dentro desse método.
//   // res.render("index")
  
//   // render("página", {variáves passadas}) - é possível passar variaveis por esse método render, basta inseri-las dentro do objeto (como propriedades-valores) que é passado como segundo parametro do método "render", depois pegar essas propriedades e usa-las no HTML. E eles podem ser dinamicos caso eu pegue esses valores da rota ou usando alguma requisição.
//   let nome = req.params.nome;
//   let lang = req.params.lang;
//   let exibirMsg = false;
//   let produtos = [
//     {nome: "Coca-cola", preco: 5.50},
//     {nome: "Arroz", preco: 20},
//     {nome: "Feijão", preco: 10}
//   ];
  
//   res.render("teste", {
//     nome,
//     lang,
//     empresa: "Barbacodes",
//     inscritos: 20000,
//     msg: exibirMsg,
//     produtos
//   })
// });

app.get("/perfil", (req, res)=>{
  res.render("principal/perfil")
});

app.get("/perguntar", (req, res)=>{
  res.render("perguntar");
})

// Recebendo os dados do front pelo formulário
app.post("/salvarpergunta", (req,res)=>{
  // Pegando os dados pelo atributo "name" passado no front.
  let titulo = req.body.titulo;
  let {pergunta} = req.body;

  //> CRUD - CREATE - .create({propriedadesModel: dadosFront}) - usado para salvar dados no BD
  Pergunta.create({
    titulo: titulo,
    descricao: pergunta
  })
  .then(()=>{
    // .redirect("path") - usado para redirecionar o usuario para a rota que eu quiser
    res.redirect("/")
  })
  // res.send(`Formulário enviado com sucesso! ${titulo} ${pergunta}`)
}); 

app.get("/pergunta/:id", (req, res)=>{
  const {id} = req.params;

  // .findOne({where: {[parametro desejado]}}) - usado para localizar um item no banco de dados.
  Pergunta.findOne({where: {id}})
    .then((pergunta)=>{
      if(pergunta != undefined){
        // res.render("pergunta", {pergunta});

        Resposta.findAll({
          where: { perguntaId: pergunta.id },
          order: [["id", "DESC"]],
        })
        .then(respostas => {
          res.render("pergunta", {
            pergunta,
            respostas: respostas
          })
        })
      }else{
        res.redirect("/");
      } 
    });
});

app.post("/responder", (req, res)=>{
  const {corpo} = req.body;
  const {pergunta} = req.body;

  // Linkando a resposta com o id da pergunta.
  Resposta.create({
    corpo,
    perguntaId: pergunta
  }).then(()=>{
    res.redirect(`/pergunta/${pergunta}`)
  })
});

//- Conexão do servidor
app.listen(4000, ()=> console.log("Servidor rodando..."));