
import styles from './Profiles.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShareUsers } from '../../Redux/ShareUsersSlice';

const YourFriends = ({ user}) => {
    const [showMessage, setShowMessage] = useState(false);
    const dispatch=useDispatch();

    return (
        <>
          <div className={styles.profile} key={user.id}>
          <div className={styles.profileHeader}>
            <div className={styles.profileText}>
              {user.email ? <p className={styles.email}>{user.email.substring(0, 7)}</p> : null}
            </div>
            <div className={styles.profileImage}>
              {user.image ? <img    src={user.image} alt='profile' className={styles.image} /> : null}
            </div>
          </div>
          <div className={styles.chatButton} onClick={() => {
            setShowMessage(!showMessage);
            dispatch(setShareUsers({ id:user.id, email:user.email,image:user.image,show:showMessage}));

          }
          }
          >
            Chat your Friend
          </div>
        </div>     
       </>
      
      );
}
    
    
    
  
  export default YourFriends;