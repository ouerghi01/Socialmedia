/* eslint-disable no-unused-vars */
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profiles.module.css';
import MainUserInfo from './MainUser';
import YourFriends from './YourFriends';
import { useSelector } from 'react-redux';
import { selectShareUsers } from '../../Redux/ShareUsersSlice';
import ContentChat from './messagier/templateMessage';
// Profile component to render individual user profile
const Profile = ({ user, token }) => (
  <div className={styles.profile} key={user.id}>
    <div className={styles.profileHeader}>
      <div className={styles.profileText}>
        {user.email ? <p className={styles.email}>{user.email.substring(0, 7)}</p> : null}
      </div>
      <div className={styles.profileImage}>
        {user.image ? <img src={user.image} alt='profile' className={styles.image} /> : null}
      </div>
    </div>
    <div
      className={styles.actionButton}
      onClick={async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/Friendship/sendrequest', {
            senderUserId: localStorage.getItem('user_id'),
            receiverUserId: user.id,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert(response.data);
        } catch (error) {
          console.error(error);
          alert('Failed to send friend request');
        }
      }}
    >
      Add Friend
    </div>
    <div className={styles.actionButton}>
      Remove
    </div>
  </div>
);

const RequestFriendship = ({ user, token }) => (
  <div className={styles.profile} key={user.id}>
    <div className={styles.profileHeader}>
      <div className={styles.profileText}>
        {user.email ? <p className={styles.email}>{user.email.substring(0, 7)}</p> : null}
      </div>
      <div className={styles.profileImage}>
        {user.image ? <img src={user.image} alt='profile' className={styles.image} /> : null}
      </div>
    </div>
    <div
      className={styles.actionButton}
      onClick={async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/Friendship/acceptrequest/', {
            senderUserId: user.id,
            receiverUserId: localStorage.getItem('user_id'),
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert(response.data);
        } catch (error) {
          console.error(error);
          alert('Failed to accept friend request');
        }
      }}
    >
      Accept Friend
    </div>
    <div className={styles.actionButton}>
      Remove RequestFriendship
    </div>
  </div>
);


export default function Profiles() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const shareUsers = useSelector(selectShareUsers);

  const token = localStorage.getItem('token');
  // Function to get all profiles
  useEffect(() => {
    const getAllProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/Friendship/getallusers/'+localStorage.getItem('user_id'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch profiles');
      } finally {
        setLoading(false);
      }
    };

    const getFriends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/Friendship/getallfriends/' + localStorage.getItem('user_id'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Function to get all request profiles
    const getAllRequestProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/Friendship/getallrequests/' + localStorage.getItem('user_id'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = () => {
      getAllProfiles();
      getAllRequestProfiles();
      getFriends();
    };

    fetchData(); // Initial fetch

    
  }, [token]);

  return (
    <>
      <MainUserInfo />
      <div className={styles.container} >
        <div className={styles.sidebar}>
          <div
            className={styles.friendsButton}
            onClick={() => {
              setShowUsers(!showUsers);
              setShowRequests(false);
              setShowFriends(false);
            }}
          >
            <i className="pi pi-users" data-pr-tooltip="New Users" data-pr-position="top" />
            <span className={styles.friendsText}>New Users</span>
            <Tooltip target=".pi-users" />
          </div>
          <div
            className={styles.friendsButton}
            onClick={() => {
              setShowRequests(!showRequests);
              setShowUsers(false);
              setShowFriends(false);
            }}
          >
            <i className="pi pi-user-plus" data-pr-tooltip="Requests Friends" data-pr-position="top" />
            <span className={styles.friendsText}>Request Friendship</span>
            <Tooltip target=".pi-user-plus" />
          </div>
          <div
            className={styles.friendsButton}
            onClick={() => {
              setShowFriends(!showFriends);
              setShowUsers(false);
              setShowRequests(false);
            }}
          >
            <i className="pi pi-user" data-pr-tooltip="Friends" data-pr-position="top" />
            <span className={styles.friendsText}>Friends</span>
            <Tooltip target=".pi-user" />
          </div>
        </div>
        <div className={styles.content}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : showUsers ? (
            users.map((user) => <Profile key={user.id} user={user} token={token} />)
          ) : showRequests ? (
            requests.map((user) => <RequestFriendship key={user.id} user={user} token={token} />)
          ) : showFriends ? (
            friends.map((user) =>   ( <>
                                      <YourFriends key={user.id} user={user}  />
                                      
                                      </>  
                                     ))
          ) : null}
        </div>
        
      </div>
      {   shareUsers.show && <div className={styles.ContentChat}> 
          <ContentChat data={shareUsers} />   
          </div> 
 }

    </>
  );
}
