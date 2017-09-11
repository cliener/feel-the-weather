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

    const location = this.props.location;

    Client.search(location)
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