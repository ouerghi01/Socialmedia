import React from 'react'
import { useState ,useContext} from 'react';
import './Post.css' ;
import axios from 'axios';
import { FetchAddContext } from '../../Context/FetchAddContext';
import { useSelector } from 'react-redux';

export default function Create_Post(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible, setVisible] = useState("public");
  const [text,setText] =useState("");
  const [imagebase64,setImagebas64]=useState("");
  const {setSignal} = useContext(FetchAddContext);
  const user = useSelector((state) => state.user.user);
 // const [signal, setSignal] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const render_personel_data = (data) => {
    return (
      <div className='personal_info'>
      {  localStorage.getItem("imageBase64")!=="" ?  <img src={`${localStorage.getItem("imageBas64")}`} alt='profile' /> : null }
      <div className='personal_share'>
      {data.username && <div id="username">{localStorage.getItem('username').substring(0,11)}</div>}
      <select value={visible} onChange={(e)=>{setVisible(e.target.value)} }>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      </div>
      </div>
    )
  }
  // eslint-disable-next-line no-unused-vars
  const render_post = () => {
    return (
      <div className='post'>
        <textarea placeholder='What is in your mind ?' onChange={(e)=>{
            setText(e.target.value)
        }}></textarea>
        <div className='post_footer'>
          <input type='file' accept='image/*' onChange={(e)=>{
            const file = e.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
              setImagebas64(reader.result);
            };
            reader.readAsDataURL(file);
          }} />
        </div>
      </div>
    )
 
}
async function createPost(imagebase64, text, visible, user) {
  try {
      console.log(localStorage.getItem("token"));
      const visibility = visible === "public" ? true : false;
      const response = await axios.post('http://localhost:8080/api/v1/social/createpost', {
         'picture': imagebase64,
          'content': text,
          'visibility': visibility,
          'owner': localStorage.getItem('username')
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
              }
      });
      if(response.status === 200) {
          setSignal(prev => prev + 1); // Update signal to trigger re-fetch
          alert('Post created successfully');
          
      }
      
      //alert(response.data.message);
  } catch (error) {
      // Handle any errors that occur during the request
      console.error("An error occurred:", error);
      alert('Failed to create post. Please try again later.');
  }
}
const submit_post=()=> {
    return (
        <div>
            <button  id='submitpost' color='bleu' onClick={()=> {
                createPost(imagebase64, text, visible, user);
            }} >Post</button>
        </div>
    )
}
const render_all =(data) =>{
return  (
   <>
    <div className='initial_prompt' style={{cursor:'pointer',position:"relative",top:"-30px"}}
    onClick={()=> { setIsModalOpen(!isModalOpen)}}>
    { localStorage.getItem("imageBase64")!=="" ? <img src={`${localStorage.getItem("imageBas64")}`} alt='profile' /> : null }
       <div id='const_text'>
        What is on your mind, {localStorage.getItem('username').substring(0,11)}?
       </div>
    </div>
    { isModalOpen  && (

    <div className='modal' >
    
      <div className='modal_content'>
      <button className="close_button" onClick={() => setIsModalOpen(false)}> X</button>
       {render_personel_data(data)}
       {render_post()}
       {submit_post()} 
      </div> 
      </div>
    )
    }
    
  
   </>
)
}
  return render_all(props)
}
