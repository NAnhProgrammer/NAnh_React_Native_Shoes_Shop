import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCart, clearListCart } from '../reducers/CartReducer'
import axios from 'axios'

const baseUrl = 'http://10.0.2.2:3000'

interface props {
    idUser: string
}

interface Cart {
    id: string,
    idShoesVarianSize: string,
    idUser: string,
    quantity: number,
    checkout: boolean
}

export const getCart = createAsyncThunk(
    'cart/getCart',
    async ({ idUser }: props, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post<Cart[]>(`${baseUrl}/get-carts-by-id-user`, { idUser: idUser })
            dispatch(clearListCart())
            response.data.forEach(element => {
                dispatch(addCart(element))
            })

        } catch (error) {
            return rejectWithValue('Lỗi: ' + error)
        }
    }
)

export const deleteCartAPI = createAsyncThunk(
    'cart/deleteCartAPI',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/delete-cart?id=${id}`)
            console.log('Delete Cart: '+ response.status)

            if(response.status === 201){
                return id
            }else{
                return thunkAPI.rejectWithValue(response.status);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addCartAPI = createAsyncThunk(
    'cart/addCartAPI',
    async (object, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/add-cart`, object)
            console.log('Add Cart: '+ response.status)

            if(response.status === 200){
                return object
            }else{
                return thunkAPI.rejectWithValue(response.status);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateCartAPI = createAsyncThunk(
    'cart/updateCartAPI',
    async (object, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/update-cart`, object)
            console.log('update Cart: '+ response.status)

            if(response.status === 200){
                return object
            }else{
                return thunkAPI.rejectWithValue(response.status);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

