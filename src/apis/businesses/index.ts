import { api } from '../_base'
import { BusinessesGetSearchReq, BusinessesGetSearchRes } from './_types'

export const businessesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBusinessesSearch: build.query<BusinessesGetSearchRes, BusinessesGetSearchReq>({
      query: (params) => ({
        url: `/v3/businesses/search`,
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetBusinessesSearchQuery,
  useLazyGetBusinessesSearchQuery,
} = businessesApi
