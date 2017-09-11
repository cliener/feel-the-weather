import React, { Component } from "react";
import PropTypes from "prop-types";
import Client from "./Client";
import WeatherEmoji from "./WeatherEmoji";

class Forecast extends Component {
  state = {
    isLoading: false,
    weatherData: null,
    error: null,
  }

  componentDidMount = () => {
    this.UpdateWeather();
  }

  UpdateWeather = () => {
    if (!navigator.onLine) {
      this.setState({error: "You're not connected to the Internet."})
      return;
    }

    // prevent multiple simultaneous requests
    if (this.state.isLoading) {
      return;
    }

    this.setState({
      isLoading: true,
      error: null
    });

    Client.search("Taguig")
    .then(data => {
      this.setState({
        isLoading: false,
        weatherData: data.query.results.channel
      });
    }, error => {
      this.setState({
        isLoading: false,
        error,
      })
    });
  }

  FeelIt = weather => {
    // Grab the condition
    const conditionCode = weather.item.condition.code;
    //const temp = weather.item.condition.temp;
    //const humidity = weather.atmosphere.humidity;

    // return status based on the code
    // See https://developer.yahoo.com/weather/documentation.html#codes

     // Severe weather
    if (conditionCode <= 3) {
      return "😱";
    }

    // Thunderstorms
    if (conditionCode === 4) {
      return "😫"
    }

    // Weather conditions like snow/sleet that are really unlikely
    if ((conditionCode >= 5 && conditionCode <= 8) ||
        conditionCode === 10 ||
        (conditionCode >= 13 && conditionCode <= 16) ||
        conditionCode === 18 ||
        (conditionCode >= 41 && conditionCode <= 43) ||
        conditionCode === 46) {
      return "😳";
    }

    // Rain of some description
    if (conditionCode === 9 ||
        conditionCode === 11 ||
        conditionCode === 12 ||
        conditionCode === 40
      ) {
      return "😭";
    }

    // Hail
    if (conditionCode === 17 ||
        conditionCode === 35) {
      return "😨";
    }

    // Hazy, dusty… reach for your face mask
    if (conditionCode === 19 ||
        conditionCode === 21 ||
        conditionCode === 22) {
      return "😷";
    }

    // Cloudy
    if ((conditionCode >= 26 && conditionCode <= 30) ||
        conditionCode === 44) {
      return "😐";
    }

    // Sunny
    if (conditionCode === 32 || 
        conditionCode === 34) {
      return "😎";
    }

    // Good night
    if (conditionCode === 33) {
      return "😴";
    }

    // Feelin' Hot
    if (conditionCode === 36) {
      return "🤒";
    }

    // Did we miss something?
    return "🤔";
  }

  GetWeatherDescription = weather => {
    const temp = weather.item.condition.temp;
    const tempUnit = weather.units.temperature;
    const humidity = weather.atmosphere.humidity;
    const condition = weather.item.condition.text.toLowerCase();

    return (
      <div>
      <p>It's {temp}°{tempUnit} at {humidity}% and {condition}.</p>
      <p>Last updated: {weather.lastBuildDate}</p>
      </div>
    )
  }

  render() {
    let error = this.state.error;

    const weather = this.state.weatherData;
    const isLoading = this.state.isLoading;
    const { location } = this.props;

    return (
      <div>
      {weather && 
        <h2>{location} will make you feel <WeatherEmoji weather={weather}/></h2>}
      {weather &&
        this.GetWeatherDescription(weather)
      }
      <p><button type="button" onClick={() => this.UpdateWeather()}>Update</button></p>
      {isLoading && 
        <p>Please hold&hellip;</p>}
      {error && 
        <p className="ftw-error">{error}</p>}
      </div>
    );
  }
}

Forecast.propTypes = {
  location: PropTypes.string,
}

export default Forecast;