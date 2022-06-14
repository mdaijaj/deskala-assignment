
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';


const Singup = () => {
    const [ user, setUser] = useState({
        email: "",
        phone: "",
        password: "",
    });
    const navigate = useNavigate()


    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("user", user)
        setUser({ ...user, [name]: value })  //[] dynamic data for
    }

    const postSingup = async (e) => {
        e.preventDefault();
        const { email, phone, password } = user;
        console.log(email, phone, password, "kkkk")

        const regInf={
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, phone, password
            })
        }
        
        const  res= await fetch('/signup', regInf);
        const result= await res.json()
        console.log("result", result)

        if (res.status === 400 || !res) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration")
        }
        else {
            window.alert("Registration is successfully!")
            console.log("Registration is successfully")
            navigate('/login')
        }
    }


    return (
        <>
        <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <div className="container" style={{ width: "500px"}}>
                
                <form style={{boxShadow: "5px 5px 5px 5px", color: "lightgray", padding: "30px", height: "600px"}}>
                <h5> Signup Form</h5>

                        <div className="form-row">
                            <div className="form-group col-md-10">
                                <label for="inputEmail4">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='email'
                                    id="inputEmail4"
                                    value={user.email}
                                    placeholder="Email"
                                />
                            </div>

                            <div className="form-group col-md-10">
                                <label for="inputAddress">Phone Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='phone'
                                    id="inputAddress"
                                    value={user.phone}
                                    placeholder="+91 "
                                />
                            </div>

                            <div className="form-group col-md-10">
                                <label for="inputPassword4">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='password'
                                    id="inputPassword4"
                                    value={user.password}
                                    placeholder="Password" />
                                <p style={{textAlign: "right", color: "skyblue"}}>Minimum 8 Alpha numeric </p>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={postSingup}>Sign in</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Singup;