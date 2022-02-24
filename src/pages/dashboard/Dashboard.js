import React  from "react";
import TestTable from "../../utils/table/TestTable";



const Dashboard = () => {

    return(
        <div className="w-100 p-5" style={{height:"calc(100% - 64px)", border:"2px solid red", overflow:"auto"}}>
            {/* Dashboard */}
            <TestTable/>
        </div>
    )
}

export default Dashboard;