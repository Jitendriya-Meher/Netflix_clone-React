import React, { useEffect, useRef } from 'react';
import "./TitleCards.css";
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title, category}) => {

    const cardsRef = useRef();

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += 4*e.deltaY;
    }

    useEffect(()=>{
        cardsRef.current.addEventListener("wheel", handleWheel);
    },[]);

  return (
    <div className='title-cards'>

        <h2>
            {title?title:"Popular On Netflix"}
        </h2>

        <div className="card-list" ref={cardsRef}>
            {
                cards_data.map((card,i) => (
                    <div className="card" key={i}>
                        <img src={card.image} alt="" />
                        <p>
                            {card.name}
                        </p>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default TitleCards