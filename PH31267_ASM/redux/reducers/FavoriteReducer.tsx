import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addFavoriteAPI, deleteFavoriteAPI } from "../actions/FavoriteAction";

interface Favorite {
    id: string,
    idShoes: string,
    idUser: string,
}

interface FavoriteState{
    ListFavorite : any[]
}

const initialState: FavoriteState = {
    ListFavorite: []
}

const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers:{
        addFavorite(state, action: PayloadAction<Favorite>){
             state.ListFavorite.push(action.payload)
        },
        clearListFavorite(state){
            state.ListFavorite.splice(0,state.ListFavorite.length)
        }
    },
    extraReducers: builder =>{
        builder.addCase(addFavoriteAPI.fulfilled,(state, action)=>{
            state.ListFavorite.push(action.payload)
        }).addCase(addFavoriteAPI.rejected, (state, action)=>{
            console.log('Add Favorite Err: ', action.error.message)
        })

        builder.addCase(deleteFavoriteAPI.fulfilled,(state, action)=>{
            state.ListFavorite = state.ListFavorite.filter(row => row.id !== action.payload)
        }).addCase(deleteFavoriteAPI.rejected,(state, action)=>{
            console.log('Delete Favorite Err: ', action.error.message)
        })
    }
})

export const {addFavorite, clearListFavorite} = FavoriteSlice.actions
export default FavoriteSlice.reducer