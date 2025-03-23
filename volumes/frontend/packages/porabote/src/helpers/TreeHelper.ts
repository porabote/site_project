export const buildLinearList = (source: any[], target: any[], level: number= 0) => {
  level++;
  source.forEach((item) => {
    item.level = level;
    target.push(item);
    if (item.children.length) {
      buildLinearList(item.children, target, level);
    }
  });
  return target;
}