import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { baseUrl } from '../util/AppBaseLoc'
import { logIn,addProduct } from '../service/ProductService';
const LoginForm = () => {

    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [mobile,setMobile] = useState("");
    const [email,setEmail] = useState("");

    const [id,setId] = useState("");
    const [role,setRole] = useState("");
    
    

    const [slide, setSlide] = useState(false);
     const toggleClass = () => {
    setSlide(!slide);
  };

    const Signup=() =>
    {   
        const payload={
            userName:username,
            userPassword:password,
            mobileNumber:mobile,
            emailId:email,
            userRole:"Customer"
        }
        addProduct(payload).then(resp => {if(resp.data.user==null){alert("msg:"+resp.data.message); window.location.replace(baseUrl); } 
        alert("Message:"+resp.data.message+"\nLoged in with id: " + resp.data.user.userID); window.location.replace(baseUrl+"/product/all");})
        //Registor 
    }    

    const Login=() =>
    {   
        const payload={
            
            userPassword:password,
            emailId:email
            
        }
        logIn(payload).then(resp => {if(resp.data.user==null){alert("msg:"+resp.data.message); window.location.replace(baseUrl); } 
        localStorage.setItem('user', resp.data.user);
        if(resp.data.user.userRole=="Admin")
        localStorage.setItem('Admin', true);
        else
        localStorage.setItem('Admin', false);
        alert("Message:"+resp.data.message+"\nLoged in with id: " + resp.data.user.userID); //window.location.replace(baseUrl+"/product/all");
        })
        //login
    }   

    return (
        <div className={slide ? 'container1 right-panel-active': 'container1'} id="container">
            <div className="form-container sign-up-container">
                <form className='form'  >
                    <h1>Create Account</h1>
                    <br></br>
                    
                    <input className='input' type="text" placeholder="Name" 
                    value={username} onChange={(event)=>setUsername(event.target.value)}/>
                    <input className='input' type="password" placeholder="Password" 
                    value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    <input className='input' type="number" placeholder="Mobile" 
                    value={mobile} onChange={(event)=>setMobile(event.target.value)}/>
                    <input className='input' type="email" placeholder="Email"
                    value={email} onChange={(event)=>setEmail(event.target.value)}/>
                
                    <button className='button' onClick={Signup}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form className='form'>
                    <h1>Sign in</h1>
                    <br></br>
                    <input className='input' type="email" placeholder="Email Id" 
                     value={email} onChange={(event)=>setEmail(event.target.value)} />
                    <input className='input' type="password" placeholder="Password"
                    value={password} onChange={(event)=>setPassword(event.target.value)} />
                    <button className='button' onClick={Login} >Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Please login with your personal info</p>
                        <button onClick={()=> setSlide(0)} className="button ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>New User!</h1>
                        <p>Register with us</p>
                        <button onClick={()=> setSlide(1)} className="button ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default LoginForm