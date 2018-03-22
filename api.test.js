// import testing libraries
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./app");
const should = chai.should();
chai.use(chaiHttp);

// testing entry-point
describe("POST /github-keys", () => {
  // test posting empty username array
  it("should return a 400 status code and error message for empty usernames array", done => {
    chai
      .request(server)
      .post("/github-keys")
      .send({ usernames: [] })
      .set("Accept", "application/json")
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(400);
        res.body.should.be.a("object");
        // check that error message is returned
        res.body.should.have
          .property("error")
          .eql(
            "Body must contain a non-empty array of Github usernames called 'usernames'"
          );
        done();
      });
  });

  it("should return a status code of 200 and empty array for non-existent Github username", done => {
    const fakeUsername = "pojisdiohjwr9w";
    chai
      .request(server)
      .post("/github-keys")
      .send({ usernames: [fakeUsername] })
      .set("Accept", "application/json")
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        //check that posting invalid username returns empty array
        res.body[fakeUsername].length.should.be.eql(0);
        done();
      });
  });

  it("should return a status code of 200 and non-empty array for valid Github username", done => {
    const myGithubUsername = "adace123";
    chai
      .request(server)
      .post("/github-keys")
      .send({ usernames: [myGithubUsername] })
      .set("Accept", "application/json")
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");
        // check that valid username array returns non-empty array
        res.body[myGithubUsername].length.should.be.eql(1);
        // verify keys of response object
        Object.keys(res.body[myGithubUsername][0]).should.include.members([
          "id",
          "key"
        ]);
        // verify values of response object
        Object.values(res.body[myGithubUsername][0]).every(
          val => typeof val === "string" && val.length > 0
        );
        done();
      });
  });

  // stop server
  after(done => server.close(done));
});
