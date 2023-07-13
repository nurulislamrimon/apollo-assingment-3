import IUser from "./user.interfaces";
import User from "./user.model";

export const createNewUserService = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
