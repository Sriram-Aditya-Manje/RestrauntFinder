import React,{useContext, useEffect, useState} from 'react';
import RestrauntFinder from '../apis/RestrauntsApi'
import axios from 'axios'
import { RestrauntsContext } from '../context/RestrauntContext';
import { Link, useNavigate} from "react-router-dom"

const RestrauntsList = (props) => {
    
    let {restraunts, setRestraunts} = useContext(RestrauntsContext);
    const navigate = useNavigate();

    useEffect(() => {
        const apiCall = async () => {
          try {
            const response = await axios.get(" http://localhost:5000/api/v1/get-restraunts");
            setRestraunts(response.data.data.restraunts);
            console.log(restraunts)
          } catch (err) {
            console.log(err.message);
          }
        };
        apiCall();
      }, []);

      const handleDelete = async(e,id) =>{
        e.stopPropagation()
        try{
            window.location.reload(true)
           const response = await RestrauntFinder.delete(`/delete-restraunt/${id}`);
           setRestraunts = (restraunts.filter(restraunt => restraunt.id !==id))
        }catch(err){

        }
      }

    const handleUpdateRestraunt = (e,id) =>{
        e.stopPropagation();
        navigate(`/restraunts/${id}/update`)
    }
      

  return (
    <div className='col col-md-8 mx-auto'>
        <table className='w-100 table table-hover table-striped'>
            <thead className='thead-light'>
                <tr >
                    <th scope='col'>Restraunt</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>

            <tbody>
                {restraunts && restraunts.map((restraunt) =>{
                    console.log(restraunt);
                    return(
                        <tr onClick={() => navigate(`/restraunts/${restraunt.id}`)} key={restraunt.id}>
                            <td>{restraunt.name}</td>
                            <td>{restraunt.location}</td>
                            <td>{"$".repeat(restraunt.price_range)}</td>
                            <td>Click to view</td>
                            <td> <button className="btn btn-warning" onClick={(e)=> handleUpdateRestraunt(e,restraunt.id)}>Update</button></td>
                            <td> <button className="btn btn-danger" onClick={(e)=> handleDelete(e,restraunt.id)}>Delete</button></td>
                        </tr>
                    )
                })}
                {/* <tr>
                    <td>McD</td>
                    <td>Hyderabad</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>McD</td>
                    <td>Hyderabad</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>McD</td>
                    <td>Hyderabad</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>McD</td>
                    <td>Hyderabad</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>McD</td>
                    <td>Hyderabad</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td> <button className="btn btn-warning">Update</button></td>
                    <td> <button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestrauntsList