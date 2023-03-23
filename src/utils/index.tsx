// 检测字符串中有多少个"{"和"}"符号，取最小值
export const getNum = (str: string) => {
  const frontCount = (str.match(/{/g) || []).length;
  const behindCount = (str.match(/}/g) || []).length;
  return Math.min(frontCount, behindCount);
};

// 去除字符串中的"{"和"}"符号
export const delSymbol = (str: string) => {
  return str.replace(/[{}]/g, '');
};
