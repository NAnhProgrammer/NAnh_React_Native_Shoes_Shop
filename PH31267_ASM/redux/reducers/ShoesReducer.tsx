import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shoes {
    id: string,
    idTrademark: string,
    name: string,
    images: string[],
    describe:string,
    classify: number,
    status: boolean
}

interface ShoesState{
    ListShoes : Shoes[]
}

const initialState: ShoesState = {
    ListShoes: []
}

const ShoesSlice = createSlice({
    name: 'shoes',
    initialState,
    reducers:{
        addShoes(state, action: PayloadAction<Shoes>){
             state.ListShoes.push(action.payload)
        },
        clearListShoes(state){
            state.ListShoes.splice(0,state.ListShoes.length)
        }
    }
})

export const {addShoes, clearListShoes} = ShoesSlice.actions
export default ShoesSlice.reducer