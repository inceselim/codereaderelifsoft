import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const arizaApi = createApi({
  reducerPath: 'arizaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dev.elifsoft.com.tr' }),
  endpoints: (builder) => ({
    getAriza: builder.query<any, string>({
      query: () => `/api/ArizaApi/ArizaList?begDate=2023-12-01T00:00:00&endDate=2024-01-25T17:04:45&DurumLogo=0&IsDeleted=false`,
    }),
  }),
})

export const { useGetArizaQuery } = arizaApi