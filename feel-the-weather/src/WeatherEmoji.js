import React, { Component } from "react";
import PropTypes from "prop-types";

class WeatherEmoji extends Component {
  FeelIt = weather => {
    // Grab the condition
    const conditionCode = parseInt(weather.item.condition.code);
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
      return "😫";
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

  render() {
    const weather = this.props.weather;

    return (
      <span className="ftw-emoji">{this.FeelIt(weather)}</span>
    );
  }
}

WeatherEmoji.propTypes = {
  weather: PropTypes.object,
}

export default WeatherEmoji;