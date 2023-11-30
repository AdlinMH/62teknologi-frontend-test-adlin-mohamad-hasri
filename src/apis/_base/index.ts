import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../_lib/axiosBaseQuery'

const prodBaseURL = 'https://api.yelp.com' // don't put '/' at the end

export function getBaseURL() {
  return prodBaseURL
}

export const api = createApi({
  reducerPath: 'apiDefault',
  baseQuery: async (requestOpts, store, extra) => {
    return axiosBaseQuery({
      baseUrl: getBaseURL(),
    })(requestOpts, store, extra)
  },
  endpoints: () => ({}),
})
