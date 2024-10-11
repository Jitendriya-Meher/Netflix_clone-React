import React, { useEffect, useState } from 'react';
import "./Player.css";
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  });

  const getMovieById = async () => {

    try{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTkzNzFkOTJmZjIxZDg5YzA5MWZiZjBjODY3NmIyYyIsIm5iZiI6MTcyODYyMzYzNi43ODA4MzMsInN1YiI6IjY3MDhhZjBjYzVmY2Y1YTE2MzRmNDVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ewggkOkV9avuOg2dQO21BCn6hVW8sxlHKcLgzJwjw2Y'
        }
      };
      
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);

      const data = await res.json();

      console.log("id data", data);

      setApiData(data.results[0]);

    }
    catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    getMovieById();
  },[]);
  
  return (
    <div className='player'>

      <img src={back_arrow_icon} alt=""
      onClick={() => {
        navigate("/");
      }}
       />

      <iframe
      width={"90%"}
      height={"90%"}
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer'
      frameBorder={"0"}
      allowFullScreen
      ></iframe>

      <div className="player-info">

        <p>
          {apiData.published_at.slice(0,10)}
        </p>

        <p>
          {apiData.name}
        </p>

        <p>
          {apiData.type}
        </p>

      </div>

    </div>
  )
}

export default Player