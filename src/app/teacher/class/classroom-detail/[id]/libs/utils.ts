import { IGroupedHomework, IHomework } from "./interface";

const HomeworkUtils = {
  groupByCreatedAt: (listHomework: IHomework[]): IGroupedHomework => {
    if (!listHomework) return {};

    const groupedHomework: IGroupedHomework = listHomework.reduce(
      (groups: { [key: string]: IHomework[] }, homework: IHomework) => {
        const date = homework.createdAt;
        if (!groups[date]) {
          groups[date] = [];
        }

        groups[date].push(homework);
        return groups;
      },
      {}
    );

    return groupedHomework;
  },
};

export default HomeworkUtils;
