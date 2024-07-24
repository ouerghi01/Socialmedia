import React, { useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import { classNames } from 'primereact/utils'; // Import PrimeReact utility for classnames
import { Tooltip } from 'primereact/tooltip'; // Import PrimeReact tooltip for showing tooltips
const token=localStorage.getItem('token');
export const user_post  = async (owner) => {
    const response = await axios.get('http://localhost:8080/api/v1/social/post/'+owner, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
   return response.data;

};
const Renderpersoneldata = ({owner,yes_no}) => {
    const [owner_post, setOwner_post] = React.useState(null);
    useEffect(() => {
        user_post(owner)
        .then((data) => {
            setOwner_post(data);
        }
        ).catch((error) => {
            console.error(error);
        });
        
        ;
    },[owner]);
 
    if(!owner_post)   return <div>loading...</div>;  
        
    return (
        <div className='personal_info'style={{
            position:"relative",
            left:"-227px",
            top:"10px",        
        }}>
        {owner_post.image !== "" ? <img src={`${owner_post.image}`} alt='profile' /> : null}
        <div className='personal_share'>
          {owner_post.username !== "" ? <div id="username" style={{
            position:"relative",
            top:"-5px",
            zIndex:"1000",
          
          }}>{owner_post.username.substring(0,7)}</div> : null}
        </div>
        { yes_no===true && <Tooltip target=".public-icon" position="top" content="Public Post" /> &&
        <i className={classNames('pi pi-globe', 'public-icon')} style={{ position: 'relative', left: '-74px', top: '15px', color: 'green', fontSize: '1.1em' }}></i>}
      </div>
     )
}
export default Renderpersoneldata;