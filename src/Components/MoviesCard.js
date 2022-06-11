import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {Link} from 'react-router-dom'
import '../Css/MovieCard.css'
import UserContext from "../Context/UserContext";
import React,{useContext,useState,useEffect} from 'react';


const MovieCard = ({
        movieId, 
        imgSrc,
        title,
        rating,
        }) =>{

    const[favorite,setFavorite] = useState(false);
    const {favoriteMovies,markFavoriteMovie,user} = useContext(UserContext);
    

    useEffect(()=>{
        if(Array.isArray(favoriteMovies)){ 
            const movie = favoriteMovies.find((movie)=>{          
                return movie.id === Number(movieId);
            })
            setFavorite(!!movie);//??re render
        }
    },[favoriteMovies,movieId]) //reRender
     

    const handleMarkFavorite =(movieId,favorite)=>{
        if(!!user)
        { 
         markFavoriteMovie(movieId,favorite); 
        }
    }

    return(
        
        <div>
        <div className='movie-card'>
            <div className='main-card' key={movieId}>
             <div>
                <Link style={{textDecoration: 'none'}} to={`/movieDetail${movieId}`}>
                <img className='card-image' src={imgSrc} alt='Movie Poster'/>
                <div className='card-title'>{title}</div> 
                </Link> 
                </div>
                <div className='card-favourite' onClick={()=>{handleMarkFavorite(movieId,!favorite)}}>
                    Rate:{rating}
                    {favorite? <FavoriteOutlinedIcon style={{ color: "red" }} sx={{fontSize: 20}}/>:<FavoriteOutlinedIcon style={{ color: "grey" }} sx={{fontSize: 20}}/>}  
                </div>
            </div> 
        </div>
       </div>
        )}

export default MovieCard;

