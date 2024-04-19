import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Trademark {
    id: string,
    name: string,
    image: string,
    status: boolean
}

interface TrademarkState{
    ListTrademark : Trademark[]
}

const initialState: TrademarkState = {
    ListTrademark: []
}

const TrademarkSlice = createSlice({
    name: 'trademark',
    initialState,
    reducers:{
        addTrademark(state, action: PayloadAction<Trademark>){
             state.ListTrademark.push(action.payload)
        },
        clearListTrademark(state){
            state.ListTrademark.splice(0,state.ListTrademark.length)
        }
    }
})

export const {addTrademark, clearListTrademark} = TrademarkSlice.actions
export default TrademarkSlice.reducer