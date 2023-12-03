import { getSubset } from '@/utils/functions/object'
import { api } from '../_base'
import { BusinessesGetDetailParams as BusinessesGetDetailPathParams, BusinessesGetDetailRes, BusinessesGetReviewParams as BusinessesGetReviewPathParams, BusinessesGetReviewReq as BusinessesGetReviewQueryParams, BusinessesGetReviewRes, BusinessesGetSearchReq, BusinessesGetSearchRes } from './_types'

export const businessesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBusinessesSearch: build.query<BusinessesGetSearchRes, BusinessesGetSearchReq>({
      query: (params) => ({
        url: `/v3/businesses/search`,
        method: 'GET',
        params,
      }),
    }),
    getBusinessesDetail: build.query<BusinessesGetDetailRes, BusinessesGetDetailPathParams>({
      query: (params) => ({
        url: `/v3/businesses/${params.business_id_or_alias}`,
        method: 'GET',
      }),
    }),
    getBusinessesReview: build.query<BusinessesGetReviewRes, BusinessesGetReviewPathParams & BusinessesGetReviewQueryParams>({
      query: (params) => ({
        url: `/v3/businesses/${params.business_id_or_alias}/reviews`,
        method: 'GET',
        params: getSubset(params, ['locale', 'sort_by', 'limit', 'offset'])
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetBusinessesSearchQuery,
  useGetBusinessesDetailQuery,
  useGetBusinessesReviewQuery,
} = businessesApi
