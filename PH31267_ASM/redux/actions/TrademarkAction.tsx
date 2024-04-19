import { createAsyncThunk } from '@reduxjs/toolkit'
import { addTrademark, clearListTrademark } from '../reducers/TrademarkReducer'
import axios from 'axios'

const baseUrl = 'http://10.0.2.2:3000'

interface Trademark {
    id: string,
    name: string,
    image: string,
    status: boolean
}

export const getTrademark = createAsyncThunk(
    'trademark/getTrademark',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get<Trademark[]>(`${baseUrl}/get-trademarks`)
            dispatch(clearListTrademark())
            response.data.forEach(element =>{
                dispatch(addTrademark(element))
            })

        } catch (error) {
            return rejectWithValue('Lỗi: ' + error)
        }
    }
)