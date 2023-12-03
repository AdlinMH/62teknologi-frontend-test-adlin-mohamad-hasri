/**
 * GET: categories
 * */
export type CategoriesGetReq = {
  locale?: string
}
export type CategoriesGetRes = {
  categories: Category[]
}


/******* HELPERS /*******/
export type Category = {
  alias: string
  title: string
  parent_aliases: string[]
  country_whitelist: string[]
  country_blacklist: string[]
}
