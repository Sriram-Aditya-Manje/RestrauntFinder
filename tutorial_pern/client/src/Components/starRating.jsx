import React,{useState} from 'react'

const StarRating = (props) => {
    const stars = []
    const rating = props.rating;
    for (let i=0;i<5;i++){
        if(i<rating){
            stars.push(
                <i className="fa-solid fa-star fa-spin fa-2xl" style={{color: "#ffdd00"}}></i>
            )
        }else{
            stars.push(
                <i className="fa-regular fa-star fa-2xl" style={{color: "#ffdd00"}}></i>
            )
        }
    }
  return (
    <div className='my-5 mx-auto d-flex justify-content-center'>
        {
        stars.map((star,idx)=>{
            return(<div key={idx} className='mx-1'>
                {star}
            </div>);
        })
        }
    </div>
  )
}

export default StarRating
