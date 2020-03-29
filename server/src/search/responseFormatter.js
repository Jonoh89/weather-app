module.exports = function responseFormatter (response) {
    return {
        city: response.name,
        country: response.sys.country,
        weather: {
            main: response.weather[0].main,
            description: response.weather[0].description,
            temp: response.main.temp
        }
    };
};
