export const convertToProductPathName = (cartItemTitle) => {
  let productPathName = cartItemTitle.replace(/\s+/g, '-')
  productPathName = productPathName.replace(/\+/g, '-plus').toLowerCase()
  return productPathName
}