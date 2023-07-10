import React, { useState } from 'react';
import "./App.css"
import Navbar from '../Navbar/Navbar';
import TimerComponent from '../TimerComponent/TimerComponent';
import Editor from '../Editor/Editor';


const App = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [startTime, setStartTime] = useState(new Date())
    const [configs, setConfigs] = useState({
        totalSlots: 6,
        totalPackets: 6,
        packetDuration: 30*60
    })

    return (
        <div className='app'>
            <Navbar setShowMenu={setShowMenu} />
            <div className="app-contents">
                {showMenu ? <Editor setConfigs={setConfigs} setShowMenu={setShowMenu} setStartTime={setStartTime} /> : <TimerComponent configs={configs} startTime={startTime} />}

            </div>
            
            

        </div>
    );
}

export default App;
