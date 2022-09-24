import { faker } from "@faker-js/faker";
import express from "express";

const app = express();
const port = 3000;

const ingredients = [
  {
    id: 1,
    name: "Alface",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/alface.png",
  },
  {
    id: 2,
    name: "Berinjela",
    image:
      "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/berinjela.png",
  },
  {
    id: 3,
    name: "Cenoura",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/cenoura.png",
  },
  {
    id: 4,
    name: "Ovos",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/ovos.png",
  },
  {
    id: 5,
    name: "Queijo",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/queijo.png",
  },
  {
    id: 6,
    name: "Banana",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/banana.png",
  },
  {
    id: 7,
    name: "Brocolis",
    image:
      "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/brocolis.png",
  },
  {
    id: 8,
    name: "Farinha",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/farinha.png",
  },
  {
    id: 9,
    name: "Páprica",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/paprica.png",
  },
  {
    id: 10,
    name: "Tomate",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/tomate.png",
  },
  {
    id: 11,
    name: "Batata",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/batata.png",
  },
  {
    id: 12,
    name: "Carne",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/carne.png",
  },
  {
    id: 13,
    name: "Milho",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/milho.png",
  },
  {
    id: 14,
    name: "Pepino",
    image: "https://s3.us-east-1.wasabisys.com/estoqueproprio/temp/pepino.png",
  },
];

const createDataset = () => {
  let data = [];

  for (let index = 1; index <= 100; index++) {
    const image = faker.image.food();
    const title = faker.commerce.productName();

    const steps = Array.from({ length: Number(faker.random.numeric(1)) }, () =>
      faker.lorem.sentence()
    );

    const recipeIngredients = faker.helpers.arrayElements(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      Number(faker.random.numeric(1))
    );

    data.push({
      id: index,
      title,
      imageUrl: `${image}?random=${Math.random()}`,
      steps,
      ingredientsRef: recipeIngredients,
      ingredients: recipeIngredients.map(
        (ingredient) => ingredients[ingredient - 1].name
      ),
      time: faker.helpers.arrayElement([10, 20, 30, 40, 50, 60]),
      portions: faker.helpers.arrayElement([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      ]),
    });
  }

  return data;
};

async function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

const recipes = createDataset();

app.get("/ingredients", (req, res) => {
  res.send(ingredients);
});

app.get("/recipes", async (req, res) => {
  await delay();

  let filteredRecipes = recipes;

  if (req.query.i) {
    const ingredients = req.query.i.split(",").map(Number);

    const findRecipes = filteredRecipes.filter((recipe) => {
      return recipe.ingredientsRef.every((elem) => ingredients.includes(elem));
    });

    filteredRecipes = findRecipes;
  }

  if (req.query.s) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.title.toLocaleLowerCase().includes(req.query.s.toLocaleLowerCase())
    );
  }

  res.send(filteredRecipes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
