import React, {useState} from "react";
import "../styles/App.css";
import Header from "./Header";
import Main from "./Main";


function App() {
    let [api, updateApi] = useState("none")

    if (window.localStorage.getItem("API_key") == null) {
        api = prompt("Input your API-key for further work:");
        alert("If you typed wrong API-key or will change it, you need to clear your browser`s cache, include cookies and etc.")
        window.localStorage.setItem("API_key", api)
        updateApi(api)
    } else {
        api = window.localStorage.getItem("API_key")
        
    }

    return (
        <React.Fragment>
            <Header/>
            <div className="background">
                <div className="background-image"></div>
                
            </div> 
            <Main api={api=="none" ? "" : api }/>
        </React.Fragment>    

    )
}



export default App;