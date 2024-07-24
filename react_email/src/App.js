/* eslint-disable react/jsx-pascal-case */
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from 'primereact/api';   
import {  useState } from 'react';     
import MainMenu from './Components/Menu/Menu';
import Signup from './Components/Authentification/Signup';
import Sigin from './Components/Authentification/Sigin';
import { useSelector } from 'react-redux';
import { selectUser } from './Redux/UserSlice';
//import Contenu from './Components/Contenu/Contenu';
import { useDispatch } from 'react-redux';
import { removeUser } from './Redux/UserSlice';
import Create_Post from './Components/PostRenderer/Create_post';
import Get_posts from './Components/PostRenderer/Get_posts';
import { FetchAddContext } from './Context/FetchAddContext';
//import { Outlet } from 'react-router-dom';
//import Profiles from './Components/Profiles/Profiles';
import { Link } from 'react-router-dom';
function App() {
  const [authentification, setAuthentification] = useState(true);
  const [showsignIn, setShowSignIn] = useState(false);
  const [showsignup, setShowSignup] = useState(false);
  const [signal, setSignal] = useState(0);
  const user =useSelector(selectUser);
  const dispatch=useDispatch()  ;
  const HandleLogin = (value) => {
    setAuthentification(value);
  }
  const itemsMenu = [
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    },
    ...(
          localStorage.getItem('token')!=null   ? 
        [
            {
                label: 'Sign Out',
                icon: 'pi pi-user-minus',
                className: 'costum-sign-in',
                command: () => {
                    setAuthentification(false);
                    setShowSignIn(false);
                    setShowSignup(false);
                    dispatch(removeUser());
                    localStorage.clear();
                    
                }
            }
        ] : 
        [
            {
                label: 'Sign In',
                icon: 'pi pi-user',
                className: 'costum-sign-in',
                command: () => {
                   setAuthentification(false);
                    setShowSignIn(!showsignIn);
                    setShowSignup(false);
                }
            },
            {
                label: 'Sign Up',
                icon: 'pi pi-user-plus',
                className: 'costum-sign-up',
                command: () => {
                  setAuthentification(false);
                    setShowSignup(!showsignup);
                    setShowSignIn(false);
                }
            }
        ]
    )
];
  return (
    <>  
    <PrimeReactProvider value={{ unstyled: false }}>
    <ChakraProvider>
      <>
      <MainMenu items={itemsMenu}/>
      {
        showsignIn && !showsignup && !authentification ? <Sigin  HandleLogin={HandleLogin} /> : null
      }

      {
        showsignup && !showsignIn && !authentification ? <Signup  Handleup={()=>{
          setShowSignup(false)
          setShowSignIn(true)
        }} /> : null
      }

      {
       // user.token!=="" ? <Contenu email={user.email} password={user.password}/> : null
      }
       {
        authentification && localStorage.getItem('token')!==null && 
        
        <div style={{
          padding:'0',
          backgroundColor:'green',
          boxShadow:'5px 5px 5px rgba(0,0,0,0.1)',
          marginBottom:'20px',
          width:"150px",
          height:"50px",
          textAlignment:'center',
        
          borderRadius:'10px',
                  
          cursor:'pointer',
          textDecoration:'none',
        }} >
               <Link to='profiles' style={{textDecoration: 'none', textAlign:"center",color: 'black'}}>Profiles
                </Link>
        
        </div>
         
       }
       <div  id='componentspost' style={{
        display: 'flex',
        flexDirection:'column',
        position: 'relative',
        top: '0px'        
        }}>
         
          <FetchAddContext.Provider value={{signal, setSignal}}>
          

            

          {
            authentification && localStorage.getItem('token')!==null && <Create_Post image={user.imageBas64} username={user.email}/> 
            }
            {
              authentification && localStorage.getItem('token')!==null && <Get_posts token={localStorage.getItem("token")} />
            }
          </FetchAddContext.Provider>
       </div>
       


      </>
      
    </ChakraProvider>    
    </PrimeReactProvider>

    </>
  );
}

export default App;
