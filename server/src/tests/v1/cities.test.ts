//During the test the env variable is set to test
process.env.NODE_ENV = "test";

import { describe } from "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../../index";

import { ICityFileRow } from "@interfaces/cities";

import { STATUS_CODES } from "@constants/constants";

import { ICitiesParams } from "@apiV1/cities/interfaces";

chai.use(chaiHttp);

//  First City Taken from City.json file
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
  beforeEach((done) => {
    //Before each test
    done();
  });

  /*
   * Test the /cities Listing Route route
   */
  describe("GET /v1/cities", () => {
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
          expect(res.status).to.be.eql(STATUS_CODES.SUCCESS);

          expect(res.body).to.be.a("array");

          done(err);
        });
    });
  });

  /*
   * Test the /cities/:cityId Listing Route route
   */
  describe("GET /v1/cities/:cityId", () => {
    it("Retrieve the details for a city (by cityId)", (done) => {
      chai
        .request(server)
        .get(`/v1/cities/${TestCity.id}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(STATUS_CODES.SUCCESS);

          expect(res.body).to.be.a("object");

          expect(res.body).to.have.property("id").be.eql(TestCity.id);
          expect(res.body).to.have.property("name").to.be.eq(TestCity.name);
          expect(res.body).to.have.property("lat").to.be.eq(TestCity.coord.lat);
          expect(res.body).to.have.property("lng").to.be.eq(TestCity.coord.lon);

          done(err);
        });
    });
  });
});
