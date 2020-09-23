/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Axios from "axios";
import DisplayWeather from "./components/DisplayWeather.js";
import Navbar from "./components/Navbar.js";

class App extends React.Component {
  state = {
    coords: {
      latitude: 29.443817,
      longitude: 75.670265,
    },
    data: {},
    inputData: "",
  };

  componentDidMount() {
    Axios.get(
      `https://api.weatherstack.com/current?access_key=3623335ef63d97c2858c74ff46c0f838&query=${this.state.coords.latitude},${this.state.coords.longitude}`
    ).then((res) => {
      console.log(res);

      let weatherData = {
        location: res.data.location.country,
        name: res.data.location.name,
        region: res.data.location.region,
        humidity: res.data.current.humidity,
        precipitation: res.data.current.precip,
        pressure: res.data.current.pressure,
        wind_speed: res.data.current.wind_speed,
        temperature: res.data.current.temperature,
        weather_descriptions: res.data.current.weather_descriptions[0],
        // country: res.data.location.country,
        img: res.data.current.weather_icons,
      };
      this.setState({ data: weatherData });
    });
  }

  change = (value) => {
    this.setState({ inputData: value });
  };
  changeWeather = (e) => {
    e.preventDefault();
    Axios.get(
      `https://api.weatherstack.com/current?access_key=3623335ef63d97c2858c74ff46c0f838&query=${this.state.inputData}`
    ).then((res) => {
      console.log(res.inputData);
      let weatherData = {
        location: res.data.location.country,
        name: res.data.location.name,
        region: res.data.location.region,
        humidity: res.data.current.humidity,
        precipitation: res.data.current.precip,
        pressure: res.data.current.pressure,
        wind_speed: res.data.current.wind_speed,
        temperature: res.data.current.temperature,
        weather_descriptions: res.data.current.weather_descriptions[0],
        country: res.data.location.country,
        img: res.data.current.weather_icons,
      };
      this.setState({ data: weatherData });
    });
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar
            changeWeather={this.changeWeather}
            changeRegion={this.change}
          />
          <DisplayWeather weatherData={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
