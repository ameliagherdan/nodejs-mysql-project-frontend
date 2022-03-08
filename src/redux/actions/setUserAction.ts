import { User } from "../../models/users"

export const setUserAction = (user: User) => {
    return {
        type: 'SET_USER',
        user
    }
}