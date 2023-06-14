import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export type TCategory = {
  categoryName: string;
  categoryIndex: number;
};

export interface ITask {
  task: string;
  id: string;
  category: TCategory;
}

export const categoryState = atom<TCategory[]>({
  key: "category",
  default: [
    {
      categoryName: "TODO",
      categoryIndex: 1,
    },
    {
      categoryName: "DOING",
      categoryIndex: 2,
    },
    {
      categoryName: "DONE",
      categoryIndex: 3,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const kanbanState = atom<ITask[]>({
  key: "kanban",
  default: [
    {
      task: "string",
      id: "11111111111",
      category: {
        categoryName: "TODO",
        categoryIndex: 1,
      },
    },

    {
      task: "string",
      id: "123afsafasf21",
      category: {
        categoryName: "DOING",
        categoryIndex: 2,
      },
    },

    {
      task: "string",
      id: "125asfasfasf2512",
      category: {
        categoryName: "DONE",
        categoryIndex: 3,
      },
    },
  ],
  effects_UNSTABLE: [persistAtom],
});
