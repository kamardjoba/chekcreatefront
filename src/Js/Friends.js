// import React from 'react';
// import '../Css/Friends.css';

// import ib from '../IMG/Av/IB.png';
// import k from '../IMG/Av/K.png';
// import g4 from '../IMG/Av/G4.png';
// import s from '../IMG/Av/S.png';

// const Friends = ({ FriendsAnim, invite,  telegramLink }) => {

//     // const handleCopyLink = () => {
//     //     navigator.clipboard.writeText(telegramLink)
//     //       .then(() => {
//     //         alert('Ссылка скопирована в буфер обмена!');
//     //       })
//     //       .catch(err => {
//     //         console.error('Ошибка копирования ссылки:', err);
//     //       });
//     // };
    
//     const handleShareLink = () => {
//         const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(telegramLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
//         window.open(telegramUrl, '_blank');
//     };

//     return (
//         <div className={`Fr_Window ${FriendsAnim? 'fade-out' : ''}`}>
//             <div className='Fr_Info'>
//                 <p>Invite friends <br/> and get more OCTIES</p>
//             </div>
//             <div className='Fr_Main'>
//                 <img src={invite} alt='invite'/>
//             </div>
//             <div className='Fr_InviteBtn'>
//                 <div className='BTNInvete'>
//                     <p onClick={handleShareLink}>Invite friends</p>
//                     <p id='Fr_dark'>+10% of your <br/>friend’s age</p>
//                 </div>
//             </div>
//             <div className='Fr_Friends'>
//                 <p>4 friends</p>
//             </div>
//             <div className='Fr_list'>
//                 <div className='Fr_Frend'>
//                     <div className='FrPhoto'>
//                         <img src={ib} alt='ib' /> <p id='txt'>ivanbahranui</p>
//                     </div>
//                     <div className='FrPhoto'>
//                         <p>+1,228 OCTIES</p>
//                     </div>
//                 </div>
//                 <div className='Fr_Frend'>
//                     <div className='FrPhoto'>
//                         <img src={k} alt='k' /> <p id='txt'>kalogrivy</p>
//                     </div>
//                     <div className='FrPhoto'>
//                         <p>+38 OCTIES</p>
//                     </div>
//                 </div>
//                 <div className='Fr_Frend'>
//                     <div className='FrPhoto'>
//                         <img src={g4} alt='g4' /> <p id='txt'>g41111ss</p>
//                     </div>
//                     <div className='FrPhoto'>
//                         <p>+219 OCTIES</p>
//                     </div>
//                 </div>
//                 <div className='Fr_Frend'>
//                     <div className='FrPhoto'>
//                         <img src={s} alt='s' /> <p id='txt'>Aferist_5</p>
//                     </div>
//                     <div className='FrPhoto'>
//                         <p>+838 OCTIES</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Friends;

import React, { useState, useEffect } from 'react';
import '../Css/Friends.css';
import axios from 'axios';


const Friends = ({ FriendsAnim, invite,  referralCode }) => {
    const [referredUsers, setReferredUsers] = useState([]);
    const REACT_APP_BACKEND_URL = 'https://octiesback-production.up.railway.app';

    useEffect(() => {
        // Функция для получения данных о рефералах с сервера
        const fetchReferredUsers = async () => {
            try {
                const response = await axios.post(`${REACT_APP_BACKEND_URL}/get-referred-users`, { referralCode });
                setReferredUsers(response.data.referredUsers);
            } catch (error) {
                console.error('Ошибка при получении данных о рефералах:', error);
            }
        };

        fetchReferredUsers();
    }, [referralCode]);

    const handleShareLink = () => {
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(telegramLink)}&text=${encodeURIComponent('Присоединяйся к нашему приложению и получай бонусы!')}`;
                window.open(telegramUrl, '_blank');
            };

    return (
        <div className={`Fr_Window ${FriendsAnim ? 'fade-out' : ''}`}>
            <div className='Fr_Info'>
                <p>Invite friends <br/> and get more OCTIES</p>
            </div>
            <div className='Fr_Main'>
                <img src={invite} alt='invite'/>
            </div>
            <div className='Fr_InviteBtn'>
                <div className='BTNInvete'>
                    <p onClick={handleShareLink}>Invite friends</p>
                    <p id='Fr_dark'>+10% of your <br/>friend’s age</p>
                </div>
            </div>
            <div className='Fr_Friends'>
                <p>{referredUsers.length} friends</p>
            </div>
            <div className='Fr_list'>
                {referredUsers.map((user, index) => (
                    <div key={index} className='Fr_Frend'>
                        <div className='FrPhoto'>
                            <p id='txt'>{user.nickname}</p>
                        </div>
                        <div className='FrPhoto'>
                            <p>+{user.earnedCoins} OCTIES</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;
