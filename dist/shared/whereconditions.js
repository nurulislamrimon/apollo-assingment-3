"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationControll = exports.filtersAndSearchControll = void 0;
const filtersAndSearchControll = (filter, searchableFields) => {
    const andConditions = [];
    const { searchTerm } = filter, filters = __rest(filter, ["searchTerm"]);
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
exports.filtersAndSearchControll = filtersAndSearchControll;
const paginationControll = (pagination) => {
    const { sortBy, sortOrder, page = 1, limit = 10 } = pagination;
    const sort = {};
    if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder;
    }
    else {
        sort.createdAt = "desc";
    }
    const skip = limit * (page - 1);
    return { sort, skip, limit, page };
};
exports.paginationControll = paginationControll;
