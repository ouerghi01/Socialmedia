/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import Renderpersoneldata from './RenderPersonelData';
import RenderAddComment from './Comment/RenderAddComment';
import RenderGetcomment from './Comment/Render_Getcomment';
import { FetchAddContext } from '../../Context/FetchAddContext';
import GetNombreCmnt from './GetNombrecmnt';
import {cmntContext} from '../../Context/FetchAddCmntContext';
const   Get_posts = (props) => {
    const [posts, setPosts] = useState([]);
    const { token } = props;
    const {signal}=useContext(FetchAddContext);
    const [signalcmnt, setSignalcmnt] = useState(0);
    const [showGetcomment, setShowGetcomment] = useState(false);
    

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/social/posts/' + true, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };
   
    useEffect(() => {
        // Fetch posts initially
        fetchPosts();

    }, [signal]); 

    const render_post = (text,imagebase64) => {
        return (
            <div className='post'>
                <div className='post_text'>
                    {text}
                </div>
                <div className='post_image'>
                    {imagebase64 ? <img src={`${imagebase64}`} alt='post' /> : null}
                </div>
                
            </div>
        )
    }
    return (
        <div style={{
            position:"relative",
            left:"500px",
            top:"-60px",
            maxWidth:"650px",
            height:"650px",
            margin:"5px"
        }}>
        {
    posts.length !== 0 ? 
    posts.map((post) => (
        <div key={post.id} className='post-wrapper'>
            <div className='container_post' style={{
            zIndex:"1000",
        }}>
                <Renderpersoneldata owner={post.owner_id} yes_no={true}/>
                {render_post(post.content, post.picture)}
                <cmntContext.Provider value={{signalcmnt,setSignalcmnt }}>
                <div id='nbr_cmnt' style={{
                    position:"relative",
                    left:"200px",
                    color:"blue",
                    cursor:"pointer",
                }}onClick={()=>{
                    setShowGetcomment(!showGetcomment);
                }}><GetNombreCmnt token={token} post_id={post.id}/></div>
               { showGetcomment && <RenderGetcomment post_id={post.id} token={token}/>}
                <RenderAddComment post_id={post.id} />
                </cmntContext.Provider>

            </div>
        </div>
    )) : 
    <h1>There is no post yet</h1>
}

        </div>
    )
}
export default Get_posts;