/**
 * Order an array of objects based on another array & return new Ordered Array
 * The original array will not be modified.
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapOrder = (originalArray?: any[], orderArray?: any[], key?: string) => {
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}
