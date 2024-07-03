import * as React, {useState} from "react";
import "../styles/Main.css";
import ContentOneDay from "./ContentOneDay";
import ContentFiveDays from "./ContentFiveDays";
import  importedCities from "../cities.json";



function Main(props) {
    let showed = false;
    let [oneDayShowed, updateOneDay] = useState(false);
    let [fiveDaysShowed, updateFiveDays] = useState(false);
    let cityCoordinatesList = {}
    let [currentCityCoordinates, updateCityCoords] = useState("EMPTY")

    // get lat:long data and load cities preview (WARNING: showed cities amount is cut by browser)
    setTimeout(()=>{
        let select = document.getElementById("select")
        for (let cityNumber = 0; cityNumber < importedCities.default.length; cityNumber++){
            select.insertAdjacentHTML("beforeend", `<option value="${String(importedCities.default[cityNumber].name)}"></option>`)
            cityCoordinatesList[importedCities.default[cityNumber].name] = importedCities.default[cityNumber].coords
        }

    }, 1000)

    // buttons function
    function fillOneDayContainer(choise, input_data) {
        let inputElement = document.getElementById("input")

        // page-container resize
        if (showed == false && currentCityCoordinates == "EMPTY" ) {
            setTimeout(() => {
                showed = true;

                let pageBlock = document.getElementsByClassName("page-container")[0]
                let height = 20
                const blockResize = setInterval(()=>{
                    if (height > 60 ) {
                        clearInterval(blockResize);
                    } else {
                        pageBlock.style.height = `${height}%`
                        height += 0.2;
                    }
                }, 5);
            }, 1500)
        }

        if (cityCoordinatesList[input_data]) {
            currentCityCoordinates = cityCoordinatesList[input_data]
        } else {
            currentCityCoordinates = ""
        }

        let loading_icon = document.getElementById("loading");
        let oneDayContent = document.getElementsByClassName("one-day content-container");
        let fiveDaysContent = document.getElementsByClassName("five-days content-container");

        console.log(`onedayShowed==: ${oneDayShowed}`)
        console.log(`fivadaysShowed==: ${fiveDaysShowed}`)
        // onde day forecast was selected
        if (choise == 1) {

            // five days weather info remove
            fiveDaysContent[0].style["z-index"] = 1;
            let looseOpacity = 1;
            const disappear = setInterval(()=> {
                if (looseOpacity <= 0) {
                    clearInterval(disappear)
                } else {
                    fiveDaysContent[0].style.opacity = `${looseOpacity}`;
                    looseOpacity -= 0.005;
                }
            }, 5);

            // check if one day info already showed, then turn off content load
            if (oneDayShowed == false) {
                loading_icon.style.display = "inline-block";
                updateOneDay(true);
                updateFiveDays(false);
                setTimeout(()=>{
                    loading_icon.style.display = "none"
                    fiveDaysContent[0].style.display = "none"

                    oneDayContent[0].style.display = "inline";

                    let opacity = 0;
                    const appear = setInterval(()=> {
                        if (opacity >= 1) {
                            // console.log("DONE")
                            clearInterval(appear);
                        } else {
                            oneDayContent[0].style.opacity = `${opacity}`;
                            opacity += 0.005
                        }
                    }, 5);
                },2500)
            }


        } else { // five days forecast was selected

            // one day weather info remove
            oneDayContent[0].style["z-index"] = 1;
            let looseOpacity = 1;
            const disappear = setInterval(()=> {
                if (looseOpacity <= 0) {
                    clearInterval(disappear)
                } else {
                    oneDayContent[0].style.opacity = `${looseOpacity}`;
                    looseOpacity -= 0.005;
                }
            }, 5);

            // check if five days already showed, then turn off content load
            if (fiveDaysShowed == false) {
                loading_icon.style.display = "inline-block";
                updateOneDay(false);
                updateFiveDays(true);
                setTimeout(()=>{
                    loading_icon.style.display = "none"
                    fiveDaysContent[0].style.display = "inline"

                    oneDayContent[0].style.display = "none";

                    let opacity = 0;
                    const appear = setInterval(()=> {
                        if (opacity >= 1) {
                            // console.log("DONE")
                            clearInterval(appear);
                        } else {
                            fiveDaysContent[0].style.opacity = `${opacity}`;
                            opacity += 0.005
                        }
                    }, 5);
                }, 2500)
            }

        }


    setTimeout(()=>{
        document.getElementsByClassName("greeting")[0].style.display = "inline-block";
    }, 8000)


    };


    return (
        <div className="page-container">
            <h2 className="instruction">Choose city and your forecast then the push button below:</h2>
            <input className="input" id="input" list="select" placeholder="Start typing here..."></input>
            <datalist id="select">
            </datalist>

            <button className="button now" onClick={()=>{
                fillOneDayContainer(1, input.value);
                updateCityCoords(currentCityCoordinates)
                }}>Today`s forecast</button>

            <button className="button fife-days" onClick={()=> {
                fillOneDayContainer(5, input.value);
                updateCityCoords(currentCityCoordinates)
                }}>5 days forecast</button>

            <div className="lds-ellipsis" id="loading"><div></div><div></div><div></div><div></div></div>

            <div className="one-day content-container">
                <ContentOneDay usedCoordinates={currentCityCoordinates} api={props.api}/>
            </div>
            <div className="five-days content-container">
                <ContentFiveDays usedCoordinates={currentCityCoordinates} api={props.api}/>
            </div>
            <p className="greeting"></p>
        </div>
    )
};


export default Main;