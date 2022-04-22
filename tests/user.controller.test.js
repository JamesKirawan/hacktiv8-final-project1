const UserController = require("../controllers/user.controller");
const httpMocks = require("node-mocks-http");
const { db } = require("../config/db");

let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const userData = {
  email: "kirawannnn@gmail.com",
  password: "secret",
};

const queryText = `delete from users where email = '${userData.email}'`;

describe("UserController.registerUser", () => {
  it("should return 200", async () => {
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 400", async () => {
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 503", async () => {
    req.body = userData;
    req.body.email = 123;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(503);
  });
});

afterAll(async () => {
  await db.query(queryText);
});
