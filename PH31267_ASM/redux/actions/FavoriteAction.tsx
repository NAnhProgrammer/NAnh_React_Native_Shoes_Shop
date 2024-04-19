import { createAsyncThunk } from '@reduxjs/toolkit'
import { addFavorite, clearListFavorite } from '../reducers/FavoriteReducer'
import axios from 'axios'

const baseUrl = 'http://10.0.2.2:3000'

interface props {
    idUser: string
}

interface Favorite {
    id: string,
    idShoes: string,
    idUser: string,
}

export const getFavorite = createAsyncThunk(
    'favorite/getFavorite',
    async ({ idUser }: props, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post<Favorite[]>(`${baseUrl}/get-favorites-by-id-user`, { idUser: idUser })
       
            dispatch(clearListFavorite())
            response.data.forEach(element => {
                dispatch(addFavorite(element))
            })

        } catch (error) {
            return rejectWithValue('Lỗi: ' + error)
        }
    }
)

export const deleteFavoriteAPI = createAsyncThunk(
    'favorite/deleteFavoriteAPI',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/delete-favorite?id=${id}`)
            console.log('Delete Favorite: '+ response.status)

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

export const addFavoriteAPI = createAsyncThunk(
    'favorite/addFavoriteAPI',
    async (object, thunkAPI) => {
        try {
            const response = await axios.post(`${baseUrl}/add-favorite`, object)
            console.log('Add Favorite: '+ response.status)

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

