import React,{useState} from "react";

//Icons
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DynIcon from "./DynIcon";

//Rutas
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

//Listas
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import menuItems from './menuItemsList.json';

//Styles
import './MenuItem.css';

const MenuItems = ()=>{
  const [open,setOpen]=useState({});

  const handleClick = e => {
      setOpen({...open, [e]: !open[e] });
  };
  return(
    menuItems.list.map(list=>{
      return(
        <List 
          key={list.id}
          subheader={<ListSubheader>{list.title}</ListSubheader>}
        >
        {list.items && list.items.map(item=>{
          return(
            item.subitems != null ? 
            (
            <div 
              key={item.id}
            >
              <Link to={item.url} component={RouterLink} key={item.id} color="inherit" underline="none">
                <ListItemButton 
                  onClick={()=>handleClick(item.name)}
                 
                >
                <ListItemIcon>
                  <DynIcon iconName={item.icon}/>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {open[item.name] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </Link> 
              <Collapse 
                in={open[item.name]}
                timeout="auto" 
                unmountOnExit
                key={`c${item.id}`}
              >
              <List 
                component="div" 
                disablePadding
                key={`l${item.id}`}
              >
              {item.subitems.map(subit=>{
                return(
                  <Link to={subit.url} component={RouterLink} key={subit.id} color="inherit" underline="none">
                    <ListItemButton sx={{ pl: 3 }}>
                      <ListItemIcon>
                        <DynIcon iconName={subit.icon} fontSize="small"/>
                      </ListItemIcon>
                      <ListItemText secondary={subit.name} sx={{fontSize:'0.75rem'}}/>
                    </ListItemButton>
                  </Link>  
                  )
                })
              }
              </List>
              </Collapse>
            </div>
            ) : 
            (
            <Link to={item.url} component={RouterLink} key={item.id} color="inherit" underline="none"> 
              <ListItemButton>
                <ListItemIcon>
                  <DynIcon iconName={item.icon}/>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>  
            ) 
          )
        })}
        </List>
      )
    })
  )
}  


export default MenuItems;


