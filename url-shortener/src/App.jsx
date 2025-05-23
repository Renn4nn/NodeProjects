import React, { useState } from "react";
import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:9090",
});

function App() {
  const [texto, setTexto] = useState("");

  async function enviar() {
    console.log(texto);
    try {
      const response = await app.post("/new", {
        url: texto,
      });
      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-[600px] p-8 border-2 border-red-400 rounded-2xl shadow-xl bg-white flex flex-col items-center">
        <h1 className="text-red-500 font-bold text-4xl mb-8 text-center">
          Encurtador de URL
        </h1>
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Digite a URL..."
            className="flex-1 text-lg px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all duration-200"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button
            className="ml-3 px-6 py-2 bg-red-500 text-white text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={enviar}
          >
            Enviar
          </button>
        </div>
        <h1 className="text-red-500 font-bold text-sm mt-8 text-center"></h1>
      </div>
    </div>
  );
}

export default App;
