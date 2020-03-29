const responseFormatter = require("../../src/search/responseFormatter");

const exampleResponse1 = {
    "coord": { "lon": -0.13, "lat": 51.51 },
    "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }],
    "base": "stations",
    "main": {
        "temp": 282.82,
        "feels_like": 274.83,
        "temp_min": 281.48,
        "temp_max": 283.71,
        "pressure": 1030,
        "humidity": 53
    },
    "visibility": 10000,
    "wind": { "speed": 8.7, "deg": 60, "gust": 13.9 },
    "clouds": { "all": 90 },
    "dt": 1585409821,
    "sys": { "type": 1, "id": 1414, "country": "GB", "sunrise": 1585374241, "sunset": 1585420001 },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
};

const exampleResponse2 = {
    "coord": { "lon": -0.13, "lat": 51.51 },
    "weather": [{ "id": 804, "main": "Clear", "description": "Sunny", "icon": "04d" }],
    "base": "stations",
    "main": {
        "temp": 20,
        "feels_like": 274.83,
        "temp_min": 281.48,
        "temp_max": 283.71,
        "pressure": 1030,
        "humidity": 53
    },
    "visibility": 10000,
    "wind": { "speed": 8.7, "deg": 60, "gust": 13.9 },
    "clouds": { "all": 90 },
    "dt": 1585409821,
    "sys": { "type": 1, "id": 1414, "country": "US", "sunrise": 1585374241, "sunset": 1585420001 },
    "timezone": 0,
    "id": 2643743,
    "name": "California",
    "cod": 200
};

describe("Search Response Formatter", () => {
    context("example response 1", () => {
        it("should format the response", () => {
            expect(responseFormatter(exampleResponse1)).to.deep.equal({
                city: "London",
                country: "GB",
                weather: {
                    main: "Clouds",
                    description: "overcast clouds",
                    temp: 282.82
                }
            })
        });
    });

    context("example response 2", () => {
        it("should format the response", () => {
            expect(responseFormatter(exampleResponse2)).to.deep.equal({
                city: "California",
                country: "US",
                weather: {
                    main: "Clear",
                    description: "Sunny",
                    temp: 20
                }
            })
        });
    });

});
