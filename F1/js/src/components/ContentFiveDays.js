import React, {useState} from "react";
import axios from "axios";
import "../styles/ContentFiveDays.css";



function ContentFiveDays(props){
    let coordinates = {};
    let [summary, updateSummary] = useState(null);
    window.navigator.geolocation.getCurrentPosition(success)
    
    function success(position){
        coordinates = {"lat": position.coords.latitude, "long": position.coords.longitude}        
    };

    setTimeout(()=>{
        let lat = props.usedCoordinates == "EMPTY" || props.usedCoordinates == "" ? coordinates.lat : props.usedCoordinates.lat
        let long = props.usedCoordinates == "EMPTY" || props.usedCoordinates == "" ? coordinates.long : props.usedCoordinates.lon


        const apiKey = props.api;

        axios({
            method: "GET",
            url: 'https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric',
            headers: {
                "Content-Type": "application/json",
            }  
        }).then((response) => {
            let data = response.data;
            document.getElementsByClassName("five-days-content")[0].innerHTML = `<p class="five-day-city">${data.city.name}</p>`;
            for (let element = 3; element < data.list.length; element += 8) {
                let date = new Date(data.list[element].dt * 1000);
                document.getElementsByClassName("five-days-content")[0].innerHTML += `
                <div class="objects">
                        <p class="five-days-date">${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}.${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}.${date.getFullYear()}</p>
                        <p class="five-days-description">${data.list[element].weather[0].description}</p>
                        <p class="five-days-temp">${data.list[element].main.temp.toFixed(0)}</p>
                        <img class="five-days-icon" src="https://openweathermap.org/img/wn/${data.list[element].weather[0].icon}.png"/>
                </div>`
     
                
            }
            
            

        }).catch((error)=> {
            console.log(error)
            document.getElementsByClassName("five-days-content")[0].innerHTML = "<p>Oops! Something has gone wrong! <br> Refresh page or try later.</p>"
        })

    }, 2000)

    setTimeout(()=>{
        updateSummary(summary);
       
    }, 3000)
    return(
        <>
        <div className="five-days-content">
            {summary}
        </div>
            
        
        </>
    )
}

export default ContentFiveDays;