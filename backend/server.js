import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = "mongodb+srv://renanzin170:renanzin170@urlshortener.vcfmodq.mongodb.net/?retryWrites=true&w=majority&appName=UrlShortener";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("RODANDO BANCO DE DADOS!");
  } catch (err) {
    console.log("Erro ao conectar ao db: ", err);
    // Tentar reconectar após um tempo
    setTimeout(connectDB, 5000);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend do encurtador funcionando!");
});

function generateCode(){
  let text = '';
  const posible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for(let i = 0 ; i < 10 ; i++){
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
