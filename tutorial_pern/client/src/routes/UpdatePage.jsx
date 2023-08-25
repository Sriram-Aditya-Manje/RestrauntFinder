// import React from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import RestrauntFinder from '../apis/RestrauntsApi'
import { RestrauntsContext } from '../context/RestrauntContext';
import React,{useContext, useEffect, useState} from 'react';


const UpdatePage = (props) => {
const { id } = useParams();
const navigate = useNavigate();
const { restraunt } = useContext(RestrauntsContext);
const [name, setName] = useState("");
const [location, setLocation] = useState("");
const [priceRange, setPriceRange] = useState("");

useEffect(() => {
  const fetchData = async () => {
    const response = await RestrauntFinder.get(`/get-restraunt/${id}`);
    console.log(response.data.data);
    setName(response.data.data.restraunt[0].name);
    setLocation(response.data.data.restraunt[0].location);
    setPriceRange(response.data.data.restraunt[0].price_range);
  };

  fetchData();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const updatedRestaurant = await RestrauntFinder.put(`/update-restraunt/${id}`, {
    name,
    location,
    price_range: priceRange,
  });
  navigate(-1);
};

return (
  <div className='col col-md-8 col-sm-11 mx-auto'>
    <h1 className='display-1 text-center mb-5 mt-5'>Update Page</h1>
    <form  action="">
      <div className="form-group my-4">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="form-control"
          type="text"
        />
      </div>

      <div className="form-group my-4">
        <label htmlFor="location">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          className="form-control"
          type="text"
        />
      </div>
      <div className="form-group my-4">
        <label htmlFor="price_range">Price Range</label>
        <input
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          id="price_range"
          className="form-control"
          type="number"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
);
};

export default UpdatePage