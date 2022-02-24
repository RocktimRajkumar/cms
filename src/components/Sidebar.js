import React, { useEffect } from 'react';
import WaycoolSidebarLogo from '../assets/img/sidebar/WaycoolSidebarLogo.png'
import user from '../assets/img/users/100_3.jpg'
import MenuItem from './MenuItem';
import {adminMenuItem, userMenuItem} from './sidebarMenuItem';


/** 
*@author Dhirendra Kumar Sahani
* @function Sidebar 
**/

const type = "Admin";
const menus = type==="Admin" ? adminMenuItem : type==="User" ? userMenuItem:[];

const Sidebar = (props)=>{
    const [inactive, setInactive] = React.useState(false);
    useEffect(()=>{
        if(inactive){
            document.querySelectorAll('.sub-menu').forEach((el)=>{
                el.classList.remove('active');
            })
        }
        props.onCollapse(inactive);
    },[inactive])
    return(
        <div className={`sidebar ${inactive?'inactive':''}`}>
           {/* Top section of sidebar  */}
            <div className="top-section  d-flex align-items-center" style={{height:"64px"}}>
                {/* company logo */}
                <div className="logo ">
                    <img src={WaycoolSidebarLogo} alt="waycool"/>
                    {/* <span className="text-white">Waycool</span> */}
                </div>
                <span className="text-white company-name ">CMS</span> 
                {/* Toggle button for sidebar expand and collapse */}
                <div onClick={()=>setInactive(!inactive)} className="toggle-btn">
                {
                    inactive? (
                        <i class="bi bi-arrow-right-square-fill text-success "></i>
                    ):(
                        <i class="bi bi-arrow-left-square-fill text-white "></i>
                    )
                }
                </div>
            </div>
            
            {/* Divider */}
            <div className="divider mb-3"></div>
            {/* Main Menu having sidebar liks */}
            <div className="main-menu  " >
                <ul className="p-0  ">
                    {
                        menus && menus.map((menuItem, index)=>(
                            <MenuItem
                            key="index"
                            name={menuItem.name}
                            exact = {menuItem.exact}
                            to={menuItem.to}
                            subMenus = {menuItem.subMenus || []}
                            iconClassName = {menuItem.iconClassName}
                            onClick={()=>{
                                if(inactive){
                                    setInactive(false);
                                }
                            }}
                            />
                        ))
                    }
                    {/* <li >
                        <a className="menu-item ">
                            <div className="menu-item-icon">
                            <i class="bi bi-speedometer2"></i>
                            </div>
                            <span>Dashbaord</span>
                        </a>
                    </li>
                    <MenuItem
                    name={"Content"}
                    subMenu = {subMenuItem}
                    />
                    <li >
                        <a className="menu-item ">
                            <div className="menu-item-icon">
                            <i class="bi bi-speedometer2"></i>
                            </div>
                            <span>Design</span>
                        </a>
                    </li> */}
                </ul>
                
            </div>

        </div>
    )
}

export default Sidebar;
