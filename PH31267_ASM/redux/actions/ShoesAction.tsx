import { createAsyncThunk } from '@reduxjs/toolkit'
import { addShoes, clearListShoes } from '../reducers/ShoesReducer'
import axios from 'axios'

const baseUrl = 'http://10.0.2.2:3000'

interface Shoes {
    id: string,
    idTrademark: string,
    name: string,
    images: string[],
    describe: string,
    classify: number,
    status: boolean
}

export const getShoes = createAsyncThunk(
    'shoes/getShoes',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<Shoes[]>(`${baseUrl}/get-shoes`)
            dispatch(clearListShoes())
            response.data.forEach(element =>{
                dispatch(addShoes(element))
            })

        } catch (error) {
            return rejectWithValue('Lỗi: ' + error)
        }
    }
)