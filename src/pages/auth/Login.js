import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux';
import { Card, Col, Row } from 'reactstrap';
import _ from "lodash";
import {IconButton, Input, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Redirect } from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import WaycoolSidebarLogo from '../../assets/img/sidebar/WaycoolSidebarLogo.png';
import { useHistory } from 'react-router-dom';

const authStyle = {
    mainDiv:{
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      borderRadius:"5px",
      background:"#FFF", 
      width:"700px", 
      height:"500px"
    },
    bg:{
      backgroundImage: "linear-gradient(45deg, #3232a8, #e310c7)"
    },
    btn:{
      backgroundImage: "linear-gradient(to Right, #3232a8, #e310c7)",
      color:"#fff",
      textTransform:"uppercase",
      fontWeight:"500",
      letterSpacing:"2px",
      borderRadius:"0px"
    },
    company:{
      fontFamily: "Playfair Display",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "22px",
      lineHeight: "29px",
      letterSpacing: "0.4px",
      color: "#e3d7d7",
    },
    appName:{
      position:"absolute",
      top:"35%",
      color:"#FFF",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      width:"100%",
    },
    greeting:{
      color:"#e310c7", 
      fontWeight:"600"
    }
  }
  
  // function for greeting in login page
  const greeting = () =>{
    var today = new Date()
  var curHr = today.getHours()
  if (curHr < 12) {
    return "Good Morning"
  }
  else if (curHr == 12) {
    return "Good Noon"
  }
   else if (curHr < 17) {
    return "Good Afternoon"
  } else {
    return "Good Evening"
  }
    
  }

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
const type = userDetails && userDetails.userType;

function Login(props) {
    const history = useHistory();
    const [loginScreen, setLoginScreen] = useState(true);
    const [loginErr, setLoginErr] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [loginSUccess, setLoginSuccess] = useState(false);

    const [formData, setFormData] = useState({
        email:"ramdas.gupta@waycool.in",
        password:"2019"
    });
    console.log("user", props.userDetails.name)

    const loginHandler = (e)=>{
        e.preventDefault();
        let loginData = {};    
        loginData["email"] = formData.email;
        loginData["password"] = formData.password
        const validated = true;
        if(validated){
           props.actions.getLogin(loginData);
            // setLoginSuccess(true);
            console.log(props.userDetails)
        }
    }
  const  onChangeHandler =(name)=> (e)=>{
    // alert(name)
        // setFormData(
        //     {
        //         formData: _.set({ ...formData }, name, e.target.value),
        //      }
        // )
        setFormData({...formData, [name]:e.target.value});
      }
     const  handleClickShowPassword = () => {
        setShowPassword({
            showPassword: !showPassword
          })
      };
    
     const  handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const greetingText = greeting();

      if(!loginSUccess){
    return (
        <div className="container-fluid  w-100 d-flex flex column justify-content-center align-items-center" style={{height:"100vh",}} >
          {
            loginScreen && (
              <div className="row" style={authStyle.mainDiv}>
                <div className=" border col-md-6 p-4" style={authStyle.bg}>
                  <div>
                    <img src={WaycoolSidebarLogo} alt="logo" />
                    <span className=" ml-2" style={authStyle.company}>Waycool</span>
                  </div>
                  <div style={{height:"90%", position:"relative"}}>
                    <div style={authStyle.appName}>
                      <h4>Welcome To</h4>
                      <h3>Benchmarker</h3>
                      {/* <h2>Planner Tool</h2> */}
                    </div>
                  </div>
                </div>
              <div className=" col-md-6 px-4 py-5 " >
                <div>
                  <div>Hello !</div>
                  <div style={authStyle.greeting}>{greetingText}</div>
                </div>
                <div className=" d-flex justify-content-center mt-3">
                  <span style={{fontWeight:"500"}}><span style={{color:"#e310c7"}}>Login</span> Your Account</span>
                </div>
            {loginErr &&(<div className="text-danger  p-2 mb-4" style={{fontSize:"12px", background:"#f5e1e1"}}>Please check your email or password!</div>)}
            <form onSubmit={loginHandler} className="d-flex flex-column mt-4">
            {/* New Login Design */}
                <TextField 
                  className={"mb-4"}
                  id="standard-basic" 
                  label="Email Address" 
                  variant="standard"
                  value={
                    formData.email === undefined
                      ? ""
                      : formData.email
                  }
                  onChange={onChangeHandler("email")}
                  />
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" className="mb-4">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={
                        formData.password === undefined
                          ? ""
                          : formData.password
                      }
                      onChange={onChangeHandler("password")}
                      endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                      }
                    />
                  </FormControl>
              

            <button 
              onClick={loginHandler} 
              className="btn  w-100 mt-3 py-2 " 
              style={authStyle.btn} 
              type="submit">
                Submit
            </button>
          </form>
          </div>
          </div>
            )
          }
           {
             !loginScreen && (
              <Row
              style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Col md={6} lg={4}>
                <Card body>
                 <div>
                   {/* Initially we can see LogingIn ,please Wait */}
                    {props.loginError=='' && <span>Loging in ,Please Wait</span>}
                 </div>
                 {/* if User Logged in Successdull then it will redirect to Dashboard */}
                 {props.userDetails && props.userDetails.name  &&  <Redirect to="/dashboard" />}
                 {/* if login failed it redirect to one waycool Home Page. */}
      {/*          
                 {loginError!=='' && setTimeout(() => {window.location.href='http://one.waycool.in/index.php'}, 1000) && <span className="text-danger">Login Failed ,{loginError}</span>} 
                */}
                </Card>
              </Col>
            </Row>
             )
           }
      </div>
    )
    }
    else{
        return(
           <Redirect to="/dashbaord"/>
        )
    }
}

const mapStateToProps = state => {
    return {
      userDetails:state.login.userData,
      loginError: state.loginError
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
          {
            getLogin: actions.signInUser,
            
            
          },
          dispatch,
        ),
      };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
