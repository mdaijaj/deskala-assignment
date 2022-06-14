
import React, { useState } from 'react';
import { useNavigate , useParams} from "react-router-dom";
import '../App.css';
import axios from 'axios';

const EditCandidate = (props) => {
    console.log("props", props)
    const [candidate, setCandidate] = useState({
        name: "",
        dob: "",
        age: "",
        address: "",
        state: "",
        pincode: "",
        email: "",
    });
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)


    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("candidate", candidate)
        setCandidate({ ...candidate, [name]: value })  //[] dynamic data for
    }

    const editCandidate = async (e) => {
        e.preventDefault();
        const { name, dob, age, address, state, pincode, email } = candidate;
        
        const result =await axios.put(`/editcandidate/${id}`, candidate);
        console.log("result", result)

        if (result.status === 400 || !result) {
            window.alert("Invalid candidate");
            console.log("Invalid candidate")
        }
        else {
            window.alert("candidate details updated successfully!")
            console.log("candidate details updated successfully")
            navigate('/landing')
        }
    }

    return (
        <>
            <h1>Update Candidate</h1>
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="container" style={{ width: "800px", height: "500px" }}>
                    <div className='row'>
                        <div className="col-3"></div>
                        {/* <div className="col-3" style={{ margin: "auto" }}> */}
                        
                        <form method='Post' style={{boxShadow: "5px 5px 5px 5px", color: "lightgray", padding: "30px"}}>
                        <h5 style={{ textAlign: "left", padding: "20px", fontWeight: "bold" }}> Update candidate.</h5>

                            <div className="form-row"  >

                                <div className="form-group col-md-5"   >
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

                                <div className="form-group col-md-5" style={{marginLeft: "50px"}}>
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

                                <div className="form-group col-md-5">
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

                                <div className="form-group col-md-5" style={{marginLeft: "50px"}}>
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

                                <div className="form-group col-md-5">
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

                                <div className="form-group col-md-5" style={{marginLeft: "50px"}}>
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

                                <div className="form-group col-md-5">
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
                            <div className="" style={{ textAlign: "right",}}>
                                <button style={{margin: "40px", textAlign: "20px"}} type="submit" className="btn btn-primary" onClick={"postSingup"}>Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={editCandidate}>Update</button>
                            </div>
                        </form>
                        {/* <div className="col-3"></div> */}
                    </div>
            </div>
        </div>
        </>
    )
}

export default EditCandidate;