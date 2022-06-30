import txt from "./text.json";

export const getMonthByIndexFromMonthsArr = (monthNumber) => {
    let monthsArr = [txt.jan, txt.feb, txt.mar, txt.apr, txt.may, txt.jun, txt.jul, txt.aug, txt.sept, txt.oct, txt.nov, txt.dec]
    return monthsArr[monthNumber]
}

export const getDaysOfTheWeek = (dayNumber) => {
    let daysArr = [txt.sundayAbbreviation, txt.mondayAbbreviation, txt.tuesdayAbbreviation, txt.wednesdayAbbreviation,
        txt.thursdayAbbreviation, txt.fridayAbbreviation, txt.saturdayAbbreviation];
    return daysArr[dayNumber]
}

export const convertUnixTimeStampToDayOfWeek = (unixTimeStamp) => {
    if (!unixTimeStamp)
        return txt.missingData

    let newDate = new Date(unixTimeStamp * 1000);
    let dayOfTheWeek = getDaysOfTheWeek(newDate.getDay())
    let month = getMonthByIndexFromMonthsArr(newDate.getMonth())
    return `${dayOfTheWeek}, ${month} ${newDate.getDate()}`
}

export const convertUnixTimeStampTo12hrFormat = (unixTimeStamp) => {
    let newDate = new Date(unixTimeStamp * 1000);
    return newDate.toLocaleString('en-US', {hour: 'numeric', hour12: true, timeZone: "CET"})
}

export const getArrOfCompassDirections = () => {
    return ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
}
