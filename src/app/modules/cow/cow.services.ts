import ICow from "./cow.interfaces";
import Cow from "./cow.model";

export const createNewCowService = async (payload: ICow) => {
  const result = await Cow.create(payload);
  return result;
};
