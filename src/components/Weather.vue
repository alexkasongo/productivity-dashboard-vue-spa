<template>
  <div>
    <div class="wrapper">

      <section>
          <div class="temperature entypo-light-up">
          </div>

          <div class="current-temp">
            <h2>{{currentTemp}}<span class="degree-symbol">°</span></h2>
          </div>

        <ul class="more-info">
          <li>
            <span>{{description}}</span>
          </li>
        </ul> 

      </section>
        
    </div>

    <div class="result"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Weather',
  data() {
    return {
      currentTemp: '',
      description: '',
      minTemp: '',
      maxTemp:'',
      sunrise: '',
      sunset: '',
      pressure: '',
      humidity: '',
      wind: '',
      overcast: '',
      icon: ''

      [-33.93, 18.42]
    }
  },
  methods: {
    getWeather() {
  let url = "https://api.openweathermap.org/data/2.5/weather?lat=-33.93&lon=18.42&units=metric&APPID=81182574b2a9c5e6825daa8522000a05";
  axios
    .get(url)
    .then(response => {
          this.currentTemp = response.data.main.temp.toFixed(0);
          this.description = response.data.weather[0].description;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
    })
    .catch(error => {
      console.log(error);
    })
  },
},
}
</script>

<style scoped>
  /* Import Icon fonts and web font */
@import "https://fonts.googleapis.com/css?family=Open+Sans:400,300,700";
@import "https://weloveiconfonts.com/api/?family=entypo";
@import url(https://weloveiconfonts.com/api/?family=fontawesome);
/* entypo */
[class*="entypo-"]:before {
  font-family: 'entypo', sans-serif;
}

/* fontawesome */
[class*="fontawesome-"]:before {
  font-family: 'FontAwesome', sans-serif;
}

section {
  position: relative;
  padding: 45px 0;
}
section h1 {
  width: 400px;
  padding: 20px 0px 35px 0px;
  position: relative;
  font-size: 1.5em;
  border-bottom: 2px solid #4b4e57;
}
section h1 a.add {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 0px;
  color: #4b4e57;
  font-size: 2.4em;
  text-align: center;
  line-height: 45px;
  text-decoration: none;
  background-color: black;
  border-radius: 3px;
  transition: color 0.5s;
}
section h1 a.add:hover {
  color: #eee;
}
section .temperature {
  display: flex;
  justify-content: center;
  /* padding: 40px 0px 0px 0px; */
  color: #3D414C;
  font-size: 8rem;
  transition: color 0.5s ease;
}
section .temperature:hover {
  color: yellow;
}
section .temperature h2 {
  display: inline;
  color: #eee;
  font-weight: 300;
}
.current-temp {
  display: flex;
  justify-content: center;
  font-size: 0.6em;
  color: #E0E1E3;
}
.more-info {
  display: flex;
  justify-content: center;
}
section .current-temp h2 span.celcius {
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px 15px;
  color: #3D414C;
  font-size: 0.3em;
  vertical-align: top;
}
section ul {
  padding: 5px;
}
section ul li {
  display: block;
  float: left;
  margin-right: 15px;
  color: #3D414C;
  font-size: 2em;
}
section ul li:last-child {
  margin-right: 0px;
}
section ul li span {
  padding-left: 10px;
  color: #eee;
  font-size: 0.6em;
  line-height: 30px;
  vertical-align: top;
}
section .bullets {
  height: 70px;
  color: #3D414C;
  text-align: center;
}
section .bullets span {
  margin-right: 10px;
  font-size: 0.6em;
}
section .bullets span.active {
  color: #eee;
  font-size: 0.8em;
}
section a {
  color: #60646e;
  font-size: 1.2em;
  text-decoration: none;
  transition: color 0.5s;
}
section a:hover {
  color: #eee;
}
section a .external-link {
  padding-left: 5px;
  font-size: 0.6em;
  vertical-align: middle;
}
section .share {
  width: 100px;
  height: 90px;
  position: absolute;
  bottom: 20px;
  right: -10px;
  color: #eee;
  font-size: 2em;
  text-align: center;
  line-height: 90px;
  background-color: rgba(210, 58, 81, 0.9);
  transition: right 0.2s;
}
section .share:hover {
  right: -20px;
}
</style>
