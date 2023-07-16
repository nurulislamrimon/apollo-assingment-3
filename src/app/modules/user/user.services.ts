import { Types } from "mongoose";
import IUser from "./user.interfaces";
import User from "./user.model";
import { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { userSearchableFields } from "./user.constants";
import {
  paginationControll,
  filtersAndSearchControll,
} from "../../../shared/whereconditions";
import { IFilters } from "../../../interfaces/filter.interface";

export const getAllUsersService = async (
  filters: IFilters,
  pagination: IPaginationOptions
) => {
  const conditions = filtersAndSearchControll(filters, userSearchableFields);
  const { sort, limit, page, skip } = paginationControll(pagination);

  const user = await User.find(conditions).sort(sort).skip(skip).limit(limit);
  const count = await User.countDocuments(conditions);

  return {
    meta: {
      limit,
      page,
      count,
    },
    user,
  };
};
export const createNewUserService = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const getAUserByIdService = async (id: Types.ObjectId) => {
  const result = await User.findOne({ _id: id });
  return result;
};
export const updateAUserByIdService = async (
  id: Types.ObjectId,
  payload: Partial<IUser>
) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  return result;
};
export const deleteAUserByIdService = async (id: Types.ObjectId) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
