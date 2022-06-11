import React,{useContext, useEffect} from 'react';
import UserContext from '../Context/UserContext';
import MovieCard from './MoviesCard';
import '../Css/MovieCard.css';


const RateList = () =>{
    const{rateMoiveList,user,getRateList}= useContext(UserContext);

    useEffect(()=>{
        if(!!user){
        getRateList(user.accountId,user.sessionId)
        }
    },[user,getRateList])
    
    return(
        <div className='movie-card'>
        {rateMoiveList.map((movie)=>{
            const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return(
                <MovieCard
            key={movie.id}
            movieId={movie.id}
            imgSrc={imgSrc}
            title={movie.title}
            rating={movie.vote_average}
            /> )
        
        })}
        </div> 
    )

}

export default RateList;