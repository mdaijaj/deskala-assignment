
import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [user, setUser]= useState({
        email: "", 
        password: "", 
    });
    const navigate = useNavigate()


    let name, value;
    const hangleInput=(e)=>{
        name= e.target.name
        value= e.target.value
        setUser({...user, [name]: value})  //[] dynamic data for
    }

    const Postdata= async(e)=>{
        e.preventDefault();
        const { email, password } = user;
        console.log(email, password, "kkkk")
        const logInf={
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        }
        const res= await fetch('/login', logInf)
        await res.json()
        if(res.status===400 || !res){
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }
        else{
            window.alert("Login is successfully!")
            console.log("Login is successfully")
            navigate('/landing')

        }
    }



    return (
        <>
            <h1> Login Form</h1>
            <div className="container" style={{ border: "2px solid gray", width: "500px", height: "400px" }}>
            <h5> Login Form</h5>

                <div className="col-10" style={{ margin: "auto" }}>
                <form method='Post'>

                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label for="inputEmail4">Email</label>
                            <input type="email" 
                                className="form-control" 
                                onChange={hangleInput} 
                                name='email' 
                                id="inputEmail4"
                                placeholder="Email" />
                        </div>

                        <div className="form-group col-md-10">
                            <label for="inputPassword4">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                onChange={hangleInput} 
                                name='password' 
                                id="inputPassword4" 
                                placeholder="Password" />
                            <p style={{textAlign: "right", color: "skyblue"}}>Minimum 8 Alpha numeric </p>

                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={Postdata}>Login</button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Login;