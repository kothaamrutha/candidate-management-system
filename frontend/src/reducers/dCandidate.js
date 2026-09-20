import { ACTION_TYPES } from "../actions/dCandidate";

const initialState = {
    list: []
}

export const dCandidate = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                list: [...action.payload]
            }
        case ACTION_TYPES.CREATE:
            return {
                list: [...state.list, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                list: state.list.map(item =>
                    item.id === action.payload.id ? action.payload : item
                )
            }
        case ACTION_TYPES.DELETE:
            return {
                list: state.list.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}