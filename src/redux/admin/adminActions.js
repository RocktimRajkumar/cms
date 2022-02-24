import axios from "axios";
import {
    GET_BM,
    BM_ERROR,
    ADD_BM,
    UPDATE_BM,
    DELETE_BM
} from './bmActionTypes';

// ACTION Creators
export const  getBM = (bms) => {
    console.log("test",bms)
    return {
        type: GET_BM,
        payload: bms
    }
}

export const bmError = (error) => {
    return {
        type: BM_ERROR,
        payload: error
    }
}


export const addBM = (payload) => {
    return {
        type: ADD_BM,
        payload
    }
}
export const updateBM = (payload) => {
    return {
        type: UPDATE_BM,
        payload
    }
}
export const deleteBM = (payload) => {
    return {
        type: DELETE_BM,
        payload
    }
}

// Async functions to call api 
export const getAllAdmin = () =>{
    const url = 'http://exam-manag.herokuapp.com/admin';
    return (dispatch) =>{
        axios.get(url)
            .then(response => {
                // console.log("admin",response.data.message.records);
                const admins = response.data.message.records;
                // dispatch the response data
                dispatch(getBM(admins));
        })
        .catch(error=>{
            const errorMessage = error.message
            // dispatch the error message
            dispatch(bmError(errorMessage));
        })
    }
}

