import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCartAPI, deleteCartAPI } from "../actions/CartAction";

interface Cart {
    id: string,
    idShoesVarianSize: string,
    idUser: string,
    quantity: number,
    checkout: boolean
}

interface CartState {
    ListCart: any[]
}

const initialState: CartState = {
    ListCart: []
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<Cart>) {
            state.ListCart.push(action.payload)
        },
        clearListCart(state) {
            state.ListCart.splice(0, state.ListCart.length)
        }
    },
    extraReducers: builder => {
        builder.addCase(addCartAPI.fulfilled, (state, action) => {
            state.ListCart.push(action.payload)
        }).addCase(addCartAPI.rejected, (state, action) => {
            console.log('Add Cart Err: ', action.error.message)
        })

        builder.addCase(deleteCartAPI.fulfilled, (state, action) => {
            state.ListCart = state.ListCart.filter(row => row.id !== action.payload)
        }).addCase(deleteCartAPI.rejected, (state, action) => {
            console.log('Delete Cart Err: ', action.error.message)
        })
    }
})

export const { addCart, clearListCart } = CartSlice.actions
export default CartSlice.reducer