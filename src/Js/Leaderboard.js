import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Leaderboard.css';

const REACT_APP_BACKEND_URL = 'https://octiesback-production.up.railway.app';

const Leaderboard = ({ LeaderboardAnim, userId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/leaderboard`);
        if (response.data.success) {
          setLeaderboard(response.data.leaderboard);
        }
      } catch (error) {
        console.error('Ошибка при загрузке лидерборда:', error);
      }
    };
  
    const fetchUserRank = async () => {
      try {
        console.log(`Fetching rank for userId: ${userId}`); // Логирование userId
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/user-rank`, { params: { userId } });
        if (response.data.success) {
          console.log('User rank fetched successfully:', response.data.rank); // Логирование успешного ответа
          setUserRank(response.data.rank);
        } else {
          console.error('Error in response data:', response.data.message);
        }
      } catch (error) {
        console.error('Ошибка при загрузке позиции пользователя:', error);
      }
    };
  
    fetchLeaderboard();
    fetchUserRank();
  }, [userId]);

  const getMedal = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={`Lb_Window ${LeaderboardAnim ? 'fade-out' : ''}`}>
      <div className='lb_Info'>
        <p>Telegram Wall of Fame</p>
      </div>
      
      <div className='Lb_Menu'>
        <div className='LbBorder'>
          <div className='Lb_Logo'>
            <img src='/path/to/logo.png' alt='logo'/>
          </div>
          <div className='Lb_Text'>
            <p>🥇The 1st holder will get 400,000 OCTIES</p>
            <p>🥈The 2nd holder will get 250,000 OCTIES</p>
            <p>🥉The 3rd holder will get 100,000 OCTIES</p>
          </div>
        </div>

        <div className='Lb_inside'>
          <div className='LbPhoto'>
            <div style={{backgroundColor: getRandomColor(), borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white'}}>
              {userRank ? `#${userRank}` : '??'}
            </div>
            <p> Current User <br/><span id='LbColor'>{userRank ? `Rank: ${userRank}` : 'Loading...'}</span></p>
          </div>
        </div>
      
        <div className='Lb_Liders'>
          <p>Top 50 holders</p>
        </div>
        <div className='Lb_list'>
          {leaderboard.map((user, index) => (
            <div key={user._id} className='Lb_Lider'>
              <div className='LbPhotos'>
                <div style={{backgroundColor: getRandomColor(), borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'white'}}>
                  {user.nickname.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div className='tt'>
                <p>{user.firstName} {user.nickname}</p>
                <p id='LbColorr'>{user.coins} OCTIES</p>
              </div>
              <div className='LbPhotos' id="medal">
                <p>{getMedal(index)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
