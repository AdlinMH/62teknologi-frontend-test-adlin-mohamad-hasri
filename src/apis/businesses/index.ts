import { api } from '../_base'
import { BusinessesGetSearchReq, BusinessesGetSearchRes } from './_types'

export const businessesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBusinessesSearch: build.query<BusinessesGetSearchRes, BusinessesGetSearchReq>({
      query: () => ({
        url: `/v3/businesses/search`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useLazyGetBusinessesSearchQuery } = businessesApi
