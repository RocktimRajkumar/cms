import {
    GET_BM,
    BM_ERROR,
    ADD_BM,
    UPDATE_BM,
    DELETE_BM
} from './bmActionTypes';

const initialState = {
    loading: true,
    admins: [],
    error: ''
}

export const adminReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case ADD_BM:
            return {
                ...state,
                admins: [...state.bms, payload],
                loading: false
              };
        case GET_BM:
            return {
                ...state,
                admins: payload,
                loading: false,
            };
        case UPDATE_BM:
            return {
                ...state,
                admins: payload,
                loading: false
            };
        case DELETE_BM:
            return {
                ...state,
                admins: payload,
                loading: false
            };
        case BM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: return state;
    
    }

}
