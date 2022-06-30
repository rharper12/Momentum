import React from 'react';
import "./css/weatherStatsTiles.css"
import {BsFillSunFill, BsFillSunsetFill, BsFillCloudRainHeavyFill} from "react-icons/bs";
import {RiWindyFill} from "react-icons/ri";
import {GiWaterDrop} from "react-icons/gi";
import {MdVisibility} from "react-icons/md";
import {FaTemperatureHigh} from "react-icons/fa";
import {IoIosSpeedometer} from "react-icons/io";
import txt from "../../../common/text.json"
import {convertUnixTimeStampTo12hrFormat, getArrOfCompassDirections} from "../../../common/generalFunctions";

const getUVindexLabel = (uvIndexNumber) => {
    if (uvIndexNumber < 0 || uvIndexNumber > 10)
        return txt.missingData

    if (uvIndexNumber < 2)
        return txt.low
    else if (uvIndexNumber < 5)
        return txt.moderate
    else if (uvIndexNumber < 8)
        return txt.high
    else if (uvIndexNumber < 10)
        return txt.veryHigh

    return txt.missingData;
}

const renderUVIndexTile = (uviIndex) => {
    return (
        <div className="squareTiles width45">
            <BsFillSunFill className={"reactIconsSquareTiles"}/>
            <label>{txt.uvIndex}
            </label>
            <div className="weatherStatsTileValue">{uviIndex}</div>
            <label>
                {getUVindexLabel(uviIndex)}
            </label>
        </div>
    )
}

const renderSunsetSunriseTile = (sunrise , sunset) => {
    return (
        <div className="squareTiles width45">
            <BsFillSunsetFill className={"reactIconsSquareTiles"}/>
            <label>
                {txt.sunset}
            </label>
            <div className="weatherStatsTileValue">{sunset}</div>
            <label>
                {txt.sunrise}: {sunrise}
            </label>
        </div>
    )
}

const renderFeelsLikeTile = (feelsLike) => {
    return (
        <div className="squareTiles width45">
            <FaTemperatureHigh className={"reactIconsSquareTiles"}/>
            <label>
                {txt.feelsLike}
            </label>
            <div className="weatherStatsTileValue">{feelsLike}&deg;</div>
        </div>
    )
}

const renderHumidityTile = (humidity, dewPoint) => {
    return (
        <div className="squareTiles width45">
            <GiWaterDrop className={"reactIconsSquareTiles"}/>
            <label>
                {txt.humidity}
            </label>
            <div className="weatherStatsTileValue">{humidity}%</div>
            <label>
                {txt.dewpointIs} <span>{dewPoint}&deg; {(txt.rightNow).toLowerCase()}</span>
            </label>
        </div>
    )
}

const renderVisibilityTile = (visibility) => {
    return (
        <div className="squareTiles width45">
            <MdVisibility className={"reactIconsSquareTiles"}/>
            <label>
                {txt.visibility}
            </label>
            <div className="weatherStatsTileValue">{visibility}</div>
            <label>
                {(txt.km).toLowerCase()}
            </label>
        </div>
    )
}

const renderPressureTile = (pressure) => {
    return (
        <div className="squareTiles width45">
            <IoIosSpeedometer className={"reactIconsSquareTiles"}/>
            <label>
                {txt.pressure}
            </label>
            <div className="weatherStatsTileValue">{pressure}</div>
            <label>
                {txt.pressureUnit}
            </label>
        </div>
    )
}

const renderWindTile = (windSpeed, windDirection) => {
    return (
        <div className="squareTiles width45">
            <RiWindyFill className={"reactIconsSquareTiles"}/>
            <label>
                {txt.wind}
            </label>
            <div className="weatherStatsTileValue">{windSpeed}</div>
            <label>
                {(txt.ms).toLowerCase()} {txt.fromThe} {windDirection.toUpperCase()}
            </label>
        </div>
    )
}

const renderRainfallTile = (rain) => {
    return (
        <div className="squareTiles width45">
            <BsFillCloudRainHeavyFill className={"reactIconsSquareTiles"}/>
            <label>
                {txt.RainFall}
            </label>
            <div className="weatherStatsTileValue">{rain}"</div>
        </div>
    )
}

const getCompassDirection = (windDegree) => {
    /*
    1) Divide the angle by 22.5 because 360deg/16 directions = 22.5deg/direction change.
    2) Add .5 so that when you truncate the value you can break the 'tie' between the change threshold.
    3) Truncate the value using integer division (so there is no rounding).
    4) Directly index into the array and print the value (mod 16).
    */
    const value = Math.floor((windDegree / 22.5) + 0.5)
    const compass = getArrOfCompassDirections()
    return compass[(value % 16)]
}

// stateless component
const WeatherStatsComponent = (weatherObj) => {
    let todaysUvIndex = (weatherObj.hasOwnProperty("uvi")) ?
        weatherObj.uvi : -1

    let todaysSunriseTime = (weatherObj.hasOwnProperty("sunrise")) ?
        convertUnixTimeStampTo12hrFormat(weatherObj.sunrise) : txt.missingData

    let todaysSunsetTime = (weatherObj.hasOwnProperty("sunset")) ?
        convertUnixTimeStampTo12hrFormat(weatherObj.sunset) : txt.missingData

    let feelsLike = (weatherObj.hasOwnProperty("feels_like")) ?
        Math.round(weatherObj.feels_like) : txt.missingData

    let humidity = (weatherObj.hasOwnProperty("humidity")) ?
        Math.round(weatherObj.humidity) : txt.missingData

    let visibility = (weatherObj.hasOwnProperty("visibility")) ?
        (weatherObj.visibility / 1000) : txt.missingData

    let rainfall = (weatherObj.hasOwnProperty("rain")) ?
        weatherObj.rain : 0

    let wind = (weatherObj.hasOwnProperty("wind_speed")) ?
        weatherObj.wind_speed : txt.missingData

    let windDirection = (weatherObj.hasOwnProperty("wind_deg")) ?
        getCompassDirection(weatherObj.wind_deg) : txt.missingData

    let pressure = (weatherObj.hasOwnProperty("pressure")) ?
        weatherObj.pressure : txt.missingData

    let dewPoint = (weatherObj.hasOwnProperty("dew_point")) ?
        Math.round(weatherObj.dew_point) : txt.missingData

    return (
        <div className={"squareTileContainer"}>
            {renderUVIndexTile(todaysUvIndex)}
            {renderSunsetSunriseTile(todaysSunriseTime, todaysSunsetTime)}
            {renderFeelsLikeTile(feelsLike)}
            {renderHumidityTile(humidity, dewPoint)}
            {renderVisibilityTile(visibility)}
            {renderRainfallTile(rainfall)}
            {renderWindTile(wind, windDirection)}
            {renderPressureTile(pressure)}
        </div>
    )
}

export default WeatherStatsComponent;