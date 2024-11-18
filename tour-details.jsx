import React, {useRef,useEffect,useState,useContext} from 'react' 
import "tour-details.css"
import {Container,Row,Col,Form,ListGroup} from 'reactstrap'; 
import {useParams} from "react-router-dom"; 
import tourData from '';
import calculateAvgRating from "";
import avatar from "";
import Booking from "";
import Newsletter from "./../shared/Newsletter";
import {AuthContext} from './../context/AuthContext';
import {BASE_URL} from './../utils/config';
import useFetch from "./../hooks/useFetch";


const TourDetails =()=>{
const id=useParams();
const reviewMsgRef=useRef('')
const [tourRating,setTourRating]=useState(null)
const {data:tour} = useFetch(`${BASE_URL}`/tour/${id})
const {user} = useContext(AuthContext)
const tour = tourData.find(tour=>tour.id==id)
const {photo,title,desc,price,address,reviews,city,distance,maxGroupSize}=tour
const {totalRating, avgRating} = CalculateAvgRating(reviews)
const options = {day:"numeric",month:'long',year:"numeric"};
const submitHandler = e=>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value;
    
    try {
        if(!user||user==undefined||user==null){
            alert('Please sign in')
        }
        const reviewObj = {
            username:user?.username,
            reviewText
            rating:tourRating
        }
        const res = await fetch(`${BASE_URL}/review/${id}`,{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(reviewObj)
        })
        const result=await res.json()
        if(!res.ok) {
            return alert(result.message);
        }
        alert(result.message)
    } catch (err) {
        alert(err.message)
    }
};
useEffect(()=> {
    window.scrollTo(0,0);
}, [tour]);
return (
    <>
    <section>
        <Container>
            {
                loading && <h4 className='text-center pt-5'>Loading..........</h4>
            }
            {
                loading && <h4 className='text-center pt-5'>{error}</h4>
            }
            {
                !loading && !error && <Row>
                <Col>
                    <div className='tour_content'>
                        <img src={photo} alt=""/>

                        <div className='tour_info'>
                            <h2>{title}</h2>

                            <div className='d-flex align-items-center gap-5'>
                                <span className='tour__rating d-flex align-items-center gap-1'>
                                    <i class ="ri-star-s-fill" style={color:"var(--secondary-color)"}></i> 
                                    {avgRating==0? null : avgRating}
                                    {totalRating==0?(
                                        "Not rated"
                                    ) : (
                                        <span>({reviews?.length})</span>
                                    )}
                                </span>
                                <span>
                                    <i class="ri-map-pin-user-fill"></i> {address}
                                </span>
                                
                            </div>
                            <div className='tour__extra-details'>
                                <span> <i class="ri-map-pin-2-line"></i> {city}</span>
                                <span> <i class="ri-money-dollor-circle-line"></i> ${price} /per person</span>
                                <span> <i class="ri-map-pin-time-line"></i> {distance} k/m</span>
                                <span> <i class="ri-group-line"></i> {maxGroupSize} people</span>
                            </div>
                            <h5>Description</h5>
                            <p>{desc}</p>
                        </div>
                        <div className='tour__reviews mt-4'>
                            <h4>Reviews ({reviews?.length} reviews)</h4>
                            <Form onSubmit={submitHandler}>
                                <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                    <span onClick={()=>setTourRating(1)}>
                                        1<i class="ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=>setTourRating(2)}>
                                        2<i class="ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=>setTourRating(3)}>
                                        3<i class="ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=>setTourRating(4)}>
                                        4<i class="ri-star-s-fill"></i>
                                    </span>
                                    <span onClick={()=>setTourRating(5)}>
                                        5<i class="ri-star-s-fill"></i>
                                    </span>
                                </div>
                                <div className='review__input'>
                                    <input type='text' ref={reviewMsgRef} placeholder='share your thoughts' required/>
                                    <button className='bin primary__btn text-white' type='submit'>Submit</button>
                                </div>
                            </Form>
                            <ListGroup classname= "user__reviews"></ListGroup>
                                            reviews?.map(review=>(
                                                <div className='review__item'>
                                                    <img src={avatar} alt=""/>
                                                    <div className='w-100'>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>{new Date(review.createdAt).toLocaleDateString(
                                                                    "en-US",
                                                                    options
                                                                )}</p>
                                                            </div>
                                                            <span className='d-flex align-items-center'>
                                                                {review.rating}<i class="ri-star-s-fill"></i>
                                                            </span>
                                                        </div>
                                                        <h6>{review.reviewText}</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }                            
                            </ListGroup>
                        </div> 
                    </div>
                </Col>

                <Col lg='4'>
                      <Booking tour={tour} avgRating={avgRating}/>                  
                </Col>
            </Row>
            }
        </Container>
    </section>
    <Newsletter/>
    </>
    );

}