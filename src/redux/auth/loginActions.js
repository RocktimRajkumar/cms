import axios from "axios";
import * as actions from './loginActionTypes';
import {configuration} from '../../services/appConfig';
import { Redirect } from "react-router";

// ACTION Creators
export const  loginUser = (payload) => {
    console.log("login",payload)
    return {
        type: actions.LOGIN_SUCCESS,
        payload: payload
    }
}

export const loginFailed = (error) => {
    return {
        type: actions.LOGIN_FAILED,
        payload: error
    }
}


// Action to call login API to  Login
export const signInUser = (data) => async (dispatch) => {
    const Url = configuration.apiBaseUrl + '/admin-users/login';
    if (data) {
      const param = data;
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers.post['Accept'] = 'application/json';
      axios.defaults.headers.post['Acces-Control-Allow-Origin'] = '*';
      const response = await axios.post(Url, param).then(response =>{
        if (response && response.status === 200) {
          const responseData = response.data.data
          localStorage.setItem("User", JSON.stringify(responseData));
          dispatch(loginUser(responseData));
          // return responseData;
          
        } 
      })
      .catch((error) => {
        console.log("login error", error.message);
        dispatch(loginFailed(error.message))
      });
      
        
    }
  }