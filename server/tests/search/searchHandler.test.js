const searchHandler = require("../../src/search/searchHandler");
const testLocations = require("../../src/search/testLocations");

describe("SearchHandler", () => {
    let handler, fetch, fetched, mockReturnData, responseFormatter, formattedMockReturnData, apiKey, res;

    beforeEach(() => {
        mockReturnData = testLocations["sunnyville"];
        fetched = { json: sinon.stub().resolves(mockReturnData) };
        fetch = sinon.stub().returns(fetched);
        apiKey = 1;
        formattedMockReturnData = { ...testLocations["sunnyville"], formatted: true };
        responseFormatter = sinon.stub().returns(formattedMockReturnData);
        handler = searchHandler({ testLocations, fetch, apiKey, responseFormatter });
        res = { send: sinon.stub() };
    });

    describe("when using test locations", () => {
        it("should return the test location data", () => {
            const req = { query: { city: "sunnyville", units: "metric" } };

            handler(req, res);

            expect(res.send).to.have.been.calledWith(JSON.stringify(testLocations["sunnyville"]));
        });
    });

    describe("when using api", () => {
        beforeEach(async () => {
            const req = { query: { city: "London", units: "metric" } };

            await handler(req, res);
        });

        it("should use the city in the URL", () => {
            expect(fetch).to.have.been.calledWith("http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=1");
        });

        it("should call json on the returned data", () => {
            expect(fetched.json).to.have.callCount(1);
        });

        it("should format the response", () => {
            expect(responseFormatter).to.have.been.calledWith(mockReturnData);
        });

        it("should return stringified json data", () => {
            expect(res.send.getCall(0).args[0]).to.equal(JSON.stringify(formattedMockReturnData));
        });
    });
});
