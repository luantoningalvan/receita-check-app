import axios from "axios";

const api = axios.create({
  baseURL: "https://api.receitacheck.com.br",
});

export { api };
