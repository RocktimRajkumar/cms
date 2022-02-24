import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar';
import Dashboard from '../src/pages/dashboard/Dashboard';

import NavBar from './components/NavBar';
import Login from './pages/auth/Login';
import Admin from './pages/adminManagement/Admin';
import Student from './pages/student/Student';
import Department from './pages/department/Department'
import Course from './pages/course/Course'

const user = localStorage.getItem("User");
const userDetails = JSON.parse(user);
const type = userDetails && userDetails.userType;
const App  = ()=>{

    const [inactive, setInactive] = useState(false);
    const [loginVisible, setLoginVisible] = useState(true);
    if(!userDetails){
        return <Login/>
    }
    else{

    
    return(
        <div className="App">
            <Router>
                <Sidebar
                onCollapse = {(value) => {
                    setInactive(value);
                }}
                />
                <div className={`main-content ${inactive ? "inactive":""}`}>
                    <NavBar/>
                    <Switch>
                    
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/student" component={Student} />
                        <Route exact path="/department" component={Department} />
                        <Route exact path="/course" component={Course} />
                    
                        
                    </Switch>
                </div>
            </Router>
            
        </div>
    )
            }
}

export default App;