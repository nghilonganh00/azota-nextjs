const ObjectUtil = {
  getObjectDepth: (obj: Record<string, unknown>): number => {
    let maxDepth = 1;

    const findDepth = (currentObj: unknown, currentDepth: number) => {
      if (typeof currentObj === "object" && currentObj !== null) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);

        for (const key in currentObj as Record<string, unknown>) {
          if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
            findDepth((currentObj as Record<string, unknown>)[key], currentDepth);
          }
        }
      }
    };

    findDepth(obj, 1);
    return maxDepth;
  },
};

export default ObjectUtil;
