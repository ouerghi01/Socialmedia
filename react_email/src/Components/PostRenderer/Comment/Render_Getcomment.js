
import React, { useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { cmntContext } from '../../../Context/FetchAddCmntContext';
import Renderpersoneldata from '../RenderPersonelData';
export default function  RenderGetcomment (props) {
const { post_id, token } = props;
const [comments, setComments] = React.useState([]);
const { signalcmnt } = React.useContext(cmntContext);

const fetchComments= useCallback(async ()=> {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/social/comments/'+post_id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setComments(response.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
},[post_id, token]);
useEffect(() => {
    fetchComments();
}, [signalcmnt,fetchComments ]);

return (
    <div 
    style={{
      
        maxWidth:"650px",
        height:"auto",
        margin:"5px"
    
    }}
    >
        {
        comments.length !== 0 ? comments.map((comment) => (
            <div key={comment.id} className='comment-wrapper'style={{
                display: "block",
                flexDirection: "row",
                width: "600px",
                height: "auto",
            }}>
                <div className='container_comment' style={{
                    zIndex:"1000",
                    display: "flex",
                    
                }}>
                    <div className='comment_owner' style={{
                        position:"relative",
                        left:"220px",
                        top:"-10px",
                    
                    }}>
                        <Renderpersoneldata owner={comment.owner_id} yes_no={false}/>
                    </div>
                    <div className='comment_text'
                    style={{
                        position:"relative",
                        left:"-10px",
                        top:"-10px",
                        zIndex:"500",
                    
                    }}
                    >
                        {comment.content}
                        {comment.picture ? <img src={`${comment} `} alt='comment' /> : null}
                    </div>
                   
                </div>
                <div className='comment_date'>
                        {comment.date_cre}
                </div>
            </div>
        )): null
        }
    </div>
)
}
