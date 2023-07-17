import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../interfaces/pagination.interface";
import { paginationFields } from "../statics/pagination.static";
import { IFilters } from "../interfaces/filter.interface";

export const filtersAndSearchControll = (
  filter: IFilters,
  searchableFields: string[]
) => {
  const andConditions = [];
  const { searchTerm, ...filters } = filter;
  // search conditions
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([key, value]) => ({ [key]: value })),
    });
  }

  return andConditions.length ? { $and: andConditions } : {};
};

export const paginationControll = (pagination: IPaginationOptions) => {
  const { sortBy, sortOrder, page = 1, limit = 10 } = pagination;
  const sort: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder;
  } else {
    sort.createdAt = "desc";
  }
  const skip = limit * (page - 1);

  return { sort, skip, limit, page };
};
