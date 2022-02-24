import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, FormControl, InputLabel, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function AddUser(props) {
    const {submitHandler, handleChange, formData, resetAll} = props;
    const classes = useStyles();
    const{toggleComponent} = props;
    return (
        <div className="p-4">
            <div className=" d-flex align-items-center mb-5">
                {/* <div className="new-user-icon-box border ">

                </div> */}
                <div className="user-info-heading">User Information</div>
            </div>
            
            
            <form className={classes.root, ''} noValidate autoComplete="off" onSubmit={submitHandler}>
              <div className="row">
                <div className="col-md-6 ">
                  <TextField 
                  id="standard-basic" 
                  className="w-100" 
                  label="User Name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange} />
                </div>
                <div className="col-md-6 ">
                  <TextField 
                  id="standard-basic" 
                  className="w-100" 
                  label="Email Address" 
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}/>
                </div>
                <div className="col-md-6 mt-4">
                <FormControl className={classes.formControl, 'w-100'}>
                  <InputLabel htmlFor="age-native-simple">User Type</InputLabel>
                  <Select
                    native
                    value={formData?.userType}
                    onChange={handleChange}
                    inputProps={{
                      name: 'userType',
                      id: 'userType-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Imports Reports Mail User">Imports Reports Mail User</option>
                    <option value="FNV Reports Mail User">FNV Reports Mail User</option>
                  </Select>
                </FormControl>
                </div>
              </div>
              <Divider className=" mt-4"/>
              <div className="row mt-5">
                    <div className="col-6  d-flex align-items-center">
                      {/* <button onClick={resetAll}>Reset All</button> */}
                    </div>
                    <div className="col-6  d-flex justify-content-end p-0">
                    <button onClick={toggleComponent}  class="btn btn-primary" style={{marginRight:"20px"}}>Cancel</button>
                    <button onClick={submitHandler}  class="btn btn-primary ">Submit</button>
                    </div>
              </div>
            </form>
            
        </div>
    )
}

export default AddUser
