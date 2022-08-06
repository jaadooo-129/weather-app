import React, { useState } from 'react';
const api = {
  key: "117ee5b7e1ead1528996c0d54c1b9859",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery]=useState("mumbai");
  const [weather,sw]=useState("mumbai");

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          sw(result);
          //sw('');
          console.log(result);
        });
    }
  };

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
   <div>
      <input 
        type='text'
        onChange={(e)=> setQuery(e.target.value)}
        className='search-bar'
        placeholder="Search..."
        value={query}
        onKeyPress={search}
      />
    </div>
  );
}

export default App;