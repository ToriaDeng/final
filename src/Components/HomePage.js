import '../Css/HomPage.css';
import React,{useState,useEffect} from 'react';
import MovieLists from './MoviesLists';
import '../Css/HomPage.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const HomePage = () => {
    const apiKey = 'bded733ce43d616223bd6c56ac3e8a0f'
    const baseURL= 'https://api.themoviedb.org/3/movie'
    const [movieList,setMovieList]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [category,setCategory]=useState('now_playing');
    const [totalPage,setTotalpage] = useState(1);

    useEffect(()=>{loadMovieDate(category,currentPage)},[category,currentPage]);

    const loadMovieDate=(category,currentPage)=>{
    fetch(
    `${baseURL}/${category}?api_key=${apiKey}&language=en-US&page=${currentPage}`
    )
    .then((resp) => resp.json())
    .then((data) => {
        setMovieList(data.results);
        setCurrentPage(data.page)
        setTotalpage(data.total_pages)
    }).catch((err)=>err.message)
    
    }

    const handlePrevClick =()=>{
      if(currentPage > 1) {
        setCurrentPage(currentPage-1)
      }
    }

    const handleNextClick = ()=>{
      if(currentPage < totalPage) {
        setCurrentPage(currentPage+1)
      }
    }
    const handleCategoryChange = (e)=> {
        setCurrentPage(1)
        if (e.target.value === '10') {
          setCategory('popular')
        } else if(e.target.value === '20') {
          setCategory('now_playing')
        } else if(e.target.value === '30') {
          setCategory('top_rated')
        }else if(e.target.value === '40') {
          setCategory('upcoming')
        }
       
    }

  
  return (
    <div>
      <div>
      <div className= 'flex-container'>
      <div className='change-page'>
          <Button variant="outlined" onClick={handlePrevClick}>PREV</Button>
          <span className='page-num' >{currentPage}/{totalPage}</span>
          <Button variant="outlined" onClick={handleNextClick}>NEXT</Button>
      </div>
      <div className='category-selector'>
          <div>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              onChange={handleCategoryChange}
              defaultValue={20}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              <option value={10}>Popular</option>
              <option value={20}>Now Playing</option>
              <option value={30}>Top Rated</option>
              <option value={40}>Upcoming</option>
            </NativeSelect>
          </FormControl>
          </div> 
      </div> 
    </div>
      </div>
      <div>
        <MovieLists movieList={movieList}/>
      </div>  
    </div>
   
  );
}

export default HomePage ;