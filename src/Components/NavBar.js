import '../Css/HomPage.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import UserContext from '../Context/UserContext';
import {Link,useNavigate} from 'react-router-dom'

const NavBar=()=>{

    const{user,handleLogOut}=useContext(UserContext);

    const navigate = useNavigate()
    const handleRateButton =() =>{
        if(!!user){
        navigate('/user/rateList');
        }
    }
  
    const handleHomeButton = () => {
      navigate('/');
  }
  
    const handleFavoriteButton = ()=>{
      if(!!user){
      navigate('/user/favoriteList') 
  }
  }

    return (
        <div>
            <div className='app'>
            <AppBar className='nav' position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 4} } >
                    <Button color="inherit" className='header-title' onClick={handleHomeButton}>
                    HOME</Button>
                    <Button color="inherit" className='header-title' onClick={handleFavoriteButton} >FAVORITE</Button>
                    <Button color="inherit" className='header-title' onClick={handleRateButton} >RATED</Button> 
                </Typography>
                <Link style= {{textDecoration: 'none',color:'white'}} to='/login'>
                {!!user? <span onClick={handleLogOut}>{user.username}</span>:<Button color="inherit">LOGIN</Button>}
                </Link>
                </Toolbar>
            </AppBar>
            </div>
        </div>     
      
    )
}
export default NavBar;
