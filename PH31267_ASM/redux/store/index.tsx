import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ShoesReducer from "../reducers/ShoesReducer";
import TrademarkReducer from "../reducers/TrademarkReducer";
import FavoriteReducer from "../reducers/FavoriteReducer";
import CartReducer from "../reducers/CartReducer";

const rootReducer = combineReducers({
    ShoesStore: ShoesReducer,
    TrademarkStore: TrademarkReducer,
    FavoriteStore: FavoriteReducer,
    CartStore: CartReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default store