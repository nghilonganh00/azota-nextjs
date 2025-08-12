import { IHomework } from "@/interfaces";

const HomeworkUtils = {
  groupByCreatedAt: (listHomework: IHomework[]) => {
    if (!listHomework) return {};

    return listHomework.reduce((groups: { [key: string]: IHomework[] }, homework: IHomework) => {
      const date = homework.createdAt;
      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(homework);
      return groups;
    }, {});
  },
};

export default HomeworkUtils;
