import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profiles.module.css'; // Assuming you have a CSS module for styling

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
      className={styles.addFriend}
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
    <div className={styles.removeFriend}>Remove</div>
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
      className={styles.addFriend}
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
    <div className={styles.removeFriend}>Remove RequestFriendship</div>
  </div>
);
const YourFriends = ({ user, token }) => (
  <div>
    <div className={styles.profile} key={user.id}>
      <div className={styles.profileHeader}>
        <div className={styles.profileText}>
          {user.email? <p className={styles.email}>{user.email.substring(0, 7)}</p> : null}
        </div>
        <div className={styles.profileImage}>
          {user.image? <img src={user.image} alt='profile' className={styles.image} /> : null}
        </div>
      </div>
      <div className='openchat'>Chat your Friend</div>
    </div>
  </div>
)

export default function Profiles() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const token = localStorage.getItem('token');

  // Function to get all profiles
  useEffect(() => {
    const getAllProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/v1/Friendship/getallusers', {
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
  
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
  
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [token]);
  
  return (
    <>
      <div style={{
        display: 'block',
        maxWidth: '350px',
        height: '650px',
        left:'0'
      }}>
        <div
          className={styles.friendsButton}
          onClick={() => {
        
            setShowUsers(!showUsers);
            setShowRequests(false);
          }}
          
        >
          <i
            className="pi pi-users"
            style={{ fontSize: '3.5em', color: 'var(--primary-color)' }}
            data-pr-tooltip="Friends"
            data-pr-position="top"
          />
          <span className={styles.friendsText}>New Users </span>
          <Tooltip target=".pi-users" />
        </div>
        <div className={styles.profileContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : showUsers ? (
            users.map((user) => <Profile key={user.id} user={user} token={token} />)
          ) : null}
        </div>
        <div
       className={styles.friendsButton}
      onClick={() => {
      setShowRequests(!showRequests);
    setShowUsers(false);
  }}
>
  <i
    className="pi pi-user-plus" // Changed icon to pi-user-plus for add friends
    style={{ fontSize: '3.5em', color: 'var(--primary-color)' }}
    data-pr-tooltip="Requests Friends"
    data-pr-position="top"
  />
  <span className={styles.friendsText}>Request Friendship</span>
  <Tooltip target=".pi-user-plus" />
</div>
<div className={styles.profileContainer}>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : showRequests && requests != null ? (
    requests.map((user) => <RequestFriendship key={user.id} user={user} token={token} />)
  ) : null}
</div>
<div
  className={styles.friendsButton}
  onClick={() => {
    setShowFriends(!showFriends);
    setShowUsers(false);
    setShowRequests(false);
  }}
>
  <i
    className="pi pi-user-plus" // Changed icon to pi-user-plus for add friends
    style={{ fontSize: '3.5em', color: 'var(--primary-color)' }}
    data-pr-tooltip="Add Friends"
    data-pr-position="top"
  />
  <span className={styles.friendsText}>Friends</span>
  <Tooltip target=".pi-user-plus" />
</div>
<div className={styles.profileContainer}>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : showFriends && friends != null ? (
    friends.map((user) => <YourFriends key={user.id} user={user} token={token} />)
  ) : null}
</div>


        
      </div>
    </>
  );
}

