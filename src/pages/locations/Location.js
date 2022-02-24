import axios from 'axios';
import React, {useEffect} from 'react';
import { configuration } from '../../services/appConfig';

const Location = () =>{

    // const url = configuration.apiBaseUrl + '/admin-users/';
    // const getData = async ()=>{
    //     const response = await axios.get(url, {
    //         params: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjdjN2Y3NTJjN2MyYzdkMmM3ZTdkNzQ3YjdmN2Y3NTc1N2MyODdjNzU3NDdmNzgiLCJpYXQiOjE2MzIzMDkyMzUsImV4cCI6MTYzMjkxNDAzNX0.wF8wqHycAbNhDXXXRLmXZc0RX0bPuh9iEjOb3-L-F8Q",
    //     });
    //     console.log("res",response)
    // }
    // useEffect(() => {
    //     getData()
        
    // }, [])
    
    return (
        <div>
            Locations
        </div>
    )
}

export default Location;