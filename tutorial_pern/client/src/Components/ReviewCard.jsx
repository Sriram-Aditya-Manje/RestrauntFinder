import React,{useEffect,useState} from 'react'
import StarRating from './starRating';
import RestrauntFinder from '../apis/RestrauntsApi'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ReviewCard = (props) => {
    console.log(props.cardId)

    const [name,setName] = useState("");
    const [rating,setRating] = useState("");
    const [review,setReview] = useState("");

    useEffect( () => {
        const fetchData = async () => {
            try{
                  const response = await RestrauntFinder.get(`/get-review/${props.cardId.id}`);
                //   const response = await RestrauntFinder.get(`/get-review/4`);
                  console.log(response.data.data.review);
                  setName(response.data.data.review[0].name);
                  setRating(response.data.data.review[0].rating);
                  setReview(response.data.data.review[0].review);
            }catch(e){
                console.log(e)
            }
        };
        fetchData();
      },[])

  return (
    <div>
        
        <Card  style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <StarRating rating = {rating}/>
        </Card.Text>
        <Card.Text>
          {review}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ReviewCard