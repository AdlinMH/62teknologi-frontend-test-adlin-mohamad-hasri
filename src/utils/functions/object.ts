export function getSubset<T extends object, U extends keyof T>(
  obj: T,
  keys: Array<U>,
): Pick<T, U> {
  const ret = Object.create(null)
  keys
    .concat([], keys) // adding at first item, it use for next operation (reduce) which code deliberately to ignore the first item. so to fix that, we should put empty array in the first index
    .reduce((_, curr) => {
      ret[curr] = obj[curr]
      return ret
    })
  return ret
}
