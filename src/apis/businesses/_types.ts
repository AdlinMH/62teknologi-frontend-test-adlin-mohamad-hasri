import { ApiResponse } from "../_base/_types"


// GET: business get search
export type BusinessesGetSearchReq = {
  location?: string
  latitude?: number
  longitude?: number
  term?: string
  radius?: number
  categories?: string[]
  price?: number[]
  open_at?: number
  attributes?: string[]
  sort_by?: string
  device_platform?: string
  reservation_date?: string
  reservation_time?: string
  reservation_covers?: number
  matches_party_size_param?: boolean
  limit?: number
  offset?: number
}

export type BusinessesGetSearchRes = ApiResponse<{
  businesses: BusinessesGetSearchRes_Business[]
  total: number
  region: {
    center: {
      latitude: string
      longitude: string
    }
  }
}>
export type BusinessesGetSearchRes_Business = {
  id: string
  alias: string
  name: string
  image_url?: string
  is_closed?: boolean
  url?: string
  review_count?: number
  categories?: BusinessesGetSearchRes_Business_Category[]
  rating?: string
  coordinates?: BusinessesGetSearchRes_Business_Coordinate
  transactions?: string[]
  price?: string
  location: BusinessesGetSearchRes_Business_Location
  phone: string
  display_phone: string
  distance?: string
  hours?: BusinessesGetSearchRes_Business_Hour[]
  attributes?: ('liked_by_vegetarians' | 'liked_by_vegans' | 'hot_and_new')[]
}
export type BusinessesGetSearchRes_Business_Category = {
  alias: string
  title: string
}
export type BusinessesGetSearchRes_Business_Coordinate = {
  latitude: string
  longitude: string
}
export type BusinessesGetSearchRes_Business_Location = {
  address1: string
  address2: string
  address3: string
  city: string
  zip_code: string
  country: string
  state: string
  display_address: string[]
  cross_streets: string | null
}
export type BusinessesGetSearchRes_Business_Hour = {
  hour_type: string
  open: BusinessesGetSearchRes_Business_Hour_Open[]
  is_open_now: boolean
}
export type BusinessesGetSearchRes_Business_Hour_Open = {
  day: number
  start: string
  end: string
  is_overnight: boolean
}
