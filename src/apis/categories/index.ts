import { api } from '../_base'
import { CategoriesGetReq, CategoriesGetRes } from './_types'

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<CategoriesGetRes, CategoriesGetReq>({
      query: (params) => ({
        url: `/v3/categories`,
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetCategoriesQuery,
} = categoriesApi
