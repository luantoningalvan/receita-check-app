import alface from "./images/alface.png";
import berinjela from "./images/berinjela.png";
import cenoura from "./images/cenoura.png";
import ovos from "./images/ovos.png";
import queijo from "./images/queijo.png";
import banana from "./images/banana.png";
import brocolis from "./images/brocolis.png";
import farinha from "./images/farinha.png";
import paprica from "./images/paprica.png";
import tomate from "./images/tomate.png";
import batata from "./images/batata.png";
import carne from "./images/carne.png";
import milho from "./images/milho.png";
import pepino from "./images/pepino.png";

import { ImageURISource } from "react-native";

export type Ingredient = {
  id: number;
  name: string;
  image: ImageURISource;
};

export const INGRENDIENTS = [
  {
    id: 1,
    name: "Alface",
    image: alface,
  },
  {
    id: 2,
    name: "Berinjela",
    image: berinjela,
  },
  {
    id: 3,
    name: "Cenoura",
    image: cenoura,
  },
  {
    id: 4,
    name: "Ovos",
    image: ovos,
  },
  {
    id: 5,
    name: "Queijo",
    image: queijo,
  },
  {
    id: 6,
    name: "Banana",
    image: banana,
  },
  {
    id: 7,
    name: "Brocolis",
    image: brocolis,
  },
  {
    id: 8,
    name: "Farinha",
    image: farinha,
  },
  {
    id: 9,
    name: "Páprica",
    image: paprica,
  },
  {
    id: 10,
    name: "Tomate",
    image: tomate,
  },
  {
    id: 11,
    name: "Batata",
    image: batata,
  },
  {
    id: 12,
    name: "Carne",
    image: carne,
  },
  {
    id: 13,
    name: "Milho",
    image: milho,
  },
  {
    id: 14,
    name: "Pepino",
    image: pepino,
  },
] as const;
