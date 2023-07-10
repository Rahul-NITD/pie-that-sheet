import React, { useEffect, useState } from 'react';
import "./TimerComponent.css"
import beep from "../../assets/mixkit-classic-short-alarm-993.wav"

const TimerComponent = (props) => {

    const [ping, setPing] = useState(1)
    const [secondsRemaining, setSecondsRemaining] = useState(null)
    const [packetDuration, setPacketDuration] = useState(1 * 3)
    const [totalPackets, setTotalPackets] = useState(3)
    const [packetsRemaining, setPacketsRemaining] = useState(3)
    const [startTime, setStartTime] = useState(new Date())
    const [totalSlots, setTotalSlots] = useState(2)
    const [slotsRemaining, setSlotsRemaining] = useState(2)
    const [display, setDisplay] = useState({})

    useEffect(() => {
        console.log(props)
        setStartTime(props.startTime)
        setPacketDuration(props.configs.packetDuration)
        setTotalSlots(props.configs.totalSlots)
        setTotalPackets(props.configs.totalPackets)
        setSecondsRemaining(props.configs.packetDuration)
        setPacketsRemaining(props.configs.totalPackets)
        setSlotsRemaining(props.configs.totalSlots)
    }, [props.startTime, props.configs])

    useEffect(() => {
    }, [packetsRemaining])

    useEffect(() => {
        const interval = setInterval(
            () => {
                setPing(prev => {
                    return (prev + 1) % 1061;
                });
            }, 100
        )
        return () => {
            clearInterval(interval)
        }
    }, [ping])

    useEffect(() => {
        setDisplay(prev => {
            if (secondsRemaining !== undefined)
                return {
                    ...prev,
                    seconds0: (secondsRemaining % (60)) % 10,
                    seconds1: Math.floor((secondsRemaining % (60)) / 10),
                    minutes0: Math.floor((secondsRemaining / (60)) % 10),
                    minutes1: Math.floor((secondsRemaining / (60)) / 10),
                }
            return prev
        })
    }, [secondsRemaining])

    useEffect(() => {
        setPacketsRemaining(prevPackets => {
            if (secondsRemaining === 0) {
                console.log(secondsRemaining);
                (new Audio(beep)).play();
                if (prevPackets === 0) {
                    setSlotsRemaining(prevSlots => {
                        if (prevSlots === 1) {
                            console.log("Ayo")
                            return totalSlots
                        }
                        return prevSlots - 1
                    })
                    return totalPackets - 1
                }
                return (prevPackets - 1)
            }
            return prevPackets
        })

    }, [secondsRemaining])

    useEffect(() => {
        const secondsfrom12AM = (new Date()).getSeconds() + (new Date()).getMinutes() * 60 + (new Date()).getHours() * 3600;
        const secondsfromClockStart = secondsfrom12AM - (startTime.getHours() * 3600 + startTime.getMinutes() * 60 + startTime.getSeconds())
        setSecondsRemaining(prev => {
            if (prev !== secondsfromClockStart) {
                return packetDuration - secondsfromClockStart % packetDuration - 1;
            }
        })

    }, [ping])

    return (
        <div className='timer'>
            <span className='clock-wrapper' style={{backgroundImage: `conic-gradient(transparent ${secondsRemaining/packetDuration*360}deg, #ff0048 ${secondsRemaining/packetDuration*360}deg)`}}>
                <div className="clock">
                    <span className="digits">
                        <div className="pair">
                            <span className="digit">{display.minutes1}</span>
                            <span className="digit">{display.minutes0}</span>
                        </div>
                        :
                        <div className="pair">
                            <span className="digit">{display.seconds1}</span>
                            <span className="digit">{display.seconds0}</span>
                        </div>
                    </span>
                    Remaining
                </div>
            </span>

            <div className="status">
                <div className="packet">
                    Packet <span>{totalPackets - packetsRemaining + 1}/{totalPackets}</span>
                </div>
                <div className="br"></div>
                <div className="slots">
                    Slot <span>{totalSlots - slotsRemaining + 1}/{totalSlots}</span>
                </div>
            </div>
        </div>
    );
}

export default TimerComponent;
