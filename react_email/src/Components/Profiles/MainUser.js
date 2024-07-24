import styles from './MainUserInfo.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainUserInfo = () => {
  const [mainUser, setMainUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMainUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/Friendship/main/${localStorage.getItem('user_id')}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMainUser(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    getMainUser();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    mainUser && (
      <div className={styles.mainUserContainer}>
        <img src={mainUser.image} alt="profile" className={styles.profileImage} />
        <div className={styles.userInfo}>
          <p className={styles.email}>{mainUser.email.substring(0, 7)}</p>
          <h1 className={styles.userId}>{mainUser.id}</h1>
        </div>
      </div>
    )
  );
};

export default MainUserInfo;
