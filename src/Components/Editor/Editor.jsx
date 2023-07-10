import React, { useState } from 'react';
import "./Editor.css"
import CloseIcon from '@mui/icons-material/Close';

const Editor = ({setConfigs, setShowMenu, setStartTime}) => {

    const [inpSleep, setInpSleep] = useState(6)
    const [inpSlots, setInpSlots] = useState(6)
    const [inpPackets, setInpPackets] = useState(6)

    return (
        <div className='editor'>
            <div className="title-bar">
                <div className="title">Configure</div>
                <span onClick={e => setShowMenu(prev => !prev)}>
                <CloseIcon />
                </span>
            </div>
            <div className="content">
                <div className="options-container">

                    <div className="options">
                        <div className="option">
                            <div className="text">Hours of Sleep</div>
                            <div className="numbers">
                                <div className="incdec">
                                    <div onClick={() => setInpSleep(prev => {
                                        if (prev > 0)   return prev - 1;
                                        return prev
                                    })} className="incdec-btn">{`-`}</div>
                                    <div className="incdec-textarea">{inpSleep}</div>
                                    <div onClick={() => setInpSleep(prev => {
                                        if (prev < 24)   return prev + 1;
                                        return prev
                                    })} className="incdec-btn">{`+`}</div>
                                </div>
                                <div className='info'><span>{24 - inpSleep}</span>Remaining Hours </div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="text">Number of Slots</div>
                            <div className="numbers">
                                <div className="incdec">
                                    <div onClick={() => setInpSlots(prev => {
                                        if (prev > 1)   return prev - 1;
                                        return prev
                                    })} className="incdec-btn">{`-`}</div>
                                    <div className="incdec-textarea">{inpSlots}</div>
                                    <div onClick={() => setInpSlots(prev => {
                                        if (prev < (24 - inpSleep) )   return prev + 1;
                                        return prev
                                    })} className="incdec-btn">{`+`}</div>
                                </div>
                                <div className='info'> <span>{Math.floor((24 - inpSleep)/(inpSlots))}</span>Time per slot (in hours)</div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="text">Number of Packets</div>
                            <div className="numbers">
                                <div className="incdec">
                                    <div onClick={() => setInpPackets(prev => {
                                        if (prev > 1)   return prev - 1;
                                        return prev
                                    })} className="incdec-btn">{`-`}</div>
                                    <div className="incdec-textarea">{inpPackets}</div>
                                    <div onClick={() => setInpPackets(prev => {
                                        if (prev < (inpSlots*60))   return prev + 1;
                                        return prev
                                    })} className="incdec-btn">{`+`}</div>
                                </div>
                                <div className='info'><span>{Math.floor((24 - inpSleep)/(inpSlots)/inpPackets*60)}</span>Time per packet (in minutes) </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-btn">
                    <button onClick={e => {
                        setStartTime(new Date())
                        setConfigs({
                            totalSlots: inpSlots,
                            totalPackets: inpPackets,
                            packetDuration: Math.floor((24 - inpSleep)/(inpSlots)/inpPackets*60)*60
                        })
                        setShowMenu(prev => !prev)
                    }}>{`SAVE ---------->`}</button>
                </div>
            </div>
        </div>
    );
}

export default Editor;
