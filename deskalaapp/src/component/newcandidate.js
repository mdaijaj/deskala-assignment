
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const NewCandidate = () => {
    const [ candidate, setCandidate] = useState({
        name:"",
        dob:"",
        age: "",
        address: "",
        state:"",
        pincode:"",
        email: "",
    });
    
    const navigate = useNavigate()

    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("candidate", candidate)
        setCandidate({ ...candidate, [name]: value })  //[] dynamic data for
    }

    const addCandidate = async (e) => {
        e.preventDefault();
        const { name, dob, age, address, state, pincode, email } = candidate;
        console.log(name, dob, age, address, state, pincode, email, "kkkk")

        const regInf={
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, dob, age, address, state, pincode, email
            })
        }
        
        const  res= await fetch('/newcandidate', regInf);
        const result= await res.json()
        console.log("result", result)

        if (res.status === 400 || !res) {
            window.alert("Invalid candidate");
            console.log("Invalid candidate")
        }
        else {
            window.alert("new candidate add is successfully!")
            console.log("new candidate add is successfully")
            navigate('/landing')
        }
    }

    return (
        <>
            <h1>Create Candidate</h1>
            <div className="container" style={{ border: "2px solid gray", width: "800px", height: "500px" }}>
                <h5 style={{textAlign: "left", padding: "20px"}}> create new candidate.</h5>
                <div className="col-10" style={{ margin: "auto" }}>
                    <form method='Post'>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputName">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='name'
                                    id="inputName"
                                    value={candidate.name}
                                    placeholder="Enter name "
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='address'
                                    id="inputAddress"
                                    value={candidate.address}
                                    placeholder="Enter address.."
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputDate">Date Of Birth</label>
                                <input
                                    type="Date"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='dob'
                                    id="inputDate"
                                    value={candidate.date}
                                    placeholder="Enter date of birth"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                    <label class="" for="inputGroupSelect01">State</label>
                                <select class="custom-select" id="inputGroupSelect01" onChange={handleInput} name="state">
                                    <option selected>Choose...</option>
                                    <option value={candidate.state}>Delhi</option>
                                    <option value={candidate.state}>Maharastra</option>
                                    <option value={candidate.state}>Assam</option>
                                    <option value={candidate.state}>Karnataka</option>
                                    <option value={candidate.state}>Kerala</option>
                                    <option value={candidate.state}>Gujrat</option>
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputAge">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='age'
                                    id="inputAge"
                                    value={candidate.age}
                                    placeholder="age"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputPincode">Pincode</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='pincode'
                                    id="inputPincode"
                                    value={candidate.pincode}
                                    placeholder="pincode"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label for="inputEmail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={handleInput}
                                    name='email'
                                    id="inputEmail"
                                    value={candidate.email}
                                    placeholder="email" />
                            </div>
                        </div>
                        <div className="" style={{ textAlign: "right" }}>
                            <button type="submit" className="btn btn-primary" onClick={"postSingup"}>Cancel</button>
                            <button type="submit" className="btn btn-primary" onClick={addCandidate}>Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewCandidate;