import React from "react";
import {DashboardSharp,AdminPanelSettings,Person,Inventory,ShoppingCart,MiscellaneousServices,BarChart,DataUsage} from '@mui/icons-material';

const DynIcon = ({ iconName="DashboardSharp",fontSize="medium" }) => {
    switch (iconName) {
        case "Person":
            return <Person fontSize={fontSize}/>    
        case "AdminPanelSettings":
            return <AdminPanelSettings fontSize={fontSize}/>  
        case "Inventory":
            return <Inventory fontSize={fontSize}/>   
        case "ShoppingCart":
            return <ShoppingCart fontSize={fontSize}/>  
        case "MiscellaneousServices":
            return <MiscellaneousServices fontSize={fontSize}/>      
        case "BarChart":
            return <BarChart fontSize={fontSize}/>   
        case "DataUsage":
            return <DataUsage fontSize={fontSize}/>      
        default:
            return <DashboardSharp fontSize={fontSize}/> ;
    }
}

export default DynIcon;




