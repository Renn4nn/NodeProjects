import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend do encurtador funcionando!");
});

function generateCode(){
  let text = '';
  const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for(let i = 0 ; i < 5 ; i++){
    text += posible.charAt(Math.floor(Math.random() * posible.length));
  }
  return text;
}

app.post('/new', (req,res, next) => {
    const url = req.body.url;
    const code = generateCode();

    console.log("url: " + url)
    res.send("http://localhost:3000/" + code);
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
