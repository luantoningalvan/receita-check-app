export interface GameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Category: {
        category: string;
      };
      Search: undefined;
      Ingredients: undefined;
    }
  }
}
