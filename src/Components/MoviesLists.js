
import MovieCard from './MoviesCard';
import '../Css/MovieCard.css'


const MovieLists = ({movieList})=>{

return(
    <div>
        <div className='movie-card'>
        {movieList.map((movie)=>{
            const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return ( 
            // <Link to={`/movieDetail${movie.id}`}>
            <MovieCard
            key={movie.id}
            movieId={movie.id}
            imgSrc={imgSrc}
            title={movie.title}
            rating={movie.vote_average}
            />
            // </Link>
                )})}
        </div>
    </div>
 )
            }

export default MovieLists;



// return(
//         <div>
//         <div className='movie-card'>
//            {movieList.map((movie)=>{
//             const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

//                return <div className='main-card' key={movie.id} onClick={()=>handleMovieDetail(movie.id)}>
//                     <div>
//                     <img className='card-image' src={imgSrc} alt='Movie Poster'/>
//                     <div className='card-title'>{movie.title}</div> 
//                     </div>
//                    <span className='card-favourite'>
//                                 {movie.vote_average}<FavoriteBorderIcon sx={{fontSize: 20}}/>
//                             </span>
//                 </div>