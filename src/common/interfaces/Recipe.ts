export interface Recipe {
  id: number;
  imageUrl: string;
  title: string;
  time: number;
  portions: number;
  ingredients: string[];
  steps: string[];
}
