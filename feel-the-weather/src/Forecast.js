import React, { Component } from "react";
import PropTypes from "prop-types";
import Client from "./Client";

class Forecast extends Component {
  state = {
    weatherData: null,
    alert: null,
  }

  componentWillMount() {
    this.UpdateWeather();
  }

  UpdateWeather() {
    if (!navigator.onLine) {
      this.setState({alert: "You're not connected to the Internet."})
      return;
    }

    Client.search(this.props.location, data => {
      this.setState({
        weatherData: data.query.results.channel,
      });
    })
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
    let alert = this.state.alert;

    const weather = this.state.weatherData;
    const { location } = this.props;

    return (
      <div>
      {weather && 
        <h2>{location} will make you feel <span className="ftw-emoji">{this.FeelIt(weather)}</span></h2>}
      {weather &&
        this.GetWeatherDescription(weather)
      }
      <p><button type="button" onClick={() => this.UpdateWeather()}>Update</button></p>
      {alert && 
        <p className="ftw-alert">{alert}</p>}
      </div>
    );
  }
}

Forecast.propTypes = {
  location: PropTypes.string,
}

export default Forecast;
