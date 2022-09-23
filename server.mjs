import { faker } from "@faker-js/faker";
import express from "express";

const app = express();
const port = 3000;

const ingredients = [
  { id: 1, name: "Ovos" },
  { id: 2, name: "Leite" },
  { id: 3, name: "Óleo" },
  { id: 4, name: "Farinha" },
  { id: 5, name: "Chocolate em pó" },
  { id: 6, name: "Manteiga" },
  { id: 7, name: "Polvilho" },
  { id: 8, name: "Tomate" },
  { id: 9, name: "Leite condensado" },
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
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      Number(faker.random.numeric(1))
    );

    data.push({
      id: index,
      title,
      imageUrl: `${image}?random=${Math.random()}`,
      steps,
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

const recipes = createDataset();

app.get("/ingredients", (req, res) => {
  res.send(ingredients);
});

app.get("/recipes", (req, res) => {
  res.send(recipes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
