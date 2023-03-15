import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TODO,
});

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryList = atom({
  key: "categoryList",
  default: ["TODO", "DOING", "DONE"],
  effects: [
    ({ setSelf, onSet }) => {
      const key = "todoLocal";
      const defaultKey = ["TODO", "DOING", "DONE"];
      const saveCategory = localStorage.getItem(key);
      if (saveCategory !== null) {
        const set = new Set([
          ...defaultKey,
          ...JSON.parse(saveCategory)["todo"].map((el: ITodo) => el.category),
        ]);
        setSelf([...set]);
      }
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
