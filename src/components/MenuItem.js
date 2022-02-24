import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = (props)=>{
    const {name, subMenus, iconClassName, onClick, to, exact} = props;
    const [expand, setExpand] = React.useState(false);
    // subMenus.map((menu)=>{
    //     console.log(menu.name);
    // })
    return(
        <li onClick={onClick} className="mt-2">
            <NavLink
             exact 
             to={to} 
             onClick={() => setExpand(!expand)} 
             className="menu-item "
             >
                <div className="menu-item-icon">
                <i className={iconClassName}></i>
                </div>
                <span >
                    {name} 
                {
                    name === "My Reports" || name === "Control Panel" ? (
                        <span>
                            {
                                expand ? (<i class="bi bi-chevron-up " style={{marginLeft:"100px", }}></i>):(<i class="bi bi-chevron-down " style={{marginLeft:"100px", }}></i>)

                                
                            }
                        </span>
                    ) :""
                }
                </span>
            </NavLink>
            {
                subMenus && subMenus.length > 0 ? (
                <ul className={`sub-menu ${expand ? "active" : ""}`}>
                    {
                        
                        subMenus.map((menu) =>
                        <li key={menu.id}>
                        <NavLink  className="nav-link" to={menu.to}>{menu.name} </NavLink>
                        </li> 
                        )
                    } 
                </ul>
                ):null
            }
            
        </li>
    )
}
export default MenuItem;