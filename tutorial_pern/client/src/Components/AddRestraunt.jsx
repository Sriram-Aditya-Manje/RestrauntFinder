import React,{useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { RestrauntsContext } from '../context/RestrauntContext';

const AddRestraunt = () => {

    const {register,handleSubmit, formState:{errors}} = useForm();
    const [success,setSuccess] = useState(false)
    const {restraunts, setRestraunts,addRestraunts} = useContext(RestrauntsContext)

    const onSubmit = async(data,e) => {
      //  e.preventDefault();
       window.location.reload(true)
       const response = await axios.post("http://localhost:5000/api/v1/create-restraunt",data );
       console.log(response.data.data.restraunt[0]);
       addRestraunts(response.data.data.restraunt);
       setSuccess(true);
    }
    
  return (
    <div className='mb-4'>
        <form onSubmit={handleSubmit(onSubmit)} action=''>
            <div className="w-100 mt-5 mx-auto d-inline-flex justify-content-between">
                <div className="mx-5 w-50">
                    <input type='text' className='form-control' placeholder='name' {...register("name",{required:true})}/>
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-danger">Name is required.</p>
                    )}
                </div>
                <div className="mx-sm-5 w-50">
                    <input type='text' className='form-control' placeholder='location' {...register("location",{required:true})}/>
                    {errors.location && errors.location.type === "required" && (
                      <p className="text-danger">Location is required.</p>
                    )}
                </div>
                <div className="mx-5 w-25">
                    <select className='w-100' {...register("price_range",{required:true})}>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>

                    {errors.price_range && errors.price_range.type === "required" && (
                      <p className="text-danger">Price Range is required.</p>
                    )}
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
            <button className=' mt-4 mx-5 w-25 btn btn-primary '>ADD</button>
            </div>
        </form>
        {success && <p className='text-success'>Restraunt added</p>}
    </div>
  )
}

export default AddRestraunt