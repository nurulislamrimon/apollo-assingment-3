import { Types } from "mongoose";
import { IFilters } from "../../../interfaces/filter.interface";
import { IPaginationOptions } from "../../../interfaces/pagination.interface";
import {
  filtersAndSearchControll,
  paginationControll,
} from "../../../shared/whereconditions";
import { cowSearchableFields } from "./cow.constants";
import ICow from "./cow.interfaces";
import Cow from "./cow.model";

export const createNewCowService = async (payload: ICow) => {
  const result = await Cow.create(payload);
  return result;
};

export const getAllCowService = async (
  filters: IFilters,
  pagination: IPaginationOptions
) => {
  const conditions = filtersAndSearchControll(filters, cowSearchableFields);
  const { sort, limit, page, skip } = paginationControll(pagination);
  const data = await Cow.find(conditions).sort(sort).skip(skip).limit(limit);
  const count = await Cow.countDocuments(conditions);
  return {
    meta: {
      limit,
      page,
      count,
    },
    data,
  };
};

export const getACowService = async (id: Types.ObjectId) => {
  const result = await Cow.findOne({ _id: id });
  return result;
};

export const updateACowByIdService = async (
  id: Types.ObjectId,
  payload: Partial<ICow>
) => {
  const result = await Cow.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  return result;
};

export const deleteACowByIdService = async (id: Types.ObjectId) => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};
