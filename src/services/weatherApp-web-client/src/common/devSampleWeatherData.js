/*
Just for development. API call
 */

export const getHourlyForecastSampleData = () => {
    return [{
        hour: '11 AM',
        temperature: 83
    },
        {
            hour: '12 PM',
            temperature: 83
        },
        {
            hour: '1 PM',
            temperature: 76
        },
        {
            hour: '2 PM',
            temperature: 80
        },
        {
            hour: '3 PM',
            temperature: 74
        }
    ];
}

export const getSevenDayForecastSampleData = () => {
    return [
        {
            low: '65',
            high: '75',
            weather: 'heavyRain',
            day: "Saturday"
        },
        {
            low: '75',
            high: '80',
            weather: 'lightRain',
            day: "Sunday"
        },
        {
            low: '77',
            high: '84',
            weather: 'sunny',
            day: "Monday"
        },
        {
            low: '76',
            high: '82',
            weather: 'cloudy',
            day: "Tuesday"
        },
        {
            low: '76',
            high: '82',
            weather: 'thunderstorm',
            day: "Wednesday"
        },
        {
            low: '76',
            high: '82',
            weather: 'sunny',
            day: "Thursday"
        },
        {
            low: '76',
            high: '82',
            weather: 'sunny',
            day: "Friday"
        },
    ];
}