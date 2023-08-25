import React, { useState } from "react";
import {useForm} from 'react-hook-form';
import RestaurantFinder from "../apis/RestrauntsApi";
import {  useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const {register,handleSubmit, formState:{errors}} = useForm();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  const [success,setSuccess] = useState(false)

  const handleSubmitReview = async (data) => {
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, data);
      console.log(response.data.data.reviews)
      setSuccess(true)
      window.location.reload(true)
    } catch (err) {
        console.log(err)
    }
  };
  return (
    <div className="col col-md-8 mx-auto">
        <h1 className="my-5">Submit review</h1>
        <form onSubmit={handleSubmit(handleSubmitReview)} action=''>

            <div className="">
                <div className="my-3">
                    <input type='text' className='form-control' placeholder='name' {...register("name",{required:true})}/>
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-danger">Name is required.</p>
                    )}
                </div>

                <div className="">
                    <label htmlFor="rating" className="mx-3">Rating</label>
                    <select className='my-3' {...register("rating",{required:true})}>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    {errors.price_range && errors.rating.type === "required" && (
                      <p className="text-danger">rating is required.</p>
                    )}
                </div>

                <div className="">
                    <input type='textarea' className='form-control my-3' placeholder='review' {...register("review",{required:true})}/>
                    {errors.location && errors.review.type === "required" && (
                      <p className="text-danger">review is required.</p>
                    )}
                </div>


            </div>
            <div className='d-flex justify-content-center align-items-center'>
            <button className=' my-4 mx-5 w-25 btn btn-primary '>ADD</button>
            </div>
        </form>
        {success && <p className='text-success'>Review submitted</p>}
    </div>
  );
};

export default AddReview;


{/* <form action="">
        <div className="form-row">


          {/* <div className="form-group col-4">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div> */}


    //     <div className="form-group">
    //       <label htmlFor="Review">Review</label>
    //       <textarea
    //         value={reviewText}
    //         onChange={(e) => setReviewText(e.target.value)}
    //         id="Review"
    //         className="form-control"
    //       ></textarea>
    //     </div>
    //     <button
    //       type="submit"
    //       onClick={handleSubmitReview}
    //       className="btn btn-primary"
    //     >
    //       Submit
    //     </button>
    //   </form> */}