import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../../config/config";

export const categoryApiSlice = createApi({
  reducerPath: "categoryApiSlice",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // get all categories
    getCategories: builder.query({
      query: () => "/api/category/categories",
      providesTags: ["Categories"],
    }),

    // add category
    addCategory: builder.mutation({
      query: (body) => ({
        url: "/api/category/add-category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApiSlice;
