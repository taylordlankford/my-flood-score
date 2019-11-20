import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from './action-types/cart-actions'

// add cart action with quantity
export const addToCart = (id, quantity = 1) => ({
    type: ADD_TO_CART,
    quantity,
    id
})

//add cart action
// export const addToCart = (id) => {
//     return {
//         type: ADD_TO_CART,
//         id
//     }
// }

// remove item action
export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    id
})


// subtract qt action
export const subtractQuantity = (id) => ({
    type: SUB_QUANTITY,
    id
})

// add qt action
export const addQuantity = (id) => ({
    type: ADD_QUANTITY,
    id
})

// add shipping action
export const addShipping = (id) => ({
    type: ADD_SHIPPING,
    id
})