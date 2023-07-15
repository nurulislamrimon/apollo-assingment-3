const pick = <T, k extends keyof T>(obj: T, keys: k[]): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && obj.hasOwnProperty(key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
