import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const LandingPage = () => {
    const [candidateList, setCandidateList] = useState([])
    const {itemId} =useParams();
    const navigate = useNavigate()


    const AllCandidate = async () => {
        const response = await axios.get('/allcandidate');
        console.log("response", response)
        setCandidateList([...response.data.data])
    }

    const getCandidateDetails= async (itemId)=>{
        console.log("itemId", itemId)
        const candidateDetailsData = await axios.get(`/candidatedetails/:${itemId}`);
        console.log("updateData", candidateDetailsData)
        setCandidateList({...candidateList, candidateDetailsData})
    }

    const deleteCandidateDetails= async (id)=>{
        console.log("id", id)
        await fetch(`/deletecandidate/${id}`, {method: "delete"});
        console.log("delete dat successfully!")
        AllCandidate()
        navigate('/landing')

    }

    const updateCandidateDetails= async (itemId)=>{
        console.log("itemId", itemId)
        navigate(`/newcandidate/${itemId}`)
    }

    const newCandidate= async ()=>{
        navigate(`/newcandidate`)
    }

    
    useEffect(() => {
        AllCandidate()
    }, [])


    return (
        <>
            <h1>Landing page all user here..</h1>
            <div className="">
                <h4 className="totalcandidate">Candidates List : {candidateList.length}</h4> 
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Email</th>
                        <th scope="col">Result</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        candidateList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <select> 
                                            <option value="saab">ShortList</option>
                                            <option value="volvo">Rejected</option>
                                        </select>
                                    </td>
                                    <td >
                                    <Link className="btn btn-outline-primary mr-2" onClick={()=> updateCandidateDetails(item._id)} to={`/editcandidate/${item._id}`}><i class="fas fa-user-edit"></i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    </Link>
                                    <Link className="btn btn-danger mr-2" onClick={()=>deleteCandidateDetails(item._id)} to="/landing" ><i class="fas fa-trash"></i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </Link>
                                    <Link className="btn btn-outline-secondary mr-2" onClick={()=>getCandidateDetails(item._id)} to={`/candidatedetails/${item._id}`}><i class="fas fa-user-md"></i>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
                                            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z" />
                                        </svg>
                                    </Link>                                    
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link className="btn btn-outline-primary "  onClick={newCandidate} to={'/newcandidate'} >
                + Add new candidate
            </Link>
        </>
    )
}

export default LandingPage;

