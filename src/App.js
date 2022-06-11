
import { Route,Routes} from 'react-router-dom';
import HomePage from './Components/HomePage';
import MovieDetail from './Components/MoviesDetail';
import LoginPage from './Components/LoginPage';
import FavoriteList from './Components/FavoriteList';
import RateList from './Components/RatedList';
import NavBar from './Components/NavBar';

function App() {

  return (
    <>
    <NavBar/>
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/user/:userId' element={<HomePage/>} />
        <Route path='/movieDetail:movieId' element={<MovieDetail/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/user/favoriteList' element={<FavoriteList/>}/>
        <Route path='/user/rateList' element={<RateList/>}/>

        {/* //只需要改一下右上角id */}
    </Routes>
  
    </>
    // <HomePage/>
    
  );
}

export default App;
