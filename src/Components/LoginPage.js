import {useNavigate} from 'react-router-dom';
import React,{ useState,useContext} from 'react';
import UserContext from '../Context/UserContext';
import '../Css/LoginPage.css'

const LoginPage = ()=>{
const[userName,setUserName] = useState('');
const[password,setPassword] = useState('');

const {handleLogin,loginErr} = useContext(UserContext);
const navigate = useNavigate();


const handleUserNameChange =(e)=> {
    setUserName(e.target.value);
};

const handlePasswordChange =(e)=> {
    setPassword(e.target.value);
};


const handleOnSumit= (e) => {
    e.preventDefault();
    handleLogin(userName,password)
    .then(()=>{
        navigate('/')
    })//??
  }


return (

    <div className='login-window'>
        <div className='login-box'>
        {/* <form > */}
            <label style={{color:'blue'}}>
                <strong>Username:</strong>
            <input 
                type="text" 
                name="username"
                value={userName}
                onChange={handleUserNameChange}
            />
            </label>
            <br/>
            <label style={{color:'blue'}}>
                <strong>Password:</strong>
                <input type='password' name='password' value={password} onChange={handlePasswordChange} style={{marginTop:'10px'}}/>
                </label>
                <br/>   
            <button onClick={handleOnSumit} className='login-button'>Login</button>
        {/* </form> */}
        {loginErr && <p>Wrong Password or User Name</p>}
        </div>
    </div>
)

}

export default LoginPage;




