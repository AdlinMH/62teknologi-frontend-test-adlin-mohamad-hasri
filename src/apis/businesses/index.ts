import { api } from '../_base'
import { BusinessesGetDetailParams, BusinessesGetDetailRes, BusinessesGetSearchReq, BusinessesGetSearchRes } from './_types'

export const businessesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBusinessesSearch: build.query<BusinessesGetSearchRes, BusinessesGetSearchReq>({
      query: (params) => ({
        url: `/v3/businesses/search`,
        method: 'GET',
        params,
      }),
    }),
    getBusinessesDetail: build.query<BusinessesGetDetailRes, BusinessesGetDetailParams>({
      query: (params) => ({
        url: `/v3/businesses/${params.business_id_or_alias}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetBusinessesSearchQuery,
  useGetBusinessesDetailQuery,
} = businessesApi
