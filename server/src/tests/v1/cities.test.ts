//During the test the env variable is set to test
process.env.NODE_ENV = "test";

import { describe } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

import server from "../../index";

import { ICityFileRow } from "@interfaces/cities";

import { STATUS_CODES, MESSAGES } from "@constants/constants";

import { ICitiesParams } from "@apiV1/cities/interfaces";

chai.use(chaiHttp);

const TestCity: ICityFileRow = {
  id: 833,
  name: "Ḩeşār-e Sefīd",
  state: "",
  country: "IR",
  coord: {
    lon: 47.159401,
    lat: 34.330502,
  },
};

describe("V1 Cities", () => {
  /*
   * Test the /cities Listing Route route
   */
  describe("/GET common", () => {
    it("List the available cities around the specified latitude/longitude within a radius of 10 kilometers", (done) => {
      const data: ICitiesParams = {
        lat: TestCity.coord.lat,
        lng: TestCity.coord.lon,
        dist: 10,
      };

      chai
        .request(server)
        .get("/v1/cities")
        .query(data)
        .end((err, res) => {
          res.should.have.status(STATUS_CODES.SUCCESS);
          res.body.should.be.a("array");

          done();
        });
    });
  });
});
