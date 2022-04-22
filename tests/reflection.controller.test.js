const ReflectionController = require("../controllers/reflection.controller");
const httpMocks = require("node-mocks-http");

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const reflectionData = {
  success: "today success",
  low_point: "new Low Key Point",
  take_away: "new take away",
};

describe("ReflectionController.postReflection", () => {
  it("should return 503", async () => {
    req.body = reflectionData;
    await ReflectionController.postReflection(req, res);
    expect(res.statusCode).toBe(503);
  });
});
