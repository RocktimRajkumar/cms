import React, { useDebugValue, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar';
import Dashboard from '../src/pages/dashboard/Dashboard';
import Marksheet from './pages/marksheet/Marksheet';
import NavBar from './components/NavBar';
import Login from './pages/auth/Login';
import Admin from './pages/adminManagement/Admin';
import Student from './pages/student/Student';
import Department from './pages/department/Department'
import Course from './pages/course/Course'
import Semester from './pages/semester/Semester'
import Subject from './pages/subject/Subject'
import { Redirect } from 'react-router';
import PrivateRoute from './PrivateRoute'
const App  = ()=>{    
    const user = localStorage.getItem("user");
    const userDetails = JSON.parse(user);
    const type = userDetails?.type
    const [inactive, setInactive] = useState(false);
    const [loginVisible, setLoginVisible] = useState(true);
    if(!type){
        return <Login />
    }
    // else{
    console.log("type",type);
    
    return(
        <div className="App">
            <Router>
             <Route exact path="/" component={Login} />
               <Sidebar
                    onCollapse = {(value) => {
                        setInactive(value);
                    }}
                    />
                
                <div className={`main-content ${inactive ? "inactive":""}`}>
                  <NavBar/>
                    
                    <Switch>
                        {/* <Route exact path="/" component={Login} /> */}
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/admin" component={Admin} />
                        <PrivateRoute exact path="/student" component={Student} />
                        <PrivateRoute exact path="/department" component={Department} />
                        <PrivateRoute exact path="/course" component={Course} />
                        <PrivateRoute exact path="/semester" component={Semester} />
                        <PrivateRoute exact path="/subject" component={Subject} />
                        <PrivateRoute exact path="/marksheet" component={Marksheet} />
                        
                    </Switch>
                </div>
            </Router>
            
        </div>
    )
            // }    
}

export default App;