module.exports = ({ fetch, apiKey, responseFormatter, testLocations }) => async function searchHandler (req, res) {
    const { city, units } = req.query;

    if (testLocations[city]) {
        return res.send(JSON.stringify(testLocations[city]));
    }

    const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
    const json = await weather.json();
    const formattedResponse = responseFormatter(json);
    res.send(JSON.stringify(formattedResponse));
};
