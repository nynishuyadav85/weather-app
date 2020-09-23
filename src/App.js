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
      `http://api.weatherstack.com/current?access_key=3623335ef63d97c2858c74ff46c0f838&query=${this.state.coords.latitude},${this.state.coords.longitude}`
    ).then((res) => {
      let weatherData = {
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons,
        temperature: res.data.current.temperature,
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
      `http://api.weatherstack.com/current?access_key=3623335ef63d97c2858c74ff46c0f838&query=${this.state.inputData}`
    ).then((res) => {
      let weatherData = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
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
