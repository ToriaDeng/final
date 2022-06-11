import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const MovieDetail =() =>{

    const [movieDetail,setMovieDetail]= useState({});
    const params= useParams();
    const movieId = params.movieId;
    const{rateMoive,rateMoiveList,user} = useContext(UserContext);
    const[isRate,setIsRate]=useState(false);
    const[rating,setRating]=useState('Select');

    useEffect(()=>{loadMovieDetail(movieId)},[movieId])//?
    const loadMovieDetail=(movieId)=>{
     fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=bded733ce43d616223bd6c56ac3e8a0f&language=en-US`
    )
    .then((resp) => resp.json())
    .then((data)=> {
        setMovieDetail(data)
    }).catch((err)=>err.message)
    }
    
    useEffect(()=>{
        if(Array.isArray(rateMoiveList)){
            const movie = rateMoiveList.find((movie)=>{
                return movie.id === Number(movieId);
            })
            setIsRate(!!movie);//??
            movie && setRating(movie.rating)
            //if
        }
    },[rateMoiveList,movieId]) 


    const handleRateChange= (e) => {
        if(!!user && !isNaN(Number(e.target.value))){
            rateMoive(movieId,Number(e.target.value));
            // setIsRate(Number(e.target.value));  
        }
    }
 
    const imgSrc = `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`

    return (
        <div>
             <img src={imgSrc} alt='Movie Poster'/>
             <br/>
             <div>{movieDetail.title}</div> 
             <br/>
             <div>{movieDetail.id}</div>
             <div>Release Date: {movieDetail.release_date}</div>
             <br/>
            <div>Overview:{movieDetail.overview}</div>   
             <div>{Array.isArray(movieDetail.genres) && movieDetail.genres.map((genres)=>{
                    return <span key={genres.name}>{genres.name}</span>
               })}
               </div>
            <br/>
            <div>{Array.isArray(movieDetail.production_companies) && movieDetail.production_companies.map((company)=>{
                    return <span key={company.name}>{company.name}</span>
               })}
               </div>
            <div>Average Rate:{movieDetail.vote_average}</div>
            <br/>
          
            <div>Your Rating: 
                {isRate && <div>{rating}</div>}
                <select onChange={handleRateChange} value={rating}>
                    <option value='Select'>Select</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
            </div>

        </div>
    )
}

export default MovieDetail;
