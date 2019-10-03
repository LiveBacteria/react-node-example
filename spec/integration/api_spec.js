const request = require("request");
const server = require("../../app");
const base = "http://localhost:3000/";

describe("routes : getWeather", () => {

  describe("POST /getWeather", () => {
    const options = {
      url: `${base}getWeather`,
      form: {
        city: "vacaville"
      }
    }
    it("should return a status code 200 and contain the current weather for the given city 'Vacaville'", (done) => {
      request.post(options, (err, res, body) => {
        expect(body).toContain("Vacaville");
        done();
      });
    });
  });
});
