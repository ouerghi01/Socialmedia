/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import "./posts_action.css";
import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import { cmntContext } from '../../../Context/FetchAddCmntContext';
import { useCallback } from 'react';

export default function RenderAddComment(props) {
const [showinput, setShowInput] = React.useState(false);
const [cmnt, setCmnt] = React.useState('');
const [image, setImage] = React.useState(null);
const [nbrlike, setNbrlike] = React.useState(0);
const [signallike, setSignalLike] = React.useState(0);
const [signalcmnt, setSignalcmnt] = React.useState(0);
/// add the the photo of the current user 
const display_AddFirstComment = (post_id) => {
    return (
        <div className="comment_input" style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '20px',
            padding: '5px 10px',
            position: 'relative',
            top: '5px',
            background: '#f0f2f5'
        }}> 
           <input type='text' value={cmnt} onChange={(e) => setCmnt(e.target.value)}
           placeholder={`Add a comment as  ${localStorage.getItem("username").substring(0, 11)}`} style={{
                border: 'none',
                outline: 'none',
                width: '500px',
                padding: '8px 10px',
                borderRadius: '20px',
                background: 'transparent'
            }}/>
           <div>
            <label htmlFor="file-upload" className="custom-file-upload">
               <Tooltip target=".image-icon" position="top" content="upload image" />
                <i className={classNames('pi pi-upload', 'image-icon')} style={{ fontSize: '1.1em', cursor: 'pointer' ,position:"relative",top:"0px",left:"-10px"}}></i>
            </label>
            <input id="file-upload" type="file" style={{ display: 'none' }}
            onChange={(e)=>{
              const file = e.target.files[0];
              let reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(file);
            }}
            />
            </div>           
             <button onClick={ async () => {
                if (cmnt.length > 0) {
                  const response = await axios.post('http://localhost:8080/api/v1/social/comment_post', {
                    'picture': image,
                     'content': cmnt,
                     'post_id': post_id,
                     'owner_comment': localStorage.getItem("username")
                 }, {
                   headers: {
                     'Authorization': `Bearer ${localStorage.getItem("token")}`
                         }
                 });
                  alert('comment added');
                  setSignalcmnt(1);
                }
            }}
            style={{
                border: 'none',
                background: 'none',
                marginLeft: '10px',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <i className="pi pi-send" style={{ color: 'var(--primary-color)', fontSize: '1.2em' ,position:"relative",left:"10px"}}></i>
            </button>
        </div>
    )
}
const [likesignal, setLikeSignal] = React.useState(0);
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const addlike = async (post_id) => {
  const response = await axios.post('http://localhost:8080/api/v1/social/like_post', {
    'post_id': post_id,
    'owner_like': username
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
   if(response.data === 'Liked'){
     setSignalLike(1);
   }
}
const nbr_likes = async (post_id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/social/nbrlike/${post_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setNbrlike(response.data);
  } catch (error) {
    console.error('Error fetching number of likes:', error);
  }
}

useEffect(() => {
  nbr_likes(props.post_id);
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [signallike, props.post_id]);
return (
    <>
    
    <div className='post-actions'>
      <div className='action-icons'>
       
        <div className='action-item' style={{ cursor: 'pointer' ,color: 'var(--primary-color)' }}
        onClick={() => addlike(props.post_id)}
        >
          <i className="pi pi-thumbs-up" style={{ fontSize: '1.1em', color: 'var(--primary-color)' }}></i>
          <span>Like {nbrlike}</span>
        </div> 
        <div className='action-item'>
          <button onClick={() => setShowInput(!showinput)}>
          <i className="pi pi-comment" style={{ fontSize: '1.1em', color: 'var(--primary-color)' }}></i>
          <span>Comment</span>
           </button>
        </div>
        <div className='action-item'>
          <i className="pi pi-share-alt" style={{ fontSize: '1.1em', color: 'var(--primary-color)' }}></i>
          <span>Share</span>
        </div>
      </div>
    </div>
  
    {showinput&&  display_AddFirstComment(props.post_id)}
  </>

)

}