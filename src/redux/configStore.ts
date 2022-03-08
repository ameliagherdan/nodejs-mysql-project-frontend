import { createStore } from "redux"
import { setUserReducer } from './reducers/setUserReducer';
export const configStore = () => {
    return createStore(setUserReducer)
}