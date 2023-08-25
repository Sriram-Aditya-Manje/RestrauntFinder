import React,{useEffect,useState,useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import RestrauntFinder from '../apis/RestrauntsApi'
import StarRating from '../Components/starRating'
import ReviewCard from '../Components/ReviewCard'
import AddReview from '../Components/AddReview';

const RestrauntDetailsPage = () => {
  const {id} =  useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating,setRating] = useState("")
  const [reviews,setReviews] = useState([])

  const divStyle={
    display : "flex",
    flexWrap : "wrap",
    gap: "10px",
    width:"100%"

  }

  useEffect( () => {
    const fetchData = async () => {
      const restraunt = await RestrauntFinder.get(`/get-restraunt/${id}`);
      setName(restraunt.data.data.restraunt[0].name);
      setLocation(restraunt.data.data.restraunt[0].location);

      let review = await RestrauntFinder.get(`get-reviews/${id}`)
      let avg = 0
      let temp = review.data.data.reviews
      console.log(temp)
      setReviews(review.data.data.reviews);
      console.log(reviews)
      temp.map((review)=>{
        avg = avg+(review.rating)
      })
      avg = avg/(reviews.length);
      setRating(avg);
    };
    fetchData();
  },[])


  return (
    <div className='col col-sm-10 col-md-10 mx-auto text-center'>
      <h1 className='display-1 text-center'>{name}</h1>
      <h6 className='display-6 text-center'>({location})</h6>
      <StarRating rating={rating} />
      <h6 className='display-5 text-center'>Reviews</h6>
      <div className='' style={divStyle} >
        { reviews && reviews.map((review)=>{
            console.log(review)
            return( 
            <div>
              <ReviewCard cardId={review}/>
            </div> ); 
          })
        }
      </div>
    <AddReview/>
      <button className='mb-5' onClick={()=>navigate(-1)}>Go back</button>
    </div>
  )
}

export default RestrauntDetailsPage