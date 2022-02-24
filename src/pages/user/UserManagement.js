import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import _, { add } from "lodash";
import {Paper} from '@material-ui/core';
import UsersTable from './UsersTable';
import './style.css';
import AddUser from './AddUser';
import Spinner from '../../utils/Spinner';
import AddIcon from '@material-ui/icons/Add';



function UserManagement(props) {
  const {usersData} = props;
  const {getAllUsers, addNewUser, updateUser } = props.actions;
  const [openForm, setOpenForm] = useState(false);
 // const [usersData, setUsersData]=  useState([]);
  const [formData, setFormData] = useState({});
  const [notify, setNotify] = useState({});
  const [addMode, setAddMode] = useState(true);

    useEffect(() => { 
      getAllUsers();
    }, [getAllUsers,]);

    console.log("all",usersData);

    // open form and close form
    const toggleComponent = ()=>{
      setOpenForm(!openForm);
    }
    const submitHandler = e => {
      e.preventDefault();
      if(addMode){
        const validated = true;
        if(validated){
          addNewUser(formData).then(res=>{
            setNotify({
              isOpen:true,
              message:res.message,
              type:"success"
            });
            setOpenForm(!openForm);
          
          })
        }
      }else{
        const updatedData = {
          "name":formData.name,
          "email":formData.email,
          "userType":formData.userType
        }
        const validated = true;
        const userId = {
          _id: formData._id,
        }
        console.log("check",userId);
        if(validated){
          updateUser(updatedData, formData).then(res=>{
            // alert("updated");
            setOpenForm(!openForm);
          
          })
        }

      }
    }
    const editClickHandler = editableData => {
      if(editableData)
        setOpenForm(!openForm);
        setFormData(editableData);
        setAddMode(!addMode);
      
    }
    const handleChange = e => {
      const {name, value} = e.target;
      setFormData({
        ...formData, [name]:value
      })
    }

    const resetAll = ()=>{
      setFormData({
        
      })
    }


    return (
      <div className="w-100 p-5 pt-3" style={{height:"calc(100% - 64px)", overflow:"auto"}}>
      <div className="mt-2 row">
        <div className="col-6">
          <h5 style={{color:"#676767"}}>
            User Management 
            <span>{openForm && (<span> / Add User</span>)}</span>
          </h5>
        </div>
        <div className="col-6 d-flex justify-content-end">
          {
            !openForm && (
                <button onClick={toggleComponent}  class="btn btn-primary"> <AddIcon fontSize="small"/> Create User</button>
            )
          } 
        </div>
      </div>
      <Paper className="mt-3"  style={{width:"100%", height:"100%",overflow:"auto"  }}>
        <div  style={{overflow:"auto"  }}>
            {
              !openForm ? (
                <div>
                  {
                    usersData && usersData.length >0 ? (
                      <UsersTable
                      usersData={usersData}
                      toggleComponent = {toggleComponent}
                      editClickHandler={editClickHandler}
                      />
                    ):(
                      <div className="d-flex justify-content-center">
                        <Spinner/>
                      </div>
                    )
                  }
                </div>
                
              ):(
                <AddUser
                toggleComponent={toggleComponent}
                submitHandler={submitHandler}
                handleChange={handleChange}
                resetAll={resetAll}
                notify={notify}
                formData={formData}
                />
              )
            }
        </div>
      </Paper>

  </div>
    )
    

}

const mapStateToProps = state => {
    return {
      usersData:state.users.usersData,
      error: state.users.error
    };
  };

//   const mapDispatchToProps = dispatch => {
//     return {
//         getAllUsers: () => dispatch(actions.getAllUsers()),
//         addNewUser: () => dispatch(actions.addNewUser()),
//         updateUser: () => dispatch(actions.updateUser()),
//     }
// }
  
  const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
          {
            getAllUsers: actions.getAllUsers,
            addNewUser: actions.addNewUser,
            updateUser: actions.updateUser
          },
          dispatch,
        ),
      };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
