import React from 'react';
import '../Css/Leaderboard.css'

import ib from '../IMG/Av/IB.png';

const Leaderboard = () => {
    return (
      <div className='Lb_Fr_Window' id="Lb">
        <div className='lb_Info'>
          <p>Telegram Wall of Fame</p>
        </div>
        <div className='Lb_av'>
          <div className='Lb_inside'>
            <div className='LbPhoto'>
              <img src={ib} alt='ib'/><p> ivanbahranui <br/><span id='LbColor'>1,228 OCTIES</span></p>
            </div>
            <div className='LbPhoto'>
              <p id="number">#5302384</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Leaderboard;