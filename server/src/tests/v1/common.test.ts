//During the test the env variable is set to test
process.env.NODE_ENV = "test";

import { describe } from "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import server from "../../index";

import { STATUS_CODES, MESSAGES } from "@constants/constants";

chai.use(chaiHttp);

//Our parent block
describe("V1 Common", () => {
  beforeEach((done) => {
    //Before each test
    done();
  });
  /*
   * Test the /POST route
   */
  describe("/GET common", () => {
    it("it should call home api", (done) => {
      chai
        .request(server)
        .get("/v1")
        .end((err, res) => {
          expect(res.status).to.be.eql(STATUS_CODES.SUCCESS);

          const body = res.body;

          expect(body).be.a("object");

          expect(body)
            .to.have.property("statusCode")
            .be.eql(STATUS_CODES.SUCCESS);
          expect(body).to.have.property("message").be.eql(MESSAGES.success);
          expect(body).to.have.property("data").be.a("object");

          done();
        });
    });
  });
});
