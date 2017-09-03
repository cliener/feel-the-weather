import React, { Component } from "react";
import PropTypes from "prop-types";
import Client from "./Client";

class Forecast extends Component {
  state = {
    weatherData: null,
    alert: null,
  }

  UpdateWeather() {
    if (!navigator.onLine) {
//      this.setState({alert: "You're not connected to the Internet."})
    }

    Client.search("Taguig", data => {
      console.log(data.query.results.channel);
      this.setState({
        weatherData: data.query.results.channel,
      });
    })
  }

  FeelIt = weather => {
    const conditionCode = weather.item.condition.code;
    const temp = weather.item.condition.temp;
    const humidity = weather.atmosphere.humidity;
    if (conditionCode <= 3) {
      return "😱";
    }
    if ((conditionCode >= 5 && conditionCode <= 8) ||
      conditionCode === 10 ||
      (conditionCode >= 13 && conditionCode <= 16)) {
      return "😳";
    }
    const isSunny = conditionCode === 32 || conditionCode === 34;

    return (
      "😎"
    )
  }

  GetWeatherDescription = weather =>
    <div>
    <p>It's {weather.item.condition.temp}°{weather.units.temperature} at {weather.atmosphere.humidity}% and {weather.item.condition.text.toLowerCase()}.</p>
    <p>Last updated: {weather.lastBuildDate}</p>
    </div>

  render() {
    let alert = this.state.alert;

    const weather = this.state.weatherData;
    const { location } = this.props;

    if (!weather) {
      this.UpdateWeather();
    }

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