import React, { useEffect, useRef, useState } from 'react';
import "./TitleCards.css";
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

    const cardsRef = useRef();
    const [apiData ,setApiData] = useState([]);

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += 4*e.deltaY;
    }

    const getApiData = async () => {

        try{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTkzNzFkOTJmZjIxZDg5YzA5MWZiZjBjODY3NmIyYyIsIm5iZiI6MTcyODYyMzYzNi43ODA4MzMsInN1YiI6IjY3MDhhZjBjYzVmY2Y1YTE2MzRmNDVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ewggkOkV9avuOg2dQO21BCn6hVW8sxlHKcLgzJwjw2Y'
                }
            };
              
            const res = await fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options);

            const data = await res.json();

            console.log("category",category)
            console.log(data.results);

            setApiData(data.results);

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        cardsRef.current.addEventListener("wheel", handleWheel);

        getApiData();

    },[]);

  return (
    <div className='title-cards'>

        <h2>
            {title?title:"Popular On Netflix"}
        </h2>

        <div className="card-list" ref={cardsRef}>
            {
                apiData.map((card,i) => (
                    <Link className="card"
                    to={`/player/${card.id}`}
                    key={i}>
                        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                        <p>
                            {card.original_title}
                        </p>
                    </Link>
                ))
            }
        </div>

    </div>
  )
}

export default TitleCards