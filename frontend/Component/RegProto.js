import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

     

    const [ user, setUser] = useState({       
        email:"",
        password:""       
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const {  email, password } = user
        try
        {
            if( email && password ){
                axios.post("http://localhost:9002/Register", user)
                .then( res => {
                    alert(res.data.message)
                    
                })
            } else {
                alert("invlid input")
            }
        }
        catch(err)
        {
            
        }
        
        
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>             
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button"  >Login</div>
        </div>
    )
}

export default Register