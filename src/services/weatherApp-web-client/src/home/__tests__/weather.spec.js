import axios from 'axios'
import {
    oneCall3Api,
} from "../../common/openWeatherSampleData"

import {openWeatherApi} from "../home";
import {
    convertUnixTimeStampTo12hrFormat,
    convertUnixTimeStampToDayOfWeek,
    getDaysOfTheWeek,
    getMonthByIndexFromMonthsArr
} from "../../common/generalFunctions";
import txt from "../../common/text.json"

jest.mock('axios')

describe('weatherApp-web-client', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe('openWeatherApi', () => {
        it('should return an empty obj if the configObj is undefined', async () => {
            const apiResp = await openWeatherApi()
            expect(apiResp).toEqual({})

        })

        it('should return an empty obj if an empty config object is passed to OpenWeatherApi', async () => {
            const apiResp = await openWeatherApi({})
            expect(apiResp).toEqual({})
        })

        it('should return an empty obj if the url field is missing from the config obj', async () => {
            const apiResp = await openWeatherApi({
                headers: {'Content-Type': 'application/json',}
            })
            expect(apiResp).toEqual({})
        })

        it('should return an empty obj if the header field is missing from the config obj', async () => {
            const apiResp = await openWeatherApi({
                url: 'https://test'
            })
            expect(apiResp).toEqual({})
        })

        it('should retrieve the OpenWeatherApi weather JSON object', async () => {
            let respData = oneCall3Api({})
            axios.get.mockResolvedValue(respData)
            const apiResp = await openWeatherApi({
                url: 'https://test',
                headers: {'Content-Type': 'application/json',}
            })
            expect(apiResp).toEqual(respData)
        })

    })

    describe('getMonthByIndexFromMonthsArr', () => {
        it('should return a invalid param txt if an invalid month number is provided', () => {
            let resp = getMonthByIndexFromMonthsArr(-1)
            expect(resp).toBe(txt.invalidParam)

            resp = getMonthByIndexFromMonthsArr(13)
            expect(resp).toBe(txt.invalidParam)
        })

        it('should return the month abbreviation', () => {
            let resp = getMonthByIndexFromMonthsArr(0)
            expect(resp).toBe(txt.jan)

            resp = getMonthByIndexFromMonthsArr(11)
            expect(resp).toBe(txt.dec)
        })
    })

    describe('getDaysOfTheWeek', () => {
        it('should return a invalid param txt if an invalid day is provided', () => {
            let resp = getDaysOfTheWeek(-1)
            expect(resp).toBe(txt.invalidParam)

            resp = getDaysOfTheWeek(7)
            expect(resp).toBe(txt.invalidParam)
        })

        it('should return the day of the week', () => {
            let resp = getDaysOfTheWeek(0)
            expect(resp).toBe(txt.sundayAbbreviation)

            resp = getDaysOfTheWeek(6)
            expect(resp).toBe(txt.saturdayAbbreviation)
        })
    })

    describe('convertUnixTimeStampToDayOfWeek', () => {
        it('should return a invalid param txt if unix timestamp is falsy', () => {
            let resp = convertUnixTimeStampToDayOfWeek()
            expect(resp).toBe(txt.invalidParam)

            resp = convertUnixTimeStampToDayOfWeek(null)
            expect(resp).toBe(txt.invalidParam)

            resp = convertUnixTimeStampToDayOfWeek(0)
            expect(resp).toBe(txt.invalidParam)
        })

        it('should return a formatted label of the for "dayOfWeek, month date"', () => {
            let unixTimeStamp = 1656605922
            let resp = convertUnixTimeStampToDayOfWeek(unixTimeStamp)
            expect(resp).toBe("Thu, Jun 30")
        })
    })

    describe('convertUnixTimeStampTo12hrFormat', () => {
        it('should return a invalid param txt if unix timestamp is falsy', () => {
            let resp = convertUnixTimeStampTo12hrFormat()
            expect(resp).toBe(txt.invalidParam)
        })

        it('should return the current hour in a 12hr format for CET timezone"', () => {
            let unixTimeStamp = 1656605922
            let resp = convertUnixTimeStampTo12hrFormat(unixTimeStamp)
            expect(resp).toBe("6 PM")
        })
    })


});