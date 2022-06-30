import txt from "./text.json";

export const getMonthByIndexFromMonthsArr = (monthNumber) => {
    let monthsArr = [txt.jan, txt.feb, txt.mar, txt.apr, txt.may, txt.jun, txt.jul, txt.aug, txt.sept, txt.oct, txt.nov, txt.dec]
    if (monthNumber < 0 || monthNumber > monthsArr.length - 1)
        return txt.invalidParam
    return monthsArr[monthNumber]
}

export const getDaysOfTheWeek = (dayNumber) => {
    if (dayNumber < 0 || dayNumber > 6)
        return txt.invalidParam

    let daysArr = [txt.sundayAbbreviation, txt.mondayAbbreviation, txt.tuesdayAbbreviation, txt.wednesdayAbbreviation,
        txt.thursdayAbbreviation, txt.fridayAbbreviation, txt.saturdayAbbreviation];
    return daysArr[dayNumber]
}

export const convertUnixTimeStampToDayOfWeek = (unixTimeStamp) => {
    if (!unixTimeStamp)
        return txt.invalidParam

    let newDate = new Date(unixTimeStamp * 1000);
    let dayOfTheWeek = getDaysOfTheWeek(newDate.getDay())
    let month = getMonthByIndexFromMonthsArr(newDate.getMonth())
    return `${dayOfTheWeek}, ${month} ${newDate.getDate()}`
}

export const convertUnixTimeStampTo12hrFormat = (unixTimeStamp) => {
    if (!unixTimeStamp)
        return txt.invalidParam
    let newDate = new Date(unixTimeStamp * 1000);
    return newDate.toLocaleString('en-US', {hour: 'numeric', hour12: true, timeZone: "CET"})
}

export const getArrOfCompassDirections = () => {
    return ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
}

export const displayFrontEndError = (customErrorRespObj) => {
    let {fileName, functionName, error} = customErrorRespObj
    console.error(`Check File: ${fileName}\nFunction Name: ${functionName}\n${error}`)
}