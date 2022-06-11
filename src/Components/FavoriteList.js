import React,{useContext, useEffect} from 'react';
import UserContext from "../Context/UserContext";
import MovieCard from './MoviesCard';
import '../Css/MovieCard.css'



const FavoriteList = () => {
const {favoriteMovies,getFavoriteMovies,user}= useContext(UserContext);
// const[favorite,setFavorite]=useState();

useEffect(()=>{
    if(!!user){
        getFavoriteMovies(user.sessionId,user.accountId)
    }
},[user,getFavoriteMovies])

return (
    <>

    <div className='movie-card'>
        {favoriteMovies.map((movie)=> {
            const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return(
                <MovieCard
            key={movie.id}
            movieId={movie.id}
            imgSrc={imgSrc}
            title={movie.title}
            rating={movie.vote_average}
            /> 
        
            )
        } )}
    </div>
    </>
)

}


export default FavoriteList;