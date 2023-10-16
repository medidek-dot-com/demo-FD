import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { Card } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from 'moment'



const CarouselStyle = styled(Carousel)`
    width:300px;
    // margin:10px;

`

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 5,
    },
};

const DateSlider = () => {

    const [dates, setDates] = useState([]);
    const [activeCard, setActiveCard] = useState(0);

  const getWeekDates = () => {

    const monthStart = moment().startOf('day'); 
    const monthsDates = [];
  
    for (let i = 0; i < 31; i++) {
      const date = monthStart.clone().add(i, 'days');
      monthsDates.push({day: date.format('ddd').toUpperCase(),      
      date: date.format('DD').toUpperCase(),
      month: date.format('MMM').toUpperCase(),}); 
    }
  
    setDates(monthsDates);
  };

useEffect(()=>{
  getWeekDates();
},[])

const handleDateClickCard = (e,cardId) => {
    // Set the active button when it's clicked
    setActiveCard(cardId);
};

   
    return (
        <>
        <CarouselStyle responsive={responsive}
        swipeable={true}
        slidesToSlide={4}
        
        >
            {dates.map((date, i)=>(
                <Card onClick={(e)=> handleDateClickCard(e, i) } sx={{width:'50px', textAlign:'center', margin:'5px 10px', padding:'10px', cursor:'pointer',
                background: activeCard === i ? '#1F51C6' : '#ffffff',
                color: activeCard === i ? '#ffffff' : ' #000000',
                }} key={i}>
                    <h4>{date.day}<br/>
                    {date.date}<br/>
                    {date.month}</h4>
                </Card>
            ))}
        </CarouselStyle>
        </>
    );
};

export default DateSlider;
