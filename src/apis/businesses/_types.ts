/**
 * GET: business get search
 * */
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
export type BusinessesGetSearchRes = {
  businesses: Business[]
  total: number
  region: {
    center: {
      latitude: string
      longitude: string
    }
  }
}



/**
 * GET: business get detail
 * */
export type BusinessesGetDetailParams = {
  business_id_or_alias: number | undefined
}
export type BusinessesGetDetailRes = Omit<Business, 'distance' | 'attributes'> & {
  is_claimed: boolean
  photos: string[]
}


/******* HELPERS /*******/
export type Business = {
  id: string
  alias: string
  name: string
  image_url?: string
  is_closed?: boolean
  url?: string
  review_count?: number
  categories?: Business_Category[]
  rating?: number
  coordinates?: Business_Coordinate
  transactions?: string[]
  price?: string
  location: Business_Location
  phone: string
  display_phone: string
  distance?: string
  hours?: Business_Hour[]
  attributes?: ('liked_by_vegetarians' | 'liked_by_vegans' | 'hot_and_new')[]
}
export type Business_Category = {
  alias: string
  title: string
}
export type Business_Coordinate = {
  latitude: number
  longitude: number
}
export type Business_Location = {
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
export type Business_Hour = {
  hour_type: string
  open: Business_Hour_Open[]
  is_open_now: boolean
}
export type Business_Hour_Open = {
  day: number
  start: string
  end: string
  is_overnight: boolean
}