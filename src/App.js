import React, { useState,useEffect} from 'react';
const api = {
  key: "598e497f8dc245c60954fc0fd8b96cfe",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState(localStorage.store);
  const [weather, setWeather] = useState({});

  // const search = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then((res) => 
  //         console.log(res)
  //         )
  //       .then(result => {
  //         setWeather(result);
  //         setQuery('');
  //         console.log(result);
  //       });
  //   }
  // }

  // using use effect
  useEffect (
    ()=>{
        const search =async () =>
        {
            const fetch_f= await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
            const res=await fetch_f.json();
            setWeather(res);
            console.log(res);
        };
        search();
    },[query]
  );
  const restore=()=>
  {
      let a=localStorage.getItem("store");
      console.log(a);
      setQuery(a);
  }
  const store =(e)=>
  {
   if(e.key==="Enter")
   {
    localStorage.setItem("store",query);
   }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 30) ? 'app warm' : 'app') : 'app'}>
      <main onLoad={restore}>
        <div className="search-box" >
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            //value={query}
            onKeyPress={store}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="w"><p>(Enter to save City)</p></div>
          </div>
        </div>
        ) : (<div>
          <div className="location-box">
            <div className="location"></div>
            <div className="date"></div>
          </div>
          <div className="weather-box">
            <div className="temp">
             Search For City
            </div>
            <div className="weather"></div>
          </div>
        </div>)}
      </main>
    </div>
  );
}

export default App;