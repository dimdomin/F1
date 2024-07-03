import React, {useState} from "react";
import "../styles/Clock.css";

let showed = null;

function Clock() {
    let currentTime = new Date();

    const monthsList = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December" 
    };

    function monthSearch(month_number) {
        for (let i = 0; i < 12; i++) {
            if (i == currentTime.getMonth()) {
                return month = monthsList[i];
            };
        };
    };

    let year = currentTime.getFullYear();
    let month = monthSearch();
    let day = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate();
    let hour = currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : currentTime.getHours();
    let minute = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();
    // let dayWeek = currentTime.getDay();
    let seconds = currentTime.getSeconds() < 10 ? `0${currentTime.getSeconds()}` : currentTime.getSeconds();;

    let [showedDate, updateTime] = useState();

    setTimeout(()=> {
        updateTime(`${day} ${month} ${year} ${hour}:${minute}:${seconds}`);
    }, 1000);

    
    return (
        <>
        <p className="clock-block first-line">Today is <span className="time">{showedDate}</span></p>
        <p  className="clock-block second-line"><span className="quote">“</span>Good day for new discoveries! Start from weather checking with Us!<span className="quote">„</span></p>
        </>
    )
};

export default Clock;