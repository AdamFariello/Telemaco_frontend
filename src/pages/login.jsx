import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 

import UserProfile from "./userProfile";

//const urlDomain = "http://localhost:4008/";
const url = "http://localhost:4008/api/auth/";

export default function LoginPage() {
    const [formData, setFormData] = useState({username: "", password: "", });
    function updateFormData(e) {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const navigate = useNavigate();
    
    async function handleSubmit (e) { 
        e.preventDefault();
        try {
            let res = await axios.post(url, formData);
            
            navigate(`/user/${formData.username}`);
        } catch (e) { 
            console.error(e.message);
        }
    }


    return(<>
        <h1>Login</h1>

        {/*TODO: add CSS to make proper formatting, limited using <label>*/}
        <form onSubmit={handleSubmit}>
            <label>username:  
                <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    placeholder="Enter username"
                    onChange={updateFormData}
                    required
                />
            </label>
            <br />

            <label>password:  
                <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={updateFormData}
                    required
                />
            </label>
            <br /> 

            <input type="submit" value="Login" />
        </form>
        <br /> 
     
        New user? <br />
        Then click <Link to="/signup">here</Link>
    </>)
}