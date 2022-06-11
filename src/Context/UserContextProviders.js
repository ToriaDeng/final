import React,{useState} from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const UserContextPovider = ({children})=>{
    //(props.children=> index.js <App/>)
    const[loginErr,setLoginErr]= useState(null);
    const [isLoading,setLoading]=useState(false);
    const [user,setUser]=useState(null);

    const[favoriteMovies,setFavoriteMovies]=useState([]);
    // const [favorteMovieIds,setFavoriteMoiveIds] = useState([]);
    const [rateMoiveList,setRateMovieList]= useState([]);

   
    const apiKey = 'bded733ce43d616223bd6c56ac3e8a0f'
    const baseURL= 'https://api.themoviedb.org/3'

    const client = axios.create({
        baseURL: baseURL,
        params: {
        api_key: apiKey
        },
    });//original URL  contain '?' ,means '?' follow  param

    const markFavoriteMovie = async(movieId,favorite) => {
        if(!!user)
        { 
        const {sessionId:session_id,accountId:account_id} = user; //??
        await client.post(`/account/${account_id}/favorite`,{  
            "media_type": "movie",
            "media_id": movieId,
            "favorite": favorite,
            },{params:{session_id}})
            .then(()=>
                getFavoriteMovies(session_id,account_id)
            )        
    }}
    // useEffect(()=>{
    //     if(Array.isArray(favoriteMovies)){
    //         setFavoriteMoiveIds(favoriteMovies.map((movie)=>{
    //             return movie.id
    //         }))
    //     }
        
    // },[favoriteMovies.length,setFavoriteMoiveIds]);

    const getFavoriteMovies= async (session_id,account_id) => {
        if(!!user){
        // const {sessionId:session_id,accountId:account_id} = user;
        return await client.get(`/account/${account_id}/favorite//movies`,{params:{session_id}})
        .then((data)=>{          
           setFavoriteMovies([...data.data.results]) 
           
    })}
       
    }
   

    const rateMoive = async(movieId,rating)=>{
        if(!!user) {
            const {sessionId:session_id,accountId:account_id} = user;
            await client.post(`/movie/${movieId}/rating`,{  
                "value": rating,
                },{params:{session_id}}) 
                .then(()=>{
                    getRateList(account_id,session_id);//??
                })
        }
    }

    const getRateList = async(account_id,session_id) =>{
        if (!!user) {
            return await client.get(`/account/${account_id}/rated/movies`,{params:{session_id}})
            .then((data)=>{
                return setRateMovieList(data.data.results)
                        
            })
        }
    }



    const handleLogOut = async () =>{
        if(!!user){
            try {
                setLoading(true);
                setUser(null);
                setLoginErr(null);
                localStorage.removeItem('user');
            } catch(err){
                setLoginErr(err);
                throw err;
            }finally{
                setLoading(false);
            }
            }
    };

    const handleLogin = async (username,password) => {
        try {
            setLoading(true);
            // const requestTokenData = await client.get(`/authentication/token/new`)
            // .then((resp)=>{
            //     const request_token=resp.data.request_token;
            //     client.post(`/authentication/token/validate_with_login`, {username, password,request_token})
            //     .then(()=>{
            //         const sessionData = client.post(`/authentication/session/new`,{request_token})
            //         .then((sessionData)=>{
            //             const session_id = sessionData.data.session_id;
            //             client.get(`/account`,{params:{session_id}})
            //             .then(({data})=>{
            //                 const userData= {
            //                     username,
            //                     accountId:data.id,
            //                     sessionId: session_id,
            //                     requestToken: request_token
            //                 };
            //                 localStorage.setItem('user',JSON.stringify(userData));//??
            //                 setUser(userData);
            //                 setLoading(false);
            //                 setLoginErr(null);
            //             })
            //         })
            //     })

            // })
            const {data:{request_token}}= await client.get(`/authentication/token/new`)
            await client.post(`/authentication/token/validate_with_login`, { username, password,request_token});// validate request token/ request body??obj?? 
            const {data:{session_id}}= await client.post(`/authentication/session/new`,{request_token})//create a fully valid session ID / request body ??
            client.defaults.params={...client.defaults.params,session_id}
            // const {data}= await client.get(`/account`);
            const {data} = await client.get(`/account`)
            const userData= {
                username,
                accountId:data.id,
                sessionId: session_id,
                requestToken: request_token

            };
            localStorage.setItem('user',JSON.stringify(userData));//??
            setUser(userData);
            setLoading(false);
            setLoginErr(null);
            
        }
        catch(err) {
            setUser(null);
            setLoginErr(err);
            // console.error(err.message);
            throw err;
        }finally{
            setLoading(false);
        }
    }
  

    return (
        <UserContext.Provider value={{
             loginErr,
             isLoading,user,
             handleLogin,
             handleLogOut,
             markFavoriteMovie,
             getFavoriteMovies,
             favoriteMovies,
             rateMoiveList,
             rateMoive,
             getRateList}}>
            {children}
            {/*  (props.children) wraped by Provider in index.js <App/>*/}
        </UserContext.Provider>
    )
}

export default UserContextPovider;


