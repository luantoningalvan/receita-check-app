import axios from "axios";

const api = axios.create({
  baseURL: "https://api.receitacheck.com.br",
});

api.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmVjZWl0YS1jaGVjay1hcHAifQ.P0AIO3tFnFJvuGHEqR-hrcYEQsHXMPVcV57GUqwocmg";

export { api };
