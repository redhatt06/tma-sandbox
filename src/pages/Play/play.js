import React, { useState, useEffect } from 'react';
import './play.css';
import brinLogo from '../../assets/android-chrome-512x512.png';

function Play(props) {
    const { handleTap } = props
    return (
    <div id="game">
        <div id="coin">
            <div class="letter" onClick={handleTap}>
                <img className='brinlogo' src={brinLogo} />
            </div>
        </div>
    </div>
    );

}

export default Play;
